import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router";
import useRole from "../../../hooks/useRole";

import { Button } from "@/components/ui/button";
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

const AllDonationRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [role] = useRole();
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch All Data
  const { data: requests = [], refetch } = useQuery({
    queryKey: ["all-requests", filterStatus],
    queryFn: async () => {
      const query = filterStatus === "all" ? "" : `?status=${filterStatus}`;
      const res = await axiosSecure.get(
        `/all-blood-donation-requests${query}`
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
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">All Blood Donation Requests</h2>

        {/* Filter */}
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

      <div className="rounded-md border">
        <Table>
          <TableHeader className="hidden md:table-header-group">
            <TableRow>
              <TableHead>Requester</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Blood Group</TableHead>
              <TableHead>Status</TableHead>
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
                  <TableCell className="flex md:table-cell items-center justify-between px-4 py-2 md:px-4 md:py-4 border-b md:border-b-0">
                    <span className="font-bold md:hidden">Requester</span>
                    {req.requesterName}
                  </TableCell>
                  <TableCell className="flex md:table-cell items-center justify-between px-4 py-2 md:px-4 md:py-4 border-b md:border-b-0">
                    <span className="font-bold md:hidden">Recipient</span>
                    {req.recipientName}
                  </TableCell>
                  <TableCell className="flex md:table-cell items-center justify-between px-4 py-2 md:px-4 md:py-4 border-b md:border-b-0">
                    <span className="font-bold md:hidden">Location</span>
                    {req.recipientDistrict}
                  </TableCell>
                  <TableCell className="flex md:table-cell items-center justify-between px-4 py-2 md:px-4 md:py-4 border-b md:border-b-0">
                    <span className="font-bold md:hidden">Date</span>
                    {req.donationDate}
                  </TableCell>
                  <TableCell className="flex md:table-cell items-center justify-between px-4 py-2 md:px-4 md:py-4 border-b md:border-b-0">
                    <span className="font-bold md:hidden">Blood Group</span>
                    <span className="font-bold text-red-600">
                      {req.bloodGroup}
                    </span>
                  </TableCell>
                  <TableCell className="flex md:table-cell items-center justify-between px-4 py-2 md:px-4 md:py-4 border-b md:border-b-0">
                    <span className="font-bold md:hidden">Status</span>
                    {/* Status Dropdown for Admin/Volunteer */}
                    <div className="w-[140px]">
                      <Select
                        value={req.status}
                        onValueChange={(value) =>
                          handleStatusChange(req._id, value)
                        }
                      >
                        <SelectTrigger className="h-8">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="inprogress">In Progress</SelectItem>
                          <SelectItem value="done">Done</SelectItem>
                          <SelectItem value="canceled">Canceled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                  <TableCell className="flex md:table-cell items-center justify-between md:justify-end px-4 py-2 md:px-4 md:py-4">
                    <span className="font-bold md:hidden">Actions</span>
                    <div className="flex gap-2 items-center">
                      {/* View Button (Available for all) */}
                      <Link to={`/dashboard/donation-request-details/${req._id}`}>
                        <Button size="sm" variant="secondary">
                          View
                        </Button>
                      </Link>

                      {/* Admin Only Actions */}
                      {role === "admin" && (
                        <>
                          <Link to={`/dashboard/update-request/${req._id}`}>
                            <Button size="sm" variant="outline" className="text-blue-600 hover:text-blue-700">
                              Edit
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(req._id)}
                          >
                            Delete
                          </Button>
                        </>
                      )}
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

export default AllDonationRequests;
