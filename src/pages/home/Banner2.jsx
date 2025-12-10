import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Search,
  Droplets,
  Users,
  Clock,
  Shield,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const Banner = () => {
  const bloodGroups = ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"];
  const [bloodCells, setBloodCells] = useState([]);
  useEffect(() => {
    const cells = [...Array(8)].map((_, i) => ({
      id: i,
      style: {
        width: `${Math.random() * 100 + 50}px`,
        height: `${Math.random() * 100 + 50}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${i * 0.5}s`,
      },
    }));
    setTimeout(() => {
      setBloodCells(cells);
    }, 0);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Hero Background with Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-br from-red-50/50 via-white to-blue-50/50 dark:from-red-900/20 dark:via-black dark:to-blue-900/10" />
        <div
          className="absolute inset-0 opacity-30 dark:opacity-30"
          style={{
            backgroundImage: `radial-linear(circle at 20% 50%, rgba(220, 38, 38, 0.1) 0%, transparent 50%),
                              radial-linear(circle at 80% 20%, rgba(220, 38, 38, 0.05) 0%, transparent 50%)`,
          }}
        />
        {/* Animated Blood Cells */}
        <div className="absolute inset-0">
          {bloodCells.map((cell) => (
            <div
              key={cell.id}
              className="absolute rounded-full bg-red-500/10 dark:bg-red-500/10 animate-float"
              style={cell.style}
            />
          ))}
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
            {/* Badge */}
            <Badge
              variant="destructive"
              className="text-sm px-4 py-2 bg-red-100 text-red-700 border-red-200 dark:bg-red-600/20 dark:text-red-100 dark:border-red-500/30 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span>Emergency Need: O- Blood Required</span>
              </div>
            </Badge>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl xl:text-7xl leading-tight">
                Every Drop{" "}
                <span className="bg-linear-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                  Counts
                </span>
              </h1>
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-700 dark:text-gray-200">
                Join the Lifesaving Community
              </h2>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
              Your single donation can save up to three lives. We connect donors
              with recipients in real-time, making blood donation simple, safe,
              and accessible for everyone.
            </p>

            {/* Blood Group Grid */}
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                Most needed blood types this week:
              </p>
              <div className="flex flex-wrap gap-2">
                {bloodGroups.map((type, index) => (
                  <div
                    key={type}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      ["O-", "B-", "A-"].includes(type)
                        ? "bg-red-100 border-red-200 text-red-700 dark:bg-red-600/20 dark:border-red-500 dark:text-red-300"
                        : "bg-white/50 border-gray-200 text-gray-600 dark:bg-white/5 dark:border-white/10 dark:text-gray-300"
                    } ${index < 3 ? "animate-pulse" : ""}`}
                  >
                    {type}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/register" className="sm:flex-1">
                <Button
                  size="lg"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold h-14 text-lg shadow-lg shadow-red-500/20 dark:shadow-red-900/30 transition-all hover:scale-[1.02] group"
                >
                  <Heart className="mr-3 h-5 w-5 fill-current group-hover:scale-110 transition-transform" />
                  Become a Donor
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/search" className="sm:flex-1">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-gray-200 bg-white/50 text-gray-900 hover:bg-white hover:text-black dark:border-white/30 dark:bg-white/5 dark:text-white dark:hover:bg-white dark:hover:text-black backdrop-blur-sm h-14 text-lg transition-all"
                >
                  <Search className="mr-3 h-5 w-5" />
                  Find Blood Now
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  5K+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Active Donors
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  15K+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Lives Saved
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  24/7
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Support
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Feature Card */}
          <div className="animate-in fade-in slide-in-from-right-8 duration-700 delay-300">
            <Card className="bg-white/80 dark:bg-black/30 backdrop-blur-md border-gray-200 dark:border-white/10 shadow-xl">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 dark:bg-red-500/10 rounded-lg">
                    <Droplets className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Donation Process Made Simple
                  </h3>
                </div>

                <Separator className="bg-gray-200 dark:bg-white/10" />

                <div className="space-y-6">
                  {[
                    {
                      icon: <Users className="h-5 w-5" />,
                      title: "Quick Registration",
                      desc: "Sign up in 2 minutes and join our verified donor network",
                    },
                    {
                      icon: <Search className="h-5 w-5" />,
                      title: "Smart Matching",
                      desc: "Find compatible donors based on location and blood type",
                    },
                    {
                      icon: <Clock className="h-5 w-5" />,
                      title: "Real-time Updates",
                      desc: "Get notified when your blood type is urgently needed",
                    },
                    {
                      icon: <Shield className="h-5 w-5" />,
                      title: "Safe & Secure",
                      desc: "All donations follow strict medical safety protocols",
                    },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="p-2 bg-red-50 dark:bg-red-500/10 rounded-md mt-1">
                        <div className="text-red-600 dark:text-red-400">
                          {feature.icon}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <Link to="/learn-more">
                    <Button
                      variant="ghost"
                      className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-500/10"
                    >
                      Learn More About Donation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Scrolling Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="h-10 w-px bg-linear-to-b from-red-500 to-transparent" />
      </div>
    </section>
  );
};

export default Banner;
