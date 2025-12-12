import React from "react";
import {
  DollarSign,
  Users,
  Heart,
  TrendingUp,
  Activity,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Zap,
  Award,
  Clock,
  CheckCircle,
} from "lucide-react";
import CountUp from "react-countup";

const AdminStats = ({ stats }) => {
  const cards = [
    {
      title: "Total Revenue",
      value: stats.revenue || 0,
      prefix: "$",
      icon: <DollarSign className="w-6 h-6" />,
      bg: "bg-linear-to-br from-emerald-500 via-green-500 to-emerald-600",
      shadow: "shadow-emerald-500/30",
      trend: "up",
      trendValue: 12.5,
      subtext: "From donations & partnerships",
      metric: "Monthly Growth",
      accent:
        "from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30",
      metricIcon: <TrendingUp className="w-4 h-4" />,
    },
    {
      title: "Active Community",
      value: stats.users || 0,
      prefix: "",
      icon: <Users className="w-6 h-6" />,
      bg: "bg-linear-to-br from-blue-500 via-indigo-500 to-blue-600",
      shadow: "shadow-blue-500/30",
      trend: "up",
      trendValue: 8.2,
      subtext: "Donors, volunteers & staff",
      metric: "Engagement Rate",
      accent:
        "from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30",
      metricIcon: <Activity className="w-4 h-4" />,
    },
    {
      title: "Blood Requests",
      value: stats.bloodRequests || 0,
      prefix: "",
      icon: <Heart className="w-6 h-6" />,
      bg: "bg-linear-to-br from-rose-500 via-red-500 to-rose-600",
      shadow: "shadow-rose-500/30",
      trend: "up",
      trendValue: 15.3,
      subtext: "Life-saving connections made",
      metric: "Success Rate",
      accent:
        "from-rose-100 to-red-100 dark:from-rose-900/30 dark:to-red-900/30",
      metricIcon: <Target className="w-4 h-4" />,
    },
    {
      title: "Platform Impact",
      value: stats.bloodRequests ? Math.floor(stats.bloodRequests * 3.5) : 0,
      prefix: "≈",
      icon: <Award className="w-6 h-6" />,
      bg: "bg-linear-to-br from-amber-500 via-orange-500 to-amber-600",
      shadow: "shadow-amber-500/30",
      trend: "up",
      trendValue: 18.7,
      subtext: "Estimated lives impacted",
      metric: "Efficiency",
      accent:
        "from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30",
      metricIcon: <Zap className="w-4 h-4" />,
    },
  ];

  const getDonorDistribution = (total) => {
    return {
      donors: Math.floor(total * 0.75),
      volunteers: Math.floor(total * 0.15),
      admins: Math.floor(total * 0.05),
      pending: Math.floor(total * 0.05),
    };
  };

  const distribution = getDonorDistribution(stats.users || 0);

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`group relative overflow-hidden rounded-2xl border border-white/20 dark:border-white/10 
              ${card.bg} text-white shadow-xl ${card.shadow} 
              transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl`}
          >

            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 bg-white rounded-full"></div>
            </div>


            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500"></div>


            <div className="relative z-10 p-6">
              <div className="flex items-start justify-between mb-6">
                <div
                  className={`p-3 rounded-xl bg-linear-to-br ${card.accent} backdrop-blur-sm`}
                >
                  <div className="text-white">{card.icon}</div>
                </div>


                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/20 backdrop-blur-sm">
                  {card.trend === "up" ? (
                    <ArrowUpRight className="w-3 h-3 text-green-300" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 text-red-300" />
                  )}
                  <span className="text-xs font-bold">{card.trendValue}%</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-white/80">
                  {card.title}
                </p>
                <h3 className="text-3xl lg:text-4xl font-black tracking-tight">
                  {card.prefix}
                  <CountUp
                    end={card.value}
                    separator=","
                    duration={2.5}
                    delay={index * 0.2}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </h3>
              </div>

              <div className="mt-4 pt-4 border-t border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {card.metricIcon}
                    <span className="text-xs font-medium text-white/70">
                      {card.metric}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-yellow-300" />
                    <span className="text-xs font-bold">
                      {card.trendValue}%
                    </span>
                  </div>
                </div>
                <p className="text-xs text-white/60 mt-2">{card.subtext}</p>
              </div>
            </div>
          </div>
        ))}
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="card-container">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              User Distribution
            </h3>
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <Users className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
          </div>

          <div className="space-y-4">
            {Object.entries(distribution).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${key === "donors"
                      ? "bg-red-500"
                      : key === "volunteers"
                        ? "bg-blue-500"
                        : key === "admins"
                          ? "bg-purple-500"
                          : "bg-amber-500"
                      }`}
                  ></div>
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 capitalize">
                    {key}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-zinc-900 dark:text-white">
                    {value}
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    ({Math.round((value / (stats.users || 1)) * 100)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>


        <div className="card-container">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              Performance Metrics
            </h3>
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-linear-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Target className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-white">
                    Success Rate
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Donation requests
                  </p>
                </div>
              </div>
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                94%
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-white">
                    Avg Response Time
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    To requests
                  </p>
                </div>
              </div>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                18m
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-linear-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-white">
                    Platform Uptime
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Last 30 days
                  </p>
                </div>
              </div>
              <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                99.9%
              </span>
            </div>
          </div>
        </div>


        <div className="bg-linear-to-br from-zinc-900 to-red-950 border-none rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">
              Platform Highlights
            </h3>
            <Sparkles className="w-5 h-5 text-yellow-300" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <TrendingUp className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Monthly Growth</p>
                <p className="text-xs text-zinc-300">
                  Consistent increase in donations
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Activity className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  Active Sessions
                </p>
                <p className="text-xs text-zinc-300">1.2K users online now</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Award className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Achievement</p>
                <p className="text-xs text-zinc-300">
                  Top 10% blood donation platform
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
