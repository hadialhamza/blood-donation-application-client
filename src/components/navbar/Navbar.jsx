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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
        <div className="flex h-16 px-4 md:px-0 items-center">
          {/* LOGO */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center space-x-2">
              <div
                className={cn(
                  isHome && !isScrolled
                    ? "[&_span.font-normal]:text-white [&_.text-xs]:text-white/90"
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
                  <Skeleton className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700" />
                ) : user ? (
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn(
                          "relative h-10 w-10 rounded-full",
                          isHome && !isScrolled ? "hover:bg-white/20" : ""
                        )}
                      >
                        <Avatar
                          className={cn(
                            "h-10 w-10 border",
                            isHome && !isScrolled
                              ? "border-white/50"
                              : "border-border"
                          )}
                        >
                          <AvatarImage
                            src={user?.photoURL}
                            alt={user?.displayName || "User"}
                          />
                          <AvatarFallback>
                            <User />
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="min-w-56 p-3 space-y-2"
                      align="end"
                      forceMount
                    >
                      <DropdownMenuLabel className="flex items-center gap-2 font-normal border rounded-sm text-center">
                        <User2Icon className="text-green-800/90 bg-green-200 p-1 rounded" />
                        <div className="flex flex-col items-start space-y-1">
                          <p className="text-sm font-medium leading-none text-green-600">
                            {user.displayName}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      {/* <DropdownMenuSeparator /> */}
                      <DropdownMenuItem asChild>
                        <Link
                          to="/dashboard"
                          className="cursor-pointer border  hover:translate-x-3 duration-300 text-blue-700"
                        >
                          <LayoutDashboard className="h-6! w-6! p-1 rounded bg-blue-200 text-blue-700" />
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                      {/* <DropdownMenuSeparator /> */}
                      <DropdownMenuItem
                        onClick={handleLogOut}
                        className="text-red-600 cursor-pointer focus:text-red-600 border hover:translate-x-3 duration-300"
                      >
                        <LogOut className="h-6! w-6! p-1 rounded bg-red-200/70 text-red-600" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link to="/login">
                    <Button
                      size="md"
                      className={
                        "px-4 py-2.5 bg-red-600 text-white shadow-[0_4px_14px_0_rgba(220,38,38,0.39)] transition-all hover:scale-105 hover:shadow-[0_6px_20px_rgba(220,38,38,0.23)] duration-300 rounded-full group"
                      }
                    >
                      <LogIn className="mr-1 group-hover:translate-x-2 transition-all duration-300" />
                      Login
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
                  <SheetTitle className="flex items-center justify-center mb-4">
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
