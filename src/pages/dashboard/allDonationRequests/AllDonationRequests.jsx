import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router";
import useRole from "../../../hooks/useRole"; // Your custom hook

const AllDonationRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [role] = useRole(); // Get current user role
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch All Data
  const { data: requests = [], refetch } = useQuery({
    queryKey: ["all-requests", filterStatus],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all-blood-donation-requests?status=${filterStatus}`
      );
      return res.data;
    },
  });

  // Handle Status Update (Allowed for Admin & Volunteer)
  const handleStatusChange = async (id, newStatus) => {
    const res = await axiosSecure.patch(`/donation-request-status/${id}`, {
      status: newStatus,
    });
    if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire("Updated", `Status changed to ${newStatus}`, "success");
    }
  };

  // Handle Delete (Admin Only)
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

  // Pagination Logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = requests.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(requests.length / itemsPerPage);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Blood Donation Requests</h2>

        {/* Filter */}
        <select
          className="select select-bordered"
          onChange={(e) => setFilterStatus(e.target.value)}
          value={filterStatus}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-base-200">
            <tr>
              <th>Requester</th>
              <th>Recipient</th>
              <th>Location</th>
              <th>Date</th>
              <th>Blood Group</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((req) => (
              <tr key={req._id}>
                <td>{req.requesterName}</td>
                <td>{req.recipientName}</td>
                <td>{req.recipientDistrict}</td>
                <td>{req.donationDate}</td>
                <td className="font-bold text-red-600">{req.bloodGroup}</td>
                <td>
                  {/* Status Dropdown for Admin/Volunteer */}
                  <select
                    className="select select-bordered select-xs"
                    value={req.status}
                    onChange={(e) =>
                      handleStatusChange(req._id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="canceled">Canceled</option>
                  </select>
                </td>
                <td className="flex gap-2">
                  {/* Admin Only Actions */}
                  {role === "admin" && (
                    <>
                      <Link
                        to={`/dashboard/update-request/${req._id}`}
                        className="btn btn-sm btn-info text-white"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(req._id)}
                        className="btn btn-sm btn-error text-white"
                      >
                        Delete
                      </button>
                    </>
                  )}

                  {/* Volunteer has no other actions, maybe View Details if needed */}
                  {role === "volunteer" && (
                    <span className="text-xs text-gray-500">
                      Status Update Only
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {requests.length > itemsPerPage && (
        <div className="flex justify-center mt-6 btn-group">
          <button
            className="btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            «
          </button>
          <button className="btn">Page {currentPage}</button>
          <button
            className="btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            »
          </button>
        </div>
      )}
    </div>
  );
};

export default AllDonationRequests;
