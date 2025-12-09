import { createBrowserRouter } from "react-router"; // Ensure using react-router-dom
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
import Search from "../pages/Search/Search";
import PublicDonationRequests from "../pages/publicDonationRequests/PublicDonationRequests";
import Blog from "../pages/blog/Blog";
import BlogDetails from "../pages/blog/BlogDetails";
import Funding from "../pages/funding/Funding";
import PrivateRoute from "./PrivateRoute";
import DashboardHome from "../pages/dashboard/dashboardHome/DashboardHome";
import ContentManagement from "../pages/dashboard/contentManagement/ContentManagement";
import AddBlog from "../pages/dashboard/contentManagement/AddBlog";
import ProfileUpdate from "../pages/dashboard/profile/ProfileUpdate";

export const router = createBrowserRouter([
  // MAIN LAYOUT
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
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "public-donation-requests",
        element: <PublicDonationRequests />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "blog/:id",
        element: <BlogDetails />,
      },
      {
        path: "funding",
        element: (
          <PrivateRoute>
            <Funding />
          </PrivateRoute>
        ),
      },
      {
        path: "donation-request-details/:id",
        element: (
          <PrivateRoute>
            <DonationRequestDetails />
          </PrivateRoute>
        ),
      },
    ],
  },

  // DASHBOARD LAYOUT (Sidebar)
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true, // This makes it the default page at /dashboard
        element: <DashboardHome />,
      },
      {
        path: "admin-home",
        element: <AdminHome />,
      },
      // You might want a separate default for donors, e.g.:
      // { path: "donor-home", element: <DonorHome /> }

      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "profile/update",
        element: <ProfileUpdate />,
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
        path: "all-users",
        element: <AllUsers />,
      },
      {
        path: "all-blood-donation-request",
        element: <AllDonationRequests />,
      },
      {
        path: "content-management",
        element: <ContentManagement />,
      },
      {
        path: "add-blog",
        element: <AddBlog />,
      },
    ],
  },
]);
