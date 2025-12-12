import React from "react";
import { NavLink, Outlet } from "react-router";
import {
  FaHome,
  FaUser,
  FaList,
  FaTint,
  FaUsers,
  FaEdit,
  FaBars,
} from "react-icons/fa";
import useRole from "../hooks/useRole";
import { Button } from "@/components/ui/button";
import GlobalBackground from "@/components/shared/GlobalBackground";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Loading from "@/components/shared/Loading";
import BloodLineLogo from "@/components/logo/BloodLineLogo";

const NavItem = ({ to, icon: Icon, children }) => (
  <NavLink
    to={to}
    end={to === "/dashboard" || to === "/dashboard/admin-home"}
    className={({ isActive }) =>
      cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 text-sm font-medium",
        isActive
          ? "bg-red-600 text-white shadow-md"
          : "text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400"
      )
    }
  >
    <Icon className="w-5 h-5" />
    {children}
  </NavLink>
);

const SidebarContent = ({ role }) => (
  <div className="flex flex-col h-full">
    <div className="mb-8 px-2 text-center">
      <BloodLineLogo />
    </div>

    <nav className="space-y-1 flex-1">
      {role === "donor" && (
        <>
          <NavItem to="/dashboard" icon={FaHome}>
            Donor Home
          </NavItem>
          <NavItem to="/dashboard/my-donation-requests" icon={FaList}>
            My Donation Requests
          </NavItem>
          <NavItem to="/dashboard/create-donation-request" icon={FaTint}>
            Create Donation Request
          </NavItem>
        </>
      )}

      {role === "admin" && (
        <>
          <NavItem to="/dashboard/admin-home" icon={FaHome}>
            Admin Home
          </NavItem>
          <NavItem to="/dashboard/all-users" icon={FaUsers}>
            All Users
          </NavItem>
          <NavItem to="/dashboard/all-blood-donation-request" icon={FaList}>
            Donation Requests
          </NavItem>
          <NavItem to="/dashboard/content-management" icon={FaEdit}>
            Content Management
          </NavItem>
        </>
      )}

      {role === "volunteer" && (
        <>
          <NavItem to="/dashboard" icon={FaHome}>
            Volunteer Home
          </NavItem>
          <NavItem to="/dashboard/all-blood-donation-request" icon={FaList}>
            All Blood Donation Requests
          </NavItem>
          <NavItem to="/dashboard/content-management" icon={FaEdit}>
            Content Management
          </NavItem>
        </>
      )}

      <Separator className="my-4" />

      <NavItem to="/dashboard/profile" icon={FaUser}>
        Profile
      </NavItem>
      <NavItem to="/" icon={FaHome}>
        Main Home
      </NavItem>
    </nav>
  </div>
);

const DashboardLayout = () => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) {
    return <Loading />;
  }

  return (
    <GlobalBackground>
      <div className="flex min-h-screen">
        <aside className="hidden lg:block w-64 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-r border-gray-200 dark:border-gray-800 px-4 py-6 fixed h-full overflow-y-auto z-20">
          <SidebarContent role={role} />
        </aside>

        <div className="flex-1 flex flex-col lg:ml-64 transition-all duration-300">
          <header className="lg:hidden flex items-center p-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10 shadow-sm">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <FaBars className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-6">
                <SheetTitle className="hidden">Dashboard Menu</SheetTitle>
                <SheetDescription className="hidden">
                  Navigation options for dashboard
                </SheetDescription>
                <SidebarContent role={role} />
              </SheetContent>
            </Sheet>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              BloodLine Dashboard
            </h1>
          </header>
          <main className="flex-1 overflow-x-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </GlobalBackground>
  );
};

export default DashboardLayout;
