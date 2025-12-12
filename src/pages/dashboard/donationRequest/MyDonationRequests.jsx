import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router";
import {
  MoreVertical,
  Trash2,
  Edit,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  ChevronLeft,
  ChevronRight,
  Droplet,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";

const MyDonationRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch Data
  const {
    data: requests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["my-donation-requests", user?.email, filterStatus],
    queryFn: async () => {
      const query = filterStatus === "all" ? "" : `?status=${filterStatus}`;
      const res = await axiosSecure.get(
        `/donation-requests/${user?.email}${query}`
      );
      return res.data;
    },
  });

  // Handle Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Request?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#3B82F6",
      confirmButtonText: "Yes, Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/donation-request/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Your request has been removed.", "success");
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
      Swal.fire("Updated", `Status marked as ${newStatus}`, "success");
    }
  };

  // Pagination Logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = requests.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(requests.length / itemsPerPage);

  // Helper for Status Badge Styles
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="secondary"
            className="bg-amber-100 text-amber-700 hover:bg-amber-200"
          >
            <Clock className="w-3 h-3 mr-1" /> Pending
          </Badge>
        );
      case "inprogress":
        return (
          <Badge
            variant="secondary"
            className="bg-blue-100 text-blue-700 hover:bg-blue-200"
          >
            <Clock className="w-3 h-3 mr-1" /> In Progress
          </Badge>
        );
      case "done":
        return (
          <Badge
            variant="secondary"
            className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
          >
            <CheckCircle className="w-3 h-3 mr-1" /> Done
          </Badge>
        );
      case "canceled":
        return (
          <Badge
            variant="secondary"
            className="bg-red-100 text-red-700 hover:bg-red-200"
          >
            <XCircle className="w-3 h-3 mr-1" /> Canceled
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6 min-h-screen bg-slate-50 dark:bg-zinc-950">
      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
            My Requests
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage your blood donation requests.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select
            value={filterStatus}
            onValueChange={(val) => {
              setFilterStatus(val);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[180px] bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Requests</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="inprogress">In Progress</SelectItem>
              <SelectItem value="done">Completed</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Content Table */}
      <Card className="border-none shadow-lg bg-white dark:bg-zinc-900 overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-zinc-50 dark:bg-zinc-800/50">
              <TableRow>
                <TableHead className="pl-6">Recipient</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Blood Group</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Donor Info</TableHead>
                <TableHead className="text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-40 text-center text-muted-foreground"
                  >
                    Loading requests...
                  </TableCell>
                </TableRow>
              ) : currentData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-full mb-3">
                        <Droplet className="w-8 h-8 text-zinc-400" />
                      </div>
                      <p>No donation requests found.</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                currentData.map((req) => (
                  <TableRow
                    key={req._id}
                    className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                  >
                    <TableCell className="pl-6 font-medium">
                      <div className="flex flex-col">
                        <span className="text-zinc-900 dark:text-white font-bold">
                          {req.recipientName}
                        </span>
                        <span className="text-xs text-muted-foreground md:hidden">
                          Rec: {req.recipientName}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <span className="text-zinc-600 dark:text-zinc-400">
                        {req.recipientUpazila}, {req.recipientDistrict}
                      </span>
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {req.donationDate}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {req.donationTime}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="outline"
                        className="border-red-200 text-red-600 bg-red-50 dark:border-red-900/50 dark:bg-red-900/20 font-bold"
                      >
                        {req.bloodGroup}
                      </Badge>
                    </TableCell>

                    <TableCell>{getStatusBadge(req.status)}</TableCell>

                    <TableCell>
                      {req.status === "inprogress" || req.status === "done" ? (
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {req.donorName}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {req.donorEmail}
                          </span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-xs italic">
                          Waiting for donor
                        </span>
                      )}
                    </TableCell>

                    <TableCell className="text-right pr-6">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full"
                          >
                            <MoreVertical className="w-4 h-4 text-zinc-500" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />

                          <Link
                            to={`/dashboard/donation-request-details/${req._id}`}
                          >
                            <DropdownMenuItem className="cursor-pointer">
                              <Eye className="w-4 h-4 mr-2" /> View Details
                            </DropdownMenuItem>
                          </Link>

                          <Link to={`/dashboard/update-request/${req._id}`}>
                            <DropdownMenuItem className="cursor-pointer">
                              <Edit className="w-4 h-4 mr-2" /> Edit Request
                            </DropdownMenuItem>
                          </Link>

                          {req.status === "inprogress" && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusUpdate(req._id, "done")
                                }
                                className="cursor-pointer text-green-600 focus:text-green-600"
                              >
                                <CheckCircle className="w-4 h-4 mr-2" /> Mark as
                                Done
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusUpdate(req._id, "canceled")
                                }
                                className="cursor-pointer text-red-600 focus:text-red-600"
                              >
                                <XCircle className="w-4 h-4 mr-2" /> Cancel
                                Request
                              </DropdownMenuItem>
                            </>
                          )}

                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDelete(req._id)}
                            className="cursor-pointer text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination Controls */}
      {requests.length > 0 && (
        <div className="flex justify-between items-center bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
          <span className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, requests.length)} of{" "}
            {requests.length} entries
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium px-2">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDonationRequests;
