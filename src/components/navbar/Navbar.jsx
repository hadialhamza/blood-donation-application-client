import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import BloodLineLogo from "../logo/BloodLineLogo";
import Container from "../container/Container";
import { Moon, Sun, Menu, LogOut, LayoutDashboard, User } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
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
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useAuth();
  // eslint-disable-next-line
  const location = useLocation();

  // Theme logic for Tailwind dark mode
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

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

  // Define Links Array for cleaner code
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Donation Requests", path: "/public-donation-requests" },
    { name: "Blog", path: "/blog" },
    ...(user ? [{ name: "Funding", path: "/funding" }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-blur:bg-background/60">
      <Container>
        <div className="flex h-16 items-center">
          {/* --- LEFT: LOGO + NAV --- */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center space-x-2">
              <BloodLineLogo />
            </Link>

            {/* --- DESKTOP NAV --- */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    cn(
                      "relative group flex items-center text-sm font-medium uppercase transition-colors hover:text-primary",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      <span
                        className={cn(
                          "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300",
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        )}
                      ></span>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* --- RIGHT: ACTIONS --- */}
          <div className="ml-auto flex items-center gap-2">
            {/* Theme Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === "night" ? (
                <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
              ) : (
                <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Desktop: Auth Logic */}
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full"
                    >
                      <Avatar className="h-10 w-10 border border-border">
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
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.displayName}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogOut}
                      className="text-red-600 cursor-pointer focus:text-red-600"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/login">
                  <Button size="sm">Login</Button>
                </Link>
              )}
            </div>
          </div>
          {/* --- MOBILE: SHEET MENU --- */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle className="text-left flex items-center gap-2">
                    <BloodLineLogo />
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col space-y-4 py-8">
                  {/* Mobile Links */}
                  <div className="flex flex-col space-y-2">
                    {navLinks.map((link) => (
                      <SheetClose asChild key={link.path}>
                        <NavLink
                          to={link.path}
                          className={({ isActive }) =>
                            cn(
                              buttonVariants({
                                variant: isActive ? "secondary" : "ghost",
                                size: "lg",
                              }),
                              "w-full justify-start text-base"
                            )
                          }
                        >
                          {link.name}
                        </NavLink>
                      </SheetClose>
                    ))}
                  </div>

                  <div className="h-px bg-border w-full" />

                  {/* Mobile Auth Section */}
                  {user ? (
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center gap-3 px-2">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user?.photoURL} />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {user.displayName}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {user.email}
                          </span>
                        </div>
                      </div>
                      <SheetClose asChild>
                        <Link to="/dashboard">
                          <Button
                            variant="outline"
                            className="w-full justify-start gap-2"
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
                        <Button className="w-full">Login</Button>
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
