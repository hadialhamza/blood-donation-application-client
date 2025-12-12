import React from "react";
import { Link } from "react-router";
import {
  Heart,
  Droplets,
  Home,
  Search,
  Users,
  AlertTriangle,
  ArrowLeft,
  Activity,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-white via-red-50 to-rose-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex flex-col">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${(i * 13) % 100}%`,
              top: `${(i * 29) % 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${4 + (i % 4)}s`,
            }}
          >
            <Droplets className="w-6 h-7 text-red-400 dark:text-red-900 rotate-45" />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-4 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Error Number */}
          <div className="relative">
            <div className="text-[180px] md:text-[250px] font-black leading-none">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-red-400 via-rose-400 to-red-400 animate-linear-x">
                4
              </span>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-rose-400 via-red-400 to-rose-400 animate-linear-x delay-1000">
                0
              </span>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-red-400 via-rose-400 to-red-400 animate-linear-x delay-2000">
                4
              </span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <AlertTriangle className="w-32 h-32 text-red-500/30 dark:text-red-900/30 animate-pulse" />
                <Heart className="absolute inset-0 w-32 h-32 text-red-500 dark:text-red-400 animate-heartbeat" />
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Page Not Found
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Looks like this page is experiencing a blood shortage! Don't
              worry—our donors are here to help you get back on track.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="bg-linear-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all group">
                <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Back to Home
                <ArrowLeft className="w-5 h-5 ml-2 group-hover:-translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/search">
              <Button
                variant="outline"
                className="border-2 border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 px-8 py-6 text-lg rounded-full hover:shadow-lg transition-all group"
              >
                <Search className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Find Donors
              </Button>
            </Link>
          </div>

          {/* Emergency Contact */}
          <div className="mt-12 p-6 rounded-2xl bg-linear-to-r from-red-600/10 to-rose-600/10 border border-red-200 dark:border-red-900 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
                  <Activity className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Need Emergency Help?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our emergency team is available 24/7
                  </p>
                </div>
              </div>
              <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6">
                <Heart className="w-4 h-4 mr-2" />
                Emergency Hotline
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              {
                label: "Search Donors",
                icon: <Search className="w-5 h-5" />,
                path: "/search",
              },
              {
                label: "Become Donor",
                icon: <Users className="w-5 h-5" />,
                path: "/register",
              },
              {
                label: "Blood Banks",
                icon: <MapPin className="w-5 h-5" />,
                path: "/hospitals",
              },
              {
                label: "Our Mission",
                icon: <Heart className="w-5 h-5" />,
                path: "/about",
              },
            ].map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="p-4 rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-100 dark:border-gray-800 hover:border-red-300 dark:hover:border-red-700 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors">
                    <div className="text-red-600 dark:text-red-400">
                      {link.icon}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                    {link.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Donation Stats */}
          <div className="mt-12 p-6 rounded-2xl bg-linear-to-r from-gray-900 to-red-950 text-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "5,000+", label: "Active Donors" },
                { value: "1,200+", label: "Lives Saved" },
                { value: "24/7", label: "Emergency Support" },
                { value: "98%", label: "Success Rate" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-red-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 dark:border-gray-800 py-8 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-red-600 dark:text-red-400" />
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                BloodLine
              </span>
              <span className="text-gray-500 dark:text-gray-400">•</span>
              <span className="text-gray-600 dark:text-gray-400">
                Connecting lives through blood donation
              </span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} BloodLine. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-30px) rotate(10deg);
            opacity: 1;
          }
        }
        @keyframes heartbeat {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
        }
        @keyframes linear-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-float {
          animation: float ease-in-out infinite;
        }
        .animate-heartbeat {
          animation: heartbeat 2s ease-in-out infinite;
        }
        .animate-linear-x {
          background-size: 200% auto;
          animation: linear-x 3s ease infinite;
        }
      `}</style>
    </div >
  );
};

export default NotFoundPage;
