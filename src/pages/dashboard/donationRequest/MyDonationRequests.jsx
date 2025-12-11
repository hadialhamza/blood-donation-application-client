import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router";

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
import { Card, CardContent } from "@/components/ui/card";

const MyDonationRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch Data
  const { data: requests = [], refetch } = useQuery({
    queryKey: ["my-donation-requests", user?.email, filterStatus],
    queryFn: async () => {
      // If filterStatus is "all", don't pass status param or handle in backend
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

  const statusBadgeColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500 hover:bg-yellow-600 border-transparent text-white";
      case "inprogress":
        return "bg-blue-500 hover:bg-blue-600 border-transparent text-white";
      case "done":
        return "bg-green-500 hover:bg-green-600 border-transparent text-white";
      case "canceled":
        return "bg-red-500 hover:bg-red-600 border-transparent text-white";
      default:
        return "bg-gray-500 hover:bg-gray-600 border-transparent text-white";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Donation Requests</h2>

        {/* Filter Dropdown */}
        <div className="w-[180px]">
          <Select
            value={filterStatus}
            onValueChange={(value) => setFilterStatus(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="inprogress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader className="hidden md:table-header-group">
            <TableRow>
              <TableHead>Recipient</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Date/Time</TableHead>
              <TableHead>Blood Group</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Donor Info</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No requests found.
                </TableCell>
              </TableRow>
            ) : (
              currentData.map((req) => (
                <TableRow
                  key={req._id}
                  className="block md:table-row mb-6 md:mb-0 border rounded-lg md:border-b md:rounded-none shadow-sm md:shadow-none bg-card md:bg-transparent overflow-hidden"
                >
                  <TableCell className="flex md:table-cell items-center justify-between px-4 py-2 md:px-4 md:py-4 border-b md:border-b-0 font-medium">
                    <span className="font-bold md:hidden">Recipient</span>
                    {req.recipientName}
                  </TableCell>
                  <TableCell className="flex md:table-cell items-center justify-between px-4 py-2 md:px-4 md:py-4 border-b md:border-b-0">
                    <span className="font-bold md:hidden">Location</span>
                    <span>
                      {req.recipientDistrict}, {req.recipientUpazila}
                    </span>
                  </TableCell>
                  <TableCell className="flex md:table-cell items-center justify-between px-4 py-2 md:px-4 md:py-4 border-b md:border-b-0">
                    <span className="font-bold md:hidden">Date/Time</span>
                    <div className="flex flex-col md:items-start text-right md:text-left">
                      <span>{req.donationDate}</span>
                      <span className="text-xs text-muted-foreground">
                        {req.donationTime}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="flex md:table-cell items-center justify-between px-4 py-2 md:px-4 md:py-4 border-b md:border-b-0">
                    <span className="font-bold md:hidden">Blood Group</span>
                    <span className="font-bold text-red-600">
                      {req.bloodGroup}
                    </span>
                  </TableCell>
                  <TableCell className="flex md:table-cell items-center justify-between px-4 py-2 md:px-4 md:py-4 border-b md:border-b-0">
                    <span className="font-bold md:hidden">Status</span>
                    <Badge className={statusBadgeColor(req.status)}>
                      {req.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex md:table-cell items-center justify-between px-4 py-2 md:px-4 md:py-4 border-b md:border-b-0">
                    <span className="font-bold md:hidden">Donor Info</span>
                    {req.status === "inprogress" ? (
                      <div className="flex flex-col md:items-start text-right md:text-left">
                        <span className="font-bold">{req.donorName}</span>
                        <span className="text-xs text-muted-foreground">
                          {req.donorEmail}
                        </span>
                      </div>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell className="flex md:table-cell items-center justify-between md:justify-end px-4 py-2 md:px-4 md:py-4">
                    <span className="font-bold md:hidden">Actions</span>
                    <div className="flex flex-col space-y-2 w-full md:w-auto items-end">
                      {/* Status Actions */}
                      {req.status === "inprogress" && (
                        <div className="flex gap-2">
                          <Button
                            className="h-6 px-2 text-xs bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => handleStatusUpdate(req._id, "done")}
                          >
                            Done
                          </Button>
                          <Button
                            className="h-6 px-2 text-xs bg-red-600 hover:bg-red-700 text-white"
                            onClick={() => handleStatusUpdate(req._id, "canceled")}
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Link to={`/dashboard/update-request/${req._id}`}>
                          <Button variant="outline" size="sm">Edit</Button>
                        </Link>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(req._id)}
                        >
                          Delete
                        </Button>
                        <Link to={`/dashboard/donation-request-details/${req._id}`}>
                          <Button variant="ghost" size="sm">View</Button>
                        </Link>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {requests.length > itemsPerPage && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            « Previous
          </Button>
          <span className="text-sm font-medium">Page {currentPage}</span>
          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next »
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyDonationRequests;
