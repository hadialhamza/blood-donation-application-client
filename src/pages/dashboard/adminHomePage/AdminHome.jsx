import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  FaUsers,
  FaTint,
  FaDollarSign,
  FaHeartbeat,
  FaUsersCog,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

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
    <div className="p-8">
      <h2 className="text-3xl mb-8 font-bold">Welcome, Admin!</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="stat bg-red-100 rounded-lg shadow-md p-6">
          <div className="stat-figure text-red-600">
            <FaDollarSign className="text-4xl" />
          </div>
          <div className="stat-title text-gray-600">Total Funding</div>
          <div className="stat-value text-red-600">${stats.revenue}</div>
        </div>

        <div className="stat bg-blue-100 rounded-lg shadow-md p-6">
          <div className="stat-figure text-blue-600">
            <FaUsersCog className="text-4xl" />
          </div>
          <div className="stat-title text-gray-600">Total Users</div>
          <div className="stat-value text-blue-600">{stats.users}</div>
        </div>

        <div className="stat bg-green-100 rounded-lg shadow-md p-6">
          <div className="stat-figure text-green-600">
            <FaHeartbeat className="text-4xl" />
          </div>
          <div className="stat-title text-gray-600">Blood Requests</div>
          <div className="stat-value text-green-600">{stats.bloodRequests}</div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="flex justify-center bg-base-100 p-8 shadow-lg rounded-xl border">
        <BarChart width={500} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#EF4444" barSize={30} />
        </BarChart>
      </div>
    </div>
  );
};

export default AdminHome;
