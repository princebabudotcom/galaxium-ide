import api from "../config/axios";

const loginApi = (data) => {
  return api.post("/auth/login", data);
};

const registerApi = (data) => {
  return api.post("/auth/register", data);
};

const googlelogin = () => {
  return (window.location.href = "http://localhost:5000/api/v1/auth/google");
};

const githublogin = () => {
  return (window.location.href = "http://localhost:5000/api/v1/auth/github");
};

const logoutApi = () => {
  return api.get("/auth/logout");
};

export default {
  loginApi,
  registerApi,
  googlelogin,
  githublogin,
  logoutApi,
};
