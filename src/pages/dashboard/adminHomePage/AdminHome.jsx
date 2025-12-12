import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
// import AdminHeader from "./components/AdminHeader";
// import AdminStats from "./components/AdminStats";
// import {
//   DonationPieChart,
//   RevenueAreaChart,
//   UserBarChart,
//   GrowthLineChart,
// } from "./components/AdminCharts";
import AdminHeader from "./AdminHeader";
import AdminStats from "./AdminStats";
import { DonationPieChart, GrowthRadialChart, RevenueAreaChart, UserBarChart } from "./DonationPieChart";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch Admin Stats
  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  // Fetch Current User/Admin Profile
  const { data: adminProfile = {} } = useQuery({
    queryKey: ["admin-profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-4 md:p-8 relative overflow-hidden font-sans">
      {/* Background Ambient Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-3xl -translate-x-1/4 -translate-y-1/4 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-3xl translate-x-1/4 translate-y-1/4 pointer-events-none"></div>

      <div className="relative z-10 space-y-8 max-w-7xl mx-auto">
        {/* 1. Header Section */}
        <AdminHeader user={user} adminProfile={adminProfile} />

        {/* 2. Key Metrics Section */}
        <AdminStats stats={stats} />

        {/* 3. Analytics Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Revenue & Requests (Spans 2 cols) */}
          <div className="xl:col-span-2 h-full">
            <RevenueAreaChart />
          </div>

          {/* Donation Status Pie (Spans 1 col) */}
          <div className="xl:col-span-1 h-full">
            <DonationPieChart stats={stats} />
          </div>

          {/* User Activity Bar (Spans 1 col) */}
          <div className="xl:col-span-1 h-full">
            <UserBarChart stats={stats} />
          </div>

          {/* Growth Trend Line (Spans 2 cols) */}
          <div className="xl:col-span-2 h-full">
            <GrowthRadialChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
