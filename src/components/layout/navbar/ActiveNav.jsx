import React from "react";
import { NavLink } from "react-router";
import { cn } from "@/lib/utils";

const ActiveNav = ({ navLinks, isHome, isScrolled }) => {
  return (
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
                  "absolute -bottom-1 left-0 h-0.5 bg-red-600 transition-all duration-300",
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                )}
              ></span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default ActiveNav;
