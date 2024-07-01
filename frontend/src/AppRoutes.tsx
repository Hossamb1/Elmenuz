import { Routes, Route, Link } from "react-router-dom";
import Layout from "./layouts/layout";
import HomePage from "./pages/homePage";
import AuthCallbackPage from "./auth/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import { ProtectedRoute } from "./auth/protectedRoute";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout showMain children={<HomePage />} />} />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route
        path="/user-profile"
        element={
          <ProtectedRoute>
            <Layout children={<UserProfilePage />} />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={
          <h1>
            Home Page not found!!!!
            <Link to="/">Back To Home Page</Link>
          </h1>
        }
      />
    </Routes>
  );
};
