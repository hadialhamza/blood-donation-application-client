import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import {
  Plus,
  List,
  DollarSign,
  User,
  Mail,
  MapPin,
  Droplets,
  Shield,
  Calendar,
  Phone,
  Heart,
  Award,
  Activity,
  Edit,
  Users,
  CheckCircle,
  Clock,
  TrendingUp,
  Target,
  BadgeCheck,
  Globe,
} from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch fresh data from DB
  const { data: dbUser = {}, isLoading } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}`);
      return res.data;
    },
  });

  // Fetch additional stats for donor
  const { data: userStats = {} } = useQuery({
    queryKey: ["userStats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-stats/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-red-50 dark:from-zinc-950 dark:to-red-950/10">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 bg-red-500/10 rounded-full blur-xl"></div>
        </div>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          Loading profile...
        </p>
      </div>
    );
  }

  const getRoleBadge = (role) => {
    const styles = {
      admin: "bg-gradient-to-r from-purple-600 to-violet-600 text-white",
      volunteer: "bg-gradient-to-r from-orange-500 to-amber-500 text-white",
      donor: "bg-gradient-to-r from-red-500 to-rose-500 text-white",
    };
    return (
      styles[role] || "bg-gradient-to-r from-red-500 to-rose-500 text-white"
    );
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <Shield className="w-4 h-4" />;
      case "volunteer":
        return <Users className="w-4 h-4" />;
      default:
        return <Heart className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 bg-gradient-to-b from-white to-red-50 dark:from-zinc-950 dark:to-red-950/10 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-rose-600 to-red-500 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

          <div className="relative z-10 p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              {/* Profile Info */}
              <div className="flex items-center gap-6">
                <Avatar className="h-32 w-32 border-4 border-white/80 shadow-2xl">
                  <AvatarImage
                    src={dbUser.image || user?.photoURL}
                    alt={dbUser.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-4xl font-bold bg-gradient-to-r from-red-600 to-rose-600 text-white">
                    {dbUser.name?.charAt(0) || user?.displayName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">
                      {dbUser.name || user?.displayName}
                    </h1>
                    <Badge
                      className={`${getRoleBadge(
                        dbUser.role
                      )} px-4 py-1.5 rounded-full`}
                    >
                      {getRoleIcon(dbUser.role)}
                      <span className="ml-2 capitalize">
                        {dbUser.role || "Donor"}
                      </span>
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-white/80">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{dbUser.email || user?.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Member since{" "}
                        {new Date(
                          dbUser.createdAt || Date.now()
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <Link to="/dashboard/profile/update">
                <Button className="bg-white text-red-600 hover:bg-red-50 border-0 shadow-lg rounded-full px-6 py-6 h-auto">
                  <Edit className="w-5 h-5 mr-2" />
                  Edit Profile
                </Button>
              </Link>
            </div>
          </div>

          {/* Decorative Blood Drops */}
          <div className="absolute bottom-4 right-8 flex gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-3 h-4 bg-white/30 rounded-full rotate-45 animate-pulse delay-${
                  i * 200
                }`}
              ></div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Personal Info */}
          <div className="space-y-8">
            {/* Personal Information Card */}
            <Card className="border-red-100 dark:border-red-900 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-red-600" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                      <Mail className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Email
                      </p>
                      <p className="font-medium">
                        {dbUser.email || user?.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                      <Phone className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Phone
                      </p>
                      <p className="font-medium">
                        {dbUser.phone || "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                      <Droplets className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Blood Group
                      </p>
                      <p className="font-bold text-red-600 dark:text-red-400">
                        {dbUser.bloodGroup || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3 text-zinc-700 dark:text-zinc-300">
                    Location
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          District
                        </p>
                        <p className="font-medium">
                          {dbUser.district || "Not specified"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          Upazila
                        </p>
                        <p className="font-medium">
                          {dbUser.upazila || "Not specified"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Verification */}
            <Card className="border-red-100 dark:border-red-900 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/10 dark:to-rose-900/10">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <BadgeCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white">
                      Account Status
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Verification level
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email Verified</span>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Phone Verified</span>
                    {dbUser.phone ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Clock className="w-4 h-4 text-amber-500" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Medical Info</span>
                    {dbUser.bloodGroup ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Clock className="w-4 h-4 text-amber-500" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column: Stats & Achievements */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-red-100 dark:border-red-900 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Donations Made
                      </p>
                      <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                        {userStats.donations || 0}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-xs text-green-600">
                          +{userStats.thisMonth || 0} this month
                        </span>
                      </div>
                    </div>
                    <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
                      <Heart className="w-8 h-8 text-red-600 dark:text-red-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-100 dark:border-red-900 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Requests Created
                      </p>
                      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {userStats.requests || 0}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Activity className="w-4 h-4 text-blue-500" />
                        <span className="text-xs text-blue-600">
                          Active: {userStats.activeRequests || 0}
                        </span>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                      <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-100 dark:border-red-900 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Success Rate
                      </p>
                      <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                        {userStats.successRate || "0"}%
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Award className="w-4 h-4 text-amber-500" />
                        <span className="text-xs text-amber-600">
                          Level {userStats.level || "New"}
                        </span>
                      </div>
                    </div>
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                      <Award className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Impact Overview */}
            <Card className="border-red-100 dark:border-red-900 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-red-600" />
                  Your Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">
                        Donation Completion
                      </span>
                      <span className="text-sm text-green-600">
                        {userStats.successRate || 0}%
                      </span>
                    </div>
                    <Progress
                      value={userStats.successRate || 0}
                      className="h-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Response Time</span>
                      <span className="text-sm text-blue-600">
                        {userStats.avgResponseTime || 0}h avg
                      </span>
                    </div>
                    <Progress
                      value={Math.min(
                        100,
                        (userStats.avgResponseTime || 0) * 10
                      )}
                      className="h-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">
                        Community Help
                      </span>
                      <span className="text-sm text-purple-600">
                        {userStats.helped || 0} lives
                      </span>
                    </div>
                    <Progress
                      value={Math.min(100, (userStats.helped || 0) * 10)}
                      className="h-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity & Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-red-100 dark:border-red-900">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link to="/dashboard/create-donation-request">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      New Donation Request
                    </Button>
                  </Link>
                  <Link to="/dashboard/my-donation-requests">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-red-200 dark:border-red-800"
                    >
                      <List className="w-4 h-4 mr-2" />
                      View My Requests
                    </Button>
                  </Link>
                  <Link to="/dashboard/funding">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-red-200 dark:border-red-800"
                    >
                      <DollarSign className="w-4 h-4 mr-2" />
                      Support Our Mission
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-red-100 dark:border-red-900 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/10 dark:to-rose-900/10">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                      <Award className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-zinc-900 dark:text-white">
                        Next Milestone
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        5 more donations to reach Gold level
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                        {userStats.donations || 0}/10
                      </div>
                      <Progress
                        value={((userStats.donations || 0) / 10) * 100}
                        className="w-32 h-2 mt-2"
                      />
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                        Donations made
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

// Add missing icon imports
