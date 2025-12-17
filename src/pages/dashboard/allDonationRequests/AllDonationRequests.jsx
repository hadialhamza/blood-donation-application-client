import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router";
import useRole from "../../../hooks/useRole";
import {
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  AlertCircle,
  Droplets,
  MapPin,
  Calendar,
  User,
  Activity,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

import Loading from "@/components/shared/Loading";

const AllDonationRequests = () => {
  const { user } = useAuth();
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
    <div className="page-container space-y-6">
      <div className="space-y-4">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 mb-4">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-red-600 dark:text-red-400">
              Request Management
            </span>
          </div>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Blood Donation Requests
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">
            Manage and monitor all blood donation requests from patients and
            hospitals
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="card-container">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Total Requests
                  </p>
                  <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                    {requests.length}
                  </p>
                </div>
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <Activity className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-container">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Pending
                  </p>
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                    {requests.filter((r) => r.status === "pending").length}
                  </p>
                </div>
                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-container">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    In Progress
                  </p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {requests.filter((r) => r.status === "inprogress").length}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-container">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Completed
                  </p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {requests.filter((r) => r.status === "done").length}
                  </p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Droplets className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="card-container">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <Input
                  placeholder="Search requests by name, blood group, or location..."
                  className="pl-10 h-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-zinc-400" />
                <Select
                  value={filterStatus}
                  onValueChange={(value) => {
                    setFilterStatus(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-[180px] h-12">
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inprogress">In Progress</SelectItem>
                    <SelectItem value="done">Completed</SelectItem>
                    <SelectItem value="canceled">Canceled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4 relative">
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
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Recent Requests ({filteredRequests.length})
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Page {currentPage} of {totalPages}
          </p>
        </div>

        {currentData.length === 0 ? (
          <Card className="card-container">
            <CardContent className="p-12 text-center">
              <AlertCircle className="w-16 h-16 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                No requests found
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400">
                {searchQuery
                  ? "Try a different search term"
                  : "No donation requests match the current filter"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {currentData.map((req) => (
              <Card
                key={req._id}
                className="group border-red-100 dark:border-red-900 
                hover:border-red-300 dark:hover:border-red-700 hover:shadow-lg 
                transition-all duration-300 overflow-hidden"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-4 flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <Badge
                              className={`px-3 py-1 rounded-full border ${getStatusBadge(
                                req.status
                              )}`}
                            >
                              {req.status.toUpperCase()}
                            </Badge>
                            <Badge className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 px-3 py-1 rounded-full">
                              {req.bloodGroup}
                            </Badge>
                          </div>
                          <h4 className="text-lg font-semibold text-zinc-900 dark:text-white">
                            Request for {req.recipientName}
                          </h4>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            By {req.requesterName}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                            <MapPin className="w-4 h-4 text-red-600 dark:text-red-400" />
                          </div>
                          <div>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                              Location
                            </p>
                            <p className="font-medium">
                              {req.recipientDistrict}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                            <Calendar className="w-4 h-4 text-red-600 dark:text-red-400" />
                          </div>
                          <div>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                              Date Needed
                            </p>
                            <p className="font-medium">{req.donationDate}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                            <Droplets className="w-4 h-4 text-red-600 dark:text-red-400" />
                          </div>
                          <div>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                              Blood Group
                            </p>
                            <p className="font-bold text-red-600 dark:text-red-400">
                              {req.bloodGroup}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Select
                        value={req.status}
                        onValueChange={(value) =>
                          handleStatusChange(req._id, value)
                        }
                      >
                        <SelectTrigger className="w-[140px] h-10">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="inprogress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="done">Completed</SelectItem>
                          <SelectItem value="canceled">Canceled</SelectItem>
                        </SelectContent>
                      </Select>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10"
                          >
                            <MoreVertical className="w-5 h-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <Link
                            to={`/dashboard/donation-request-details/${req._id}`}
                          >
                            <DropdownMenuItem className="cursor-pointer">
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                          </Link>

                          {role === "admin" && (
                            <>
                              <Link to={`/dashboard/update-request/${req._id}`}>
                                <DropdownMenuItem className="cursor-pointer">
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit Request
                                </DropdownMenuItem>
                              </Link>
                              <DropdownMenuItem
                                className="cursor-pointer text-red-600 focus:text-red-600"
                                onClick={() => handleDelete(req._id)}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Request
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {filteredRequests.length > itemsPerPage && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredRequests.length)} of{" "}
            {filteredRequests.length} requests
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    className={`w-10 h-10 ${
                      currentPage === pageNum
                        ? "bg-red-600 hover:bg-red-700"
                        : ""
                    }`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllDonationRequests;
