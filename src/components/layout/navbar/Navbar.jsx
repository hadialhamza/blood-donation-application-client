import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import BloodLineLogo from "../../shared/logo/BloodLineLogo";
import Container from "../../shared/container/Container";
import { Sun, Moon, LogIn, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import ActiveNav from "./ActiveNav";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const location = useLocation();

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    if (window.matchMedia("(prefers-color-scheme: dark)").matches)
      return "dark";
    return "light";
  });

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const hideTimeoutRef = useRef(null);
  const isHome = location.pathname === "/";

  // Handle Scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        if (!hideTimeoutRef.current && isVisible) {
          hideTimeoutRef.current = setTimeout(() => {
            setIsVisible(false);
            hideTimeoutRef.current = null;
          }, 1500);
        }
      } else {
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
          hideTimeoutRef.current = null;
        }
        setIsVisible(true);
      }
      setIsScrolled(currentScrollY > 0);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [isVisible]);

  // Handle Theme
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  // System Theme Listener
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Log Out Successful");
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
        "fixed top-0 z-50 w-full border-b transition-all duration-400",
        isVisible ? "translate-y-0" : "-translate-y-full",
        isHome ? "border-transparent" : "bg-background border-border",
        isHome && !isScrolled
          ? "bg-transparent py-3"
          : "bg-background shadow-sm border-border py-1"
      )}
    >
      <Container>
        <div className="flex h-14 items-center">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center space-x-2">
              <div
                className={cn(
                  isHome &&
                    !isScrolled &&
                    "[&_span.logo-title]:text-gray-200 [&_.logo-subtitle]:text-gray-300"
                )}
              >
                <BloodLineLogo />
              </div>
            </Link>
          </div>

          <div className="ml-auto flex items-center gap-5">
            <ActiveNav
              navLinks={navLinks}
              isHome={isHome}
              isScrolled={isScrolled}
            />

            <div className="flex items-center gap-5">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className={cn(
                  "rounded-full transition-colors border border-white/20",
                  isHome && !isScrolled
                    ? "text-white hover:bg-white/20 hover:text-white"
                    : "text-foreground border border-black/20 hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
              </Button>

              <div className="hidden md:flex items-center gap-2">
                {loading ? (
                  <Skeleton className="h-10 w-10 rounded-full" />
                ) : user ? (
                  <UserMenu
                    user={user}
                    handleLogOut={handleLogOut}
                    isHome={isHome}
                    isScrolled={isScrolled}
                  />
                ) : (
                  <Link to="/login">
                    <Button
                      size="md"
                      className="px-4 py-2.5 bg-brand-gradient rounded-full group hover:scale-105"
                    >
                      <LogIn className="mr-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      Login
                      <ChevronRight className="ml- h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <MobileMenu
            navLinks={navLinks}
            user={user}
            handleLogOut={handleLogOut}
            isHome={isHome}
            isScrolled={isScrolled}
          />
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
