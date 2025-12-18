import React from "react";
import { TrendingUp, Activity, Award, Heart, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ProfileStats = ({ userStats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="border-red-100 dark:border-red-900 shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Donations Made
              </p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                {userStats.donations || 0}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-xs text-green-600">
                  +{userStats.thisMonth || 0} this month
                </span>
              </div>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
              <Heart className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-100 dark:border-red-900 shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Requests Created
              </p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {userStats.requests || 0}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <Activity className="w-4 h-4 text-blue-500" />
                <span className="text-xs text-blue-600">
                  Active: {userStats.activeRequests || 0}
                </span>
              </div>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-100 dark:border-red-900 shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Success Rate
              </p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {userStats.successRate || "0"}%
              </p>
              <div className="flex items-center gap-1 mt-1">
                <Award className="w-4 h-4 text-amber-500" />
                <span className="text-xs text-amber-600">
                  Level {userStats.level || "New"}
                </span>
              </div>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
              <Award className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileStats;
