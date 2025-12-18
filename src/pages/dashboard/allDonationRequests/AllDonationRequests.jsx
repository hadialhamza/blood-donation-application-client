import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useRole from "../../../hooks/useRole";
import { AlertCircle } from "lucide-react";
import Loading from "@/components/shared/Loading";
import DashboardPagination from "@/components/shared/DashboardPagination";
import RequestStats from "./RequestStats";
import RequestFilters from "./RequestFilters";
import RequestCard from "./RequestCard";

const AllDonationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [role] = useRole();
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 5;

  const {
    data: requests = [],
    refetch,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["all-requests", filterStatus],
    queryFn: async () => {
      const query = filterStatus === "all" ? "" : `?status=${filterStatus}`;
      const res = await axiosSecure.get(`/all-blood-donation-requests${query}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const handleStatusChange = async (id, newStatus) => {
    const res = await axiosSecure.patch(`/donation-request-status/${id}`, {
      status: newStatus,
    });
    if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        title: "Status Updated",
        text: `Request status changed to ${newStatus}`,
        icon: "success",
        confirmButtonColor: "#ef4444",
        background: "#f0f9ff",
      });
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Request?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      background: "#f0f9ff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/donation-request/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Request has been deleted successfully.",
            icon: "success",
            confirmButtonColor: "#ef4444",
          });
          refetch();
        }
      }
    });
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200",
      inprogress:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200",
      done: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200",
      canceled:
        "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200",
    };
    return styles[status] || "bg-gray-100 text-gray-800";
  };

  const filteredRequests = requests.filter(
    (req) =>
      req.requesterName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.recipientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.bloodGroup?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.recipientDistrict?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredRequests.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  return (
    <div className="page-container space-y-8">
      <div className="space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 mb-4">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-red-600 dark:text-red-400">
              Request Management
            </span>
          </div>
          <h2 className="text-3xl font-black text-zinc-900 dark:text-white">
            Blood Donation Requests
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2 text-lg">
            Manage and monitor all blood donation requests from patients and
            hospitals
          </p>
        </div>

        {/* Stats Section */}
        <RequestStats requests={requests} />
      </div>

      {/* Filters Section */}
      <RequestFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        setCurrentPage={setCurrentPage}
      />

      {/* Requests List */}
      <div className="space-y-6 relative">
        {isFetching && !isLoading && (
          <div className="absolute inset-0 z-10 bg-white/50 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-lg">
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-800 rounded-full shadow-lg border border-red-100 dark:border-red-900">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-red-600 dark:text-red-400">
                Updating...
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between px-2">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
            Recent Requests
          </h3>
          <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-3 py-1 rounded-full text-sm font-bold">
            {filteredRequests.length} Found
          </span>
        </div>

        {currentData.length === 0 ? (
          <div className="card-container p-20 text-center border-dashed border-2">
            <AlertCircle className="w-20 h-20 text-zinc-200 dark:text-zinc-800 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
              No requests found
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
              {searchQuery
                ? "Try a different search term or clear filters"
                : "No donation requests match the current filter criteria"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {currentData.map((req) => (
              <RequestCard
                key={req._id}
                req={req}
                role={role}
                handleStatusChange={handleStatusChange}
                handleDelete={handleDelete}
                getStatusBadge={getStatusBadge}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      <DashboardPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        totalFiltered={filteredRequests.length}
        itemsPerPage={itemsPerPage}
        itemName="requests"
      />
    </div>
  );
};

export default AllDonationRequests;
