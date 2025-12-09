import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  FaDollarSign,
  FaHeartbeat,
  FaUsersCog,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  // Custom data shape for the chart
  const chartData = [
    { name: "Donors", value: stats.users || 0 },
    { name: "Requests", value: stats.bloodRequests || 0 },
    { name: "Donations", value: stats.totalDonations || 0 },
  ];

  return (
    <div className="p-8 space-y-8">
      <h2 className="text-3xl font-bold">Welcome, Admin!</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/20">
          <CardContent className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <div className="text-2xl font-bold text-red-600">${stats.revenue}</div>
              <p className="text-xs text-muted-foreground mt-1 font-medium uppercase tracking-wider">Total Funding</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <FaDollarSign className="text-xl text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/20">
          <CardContent className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <div className="text-2xl font-bold text-blue-600">{stats.users}</div>
              <p className="text-xs text-muted-foreground mt-1 font-medium uppercase tracking-wider">Total Users</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <FaUsersCog className="text-xl text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-900/20">
          <CardContent className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <div className="text-2xl font-bold text-green-600">{stats.bloodRequests}</div>
              <p className="text-xs text-muted-foreground mt-1 font-medium uppercase tracking-wider">Blood Requests</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <FaHeartbeat className="text-xl text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <Card>
        <CardHeader>
          <CardTitle>Analytics Overview</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center p-8">
          <BarChart width={500} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#EF4444" barSize={30} />
          </BarChart>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminHome;
