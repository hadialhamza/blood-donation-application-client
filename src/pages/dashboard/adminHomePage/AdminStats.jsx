import React from "react";
import {
  TrendingUp,
  Activity,
  Target,
  Sparkles,
  Zap,
  Award,
  Clock,
  CheckCircle,
} from "lucide-react";

const AdminStats = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        <div className="card-container overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full -mr-16 -mt-16 blur-2xl transition-transform group-hover:scale-125"></div>

          <div className="flex items-center justify-between mb-6 relative z-10">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              Platform Highlights
            </h3>
            <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
          </div>

          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5 hover:bg-white dark:hover:bg-white/10 transition-colors duration-300">
              <div className="p-2 bg-green-500/10 dark:bg-green-500/20 rounded-lg">
                <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">Monthly Growth</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Consistent increase in donations
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5 hover:bg-white dark:hover:bg-white/10 transition-colors duration-300">
              <div className="p-2 bg-blue-500/10 dark:bg-blue-500/20 rounded-lg">
                <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                  Active Sessions
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">1.2K users online now</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5 hover:bg-white dark:hover:bg-white/10 transition-colors duration-300">
              <div className="p-2 bg-purple-500/10 dark:bg-purple-500/20 rounded-lg">
                <Award className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">Achievement</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
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
