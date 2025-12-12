import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import {
  Users,
  Droplets,
  DollarSign,
  Calendar,
  MapPin,
  Activity,
  TrendingUp,
  Heart,
  Shield,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  Plus,
  ArrowRight,
  CheckCircle,
  Clock,
  UserCheck,
  Bell,
  Target,
} from "lucide-react";

import { useAuth } from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Loading from "@/components/shared/Loading";

const DashboardHome = () => {
  const { user } = useAuth();
  const [role, isRoleLoading] = useRole();
  const axiosSecure = useAxiosSecure();

  // 1. DATA FETCHING FOR ADMIN / VOLUNTEER
  const { data: stats = {}, isLoading: isStatsLoading } = useQuery({
    queryKey: ["admin-stats"],
    enabled: !isRoleLoading && (role === "admin" || role === "volunteer"),
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

  // Handle Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Request?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      background: "#0f172a",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/donation-request/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Request has been deleted.",
            icon: "success",
            confirmButtonColor: "#ef4444",
          });
          refetch();
        }
      }
    });
  };

  const statusBadgeColor = (status) => {
    const styles = {
      pending:
        "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/40 dark:text-amber-200 dark:border-amber-800",
      inprogress:
        "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/40 dark:text-blue-200 dark:border-blue-800",
      done: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/40 dark:text-green-200 dark:border-green-800",
      canceled:
        "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/40 dark:text-red-200 dark:border-red-800",
    };
    return (
      styles[status] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    );
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <Clock className="w-3 h-3" />,
      inprogress: <Activity className="w-3 h-3" />,
      done: <CheckCircle className="w-3 h-3" />,
      canceled: <AlertCircle className="w-3 h-3" />,
    };
    return icons[status] || <Clock className="w-3 h-3" />;
  };

  if (
    isRoleLoading ||
    (role === "donor" && isRequestsLoading) ||
    ((role === "admin" || role === "volunteer") && isStatsLoading)
  ) {
    return (
      <Loading />
    );
  }

  const userStats = {
    completed: recentRequests.filter((req) => req.status === "done").length,
    pending: recentRequests.filter((req) => req.status === "pending").length,
    total: recentRequests.length,
  };

  return (
    <div className="p-6 space-y-8 bg-gradient-to-b from-white to-red-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 min-h-screen">
      {/* Welcome Header */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Welcome back,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600 dark:from-red-400 dark:to-rose-500">
                {user?.displayName}
              </span>
              !
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {role === "admin" &&
                "Manage the blood donation platform and monitor activities"}
              {role === "volunteer" &&
                "Help coordinate blood donations and assist donors"}
              {role === "donor" &&
                "Track your donation requests and help save lives"}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-4 border-white dark:border-gray-800 shadow-lg">
              <AvatarImage src={user?.photoURL} alt={user?.displayName} />
              <AvatarFallback className="text-2xl bg-gradient-to-r from-red-600 to-rose-600 dark:from-red-500 dark:to-rose-500 text-white">
                {user?.displayName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <Badge className="bg-gradient-to-r from-red-600 to-rose-600 dark:from-red-700 dark:to-rose-700 text-white capitalize">
                {role === "admin" && <Shield className="w-3 h-3 mr-1" />}
                {role === "volunteer" && <Users className="w-3 h-3 mr-1" />}
                {role === "donor" && <Heart className="w-3 h-3 mr-1" />}
                {role}
              </Badge>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ADMIN/VOLUNTEER DASHBOARD */}
      {(role === "admin" || role === "volunteer") && (
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Total Users
                    </p>
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {stats.users || 0}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-4 h-4 text-green-500 dark:text-green-400" />
                      <span className="text-xs text-green-600 dark:text-green-400">
                        +12% this month
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-xl">
                    <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Total Funding
                    </p>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                      ${stats.revenue || 0}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-4 h-4 text-green-500 dark:text-green-400" />
                      <span className="text-xs text-green-600 dark:text-green-400">
                        +24% this month
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-green-100 dark:bg-green-900/40 rounded-xl">
                    <DollarSign className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Blood Requests
                    </p>
                    <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                      {stats.bloodRequests || 0}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Activity className="w-4 h-4 text-red-500 dark:text-red-400" />
                      <span className="text-xs text-red-600 dark:text-red-400">
                        5 pending
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-red-100 dark:bg-red-900/40 rounded-xl">
                    <Droplets className="w-8 h-8 text-red-600 dark:text-red-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Success Rate
                    </p>
                    <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                      94%
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Target className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                      <span className="text-xs text-purple-600 dark:text-purple-400">
                        High efficiency
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/40 rounded-xl">
                    <CheckCircle className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Stats & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">
                  Platform Overview
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Real-time statistics and performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Donor Growth
                      </span>
                      <span className="text-sm text-green-600 dark:text-green-400">
                        +28%
                      </span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Request Fulfillment
                      </span>
                      <span className="text-sm text-blue-600 dark:text-blue-400">
                        94%
                      </span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Fund Utilization
                      </span>
                      <span className="text-sm text-amber-600 dark:text-amber-400">
                        82%
                      </span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">
                  Quick Actions
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Common administrative tasks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/dashboard/all-users">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Manage Users
                  </Button>
                </Link>
                <Link to="/dashboard/all-donation-requests">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Droplets className="w-4 h-4 mr-2" />
                    View Requests
                  </Button>
                </Link>
                <Link to="/dashboard/funding">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Funding Report
                  </Button>
                </Link>
                <Link to="/dashboard/create-blog">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Create Blog
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* DONOR DASHBOARD */}
      {role === "donor" && (
        <div className="space-y-8">
          {/* Donor Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Total Requests
                    </p>
                    <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                      {userStats.total}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      All time requests
                    </p>
                  </div>
                  <div className="p-3 bg-red-100 dark:bg-red-900/40 rounded-xl">
                    <Heart className="w-8 h-8 text-red-600 dark:text-red-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Completed
                    </p>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {userStats.completed}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Successful donations
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 dark:bg-green-900/40 rounded-xl">
                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Pending
                    </p>
                    <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                      {userStats.pending}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Awaiting response
                    </p>
                  </div>
                  <div className="p-3 bg-amber-100 dark:bg-amber-900/40 rounded-xl">
                    <Clock className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Requests */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Recent Donation Requests
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Track and manage your blood donation requests
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link to="/dashboard/my-donation-requests">
                  <Button
                    variant="outline"
                    className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    View All Requests
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/dashboard/create-donation-request">
                  <Button className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 dark:from-red-500 dark:to-rose-500">
                    <Plus className="w-4 h-4 mr-2" />
                    New Request
                  </Button>
                </Link>
              </div>
            </div>

            {recentRequests.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {recentRequests.map((req) => (
                  <Card
                    key={req._id}
                    className="group border-gray-200 dark:border-gray-800 
                    hover:border-red-300 dark:hover:border-red-700 hover:shadow-xl 
                    transition-all duration-300 overflow-hidden bg-white dark:bg-gray-900"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-500 dark:from-red-400 dark:to-rose-500" />
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1">
                              {req.recipientName}
                            </h3>
                            <Badge
                              className={`mt-2 ${statusBadgeColor(req.status)}`}
                            >
                              {getStatusIcon(req.status)}
                              <span className="ml-1 capitalize">
                                {req.status}
                              </span>
                            </Badge>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-red-600 dark:text-red-400">
                              {req.bloodGroup}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Blood Group
                            </p>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {req.recipientDistrict}, {req.recipientUpazila}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {req.donationDate} at {req.donationTime}
                            </span>
                          </div>
                          {req.status === "inprogress" && req.donorName && (
                            <div className="flex items-center gap-2">
                              <UserCheck className="w-4 h-4 text-green-500 dark:text-green-400" />
                              <span className="text-sm text-green-600 dark:text-green-400">
                                {req.donorName}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                          <div className="flex items-center gap-2">
                            <Link
                              to={`/dashboard/donation-request-details/${req._id}`}
                            >
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                            </Link>
                            <Link to={`/dashboard/update-request/${req._id}`}>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                              >
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                            </Link>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30"
                            onClick={() => handleDelete(req._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <CardContent className="p-12 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 relative">
                    <div className="absolute inset-0 bg-red-500/10 rounded-full animate-pulse"></div>
                    <Bell className="w-20 h-20 text-gray-300 dark:text-gray-700 mx-auto relative z-10" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    No donation requests yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                    You haven't created any blood donation requests. Create your
                    first request to help someone in need.
                  </p>
                  <Link to="/dashboard/create-donation-request">
                    <Button className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 dark:from-red-500 dark:to-rose-500">
                      <Plus className="w-4 h-4 mr-2" />
                      Create First Request
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Quick Tips */}
          <Card className="bg-gradient-to-r from-red-50 to-rose-50 dark:from-gray-900 dark:to-gray-800 border-red-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-100 dark:bg-red-900/40 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Donation Tips
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Drink plenty of water before donating</li>
                    <li>• Eat iron-rich foods 2-3 days before donation</li>
                    <li>• Get a good night's sleep before donating</li>
                    <li>• Avoid alcohol 24 hours before donation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
