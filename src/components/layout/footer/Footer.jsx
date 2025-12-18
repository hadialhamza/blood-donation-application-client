import React from "react";
import { Link } from "react-router";
import BloodLineLogo from "../../shared/logo/BloodLineLogo";
import { ArrowRight, Heart } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import Container from "../../shared/container/Container";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socials = [
    {
      icon: (
        <FaFacebookF className="relative z-10 text-lg transition-colors duration-300 group-hover:text-white" />
      ),
      href: "https://facebook.com/hadialhamza",
      label: "Facebook",
      color: "bg-[#1877F2]",
    },
    {
      icon: (
        <FaXTwitter className="relative z-10 text-lg transition-colors duration-300 group-hover:text-white" />
      ),
      href: "https://x.com/hadialhamza",
      label: "X (Twitter)",
      color: "bg-[#24292e]",
    },
    {
      icon: (
        <FaLinkedinIn className="relative z-10 text-lg transition-colors duration-300 group-hover:text-white" />
      ),
      href: "https://linkedin.com/in/hadialhamza",
      label: "LinkedIn",
      color: "bg-[#0A66C2]",
    },
    {
      icon: (
        <FaGithub className="relative z-10 text-lg transition-colors duration-300 group-hover:text-white" />
      ),
      href: "https://github.com/hadialhamza",
      label: "GitHub",
      color: "bg-[#24292e]",
    },
  ];

  return (
    <footer className="bg-slate-50 dark:bg-zinc-950 border-t border-slate-200 dark:border-zinc-800 relative overflow-hidden">
      <div className="pt-16 relative z-10">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-3">
              <Link to="/" className="inline-block">
                <BloodLineLogo />
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Connecting donors with those in need. We are a non-profit
                organization dedicated to making blood donation accessible,
                safe, and efficient for everyone.
              </p>

              <div className="flex items-center gap-4 pb-5">
                {socials.map((social, index) => (
                  <div key={index} className="relative group">
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white dark:bg-zinc-900 text-slate-600 dark:text-slate-400 shadow-sm ring-1 ring-slate-200 dark:ring-zinc-800 transition-all hover:ring-0 hover:shadow-md"
                    >
                      <span
                        className={`absolute inset-0 translate-y-full ${social.color} transition-transform duration-300 ease-in-out group-hover:translate-y-0`}
                      />
                      {social.icon}
                    </a>

                    <span
                      className={`pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md ${social.color} px-2 py-1 text-[10px] text-white opacity-0 shadow-lg transition-all duration-300 group-hover:-top-12 group-hover:opacity-100`}
                    >
                      {social.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 md:mx-auto">
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

            <div className="space-y-4 md:mx-auto">
              <h4 className="font-bold text-sm tracking-wider uppercase text-slate-900 dark:text-slate-100">
                Public Resources
              </h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  {
                    name: "WHO Health API",
                    path: "https://www.who.int/data/gho",
                  },
                  { name: "IFRC Blood Data", path: "https://www.ifrc.org/" },
                  { name: "HealthData.gov", path: "https://healthdata.gov/" },
                  { name: "Open Disease Data", path: "https://disease.sh/" },
                ].map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-red-600 transition-all duration-300 hover:translate-x-1 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 group-hover:bg-red-500 transition-colors"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
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

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-muted-foreground py-8">
            <p>© {currentYear} BloodLine Ltd. All rights reserved.</p>
            <div className="">
              <p className="flex items-center gap-1">
                Made with{" "}
                <Heart className="h-5 w-5 text-red-600 fill-red-600 animate-pulse mx-1" />{" "}
                by Hadi Al Hamza
              </p>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
