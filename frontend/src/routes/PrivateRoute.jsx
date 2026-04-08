import { Navigate } from "react-router-dom";
import useAuth from "../context/auth/UseAuth";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // replace later

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
