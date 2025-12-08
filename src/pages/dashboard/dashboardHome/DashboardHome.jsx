import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import {
  FaUsers,
  FaTint,
  FaDollarSign,
  FaEdit,
  FaTrash,
  FaEye,
} from "react-icons/fa";
import { TbFidgetSpinner } from "react-icons/tb";
import { useAuth } from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const DashboardHome = () => {
  const { user } = useAuth();
  const [role, isRoleLoading] = useRole();
  const axiosSecure = useAxiosSecure();

  // 1. DATA FETCHING FOR ADMIN / VOLUNTEER
  const { data: stats = {}, isLoading: isStatsLoading } = useQuery({
    queryKey: ["admin-stats"],
    enabled: !isRoleLoading && (role === "admin" || role === "volunteer"),
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  // 2. DATA FETCHING FOR DONOR
  const {
    data: recentRequests = [],
    isLoading: isRequestsLoading,
    refetch,
  } = useQuery({
    queryKey: ["recent-requests", user?.email],
    enabled: !isRoleLoading && role === "donor",
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests/${user?.email}`);
      return res.data.slice(0, 3);
    },
  });

  // Handle Delete (For Donor View)
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/donation-request/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Request has been deleted.", "success");
          refetch();
        }
      }
    });
  };

  if (
    isRoleLoading ||
    (role === "donor" && isRequestsLoading) ||
    ((role === "admin" || role === "volunteer") && isStatsLoading)
  ) {
    return (
      <div className="flex justify-center mt-20">
        <TbFidgetSpinner className="animate-spin text-4xl text-red-600" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Welcome, {user?.displayName}!</h2>

      {/* ==============================================================
                VIEW: ADMIN & VOLUNTEER
             */}
      {(role === "admin" || role === "volunteer") && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Users */}
          <div className="stat bg-base-100 shadow-xl rounded-2xl border-l-4 border-blue-500">
            <div className="stat-figure text-blue-500 text-3xl">
              <FaUsers />
            </div>
            <div className="stat-title">Total Users</div>
            <div className="stat-value text-blue-500">{stats.totalUsers}</div>
            <div className="stat-desc">Donors, Volunteers, Admins</div>
          </div>

          {/* Total Funding */}
          <div className="stat bg-base-100 shadow-xl rounded-2xl border-l-4 border-green-500">
            <div className="stat-figure text-green-500 text-3xl">
              <FaDollarSign />
            </div>
            <div className="stat-title">Total Funding</div>
            <div className="stat-value text-green-500">${stats.totalFunds}</div>
            <div className="stat-desc">Donations collected</div>
          </div>

          {/* Total Requests */}
          <div className="stat bg-base-100 shadow-xl rounded-2xl border-l-4 border-red-500">
            <div className="stat-figure text-red-500 text-3xl">
              <FaTint />
            </div>
            <div className="stat-title">Blood Requests</div>
            <div className="stat-value text-red-500">{stats.totalRequests}</div>
            <div className="stat-desc">All time requests</div>
          </div>
        </div>
      )}

      {/*  VIEW: DONOR */}
      {role === "donor" && (
        <div>
          {recentRequests.length > 0 ? (
            <>
              <h3 className="text-xl font-bold mb-4">
                Recent Donation Requests
              </h3>
              <div className="overflow-x-auto bg-base-100 shadow-xl rounded-lg">
                <table className="table w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th>Recipient Name</th>
                      <th>Location</th>
                      <th>Date & Time</th>
                      <th>Blood Group</th>
                      <th>Status</th>
                      <th>Donor Info</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRequests.map((req) => (
                      <tr key={req._id}>
                        <td>{req.recipientName}</td>
                        <td>
                          {req.recipientDistrict}, {req.recipientUpazila}
                        </td>
                        <td>
                          {req.donationDate} <br />
                          <span className="text-xs text-gray-500">
                            {req.donationTime}
                          </span>
                        </td>
                        <td className="font-bold text-red-600">
                          {req.bloodGroup}
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              req.status === "pending"
                                ? "badge-warning"
                                : req.status === "inprogress"
                                ? "badge-info"
                                : req.status === "done"
                                ? "badge-success"
                                : "badge-error"
                            } text-white`}
                          >
                            {req.status}
                          </span>
                        </td>
                        <td>
                          {req.status === "inprogress" ? (
                            <div>
                              <p className="font-bold">{req.donorName}</p>
                              <p className="text-xs">{req.donorEmail}</p>
                            </div>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="flex gap-2">
                          <Link
                            to={`/dashboard/update-request/${req._id}`}
                            className="btn btn-sm btn-ghost text-blue-600"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => handleDelete(req._id)}
                            className="btn btn-sm btn-ghost text-red-600"
                          >
                            <FaTrash />
                          </button>
                          <Link
                            to={`/donation-request-details/${req._id}`}
                            className="btn btn-sm btn-ghost text-gray-600"
                          >
                            <FaEye />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* View My All Request Button */}
              <div className="mt-6 text-center">
                <Link
                  to="/dashboard/my-donation-requests"
                  className="btn btn-primary"
                >
                  View My All Requests
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-10 bg-base-100 shadow-xl rounded-lg">
              <h3 className="text-lg font-semibold text-gray-500">
                You haven't made any donation requests yet.
              </h3>
              <Link
                to="/dashboard/create-donation-request"
                className="btn btn-primary mt-4"
              >
                Create Request
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
