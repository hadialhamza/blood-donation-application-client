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

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DashboardHome = () => {
  const { user } = useAuth();
  const [role, isRoleLoading] = useRole();
  const axiosSecure = useAxiosSecure();

  // 1. DATA FETCHING FOR ADMIN / VOLUNTEER
  const { data: stats = {}, isLoading: isStatsLoading } = useQuery({
    queryKey: ["admin-stats"],
    enabled: !isRoleLoading && role === "admin",
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

  if (
    isRoleLoading ||
    (role === "donor" && isRequestsLoading) ||
    (role === "admin" && isStatsLoading)
  ) {
    return (
      <div className="flex justify-center mt-20">
        <TbFidgetSpinner className="animate-spin text-4xl text-red-600" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-3xl font-bold">Welcome, {user?.displayName}!</h2>

      {/* ==============================================================
                VIEW: ADMIN & VOLUNTEER
             */}
      {role === "admin" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Users */}
          <Card className="border-l-4 border-l-blue-500 shadow-md">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Users
                </p>
                <div className="text-3xl font-bold text-blue-500">
                  {stats.users}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Donors, Volunteers, Admins
                </p>
              </div>
              <div className="text-blue-500 text-3xl opacity-20">
                <FaUsers />
              </div>
            </CardContent>
          </Card>

          {/* Total Funding */}
          <Card className="border-l-4 border-l-green-500 shadow-md">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Funding
                </p>
                <div className="text-3xl font-bold text-green-500">
                  ${stats.revenue}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Donations collected
                </p>
              </div>
              <div className="text-green-500 text-3xl opacity-20">
                <FaDollarSign />
              </div>
            </CardContent>
          </Card>

          {/* Total Requests */}
          <Card className="border-l-4 border-l-red-500 shadow-md">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Blood Requests
                </p>
                <div className="text-3xl font-bold text-red-500">
                  {stats.bloodRequests}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  All time requests
                </p>
              </div>
              <div className="text-red-500 text-3xl opacity-20">
                <FaTint />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/*  VIEW: DONOR */}
      {role === "donor" && (
        <div className="space-y-4">
          {recentRequests.length > 0 ? (
            <>
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Recent Donation Requests</h3>
                <Link to="/dashboard/my-donation-requests">
                  <Button variant="outline">View All Requests</Button>
                </Link>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader className="hidden md:table-header-group">
                    <TableRow>
                      <TableHead>Recipient Name</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Blood Group</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Donor Info</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentRequests.map((req) => (
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
                          <span className="font-bold md:hidden">Date & Time</span>
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
                        <TableCell className="flex md:table-cell items-center justify-between md:justify-end px-4 py-2 md:px-4 md:py-4 border-b md:border-b-0">
                          <span className="font-bold md:hidden">Actions</span>
                          <div className="flex gap-2">
                            <Link to={`/dashboard/update-request/${req._id}`}>
                              <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-700">
                                <FaEdit />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(req._id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <FaTrash />
                            </Button>
                            <Link to={`/dashboard/donation-request-details/${req._id}`}>
                              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800">
                                <FaEye />
                              </Button>
                            </Link>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          ) : (
            <Card className="text-center py-10 shadow-sm">
              <CardContent>
                <h3 className="text-lg font-semibold text-muted-foreground mb-4">
                  You haven't made any donation requests yet.
                </h3>
                <Link to="/dashboard/create-donation-request">
                  <Button>Create Request</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
