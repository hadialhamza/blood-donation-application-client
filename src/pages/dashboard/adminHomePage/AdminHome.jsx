import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaTint, FaDollarSign } from "react-icons/fa";

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

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6">Welcome, {user?.displayName}!</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Users Card */}
        <div className="stat bg-base-100 shadow-xl rounded-2xl border-l-4 border-blue-500">
          <div className="stat-figure text-blue-500 text-3xl">
            <FaUsers />
          </div>
          <div className="stat-title">Total Users</div>
          <div className="stat-value text-blue-500">{stats.totalUsers}</div>
          <div className="stat-desc">Donors, Volunteers, Admins</div>
        </div>

        {/* Total Requests Card */}
        <div className="stat bg-base-100 shadow-xl rounded-2xl border-l-4 border-red-500">
          <div className="stat-figure text-red-500 text-3xl">
            <FaTint />
          </div>
          <div className="stat-title">Total Blood Requests</div>
          <div className="stat-value text-red-500">{stats.totalRequests}</div>
          <div className="stat-desc">Pending & Completed</div>
        </div>

        {/* Total Funding Card */}
        <div className="stat bg-base-100 shadow-xl rounded-2xl border-l-4 border-green-500">
          <div className="stat-figure text-green-500 text-3xl">
            <FaDollarSign />
          </div>
          <div className="stat-title">Total Funding</div>
          <div className="stat-value text-green-500">${stats.totalFunds}</div>
          <div className="stat-desc">Donations collected</div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
