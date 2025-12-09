import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { SquarePen, Users, Shield, Heart, HandHeart } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user: currentUser } = useAuth();
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: users = [], refetch } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-users`);
      return res.data;
    },
  });

  // Calculate Stats (Always based on total users)
  const totalUsers = users.length;
  const adminCount = users.filter((u) => u.role === "admin").length;
  const volunteerCount = users.filter((u) => u.role === "volunteer").length;
  const donorCount = users.filter((u) => u.role === "donor").length;

  // Filter Users Client-side
  const filteredUsers =
    filterStatus === "all"
      ? users
      : users.filter((user) => user.status === filterStatus);

  // Sorting Logic: Admin > Volunteer > Donor
  const roleOrder = { admin: 1, volunteer: 2, donor: 3 };
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    return (roleOrder[a.role] || 3) - (roleOrder[b.role] || 3);
  });

  // Pagination Logic
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle Status Change (Block/Unblock)
  const handleStatusChange = (user, newStatus) => {
    document.body.focus();
    setTimeout(() => {
      Swal.fire({
        title: `Are you sure you want to ${newStatus} this user?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: `Yes, ${newStatus}!`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axiosSecure.patch(`/users/status/${user._id}`, {
            status: newStatus,
          });
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire("Updated!", `User has been ${newStatus}.`, "success");
          }
        }
      });
    }, 500);
  };

  // Handle Role Change (Make Admin/Volunteer)
  const handleRoleChange = (user, newRole) => {
    document.body.focus();
    setTimeout(() => {
      Swal.fire({
        title: `Make this user a ${newRole}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axiosSecure.patch(`/users/role/${user._id}`, {
            role: newRole,
          });
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire("Success!", `User is now a ${newRole}.`, "success");
          }
        }
      });
    }, 500);
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-purple-500 hover:bg-purple-600 border-transparent text-white capitalize";
      case "volunteer":
        return "bg-orange-500 hover:bg-orange-600 border-transparent text-white capitalize";
      default:
        return "bg-gray-500 hover:bg-gray-600 border-transparent text-white capitalize";
    }
  };

  const getStatusBadgeColor = (status) => {
    return status === "active"
      ? "bg-green-500 hover:bg-green-600 border-transparent text-white capitalize"
      : "bg-red-500 hover:bg-red-600 border-transparent text-white capitalize";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center bg-secondary/20 p-6 rounded-lg border">
        {/* Admin Info */}
        {currentUser && (
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary">
              <AvatarImage
                src={currentUser.photoURL}
                alt={currentUser.displayName}
              />
              <AvatarFallback className="text-xl">
                {currentUser.displayName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{currentUser.displayName}</h2>
              <p className="text-muted-foreground">{currentUser.email}</p>
              <Badge variant="outline" className="mt-1 capitalize">
                Admin
              </Badge>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full lg:w-auto">
          {/* Total Users */}
          <div className="bg-card p-4 rounded-lg border shadow-sm flex flex-col items-center justify-center min-w-[100px]">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full mb-2">
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-300" />
            </div>
            <p className="text-2xl font-bold">{totalUsers}</p>
            <p className="text-xs text-muted-foreground font-medium">
              Total Users
            </p>
          </div>

          {/* Admins */}
          <div className="bg-card p-4 rounded-lg border shadow-sm flex flex-col items-center justify-center min-w-[100px]">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full mb-2">
              <Shield className="h-5 w-5 text-purple-600 dark:text-purple-300" />
            </div>
            <p className="text-2xl font-bold">{adminCount}</p>
            <p className="text-xs text-muted-foreground font-medium">Admins</p>
          </div>

          {/* Volunteers */}
          <div className="bg-card p-4 rounded-lg border shadow-sm flex flex-col items-center justify-center min-w-[100px]">
            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-full mb-2">
              <span className="text-orange-600 dark:text-orange-300">
                <HandHeart className="h-5 w-5" />
              </span>
            </div>
            <p className="text-2xl font-bold">{volunteerCount}</p>
            <p className="text-xs text-muted-foreground font-medium">
              Volunteers
            </p>
          </div>

          {/* Donors */}
          <div className="bg-card p-4 rounded-lg border shadow-sm flex flex-col items-center justify-center min-w-[100px]">
            <div className="p-2 bg-red-100 dark:bg-red-900 rounded-full mb-2">
              <Heart className="h-5 w-5 text-red-600 dark:text-red-300" />
            </div>
            <p className="text-2xl font-bold">{donorCount}</p>
            <p className="text-xs text-muted-foreground font-medium">Donors</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">All Users</h2>
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
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border-0 md:border">
        <Table>
          {/* Hide Header on Mobile */}
          <TableHeader className="hidden md:table-header-group">
            <TableRow>
              <TableHead>Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow
                key={user._id}
                // Mobile: Block (Card style), Desktop: Table Row
                className="block md:table-row mb-6 md:mb-0 border rounded-lg md:border-b md:rounded-none shadow-sm md:shadow-none bg-card md:bg-transparent overflow-hidden"
              >
                {/* Avatar Cell */}
                <TableCell className="flex md:table-cell items-center justify-between px-4 py-2 md:px-4 md:py-4 border-b md:border-b-0">
                  <span className="font-bold md:hidden">Avatar</span>
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </TableCell>

                {/* Name Cell */}
                <TableCell className="flex md:table-cell items-center justify-between px-4 py-2 md:px-4 md:py-4 border-b md:border-b-0 font-medium">
                  <span className="font-bold md:hidden">Name</span>
                  {user.name}
                </TableCell>

                {/* Email Cell */}
                <TableCell className="flex md:table-cell items-center justify-between px-4 py-2 md:px-4 md:py-4 border-b md:border-b-0">
                  <span className="font-bold md:hidden">Email</span>
                  <span className="text-sm md:text-base break-all">
                    {user.email}
                  </span>
                </TableCell>

                {/* Role Cell */}
                <TableCell className="flex md:table-cell items-center justify-between px-4 py-2 md:px-4 md:py-4 border-b md:border-b-0">
                  <span className="font-bold md:hidden">Role</span>
                  <Badge className={getRoleBadgeColor(user.role)}>
                    {user.role}
                  </Badge>
                </TableCell>

                {/* Status Cell */}
                <TableCell className="flex md:table-cell items-center justify-between px-4 py-2 md:px-4 md:py-4 border-b md:border-b-0">
                  <span className="font-bold md:hidden">Status</span>
                  <Badge className={getStatusBadgeColor(user.status)}>
                    {user.status}
                  </Badge>
                </TableCell>

                {/* Actions Cell */}
                <TableCell className="flex md:table-cell items-center justify-between md:justify-end px-4 py-2 md:px-4 md:py-4 text-right">
                  <span className="font-bold md:hidden">Actions</span>
                  {currentUser?.email !== user.email && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <SquarePen className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {user.status === "active" ? (
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(user, "blocked")}
                            className="text-red-600 focus:text-red-600"
                          >
                            Block{" "}
                            {user.role === "admin"
                              ? "Admin"
                              : user.role === "volunteer"
                              ? "Volunteer"
                              : "Donor"}
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(user, "active")}
                            className="text-green-600 focus:text-green-600"
                          >
                            Unblock{" "}
                            {user.role === "admin"
                              ? "Admin"
                              : user.role === "volunteer"
                              ? "Volunteer"
                              : "Donor"}
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        {user.role === "admin" && (
                          <>
                            <DropdownMenuItem
                              onClick={() =>
                                handleRoleChange(user, "volunteer")
                              }
                            >
                              Make Volunteer
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleRoleChange(user, "donor")}
                            >
                              Make Donor
                            </DropdownMenuItem>
                          </>
                        )}
                        {user.role === "volunteer" && (
                          <>
                            <DropdownMenuItem
                              onClick={() => handleRoleChange(user, "admin")}
                            >
                              Make Admin
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleRoleChange(user, "donor")}
                            >
                              Make Donor
                            </DropdownMenuItem>
                          </>
                        )}
                        {user.role === "donor" && (
                          <>
                            <DropdownMenuItem
                              onClick={() => handleRoleChange(user, "admin")}
                            >
                              Make Admin
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleRoleChange(user, "volunteer")
                              }
                            >
                              Make Volunteer
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage((p) => p - 1);
                  }}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={page === currentPage}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(page);
                      }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
                  }}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
