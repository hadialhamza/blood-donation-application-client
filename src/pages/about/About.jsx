import React from "react";
import { Heart, Users, Shield, Globe } from "lucide-react";
import Container from "@/components/shared/container/Container";
import SectionHeader from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const About = () => {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <Container>
        {/* Hero Section */}
        <div className="text-center mb-20">
          <SectionHeader
            icon={Heart}
            badge="Our Mission"
            title="Saving Lives,"
            highlight="One Drop at a Time"
            description="We are on a mission to build a world where no one has to wait for blood. We connect generous donors with those in critical need, bridging the gap between life and hope."
          />
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-24">
          {[
            {
              icon: Users,
              value: "5,000+",
              label: "Active Donors",
              color: "text-blue-500",
              bg: "bg-blue-50 dark:bg-blue-900/20",
            },
            {
              icon: Heart,
              value: "12,000+",
              label: "Lives Saved",
              color: "text-red-500",
              bg: "bg-red-50 dark:bg-red-900/20",
            },
            {
              icon: Globe,
              value: "64",
              label: "Districts Covered",
              color: "text-emerald-500",
              bg: "bg-emerald-50 dark:bg-emerald-900/20",
            },
            {
              icon: Shield,
              value: "100%",
              label: "Verified Requests",
              color: "text-violet-500",
              bg: "bg-violet-50 dark:bg-violet-900/20",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-4 md:p-6 rounded-2xl bg-white dark:bg-gray-900 border border-slate-100 dark:border-gray-800 shadow-xl shadow-slate-200/50 dark:shadow-black/20 text-center hover:scale-105 transition-transform duration-300"
            >
              <div
                className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center ${stat.bg}`}
              >
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Our Story & Values */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute inset-0 bg-red-600 blur-3xl opacity-10 rounded-full"></div>
            <img
              src="https://png.pngtree.com/background/20250727/original/pngtree-group-of-volunteers-at-save-lives-donate-blood-campaign-event-picture-image_16310640.jpg"
              alt="Volunteers working"
              className="relative rounded-3xl shadow-2xl border-4 border-white dark:border-gray-800 rotate-2 hover:rotate-0 transition-all duration-500"
            />
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-gray-800 hidden md:block">
              <p className="text-4xl font-bold text-red-600 mb-1">24/7</p>
              <p className="text-sm text-gray-500 font-medium">
                Emergency Support
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              Driven by <span className="text-red-600">Compassion</span>, <br />
              United for Humanity
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              BloodLine started with a simple idea: technology can bridge the
              gap between life and death. What began as a small initiative in a
              university dorm has grown into a nationwide movement.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We believe that every human life is precious. Our platform
              empowers ordinary citizens to become heroes. By verifying requests
              and verifying donors, we ensure that help reaches those who need
              it most, exactly when they need it.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Trust & Safety
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Speed & Efficiency
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Community Focused
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Total Transparency
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="rounded-3xl bg-red-600 text-white p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0 100 C 20 0 50 0 100 100 Z"
                fill="white"
                fillOpacity="0.2"
              />
            </svg>
          </div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Make a Difference?
            </h2>
            <p className="text-red-100 text-lg">
              Join thousands of donors who are saving lives every day. It only
              takes a few minutes to sign up and become a hero.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-white text-red-600 hover:bg-red-50 font-bold border-none"
                >
                  Become a Donor
                </Button>
              </Link>
              <Link to="/search">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 hover:text-white font-semibold"
                >
                  Find Blood
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default About;
