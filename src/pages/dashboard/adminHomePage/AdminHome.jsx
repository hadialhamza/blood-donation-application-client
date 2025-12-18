import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import AdminHeader from "./AdminHeader";
import AdminStats from "./AdminStats";
import {
  DonationPieChart,
  GrowthRadialChart,
  RevenueAreaChart,
  UserBarChart,
} from "./DonationPieChart";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const { data: adminProfile = {} } = useQuery({
    queryKey: ["admin-profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="page-container">
      <div className="relative z-10 space-y-8">
        <AdminHeader user={user} adminProfile={adminProfile} stats={stats} />
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="xl:col-span-2">
            <RevenueAreaChart />
          </div>
          <div>
            <DonationPieChart stats={stats} />
          </div>
          <div>
            <UserBarChart stats={stats} />
          </div>
          <div className="xl:col-span-2">
            <GrowthRadialChart />
          </div>
          <div className="xl:col-span-2">
            <AdminStats />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
