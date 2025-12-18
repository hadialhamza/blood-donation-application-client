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
  Droplet,
  FolderHeart,
  MapPin,
  Calendar,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import PageHeader from "@/components/shared/PageHeader";
import Container from "@/components/shared/container/Container";
import DashboardPagination from "@/components/shared/DashboardPagination";
import RequestFilters from "../allDonationRequests/RequestFilters";

const MyDonationRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
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

  // Filtering Logic
  const filteredRequests = requests.filter((req) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      req.recipientName?.toLowerCase().includes(searchLower) ||
      req.recipientDistrict?.toLowerCase().includes(searchLower) ||
      req.bloodGroup?.toLowerCase().includes(searchLower) ||
      req.hospitalName?.toLowerCase().includes(searchLower)
    );
  });

  // Pagination Logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredRequests.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  // Helper for Status Badge Styles
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="secondary"
            className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200"
          >
            <Clock className="w-3 h-3 mr-1" /> Pending
          </Badge>
        );
      case "inprogress":
        return (
          <Badge
            variant="secondary"
            className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200"
          >
            <Clock className="w-3 h-3 mr-1" /> In Progress
          </Badge>
        );
      case "done":
        return (
          <Badge
            variant="secondary"
            className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200"
          >
            <CheckCircle className="w-3 h-3 mr-1" /> Done
          </Badge>
        );
      case "canceled":
        return (
          <Badge
            variant="secondary"
            className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200"
          >
            <XCircle className="w-3 h-3 mr-1" /> Canceled
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Shared Action Menu
  const ActionMenu = ({ req }) => (
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

        <Link to={`/dashboard/donation-request-details/${req._id}`}>
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
              onClick={() => handleStatusUpdate(req._id, "done")}
              className="cursor-pointer text-green-600 focus:text-green-600"
            >
              <CheckCircle className="w-4 h-4 mr-2" /> Mark as Done
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleStatusUpdate(req._id, "canceled")}
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
              <XCircle className="w-4 h-4 mr-2" /> Cancel Request
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
  );

  return (
    <Container>
      <div className="max-w-5xl mx-auto space-y-6 py-8">
        {/* Header */}
        <PageHeader
          title="My Requests"
          subtitle="Manage and track your blood donation requests."
          icon={FolderHeart}
        />

        {/* Filters */}
        <RequestFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          setCurrentPage={setCurrentPage}
        />

        {/* Content */}
        <Card className="border-none shadow-md bg-white dark:bg-zinc-900 overflow-hidden">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="h-40 flex items-center justify-center text-muted-foreground">
                Loading requests...
              </div>
            ) : currentData.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-muted-foreground p-6 text-center">
                <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-full mb-3">
                  <Droplet className="w-8 h-8 text-zinc-400" />
                </div>
                <p>No donation requests found.</p>
              </div>
            ) : (
              <>
                {/* Desktop View: Table */}
                <div className="hidden md:block">
                  <Table>
                    <TableHeader className="bg-zinc-50 dark:bg-zinc-800/50">
                      <TableRow>
                        <TableHead className="pl-6">Recipient</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Blood Group</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Donor Info</TableHead>
                        <TableHead className="text-right pr-6">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {currentData.map((req) => (
                        <TableRow
                          key={req._id}
                          className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                        >
                          <TableCell className="pl-6 font-medium">
                            <span className="text-zinc-900 dark:text-white font-bold">
                              {req.recipientName}
                            </span>
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
                            {req.status === "inprogress" ||
                            req.status === "done" ? (
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
                            <ActionMenu req={req} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile View: Cards */}
                <div className="md:hidden space-y-4 p-4 bg-zinc-50 dark:bg-black/20">
                  {currentData.map((req) => (
                    <div
                      key={req._id}
                      className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-lg text-zinc-900 dark:text-white">
                            {req.recipientName}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            {getStatusBadge(req.status)}
                            <Badge
                              variant="outline"
                              className="border-red-200 text-red-600 bg-red-50 dark:border-red-900/50 dark:bg-red-900/20"
                            >
                              {req.bloodGroup}
                            </Badge>
                          </div>
                        </div>
                        <ActionMenu req={req} />
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <MapPin className="w-3.5 h-3.5" />
                            <span className="text-xs font-medium uppercase tracking-wide">
                              Location
                            </span>
                          </div>
                          <p className="font-medium">
                            {req.recipientUpazila}, {req.recipientDistrict}
                          </p>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Calendar className="w-3.5 h-3.5" />
                            <span className="text-xs font-medium uppercase tracking-wide">
                              Date
                            </span>
                          </div>
                          <p className="font-medium">{req.donationDate}</p>
                          <p className="text-xs text-muted-foreground">
                            {req.donationTime}
                          </p>
                        </div>
                      </div>

                      {(req.status === "inprogress" ||
                        req.status === "done") && (
                        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
                          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-2">
                            Donor Info
                          </p>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-zinc-500">
                              {req.donorName?.[0]}
                            </div>
                            <div>
                              <p className="text-sm font-semibold">
                                {req.donorName}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {req.donorEmail}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Pagination Controls */}
        <DashboardPagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          totalFiltered={filteredRequests.length}
          itemsPerPage={itemsPerPage}
          itemName="requests"
        />
      </div>
    </Container>
  );
};

export default MyDonationRequests;
