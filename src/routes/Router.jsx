import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/home/HomePage";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import DashboardLayout from "../layouts/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        // Default Dashboard route
        index: true,
        element: <div>Welcome to Dashboard Statistics</div>,
      },
      {
        path: "profile",
        element: <div>Profile Page Placeholder</div>,
      },
      {
        path: "create-donation-request",
        element: <div>Create Request Form Placeholder</div>,
      },
      // real components one here
    ],
  },
]);
