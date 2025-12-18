import React from "react";
import { Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const ProfileImpact = ({ userStats }) => {
  return (
    <Card className="border-red-100 dark:border-red-900 shadow-md p-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-red-600" />
          Your Impact
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Donation Completion</span>
              <span className="text-sm text-green-600">
                {userStats.successRate || 0}%
              </span>
            </div>
            <Progress value={userStats.successRate || 0} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Response Time</span>
              <span className="text-sm text-blue-600">
                {userStats.avgResponseTime || 0}h avg
              </span>
            </div>
            <Progress
              value={Math.min(100, (userStats.avgResponseTime || 0) * 10)}
              className="h-2"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Community Help</span>
              <span className="text-sm text-purple-600">
                {userStats.helped || 0} lives
              </span>
            </div>
            <Progress
              value={Math.min(100, (userStats.helped || 0) * 10)}
              className="h-2"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileImpact;
