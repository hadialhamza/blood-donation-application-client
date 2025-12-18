import React from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ShieldCheck,
  Activity,
  Crown,
  MapPin,
  DollarSign,
  Users,
  Heart,
  Award,
} from "lucide-react";
import CountUp from "react-countup";

const AdminHeader = ({ user, adminProfile, stats }) => {
  const statCards = [
    {
      title: "Revenue",
      value: stats.revenue || 0,
      prefix: "$",
      icon: <DollarSign className="w-5 h-5" />,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
      border: "border-emerald-100 dark:border-emerald-800",
    },
    {
      title: "Active Users",
      value: stats.users || 0,
      prefix: "",
      icon: <Users className="w-5 h-5" />,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-100 dark:border-blue-800",
    },
    {
      title: "Requests",
      value: stats.bloodRequests || 0,
      prefix: "",
      icon: <Heart className="w-5 h-5" />,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-900/20",
      border: "border-rose-100 dark:border-rose-800",
    },
    {
      title: "Impact",
      value: stats.bloodRequests ? Math.floor(stats.bloodRequests * 3.5) : 0,
      prefix: "≈",
      icon: <Award className="w-5 h-5" />,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-900/20",
      border: "border-amber-100 dark:border-amber-800",
    },
  ];

  return (
    <div className="relative rounded-2xl bg-linear-to-r from-red-50 to-rose-50 dark:from-zinc-900 dark:to-zinc-950 border border-red-100 dark:border-zinc-800 shadow-sm overflow-hidden group">
      <div className="relative p-6">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col lg:flex-row items-center justify-center xl:justify-start gap-6">
            <div className="flex flex-col 2xl:flex-row items-center xl:items-start gap-4">
              <div className="relative">
                {/* User avatar */}
                <div className="">
                  <Avatar className="h-22 w-22 border-4 border-white dark:border-zinc-800 shadow-2xl ring-4 ring-red-500/10">
                    <AvatarImage
                      src={adminProfile.avatar || user?.photoURL}
                      alt={adminProfile.name || user?.displayName}
                      className="object-cover"
                    />
                    <AvatarFallback className="text-4xl font-black bg-brand-gradient text-white">
                      {adminProfile.name?.charAt(0) || "A"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="absolute -top-1 -right-1 w-8 h-8 bg-linear-to-r from-green-500 to-emerald-500 rounded-full border-4 border-white dark:border-zinc-800 shadow-lg flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                  </div>

                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-linear-to-r from-purple-600 to-violet-600 text-white border-0 shadow-sm px-3 py-1">
                      <Crown className="w-3 h-3 mr-1" />
                      Admin
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex-1 text-center md:text-left space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-black text-zinc-900 dark:text-white leading-tight">
                    Welcome back,{" "}
                    <span className="text-gradient">
                      {adminProfile.name?.split(" ")[0] || "Admin"}
                    </span>
                    !
                  </h1>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm max-w-lg">
                    Manage the blood donation platform and monitor life-saving
                    activities.
                  </p>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                    <Badge className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border border-red-100 dark:border-red-900/50 px-3 py-1.5 rounded-lg flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="font-semibold text-xs">
                        {(adminProfile.role === "admin" && "Admin") ||
                          "Platform Administrator"}
                      </span>
                    </Badge>

                    {adminProfile.bloodGroup && (
                      <Badge className="bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 rounded-lg flex items-center gap-2">
                        <Activity className="w-4 h-4 text-red-500" />
                        <span className="font-semibold text-xs">
                          {adminProfile.bloodGroup}
                        </span>
                      </Badge>
                    )}

                    <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 bg-white/50 dark:bg-zinc-800/50 px-3 py-1.5 rounded-lg border border-zinc-100 dark:border-zinc-700">
                      <MapPin className="w-4 h-4 text-red-500/70" />
                      {adminProfile.district || "Global Access"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 pt-2 max-w-md mx-auto md:mx-0">
              <div className="w-30 text-center p-3 bg-white/50 dark:bg-zinc-800/30 rounded-xl border border-red-100 dark:border-red-900 shadow-sm">
                <div className="text-lg font-black text-red-600 dark:text-red-400">
                  24/7
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                  Availability
                </div>
              </div>
              <div className="w-30 text-center p-3 bg-white/50 dark:bg-zinc-800/30 rounded-xl border border-red-100 dark:border-red-900 shadow-sm">
                <div className="text-lg font-black text-green-600 dark:text-green-400">
                  98%
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                  Success Rate
                </div>
              </div>
              <div className="w-30 text-center p-3 bg-white/50 dark:bg-zinc-800/30 rounded-xl border border-red-100 dark:border-red-900 shadow-sm">
                <div className="text-lg font-black text-blue-600 dark:text-blue-400">
                  5K+
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                  Users
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((card, index) => (
              <div
                key={index}
                className={`flex flex-col p-6 rounded-2xl border-2 ${card.border} ${card.bg} shadow-md transition-transform duration-500 hover:-translate-y-1 group/card overflow-hidden relative`}
              >
                <div className="flex items-start justify-between mb-4 relative">
                  <div
                    className={`p-2.5 rounded-xl bg-white dark:bg-zinc-900/80 shadow-md group-hover/card:scale-110 transition-transform duration-500 ${card.color}`}
                  >
                    {card.icon}
                  </div>
                  <Badge
                    variant="outline"
                    className={`${card.color} border-current border-opacity-20 text-[10px] uppercase font-black`}
                  >
                    Active
                  </Badge>
                </div>

                <div className="relative z-10">
                  <p className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    {card.title}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black text-zinc-400">
                      {card.prefix}
                    </span>
                    <h3 className="text-3xl font-black text-zinc-900 dark:text-white">
                      <CountUp end={card.value} separator="," duration={2.5} />
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
