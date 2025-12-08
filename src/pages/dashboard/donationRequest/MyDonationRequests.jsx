import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyDonationRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch Data
  const { data: requests = [], refetch } = useQuery({
    queryKey: ["my-donation-requests", user?.email, filterStatus],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation-requests/${user?.email}?status=${filterStatus}`
      );
      return res.data;
    },
  });

  // Handle Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/donation-request/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Your request has been deleted.", "success");
          refetch();
        }
      }
    });
  };

  // Handle Status Update
  const handleStatusUpdate = async (id, newStatus) => {
    const res = await axiosSecure.patch(`/donation-request-status/${id}`, {
      status: newStatus,
    });
    if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire("Updated", `Status changed to ${newStatus}`, "success");
    }
  };

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = requests.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(requests.length / itemsPerPage);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Donation Requests</h2>

        {/* Filter Dropdown */}
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-base-200">
            <tr>
              <th>Recipient</th>
              <th>Location</th>
              <th>Date/Time</th>
              <th>Blood Group</th>
              <th>Status</th>
              <th>Donor Info</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No requests found.
                </td>
              </tr>
            ) : (
              currentData.map((req) => (
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
                  <td className="font-bold text-red-600">{req.bloodGroup}</td>
                  <td>
                    <div
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
                    </div>
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
                  <td className="space-x-2">
                    {/* Status Actions */}
                    {req.status === "inprogress" && (
                      <div className="flex flex-col gap-1 mb-2">
                        <button
                          onClick={() => handleStatusUpdate(req._id, "done")}
                          className="btn btn-xs btn-success text-white"
                        >
                          Done
                        </button>
                        <button
                          onClick={() =>
                            handleStatusUpdate(req._id, "canceled")
                          }
                          className="btn btn-xs btn-error text-white"
                        >
                          Cancel
                        </button>
                      </div>
                    )}

                    {/* Standard Actions */}
                    <Link
                      to={`/dashboard/update-request/${req._id}`}
                      className="btn btn-sm btn-ghost"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="btn btn-sm btn-ghost text-red-500"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/dashboard/donation-request-details/${req._id}`}
                      className="btn btn-sm btn-ghost"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
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

export default MyDonationRequests;
