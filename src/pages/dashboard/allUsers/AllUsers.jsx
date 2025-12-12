import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  Users,
  Shield,
  Heart,
  HandHeart,
  MoreVertical,
  Search,
  Filter,
  UserCog,
  UserCheck,
  UserX,
  Crown,
  TrendingUp,
  Activity,
  Mail,
  Phone,
  Calendar,
  Award,
  CheckCircle,
  XCircle,
  ShieldCheck,
  UserPlus,
  RefreshCw,
} from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { Progress } from "@/components/ui/progress";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user: currentUser } = useAuth();
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRole, setFilterRole] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-users`);
      return res.data;
    },
  });

  // Calculate Stats
  const totalUsers = users.length;
  const adminCount = users.filter((u) => u.role === "admin").length;
  const volunteerCount = users.filter((u) => u.role === "volunteer").length;
  const donorCount = users.filter((u) => u.role === "donor").length;
  const activeCount = users.filter((u) => u.status === "active").length;
  const blockedCount = users.filter((u) => u.status === "blocked").length;

  // Filter Users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchQuery === "" ||
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || user.status === filterStatus;
    const matchesRole = filterRole === "all" || user.role === filterRole;

    return matchesSearch && matchesStatus && matchesRole;
  });

  // Sort Users
  const roleOrder = { admin: 1, volunteer: 2, donor: 3 };
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    return (roleOrder[a.role] || 3) - (roleOrder[b.role] || 3);
  });

  // Pagination
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle Status Change
  const handleStatusChange = (user, newStatus) => {
    Swal.fire({
      title: `Are you sure?`,
      text: `This will ${newStatus === "active" ? "unblock" : "block"} ${
        user.name
      }`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: newStatus === "active" ? "#10b981" : "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `Yes, ${
        newStatus === "active" ? "unblock" : "block"
      }!`,
      background: "#f0f9ff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/users/status/${user._id}`, {
          status: newStatus,
        });
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Success!",
            text: `User has been ${
              newStatus === "active" ? "unblocked" : "blocked"
            }.`,
            icon: "success",
            confirmButtonColor: "#ef4444",
          });
        }
      }
    });
  };

  // Handle Role Change
  const handleRoleChange = (user, newRole) => {
    Swal.fire({
      title: `Change Role to ${newRole}?`,
      text: `${user.name} will have ${newRole} privileges.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `Make ${newRole}`,
      background: "#f0f9ff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/users/role/${user._id}`, {
          role: newRole,
        });
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Role Updated!",
            text: `${user.name} is now a ${newRole}.`,
            icon: "success",
            confirmButtonColor: "#ef4444",
          });
        }
      }
    });
  };

  // Badge Styles
  const getRoleBadge = (role) => {
    const styles = {
      admin:
        "bg-gradient-to-r from-purple-600 to-violet-600 text-white border-0",
      volunteer:
        "bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0",
      donor: "bg-gradient-to-r from-red-500 to-rose-500 text-white border-0",
    };
    return styles[role] || "bg-zinc-100 text-zinc-700";
  };

  const getStatusBadge = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300"
      : "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300";
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <Crown className="w-4 h-4" />;
      case "volunteer":
        return <HandHeart className="w-4 h-4" />;
      default:
        return <Heart className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-red-50 dark:from-zinc-950 dark:to-red-950/10">
        <div className="relative">
          <RefreshCw className="animate-spin text-5xl text-red-600 dark:text-red-400" />
          <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl"></div>
        </div>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          Loading user data...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-b from-white to-red-50 dark:from-zinc-950 dark:to-red-950/10 min-h-screen">
      {/* Header Section */}
      <div className="space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 mb-4">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-red-600 dark:text-red-400">
              User Management
            </span>
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            User Management Dashboard
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">
            Manage user roles, status, and permissions across the platform
          </p>
        </div>

        {/* Current Admin Info */}
        {currentUser && (
          <Card className="border-red-100 dark:border-red-900 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/10 dark:to-rose-900/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-4 border-white dark:border-zinc-800 shadow-lg">
                    <AvatarImage
                      src={currentUser.photoURL}
                      alt={currentUser.displayName}
                    />
                    <AvatarFallback className="text-2xl bg-gradient-to-r from-red-600 to-rose-600 text-white">
                      {currentUser.displayName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                        {currentUser.displayName}
                      </h2>
                      <Badge className="bg-gradient-to-r from-purple-600 to-violet-600 text-white">
                        <Crown className="w-3 h-3 mr-1" /> Admin
                      </Badge>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      {currentUser.email}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                        <Activity className="w-3 h-3" />
                        Last login: Today
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-red-300 dark:border-red-700 text-red-600 dark:text-red-400"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Data
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-red-100 dark:border-red-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Total Users
                  </p>
                  <p className="text-3xl font-bold text-zinc-900 dark:text-white">
                    {totalUsers}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <Progress value={100} className="mt-4 h-2" />
            </CardContent>
          </Card>

          <Card className="border-red-100 dark:border-red-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Active Users
                  </p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {activeCount}
                  </p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                  <UserCheck className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <Progress
                value={(activeCount / totalUsers) * 100}
                className="mt-4 h-2"
              />
            </CardContent>
          </Card>

          <Card className="border-red-100 dark:border-red-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Admins
                  </p>
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {adminCount}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                  <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <Progress
                value={(adminCount / totalUsers) * 100}
                className="mt-4 h-2"
              />
            </CardContent>
          </Card>

          <Card className="border-red-100 dark:border-red-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Donors
                  </p>
                  <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                    {donorCount}
                  </p>
                </div>
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
                  <Heart className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
              </div>
              <Progress
                value={(donorCount / totalUsers) * 100}
                className="mt-4 h-2"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Search and Filter Section */}
      <Card className="border-red-100 dark:border-red-900 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <Input
                  placeholder="Search users by name or email..."
                  className="pl-10 h-12"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-zinc-400" />
                <Select
                  value={filterRole}
                  onValueChange={(value) => {
                    setFilterRole(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-[140px] h-12">
                    <SelectValue placeholder="Filter Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="volunteer">Volunteer</SelectItem>
                    <SelectItem value="donor">Donor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Select
                value={filterStatus}
                onValueChange={(value) => {
                  setFilterStatus(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[140px] h-12">
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
              User List ({filteredUsers.length} users)
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Showing page {currentPage} of {totalPages}
            </p>
          </div>
          <Button className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Add New User
          </Button>
        </div>

        {paginatedUsers.length === 0 ? (
          <Card className="border-red-100 dark:border-red-900">
            <CardContent className="p-12 text-center">
              <Users className="w-16 h-16 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                No users found
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400">
                {searchQuery
                  ? "Try a different search term"
                  : "No users match the current filters"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {paginatedUsers.map((user) => (
              <Card
                key={user._id}
                className="group border-red-100 dark:border-red-900 
                hover:border-red-300 dark:hover:border-red-700 hover:shadow-lg 
                transition-all duration-300 overflow-hidden"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    {/* User Info */}
                    <div className="flex items-start gap-4 flex-1">
                      <Avatar className="h-14 w-14 border-2 border-white dark:border-zinc-800 shadow-md">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-gradient-to-r from-red-500 to-rose-500 text-white text-lg">
                          {user.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold text-zinc-900 dark:text-white">
                            {user.name}
                          </h4>
                          <div className="flex items-center gap-2">
                            <Badge
                              className={`px-2 py-1 rounded-full text-xs ${getRoleBadge(
                                user.role
                              )}`}
                            >
                              {getRoleIcon(user.role)}
                              <span className="ml-1">{user.role}</span>
                            </Badge>
                            <Badge
                              className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(
                                user.status
                              )}`}
                            >
                              {user.status === "active" ? (
                                <CheckCircle className="w-3 h-3 mr-1" />
                              ) : (
                                <XCircle className="w-3 h-3 mr-1" />
                              )}
                              {user.status}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                            <Mail className="w-3 h-3" />
                            {user.email}
                          </div>
                          {user.phone && (
                            <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                              <Phone className="w-3 h-3" />
                              {user.phone}
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                            <Calendar className="w-3 h-3" />
                            Joined:{" "}
                            {new Date(
                              user.createdAt || Date.now()
                            ).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    {currentUser?.email !== user.email && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical className="w-5 h-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuItem className="text-sm">
                            <UserCog className="w-4 h-4 mr-2" />
                            View Full Profile
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />

                          <div className="px-2 py-1">
                            <p className="text-xs font-medium text-zinc-500 mb-2">
                              Change Role
                            </p>
                            <div className="grid grid-cols-2 gap-1">
                              {user.role !== "admin" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-xs h-8"
                                  onClick={() =>
                                    handleRoleChange(user, "admin")
                                  }
                                >
                                  Make Admin
                                </Button>
                              )}
                              {user.role !== "volunteer" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-xs h-8"
                                  onClick={() =>
                                    handleRoleChange(user, "volunteer")
                                  }
                                >
                                  Make Volunteer
                                </Button>
                              )}
                              {user.role !== "donor" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-xs h-8"
                                  onClick={() =>
                                    handleRoleChange(user, "donor")
                                  }
                                >
                                  Make Donor
                                </Button>
                              )}
                            </div>
                          </div>

                          <DropdownMenuSeparator />
                          {user.status === "active" ? (
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(user, "blocked")
                              }
                              className="text-red-600 focus:text-red-600 text-sm"
                            >
                              <UserX className="w-4 h-4 mr-2" />
                              Block User
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(user, "active")}
                              className="text-green-600 focus:text-green-600 text-sm"
                            >
                              <UserCheck className="w-4 h-4 mr-2" />
                              Unblock User
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of{" "}
            {filteredUsers.length} users
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="gap-2"
            >
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
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
