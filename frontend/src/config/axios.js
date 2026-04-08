import axios from "axios";
import { getAccessToken, setAccessToken } from "./token";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true, // required for refresh cookie
});

// 🔁 Refresh state
let isRefreshing = false;
let failedQueue = [];

// 🔁 Process queued requests
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// ✅ Attach access token
api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 🔥 Handle 401 + Refresh logic
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // ❌ If not 401 → just reject
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // 🔁 If already refreshing → queue request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          },
          reject,
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // 🔁 Call refresh API
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/refresh-token",
        {},
        { withCredentials: true },
      );

      const newAccessToken = res.data.accessToken;

      // ✅ Save new token
      setAccessToken(newAccessToken);

      // 🔁 Process queued requests
      processQueue(null, newAccessToken);

      // 🔁 Retry original request
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    } catch (err) {
      processQueue(err, null);

      // ❌ Refresh failed → logout scenario
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
