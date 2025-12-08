import { NavLink, Outlet } from "react-router";
// import { useAuth } from "../hooks/useAuth";
import {
  FaHome,
  FaUser,
  FaList,
  FaTint,
  FaUsers,
  FaEdit,
  FaMoneyBillWave,
} from "react-icons/fa";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  //   const { user } = useAuth();
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) {
    return <p>Loading...</p>;
  }

  const sidebarLinks = (
    <>
      {/* DONOR MENU */}
      {role === "donor" && (
        <>
          <li>
            <NavLink to="/dashboard">
              <FaHome /> Donor Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/my-donation-requests">
              <FaList /> My Donation Requests
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/create-donation-request">
              <FaTint /> Create Donation Request
            </NavLink>
          </li>
        </>
      )}

      {/* ADMIN MENU */}
      {role === "admin" && (
        <>
          <li>
            <NavLink to="/dashboard/admin-home">
              <FaHome /> Admin Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/all-users">
              <FaUsers /> All Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/all-blood-donation-request">
              <FaList /> All Blood Donation Requests
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/content-management">
              <FaEdit /> Content Management
            </NavLink>
          </li>
        </>
      )}

      {/* VOLUNTEER MENU */}
      {role === "volunteer" && (
        <>
          <li>
            <NavLink to="/dashboard">
              <FaHome /> Volunteer Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/all-blood-donation-request">
              <FaList /> All Blood Donation Requests
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/content-management">
              <FaEdit /> Content Management
            </NavLink>
          </li>
        </>
      )}

      {/* SHARED LINKS */}
      <div className="divider"></div>
      <li>
        <NavLink to="/dashboard/profile">
          <FaUser /> Profile
        </NavLink>
      </li>
      <li>
        <NavLink to="/">
          <FaHome /> Main Home
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Page Content */}
      <div className="drawer-content flex flex-col items-center justify-center bg-base-100">
        <div className="w-full navbar bg-base-300 lg:hidden">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2 text-xl font-bold">
            BloodLine Dashboard
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 w-full p-10">
          <Outlet />
        </div>
      </div>

      {/* Sidebar Content */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-64 min-h-full bg-base-200 text-base-content">
          {/* Sidebar Header */}
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-red-600">BloodLine</h2>
            <p className="text-xs uppercase tracking-widest mt-1">Dashboard</p>
          </div>
          {sidebarLinks}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
