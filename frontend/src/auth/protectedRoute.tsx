import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};
export const ProtectedRoute = ({ children }: Props) => {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) return children;

  return <Navigate to="/login" />;
};
