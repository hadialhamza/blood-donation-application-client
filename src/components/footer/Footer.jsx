import React from "react";
import { Link } from "react-router";
import BloodLineLogo from "../logo/BloodLineLogo";
import { Facebook, Linkedin, Github, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { PiXLogo } from "react-icons/pi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 dark:bg-zinc-950 border-t border-slate-200 dark:border-zinc-800">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <BloodLineLogo />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Connecting donors with those in need. We are a non-profit
              organization dedicated to making blood donation accessible, safe,
              and efficient for everyone.
            </p>

            <div className="flex flex-col gap-2">
              <h4 className="font-semibold text-sm">
                Subscribe to our newsletter
              </h4>
              <div className="flex gap-2 max-w-sm">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800"
                />
                <Button size="icon" className="shrink-0">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Services */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm tracking-wider uppercase text-slate-900 dark:text-slate-100">
                Services
              </h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link
                    to="/donation-requests"
                    className="hover:text-red-600 transition-colors"
                  >
                    Donation Requests
                  </Link>
                </li>
                <li>
                  <Link
                    to="/search"
                    className="hover:text-red-600 transition-colors"
                  >
                    Find Donors
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="hover:text-red-600 transition-colors"
                  >
                    Blog & News
                  </Link>
                </li>
                <li>
                  <Link
                    to="/campaigns"
                    className="hover:text-red-600 transition-colors"
                  >
                    Blood Campaigns
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm tracking-wider uppercase text-slate-900 dark:text-slate-100">
                Company
              </h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-red-600 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-red-600 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/volunteers"
                    className="hover:text-red-600 transition-colors"
                  >
                    Volunteers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="hover:text-red-600 transition-colors"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm tracking-wider uppercase text-slate-900 dark:text-slate-100">
                Legal
              </h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link
                    to="/terms"
                    className="hover:text-red-600 transition-colors"
                  >
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="hover:text-red-600 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cookie"
                    className="hover:text-red-600 transition-colors"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Separator className="bg-slate-200 dark:bg-zinc-800" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 py-8">
          <div className="flex flex-col md:flex-row items-center gap-2 text-sm text-muted-foreground">
            <p>© {currentYear} BloodLine Ltd. All rights reserved.</p>
            <span className="hidden md:inline text-slate-300 dark:text-zinc-700">
              |
            </span>
            <p className="flex items-center gap-1">
              Made with{" "}
              <Heart className="h-3 w-3 text-red-600 fill-current animate-pulse" />{" "}
              in Bangladesh
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hover:text-black hover:bg-slate-100 dark:hover:bg-zinc-800"
            >
              <PiXLogo className="h-4 w-4" />
              <span className="sr-only">X (Twitter)</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
