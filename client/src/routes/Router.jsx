import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import BasicLayout from "../layouts/BasicLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import ManageProfile from "../pages/Dashboard/Tourist/ManageProfile";
import MyBookings from "../pages/Dashboard/Tourist/MyBookings";
import AddStory from "../pages/Dashboard/Tourist/AddStory";
import ManageStories from "../pages/Dashboard/Tourist/ManageStories";
import JoinAsGuide from "../pages/Dashboard/Tourist/JoinAsGuide";
import MyAssignedTours from "../pages/Dashboard/TourGuide/MyAssignedTours";
import AdminRoute from "./AdminRoute";

import AddPackage from "../pages/Dashboard/Admin/AddPackage";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageCandidates from "../pages/Dashboard/Admin/ManageCandidates";
import OfferAnnouncements from "../pages/OfferAnnouncements";
import CreateAnnouncement from "../pages/Dashboard/Admin/CreateAnnouncement";
import AllStories from "../pages/AllStories";
import PackageDetails from "../pages/PackageDetails";
import AllTrips from "../pages/AllTrips";
import AboutUs from "../pages/AboutUs";
import TourGuideProfile from "../pages/TourGuideProfile";
import EditStory from "../pages/Dashboard/Tourist/EditStory";
import StoryDetails from "../pages/StoryDetails";
import AdminOverview from "../pages/Dashboard/Admin/AdminOverview"; // <-- Import the new component
import Cookie from "../pages/Cookie";
import Terms from "../pages/Terms";
import Privacy from "../pages/Privacy";

const router = createBrowserRouter([
  // Main Site Routes
  {
    path: "/",
    element: <BasicLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
      { path: "/offer-announcements", element: <OfferAnnouncements /> },
      { path: "/community", element: <AllStories /> },
      { path: "/all-trips", element: <AllTrips /> },
      { path: "/about-us", element: <AboutUs /> },
      { path: "/cookie-policy", element: <Cookie /> },
      { path: "/terms-of-use", element: <Terms /> },
      { path: "/privacy-policy", element: <Privacy /> },
      { path: "/package/:id", element: <PackageDetails /> },
      { path: "/guide/:id", element: <TourGuideProfile /> },
      { path: "/story/:id", element: <StoryDetails /> },
    ],
  },
  // Dashboard Routes
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // Common Routes for All Roles
      { path: "", element: <ManageProfile /> },
      { path: "manage-profile", element: <ManageProfile /> },
      { path: "add-story", element: <AddStory /> },
      { path: "manage-stories", element: <ManageStories /> },
      { path: "edit-story/:id", element: <EditStory /> },

      // Tourist Routes
      { path: "my-bookings", element: <MyBookings /> },
      { path: "join-as-guide", element: <JoinAsGuide /> },

      // Tour Guide Routes
      { path: "my-assigned-tours", element: <MyAssignedTours /> },

      // Admin Routes (Protected by AdminRoute)
      {
        path: "overview",
        element: (
          <AdminRoute>
            <AdminOverview />
          </AdminRoute>
        ),
      }, // <-- Add the new route here

      {
        path: "add-package",
        element: (
          <AdminRoute>
            <AddPackage />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-candidates",
        element: (
          <AdminRoute>
            <ManageCandidates />
          </AdminRoute>
        ),
      },
      {
        path: "create-announcement",
        element: (
          <AdminRoute>
            <CreateAnnouncement />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
