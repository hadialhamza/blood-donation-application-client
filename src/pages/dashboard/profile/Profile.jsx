import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaEdit, FaMapMarkerAlt, FaTint, FaEnvelope } from "react-icons/fa";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch fresh data from DB to ensure we show the latest (Upazila/District might not be in Firebase 'user' object)
  const { data: dbUser = {} } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="p-8 flex justify-center items-center min-h-[80vh]">
      <Card className="w-full max-w-3xl shadow-xl overflow-hidden">
        {/* Header Background */}
        <div className="bg-linear-to-r from-red-500 to-red-700 h-48 relative">
          <div className="absolute -bottom-16 left-8">
            <Avatar className="h-32 w-32 border-4 border-white ring-offset-background">
              <AvatarImage src={dbUser.image || user?.photoURL} alt="Profile" />
              <AvatarFallback className="text-4xl font-bold">
                {dbUser.name?.charAt(0) || user?.displayName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        <CardContent className="mt-20 p-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold">{dbUser.name}</h2>
              <p className="text-muted-foreground font-semibold">
                {dbUser.role || "Donor"}
              </p>
            </div>
            <Link to="/dashboard/profile/update">
              <Button
                variant="outline"
                className="gap-2 text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50"
              >
                <FaEdit /> Edit Profile
              </Button>
            </Link>
          </div>

          <Separator className="my-6" />

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border">
              <div className="p-3 bg-red-100 text-red-600 rounded-full">
                <FaEnvelope size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email Address</p>
                <p className="font-medium">{dbUser.email}</p>
              </div>
            </div>

            {/* Blood Group */}
            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border">
              <div className="p-3 bg-red-100 text-red-600 rounded-full">
                <FaTint size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Blood Group</p>
                <p className="font-medium">{dbUser.bloodGroup}</p>
              </div>
            </div>

            {/* Location (District) */}
            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border">
              <div className="p-3 bg-red-100 text-red-600 rounded-full">
                <FaMapMarkerAlt size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">District</p>
                <p className="font-medium">{dbUser.district}</p>
              </div>
            </div>

            {/* Location (Upazila) */}
            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border">
              <div className="p-3 bg-red-100 text-red-600 rounded-full">
                <FaMapMarkerAlt size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Upazila</p>
                <p className="font-medium">{dbUser.upazila}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
