import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, AlertCircle, Droplets } from "lucide-react";
import CountUp from "react-countup";

const RequestStats = ({ requests }) => {
  const stats = [
    {
      title: "Total Requests",
      value: requests.length,
      icon: Activity,
      color: "text-red-600 dark:text-red-400",
      bg: "bg-red-100 dark:bg-red-900/30",
    },
    {
      title: "Pending",
      value: requests.filter((r) => r.status === "pending").length,
      icon: AlertCircle,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-100 dark:bg-amber-900/30",
    },
    {
      title: "In Progress",
      value: requests.filter((r) => r.status === "inprogress").length,
      icon: Activity,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      title: "Completed",
      value: requests.filter((r) => r.status === "done").length,
      icon: Droplets,
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-100 dark:bg-green-900/30",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="card-container group hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                  {stat.title}
                </p>
                <h3 className={`text-2xl font-black ${stat.color}`}>
                  <CountUp end={stat.value} duration={2} />
                </h3>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RequestStats;
