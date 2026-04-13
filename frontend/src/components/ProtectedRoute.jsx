import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) {
    return <div className="centered">Loading...</div>;
  }

  return token ? children : <Navigate to="/login" replace />;
};

export const RoleRoute = ({ children, roles }) => {
  const { token, user, loading } = useAuth();

  if (loading) {
    return <div className="centered">Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return roles.includes(user?.role) ? children : <Navigate to="/" replace />;
};
