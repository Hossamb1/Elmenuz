import { Routes, Route, Link } from "react-router-dom";
import Layout from "./layouts/layout";
import HomePage from "./pages/homePage";
import AuthCallbackPage from "./auth/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ManageRestaurantPage from "./pages/manageRestaurantPage";
import { ProtectedRoute } from "./auth/protectedRoute";
import SearchPage from "./pages/searchPage";
import DetailPage from "./pages/DetailPage";
import OrderStatusPage from "./pages/OrderStatusPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout showMain children={<HomePage />} />} />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route
        path="/search/:city"
        element={
          <Layout showMain={false}>
            <SearchPage />
          </Layout>
        }
      />
      <Route
        path="/detail/:restaurantId"
        element={
          <Layout showMain={false}>
            <DetailPage />
          </Layout>
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/user-profile"
          element={<Layout children={<UserProfilePage />} />}
        />
        <Route
          path="/manage-restaurant"
          element={<Layout children={<ManageRestaurantPage />} />}
        />
        <Route
          path="/order-status"
          element={<Layout children={<OrderStatusPage />} />}
        />
      </Route>
      <Route
        path="*"
        element={
          <h1>
            Add error page here
            <Link to="/">Back To Home Page</Link>
          </h1>
        }
      />
    </Routes>
  );
};
