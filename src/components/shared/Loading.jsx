import React from "react";
import { Heart, Droplets, Users, Activity } from "lucide-react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-linear-to-br from-white via-red-50 to-rose-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 z-50">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + (i % 3)}s`,
            }}
          >
            <div className="relative">
              <Droplets className="w-4 h-5 text-red-300 dark:text-red-900/50 rotate-45" />
              <div className="absolute inset-0 bg-red-400/20 blur-sm rounded-full"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center space-y-8 p-8">
        {/* Logo Animation */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-red-500 to-rose-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="relative w-24 h-24 bg-linear-to-r from-red-600 to-rose-600 rounded-full flex items-center justify-center animate-heartbeat shadow-2xl">
              <Heart className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-10 h-10 bg-linear-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center animate-bounce-soft shadow-lg">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <div
              className="absolute -bottom-2 -left-2 w-8 h-8 bg-linear-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center animate-bounce-soft shadow-lg"
              style={{ animationDelay: "0.3s" }}
            >
              <Users className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="text-left">
            <h1 className="text-5xl md:text-6xl font-black tracking-tight">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-rose-600">
                Blood
              </span>
              <span className="text-gray-800 dark:text-white ml-2">Line</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg font-medium">
              Connecting lives through blood donation
            </p>
          </div>
        </div>

        {/* Loading Indicator */}
        <div className="space-y-6">
          <div className="relative">
            <div className="w-64 h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden mx-auto">
              <div className="h-full bg-linear-to-r from-red-500 via-rose-500 to-red-500 animate-loading-bar rounded-full"></div>
            </div>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <div className="w-16 h-16 border-4 border-red-200 dark:border-red-900 border-t-red-600 dark:border-t-red-500 rounded-full animate-spin"></div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-gray-700 dark:text-gray-300 text-lg font-medium animate-pulse">
              Loading life-saving platform...
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse delay-150"></div>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-300"></div>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                Initializing secure connection
              </span>
            </div>
          </div>
        </div>

        {/* Stats Animation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-12">
          {[
            {
              label: "Donors",
              value: "5,000+",
              icon: <Users className="w-5 h-5" />,
              color: "from-red-500 to-rose-500",
            },
            {
              label: "Lives Saved",
              value: "1,200+",
              icon: <Heart className="w-5 h-5" />,
              color: "from-emerald-500 to-green-500",
            },
            {
              label: "Response Time",
              value: "< 5 min",
              icon: <Activity className="w-5 h-5" />,
              color: "from-blue-500 to-cyan-500",
            },
            {
              label: "Success Rate",
              value: "98%",
              icon: <Heart className="w-5 h-5" />,
              color: "from-amber-500 to-orange-500",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-100 dark:border-gray-800 shadow-sm animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div
                className={`p-2 w-fit rounded-lg bg-linear-to-r ${stat.color} mb-3`}
              >
                <div className="text-white">{stat.icon}</div>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Loading Tips */}
        <div className="max-w-md mx-auto mt-8 p-4 bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
          <p className="text-sm text-blue-700 dark:text-blue-300 text-center">
            <span className="font-semibold">Did you know?</span> A single blood
            donation can save up to three lives. Your contribution matters!
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          © {new Date().getFullYear()} BloodLine. All rights reserved.
        </p>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }
        @keyframes heartbeat {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        @keyframes loading-bar {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce-soft {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.1);
          }
        }
        .animate-float {
          animation: float ease-in-out infinite;
        }
        .animate-heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite;
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
          opacity: 0;
        }
        .animate-bounce-soft {
          animation: bounce-soft 2s ease-in-out infinite;
        }
      `}</style>
    </div >
  );
};

export default Loading;
