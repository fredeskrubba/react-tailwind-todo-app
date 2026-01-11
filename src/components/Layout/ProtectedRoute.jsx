import { Redirect } from "wouter";
import useAuthStore from "../../store/AuthStore";

export const ProtectedRoute = ({ children }) => {
  const token = useAuthStore((s) => s.token);

  if (!token) {
    return <Redirect to="/login" />;
  }

  return children;
};