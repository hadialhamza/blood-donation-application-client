import React from "react";
import { Link } from "react-router";
import {
  LayoutDashboard,
  User,
  Droplets,
  DollarSign,
  LogOut,
  ChevronRight,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const UserMenu = ({ user, handleLogOut, isHome, isScrolled }) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "relative h-10 w-10 rounded-full transition-all duration-300",
            isHome && !isScrolled
              ? "hover:bg-white/20 hover:scale-110"
              : "hover:bg-red-50 dark:hover:bg-red-900/20 hover:scale-110"
          )}
        >
          <div className="relative">
            <Avatar
              className={cn(
                "h-10 w-10 border-2 transition-all duration-300",
                isHome && !isScrolled
                  ? "border-white/60 hover:border-white"
                  : "border-red-200 dark:border-red-800 hover:border-red-400 dark:hover:border-red-600"
              )}
            >
              <AvatarImage
                src={user?.photoURL}
                alt={user?.displayName || "User"}
                className="object-cover"
              />
              <AvatarFallback className="bg-brand-gradient font-semibold">
                {user?.displayName?.charAt(0) || <User className="w-5 h-5" />}
              </AvatarFallback>
            </Avatar>
            {/* Online Indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-zinc-900 shadow-sm animate-pulse" />
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="min-w-64 p-0 border-red-200 dark:border-red-900 shadow-2xl overflow-hidden"
        align="end"
        forceMount
      >
        {/* User Header - Uses Global Gradient Class */}
        <div className="p-4 bg-brand-gradient">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-white/30">
              <AvatarImage
                src={user?.photoURL}
                alt={user?.displayName}
                className="object-cover"
              />
              <AvatarFallback className="bg-white/20 text-white">
                {user?.displayName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm truncate text-white">
                {user.displayName}
              </p>
              <p className="text-xs text-red-100 truncate">{user.email}</p>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-red-100">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-2 space-y-1">
          <MenuLink
            to="/dashboard"
            icon={LayoutDashboard}
            colorClass="from-blue-500 to-cyan-500"
            label="Dashboard"
            sub="View your activities"
          />
          <MenuLink
            to="/dashboard/profile"
            icon={User}
            colorClass="from-purple-500 to-violet-500"
            label="Profile"
            sub="Edit your profile"
          />
          <MenuLink
            to="/dashboard/my-donation-requests"
            icon={Droplets}
            colorClass="from-amber-500 to-orange-500"
            label="My Requests"
            sub="Donation history"
          />
          <MenuLink
            to="/dashboard/funding"
            icon={DollarSign}
            colorClass="from-emerald-500 to-green-500"
            label="Funding"
            sub="Support our mission"
          />

          <Separator className="my-1 bg-zinc-100 dark:bg-zinc-800" />

          <DropdownMenuItem
            onClick={handleLogOut}
            className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer transition-all duration-300 hover:translate-x-2 group text-red-600 dark:text-red-400 focus:text-red-600"
          >
            <div className="p-2 bg-linear-to-r from-red-500 to-rose-500 rounded-lg text-white group-hover:scale-110 transition-transform">
              <LogOut className="h-4 w-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-medium">Log Out</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                Sign out from account
              </span>
            </div>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// eslint-disable-next-line
const MenuLink = ({ to, icon: Icon, colorClass, label, sub }) => (
  <DropdownMenuItem asChild className="p-0">
    <Link
      to={to}
      className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer transition-all duration-300 hover:translate-x-2 group"
    >
      <div
        className={`p-2 bg-linear-to-r ${colorClass} rounded-lg text-white group-hover:scale-110 transition-transform`}
      >
        <Icon className="h-4 w-4 text-white" />
      </div>
      <div className="flex flex-col">
        <span className="font-medium text-zinc-900 dark:text-white">
          {label}
        </span>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">{sub}</span>
      </div>
      <ChevronRight className="h-4 w-4 ml-auto text-zinc-400 group-hover:text-red-600 transition-colors" />
    </Link>
  </DropdownMenuItem>
);

export default UserMenu;
