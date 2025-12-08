import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/home/HomePage";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../pages/dashboard/profile/Profile";
import CreateDonationRequest from "../pages/dashboard/donationRequest/CreateDonationRequest";
import MyDonationRequests from "../pages/dashboard/donationRequest/MyDonationRequests";
import UpdateDonationRequest from "../pages/dashboard/donationRequest/UpdateDonationRequest";
import DonationRequestDetails from "../pages/dashboard/donationRequest/DonationRequestDetails";
import AdminHome from "../pages/dashboard/adminHomePage/AdminHome";
import AllUsers from "../pages/dashboard/allUsers/AllUsers";
import AllDonationRequests from "../pages/dashboard/allDonationRequests/AllDonationRequests";

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
        index: true,
        path: "admin-home",
        element: <AdminHome />,
      },
      {
        path: "all-users",
        element: <AllUsers />,
      },

      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "create-donation-request",
        element: <CreateDonationRequest />,
      },
      {
        path: "my-donation-requests",
        element: <MyDonationRequests />,
      },
      {
        path: "update-request/:id",
        element: <UpdateDonationRequest />,
      },
      {
        path: "donation-request-details/:id",
        element: <DonationRequestDetails />, // i have to make this a private route later.
      },
      {
        path: "all-blood-donation-request",
        element: <AllDonationRequests />,
      },
    ],
  },
]);
