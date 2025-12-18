import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, UserCheck, Shield, Heart, HandHeart, UserX } from "lucide-react";

const UserStats = ({ stats }) => {
  const { total, active, admins, donors, volunteers, blocked } = stats;

  const statItems = [
    {
      label: "Total Users",
      value: total,
      icon: <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      bg: "bg-blue-100 dark:bg-blue-900/30",
      progress: 100,
      color: "text-zinc-900 dark:text-white",
    },
    {
      label: "Active Users",
      value: active,
      icon: <UserCheck className="w-8 h-8 text-green-600 dark:text-green-400" />,
      bg: "bg-green-100 dark:bg-green-900/30",
      progress: total ? (active / total) * 100 : 0,
      color: "text-green-600 dark:text-green-400",
    },
    {
      label: "Admins",
      value: admins,
      icon: <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
      bg: "bg-purple-100 dark:bg-purple-900/30",
      progress: total ? (admins / total) * 100 : 0,
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      label: "Donors",
      value: donors,
      icon: <Heart className="w-8 h-8 text-red-600 dark:text-red-400" />,
      bg: "bg-red-100 dark:bg-red-900/30",
      progress: total ? (donors / total) * 100 : 0,
      color: "text-red-600 dark:text-red-400",
    },
    {
      label: "Volunteers",
      value: volunteers,
      icon: <HandHeart className="w-8 h-8 text-amber-600 dark:text-amber-400" />,
      bg: "bg-amber-100 dark:bg-amber-900/30",
      progress: total ? (volunteers / total) * 100 : 0,
      color: "text-amber-600 dark:text-amber-400",
    },
    {
      label: "Blocked",
      value: blocked,
      icon: <UserX className="w-8 h-8 text-gray-600 dark:text-gray-400" />,
      bg: "bg-gray-100 dark:bg-gray-800",
      progress: total ? (blocked / total) * 100 : 0,
      color: "text-gray-600 dark:text-gray-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {statItems.map((item, index) => (
        <Card key={index} className="card-container overflow-hidden group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  {item.label}
                </p>
                <p className={`text-3xl font-black ${item.color}`}>
                  {item.value}
                </p>
              </div>
              <div className={`p-3 rounded-xl ${item.bg} group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>
            </div>
            <Progress value={item.progress} className="mt-4 h-2 opacity-60" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserStats;
