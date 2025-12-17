import React from "react";
import { Link, useLocation } from "react-router";
import { Menu, LogOut, LayoutDashboard, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetDescription,
} from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import BloodLineLogo from "../../shared/logo/BloodLineLogo";
import { cn } from "@/lib/utils";

const MobileMenu = ({ navLinks, user, handleLogOut, isHome, isScrolled }) => {
  const location = useLocation();

  return (
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
            <SheetDescription className="sr-only">
              Mobile Navigation Menu
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-col space-y-6 py-6 pl-2 pr-6">
            {/* Links */}
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
                          ? "bg-primary/10 border-l-4 border-red-600 shadow-sm"
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

            {/* Auth Section */}
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
                  {/* Reuse Brand Gradient Class */}
                  <Button className="w-full bg-brand-gradient">
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
  );
};

export default MobileMenu;
