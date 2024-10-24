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

const router = createBrowserRouter([
  { path: "/register", element: <Register /> },
  { path: "/activate", element: <Activate /> },
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: (
      <RequireAuth fallbackPath="/login">
        <Layout />
      </RequireAuth>
    ),
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/subscriptions", element: <Subscriptions /> },
      { path: "/subscriptions/:id/details", element: <SubscriptionDetails /> },
      { path: "/subscriptions/new", element: <NewSubscription /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
]);

export default router;
