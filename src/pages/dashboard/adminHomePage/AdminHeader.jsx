import React from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  ShieldCheck,
  Activity,
  Crown,
  TrendingUp,
  Bell,
  Settings,
  Clock,
  Zap,
  Award,
  MapPin,
} from "lucide-react";

const AdminHeader = ({ user, adminProfile }) => {
  return (
    <div className="relative rounded-3xl bg-gradient-primary backdrop-blur-xl shadow-xl">
      <div className="absolute inset-0 rounded-3xl p-px bg-linear-to-r from-red-500/20 via-rose-500/20 to-red-500/20"></div>
      <div className="relative z-10 p-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-start gap-6">
              <div className="relative">
                <Avatar className="h-20 w-20 border-4 border-white dark:border-zinc-900 shadow-2xl">
                  <AvatarImage
                    src={adminProfile.avatar || user?.photoURL}
                    alt={adminProfile.name || user?.displayName}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-3xl font-bold bg-linear-to-r from-red-600 to-rose-600 text-white">
                    {adminProfile.name?.charAt(0) || "A"}
                  </AvatarFallback>
                </Avatar>

                <div className="absolute -top-1 -right-1 w-6 h-6 bg-linear-to-r from-green-500 to-emerald-500 rounded-full border-2 border-white dark:border-zinc-900 shadow-lg flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                </div>

                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-linear-to-r from-purple-600 to-violet-600 text-white border-0 shadow-lg px-3 py-1">
                    <Crown className="w-3 h-3 mr-1" />
                    Admin
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">
                    Welcome,{" "}
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-rose-600">
                      {adminProfile.name?.split(" ")[0] || "Admin"}
                    </span>
                    !
                  </h1>
                  <p className="text-zinc-600 dark:text-zinc-400 mt-1">
                    Manage the blood donation platform and monitor life-saving
                    activities
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
                    {adminProfile.role || "Platform Administrator"}
                  </Badge>

                  {adminProfile.bloodGroup && (
                    <Badge className="bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300 border-rose-200 dark:border-rose-800">
                      <Activity className="w-3.5 h-3.5 mr-1.5" />
                      Blood Group: {adminProfile.bloodGroup}
                    </Badge>
                  )}

                  <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                    <MapPin className="w-4 h-4" />
                    {adminProfile.district || "Global Access"}
                  </div>
                </div>


                <div className="grid grid-cols-3 gap-4 pt-2 max-w-md">
                  <div className="text-center p-3 bg-white/50 dark:bg-zinc-800/30 rounded-xl border border-red-100 dark:border-red-900">
                    <div className="text-lg font-bold text-red-600 dark:text-red-400">
                      24/7
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      Availability
                    </div>
                  </div>
                  <div className="text-center p-3 bg-white/50 dark:bg-zinc-800/30 rounded-xl border border-red-100 dark:border-red-900">
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">
                      98%
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      Success Rate
                    </div>
                  </div>
                  <div className="text-center p-3 bg-white/50 dark:bg-zinc-800/30 rounded-xl border border-red-100 dark:border-red-900">
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      5K+
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      Users
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end gap-4">
            <div
              className="p-4 rounded-2xl bg-linear-to-r from-red-600/10 to-rose-600/10 
                          border border-red-200 dark:border-red-800 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-linear-to-r from-red-600 to-rose-600 rounded-xl text-white">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Current Date & Time
                  </span>
                  <div className="space-y-0.5">
                    <span className="text-sm font-bold text-zinc-900 dark:text-white block">
                      {new Date().toLocaleDateString(undefined, {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="outline"
                className="rounded-xl h-12 w-12 border-red-200 dark:border-red-800 
                         bg-white/80 dark:bg-zinc-900/80 hover:bg-red-50 dark:hover:bg-red-900/20 
                         shadow-sm hover:shadow-md transition-all hover:scale-105"
                title="Notifications"
              >
                <Bell className="h-5 w-5 text-red-600 dark:text-red-400" />
              </Button>

              <Button
                size="icon"
                variant="outline"
                className="rounded-xl h-12 w-12 border-red-200 dark:border-red-800 
                         bg-white/80 dark:bg-zinc-900/80 hover:bg-red-50 dark:hover:bg-red-900/20 
                         shadow-sm hover:shadow-md transition-all hover:scale-105"
                title="Settings"
              >
                <Settings className="h-5 w-5 text-red-600 dark:text-red-400" />
              </Button>

              <Button
                size="icon"
                variant="outline"
                className="rounded-xl h-12 w-12 border-red-200 dark:border-red-800 
                         bg-white/80 dark:bg-zinc-900/80 hover:bg-red-50 dark:hover:bg-red-900/20 
                         shadow-sm hover:shadow-md transition-all hover:scale-105"
                title="Quick Actions"
              >
                <Zap className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </Button>
            </div>
          </div>
        </div>


        <div className="mt-6 pt-4 border-t border-red-100 dark:border-red-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                  System Online
                </span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                  +12% Growth Today
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                Admin Level: Expert
              </span>
            </div>
          </div>
        </div>
      </div>


      <style>{`
        @keyframes linear-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-linear-x {
          background-size: 200% 200%;
          animation: linear-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default AdminHeader;
