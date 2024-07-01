import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};
export const ProtectedRoute = ({ children }: Props) => {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) return <Navigate to="/" />;

  return <>{children}</>;
};
