import React from "react";
import { Link } from "react-router";
import BloodLineLogo from "../../shared/logo/BloodLineLogo";
import { ArrowRight, Heart } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // Ensure you have react-icons installed
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import Container from "../../shared/container/Container";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socials = [
    {
      icon: <FaFacebookF className="relative z-10 text-lg transition-colors duration-300 group-hover:text-white" />,
      href: "https://facebook.com/hadialhamza",
      label: "Facebook",
      color: "bg-[#1877F2]", // Facebook Blue
    },
    {
      icon: <FaXTwitter className="relative z-10 text-lg transition-colors duration-300 group-hover:text-white" />,
      href: "https://x.com/hadialhamza",
      label: "X (Twitter)",
      color: "bg-black", // X Black
    },
    {
      icon: <FaLinkedinIn className="relative z-10 text-lg transition-colors duration-300 group-hover:text-white" />,
      href: "https://linkedin.com/in/hadialhamza",
      label: "LinkedIn",
      color: "bg-[#0A66C2]", // LinkedIn Blue
    },
    {
      icon: <FaGithub className="relative z-10 text-lg transition-colors duration-300 group-hover:text-white" />,
      href: "https://github.com/hadialhamza",
      label: "GitHub",
      color: "bg-[#24292e]", // GitHub Dark
    },
  ];

  return (
    <footer className="bg-slate-50 dark:bg-zinc-950 border-t border-slate-200 dark:border-zinc-800 relative overflow-hidden">
      <div className="md:px-10 pt-16 pb-6 relative z-10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-6">

            {/* 1. Brand & Socials */}
            <div className="lg:col-span-4 space-y-6">
              <Link to="/" className="inline-block">
                <BloodLineLogo />
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                Connecting donors with those in need. We are a non-profit
                organization dedicated to making blood donation accessible,
                safe, and efficient for everyone.
              </p>

              {/* ✨ NEW SOCIAL BUTTONS WITH HOVER EFFECT */}
              <div className="flex items-center gap-4 pt-2">
                {socials.map((social, index) => (
                  <div key={index} className="relative group">
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white dark:bg-zinc-900 text-slate-600 dark:text-slate-400 shadow-sm ring-1 ring-slate-200 dark:ring-zinc-800 transition-all hover:ring-0 hover:shadow-md"
                    >
                      {/* Fill Background Effect */}
                      <span className={`absolute inset-0 translate-y-full ${social.color} transition-transform duration-300 ease-in-out group-hover:translate-y-0`} />

                      {/* Icon */}
                      {social.icon}
                    </a>

                    {/* Tooltip (Optional - Remove if you want it cleaner) */}
                    <span className={`pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md ${social.color} px-2 py-1 text-[10px] text-white opacity-0 shadow-lg transition-all duration-300 group-hover:-top-12 group-hover:opacity-100`}>
                      {social.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block lg:col-span-1"></div>

            {/* 2. Platform Links */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="font-bold text-sm tracking-wider uppercase text-slate-900 dark:text-slate-100">
                Platform
              </h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  { name: "Find Donors", path: "/search" },
                  { name: "Blood Requests", path: "/donation-requests" },
                  { name: "Health Blog", path: "/blog" },
                  { name: "Donate Fund", path: "/funding" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="hover:text-red-600 transition-all duration-300 hover:translate-x-1 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 group-hover:bg-red-500 transition-colors"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Support Links */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="font-bold text-sm tracking-wider uppercase text-slate-900 dark:text-slate-100">
                Support
              </h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  { name: "About Us", path: "/about" },
                  { name: "Contact Center", path: "/contact" },
                  { name: "Privacy Policy", path: "/privacy" },
                  { name: "Terms of Service", path: "/terms" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="hover:text-red-600 transition-all duration-300 hover:translate-x-1 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 group-hover:bg-red-500 transition-colors"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Newsletter */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="font-bold text-sm tracking-wider uppercase text-slate-900 dark:text-slate-100">
                Stay Updated
              </h4>
              <p className="text-sm text-muted-foreground">
                Join our newsletter to get alerts on urgent blood needs and
                health tips.
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Email address"
                  className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 rounded-lg focus-visible:ring-red-500"
                />
                <Button
                  size="icon"
                  className="shrink-0 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-lg shadow-red-500/20"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Separator className="bg-slate-200 dark:bg-zinc-800" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 text-xs text-muted-foreground">
            <p>© {currentYear} BloodLine Ltd. All rights reserved.</p>

            <div className="flex items-center gap-6">
              <Link to="/terms" className="hover:text-zinc-900 dark:hover:text-white transition-colors hover:underline">
                Terms
              </Link>
              <Link to="/privacy" className="hover:text-zinc-900 dark:hover:text-white transition-colors hover:underline">
                Privacy
              </Link>
              <p className="flex items-center gap-1">
                Made with{" "}
                <Heart className="h-3 w-3 text-red-600 fill-red-600 animate-pulse" />{" "}
                in Bangladesh
              </p>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;