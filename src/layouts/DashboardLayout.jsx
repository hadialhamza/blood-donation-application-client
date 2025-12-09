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
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const DashboardLayout = () => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const NavItem = ({ to, icon: Icon, children }) => (
    <NavLink
      to={to}
      end={to === "/dashboard" || to === "/dashboard/admin-home"} // Exact match for home links if needed
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 text-sm font-medium",
          isActive
            ? "bg-red-600 text-white shadow-md"
            : "text-gray-700 hover:bg-red-50 hover:text-red-600"
        )
      }
    >
      <Icon className="w-5 h-5" />
      {children}
    </NavLink>
  );

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="mb-8 px-2 text-center">
        <h2 className="text-2xl font-bold text-red-600">BloodLine</h2>
        <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Dashboard</p>
      </div>

      <nav className="space-y-1 flex-1">
        {/* DONOR MENU */}
        {role === "donor" && (
          <>
            <NavItem to="/dashboard" icon={FaHome}>Donor Home</NavItem>
            <NavItem to="/dashboard/my-donation-requests" icon={FaList}>My Donation Requests</NavItem>
            <NavItem to="/dashboard/create-donation-request" icon={FaTint}>Create Donation Request</NavItem>
          </>
        )}

        {/* ADMIN MENU */}
        {role === "admin" && (
          <>
            <NavItem to="/dashboard/admin-home" icon={FaHome}>Admin Home</NavItem>
            <NavItem to="/dashboard/all-users" icon={FaUsers}>All Users</NavItem>
            <NavItem to="/dashboard/all-blood-donation-request" icon={FaList}>All Blood Donation Requests</NavItem>
            <NavItem to="/dashboard/content-management" icon={FaEdit}>Content Management</NavItem>
          </>
        )}

        {/* VOLUNTEER MENU */}
        {role === "volunteer" && (
          <>
            <NavItem to="/dashboard" icon={FaHome}>Volunteer Home</NavItem>
            <NavItem to="/dashboard/all-blood-donation-request" icon={FaList}>All Blood Donation Requests</NavItem>
            <NavItem to="/dashboard/content-management" icon={FaEdit}>Content Management</NavItem>
          </>
        )}

        <Separator className="my-4" />

        <NavItem to="/dashboard/profile" icon={FaUser}>Profile</NavItem>
        <NavItem to="/" icon={FaHome}>Main Home</NavItem>
      </nav>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 bg-white dark:bg-gray-800 border-r px-4 py-6 fixed h-full overflow-y-auto">
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:ml-64 transition-all duration-300">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center p-4 bg-white dark:bg-gray-800 border-b sticky top-0 z-10 shadow-sm">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <FaBars className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-6">
              <SheetTitle className="hidden">Dashboard Menu</SheetTitle>
              <SheetDescription className="hidden">Navigation options for dashboard</SheetDescription>
              <SidebarContent />
            </SheetContent>
          </Sheet>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">BloodLine Dashboard</h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
