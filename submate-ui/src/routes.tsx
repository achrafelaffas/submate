import { createBrowserRouter } from "react-router-dom";
import Register from "./pages/auth/register/Register";
import Activate from "./pages/auth/activate/Activate";
import Login from "./pages/auth/login/Login";
import Layout from "./pages/Dashboard/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Subscriptions from "./pages/Dashboard/Subscriptions/Subscriptions";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import SubscriptionDetails from "./pages/Dashboard/Subscriptions/SubscriptionDetails";
import NewSubscription from "./pages/Dashboard/Subscriptions/NewSubscription";
import Profile from "./pages/Dashboard/Profile/Profile";
import Landing from "./pages/Landing";
import ForgotPassword from "./pages/auth/reset/ForgotPassword";
import ResetPassword from "./pages/auth/reset/ResetPassword";

const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/register", element: <Register /> },
  { path: "/activate", element: <Activate /> },
  { path: "/login", element: <Login /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
  {
    path: "/me",
    element: (
      <RequireAuth fallbackPath="/login">
        <Layout />
      </RequireAuth>
    ),
    children: [
      { path: "/me", element: <Dashboard /> },
      { path: "/me/subscriptions", element: <Subscriptions /> },
      {
        path: "/me/subscriptions/:id/details",
        element: <SubscriptionDetails />,
      },
      { path: "/me/subscriptions/new", element: <NewSubscription /> },
      { path: "/me/profile", element: <Profile /> },
    ],
  },
]);

export default router;
