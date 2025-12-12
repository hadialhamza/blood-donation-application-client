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

import PageTitle from "../components/shared/PageTitle";
import NotFoundPage from "@/components/shared/NotFound";

export const router = createBrowserRouter([
  // MAIN LAYOUT
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <PageTitle title="Home">
            <HomePage />
          </PageTitle>
        ),
      },
      {
        path: "login",
        element: (
          <PageTitle title="Login">
            <Login />
          </PageTitle>
        ),
      },
      {
        path: "register",
        element: (
          <PageTitle title="Register">
            <Register />
          </PageTitle>
        ),
      },
      {
        path: "search",
        element: (
          <PageTitle title="Search Donors">
            <Search />
          </PageTitle>
        ),
      },
      {
        path: "public-donation-requests",
        element: (
          <PageTitle title="Donation Requests">
            <PublicDonationRequests />
          </PageTitle>
        ),
      },
      {
        path: "blog",
        element: (
          <PageTitle title="Blog">
            <Blog />
          </PageTitle>
        ),
      },
      {
        path: "blog/:id",
        element: (
          <PageTitle title="Blog Details">
            <BlogDetails />
          </PageTitle>
        ),
      },
      {
        path: "funding",
        element: (
          <PageTitle title="Funding">
            <PrivateRoute>
              <Funding />
            </PrivateRoute>
          </PageTitle>
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
        element: (
          <PageTitle title="Dashboard">
            <DashboardHome />
          </PageTitle>
        ),
      },
      {
        path: "admin-home",
        element: (
          <PageTitle title="Admin Dashboard">
            <AdminHome />
          </PageTitle>
        ),
      },
      // You might want a separate default for donors, e.g.:
      // { path: "donor-home", element: <DonorHome /> }

      {
        path: "profile",
        element: (
          <PageTitle title="Profile">
            <Profile />
          </PageTitle>
        ),
      },
      {
        path: "profile/update",
        element: (
          <PageTitle title="Update Profile">
            <ProfileUpdate />
          </PageTitle>
        ),
      },
      {
        path: "create-donation-request",
        element: (
          <PageTitle title="Create Request">
            <CreateDonationRequest />
          </PageTitle>
        ),
      },
      {
        path: "my-donation-requests",
        element: (
          <PageTitle title="My Requests">
            <MyDonationRequests />
          </PageTitle>
        ),
      },
      {
        path: "update-request/:id",
        element: (
          <PageTitle title="Update Request">
            <UpdateDonationRequest />
          </PageTitle>
        ),
      },
      {
        path: "all-users",
        element: (
          <PageTitle title="All Users">
            <AllUsers />
          </PageTitle>
        ),
      },
      {
        path: "all-blood-donation-request",
        element: (
          <PageTitle title="All Requests">
            <AllDonationRequests />
          </PageTitle>
        ),
      },
      {
        path: "content-management",
        element: (
          <PageTitle title="Content Management">
            <ContentManagement />
          </PageTitle>
        ),
      },
      {
        path: "add-blog",
        element: (
          <PageTitle title="Add Blog">
            <AddBlog />
          </PageTitle>
        ),
      },
      {
        path: "donation-request-details/:id",
        element: (
          <PageTitle title="Request Details">
            <DonationRequestDetails />
          </PageTitle>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
