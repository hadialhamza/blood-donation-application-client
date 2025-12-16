import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import BloodLineLogo from "../logo/BloodLineLogo";
import Container from "../container/Container";
import {
  Moon,
  Sun,
  Menu,
  LogOut,
  LayoutDashboard,
  User,
  LogIn,
  User2Icon,
  ChevronRight,
  Droplets,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetDescription,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@radix-ui/react-dropdown-menu";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const location = useLocation();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const [isScrolled, setIsScrolled] = useState(false);
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Log Out Successful");
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Donation Requests", path: "/public-donation-requests" },
    { name: "Blog", path: "/blog" },
    ...(user ? [{ name: "Funding", path: "/funding" }] : []),
  ];

  return (
    <header
      className={cn(
        "top-0 z-50 w-full border-b transition-all duration-300",
        isHome
          ? "fixed border-transparent"
          : "sticky bg-background/70 backdrop-blur-lg",
        isHome && !isScrolled
          ? "bg-transparent py-4"
          : "bg-background/80 backdrop-blur shadow-sm border-border py-1"
      )}
    >
      <Container>
        <div className="flex h-16 items-center">
          {/* LOGO */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center space-x-2">
              <div
                className={cn(
                  isHome && !isScrolled
                    ? "[&_span.logo-title]:text-gray-200 [&_.logo-subtitle]:text-gray-300"
                    : ""
                )}
              >
                <BloodLineLogo />
              </div>
            </Link>
          </div>

          {/* --- DESKTOP NAV --- */}
          <div className="ml-auto flex items-center gap-5">
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    cn(
                      "relative group flex items-center text-sm font-medium uppercase transition-colors hover:text-primary",
                      isActive
                        ? isHome && !isScrolled
                          ? "text-white hover:text-white"
                          : "text-primary dark:text-white/90"
                        : isHome && !isScrolled
                          ? "text-white/80 hover:text-white"
                          : "text-foreground/70"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      <span
                        className={cn(
                          "absolute -bottom-1 left-0 h-0.5 bg-red-500 transition-all duration-300",
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        )}
                      ></span>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-5">
              {/* Theme Toggle Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className={cn(
                  "rounded-full transition-colors border border-border",
                  isHome && !isScrolled
                    ? "text-white hover:bg-white/20 hover:text-white"
                    : "text-foreground border border-black/70 hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>

              {/* Desktop: Auth Logic */}
              <div className="hidden md:flex items-center gap-2">
                {loading ? (
                  <Skeleton className="h-10 w-10 rounded-full bg-linear-to-r from-red-200 to-rose-200 dark:from-red-900/30 dark:to-rose-900/30" />
                ) : user ? (
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
                            <AvatarFallback className="bg-linear-to-r from-red-600 to-rose-600 text-white font-semibold">
                              {user?.displayName?.charAt(0) || (
                                <User className="w-5 h-5" />
                              )}
                            </AvatarFallback>
                          </Avatar>
                          {/* Online Indicator */}
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-zinc-900 shadow-sm animate-pulse"></div>
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="min-w-64 p-0 border-red-200 dark:border-red-900 shadow-2xl overflow-hidden"
                      align="end"
                      forceMount
                    >
                      {/* User Header */}
                      <div className="p-4 bg-linear-to-r from-red-600 to-rose-600 text-white">
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
                            <p className="font-bold text-sm truncate">
                              {user.displayName}
                            </p>
                            <p className="text-xs text-red-100 truncate">
                              {user.email}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                              <span className="text-xs text-red-100">
                                Online
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="p-2 space-y-1">
                        <DropdownMenuItem asChild className="p-0">
                          <Link
                            to="/dashboard"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer transition-all duration-300 hover:translate-x-1 group"
                          >
                            <div className="p-2 bg-linear-to-r from-blue-500 to-cyan-500 rounded-lg text-white group-hover:scale-110 transition-transform">
                              <LayoutDashboard className="h-4 w-4" />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium text-zinc-900 dark:text-white">
                                Dashboard
                              </span>
                              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                View your activities
                              </span>
                            </div>
                            <ChevronRight className="h-4 w-4 ml-auto text-zinc-400 group-hover:text-red-600 transition-colors" />
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild className="p-0">
                          <Link
                            to="/dashboard/profile"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer transition-all duration-300 hover:translate-x-1 group"
                          >
                            <div className="p-2 bg-linear-to-r from-purple-500 to-violet-500 rounded-lg text-white group-hover:scale-110 transition-transform">
                              <User className="h-4 w-4" />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium text-zinc-900 dark:text-white">
                                Profile
                              </span>
                              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                Edit your profile
                              </span>
                            </div>
                            <ChevronRight className="h-4 w-4 ml-auto text-zinc-400 group-hover:text-red-600 transition-colors" />
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild className="p-0">
                          <Link
                            to="/dashboard/my-donation-requests"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer transition-all duration-300 hover:translate-x-1 group"
                          >
                            <div className="p-2 bg-linear-to-r from-amber-500 to-orange-500 rounded-lg text-white group-hover:scale-110 transition-transform">
                              <Droplets className="h-4 w-4" />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium text-zinc-900 dark:text-white">
                                My Requests
                              </span>
                              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                Donation history
                              </span>
                            </div>
                            <ChevronRight className="h-4 w-4 ml-auto text-zinc-400 group-hover:text-red-600 transition-colors" />
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild className="p-0">
                          <Link
                            to="/dashboard/funding"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer transition-all duration-300 hover:translate-x-1 group"
                          >
                            <div className="p-2 bg-linear-to-r from-emerald-500 to-green-500 rounded-lg text-white group-hover:scale-110 transition-transform">
                              <DollarSign className="h-4 w-4" />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium text-zinc-900 dark:text-white">
                                Funding
                              </span>
                              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                Support our mission
                              </span>
                            </div>
                            <ChevronRight className="h-4 w-4 ml-auto text-zinc-400 group-hover:text-red-600 transition-colors" />
                          </Link>
                        </DropdownMenuItem>

                        <Separator className="my-1" />

                        <DropdownMenuItem
                          onClick={handleLogOut}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer transition-all duration-300 hover:translate-x-1 group text-red-600 dark:text-red-400 focus:text-red-600"
                        >
                          <div className="p-2 bg-linear-to-r from-red-500 to-rose-500 rounded-lg text-white group-hover:scale-110 transition-transform">
                            <LogOut className="h-4 w-4" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium">Log Out</span>
                            <span className="text-xs text-zinc-500 dark:text-zinc-400">
                              Sign out from account
                            </span>
                          </div>
                          <LogOut className="h-4 w-4 ml-auto group-hover:rotate-12 transition-transform" />
                        </DropdownMenuItem>
                      </div>

                      {/* Footer */}
                      <div className="px-4 py-2.5 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-zinc-500 dark:text-zinc-400">
                            BloodLine v1.0
                          </span>
                          <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-xs text-green-600 dark:text-green-400">
                              Secure
                            </span>
                          </div>
                        </div>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link to="/login">
                    <Button
                      size="md"
                      className="px-6 py-2.5 bg-linear-to-r from-red-600 to-rose-600 text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-red-500/30 duration-300 rounded-full group"
                    >
                      <LogIn className="mr-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                      Login
                      <ChevronRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
          {/* --- MOBILE: SHEET MENU --- */}
          <div className="md:hidden pl-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    isHome && !isScrolled
                      ? "text-white hover:bg-white/20 hover:text-white border rounded-full"
                      : "border border-black/70 rounded-full"
                  )}
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center my-4 px-4">
                    <div className="scale-110">
                      <BloodLineLogo />
                    </div>
                  </SheetTitle>
                  <SheetDescription className="hidden">
                    Mobile navigation menu
                  </SheetDescription>
                </SheetHeader>

                <div className="flex flex-col space-y-6 py-6 pl-2 pr-6">
                  {/* Mobile Links */}
                  <div className="flex flex-col space-y-3 px-4">
                    {navLinks.map((link) => {
                      const isActive = location.pathname === link.path;
                      return (
                        <SheetClose asChild key={link.path}>
                          <Link
                            to={link.path}
                            className={cn(
                              "flex items-center w-full px-4 py-3 text-base font-medium rounded-r-full transition-all duration-300 ease-in-out hover:translate-x-2",
                              isActive
                                ? "bg-primary/10  border-l-4 border-red-600 shadow-sm"
                                : "text-foreground/80 hover:bg-muted/50 hover:border-l-4 hover:border-red-600 border-transparent"
                            )}
                          >
                            {link.name}
                          </Link>
                        </SheetClose>
                      );
                    })}
                  </div>

                  <div className="h-px bg-border/50 w-full" />

                  {/* Mobile Auth Section */}
                  {user ? (
                    <div className="flex flex-col space-y-4 px-2">
                      <div className="flex items-center gap-4 p-2 rounded-lg bg-muted/30">
                        <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                          <AvatarImage src={user?.photoURL} />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-sm font-semibold truncate text-foreground">
                            {user.displayName}
                          </span>
                          <span className="text-xs text-muted-foreground truncate">
                            {user.email}
                          </span>
                        </div>
                      </div>
                      <SheetClose asChild>
                        <Link to="/dashboard">
                          <Button
                            variant="outline"
                            className="w-full justify-start gap-3 h-12 hover:border-red-500/50 hover:text-red-500 transition-colors"
                          >
                            <LayoutDashboard className="h-4 w-4" /> Dashboard
                          </Button>
                        </Link>
                      </SheetClose>
                      <Button
                        variant="destructive"
                        className="w-full justify-start gap-2"
                        onClick={handleLogOut}
                      >
                        <LogOut className="h-4 w-4" /> Logout
                      </Button>
                    </div>
                  ) : (
                    <SheetClose asChild>
                      <Link to="/login">
                        <Button className="w-full">
                          <LogIn className="w-4 h-4 mr-2" />
                          Login
                        </Button>
                      </Link>
                    </SheetClose>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
