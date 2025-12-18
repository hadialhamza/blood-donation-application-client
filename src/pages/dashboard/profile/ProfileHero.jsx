import React from "react";
import { Link } from "react-router";
import {
  Edit,
  MapPin,
  Calendar,
  Shield,
  Heart,
  Users,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const ProfileHero = ({ dbUser, user }) => {
  const userData = {
    name: dbUser.name || user?.displayName || "Anonymous User",
    email: dbUser.email || user?.email || "No email provided",
    image: dbUser.image || user?.photoURL,
    role: dbUser.role || "donor",
    bloodGroup: dbUser.bloodGroup || "N/A",
    phone: dbUser.phone || "Not provided",
    location:
      dbUser.upazila && dbUser.district
        ? `${dbUser.upazila}, ${dbUser.district}`
        : dbUser.district || "Location not set",
    joined: dbUser.timestamp
      ? new Date(dbUser.timestamp).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
      : "N/A",
  };

  const roleConfig = {
    admin: {
      icon: Shield,
      style:
        "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800",
    },
    volunteer: {
      icon: Users,
      style:
        "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    },
    donor: {
      icon: Heart,
      style:
        "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800",
    },
  };

  const CurrentRole = roleConfig[userData.role] || roleConfig.donor;
  const RoleIcon = CurrentRole.icon;

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 shadow-md border border-zinc-100 dark:border-zinc-800">
      <div className="absolute inset-0 h-40 bg-linear-to-r from-zinc-900 via-red-900 to-red-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [bg-size:16px_16px]"></div>
      </div>
      <div className="relative pt-24 px-6 md:px-10 pb-8">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="relative shrink-0">
            <Avatar className="h-36 w-36 border-4 border-white dark:border-zinc-900 shadow-2xl bg-white">
              <AvatarImage
                src={userData.image}
                alt={userData.name}
                className="object-cover"
              />
              <AvatarFallback className="text-4xl font-bold bg-linear-to-br from-red-500 to-rose-600 text-white">
                {userData.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 bg-white dark:bg-zinc-800 p-1.5 rounded-full shadow-md">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-red-600 text-white font-bold text-sm border-2 border-white dark:border-zinc-700">
                {userData.bloodGroup}
              </div>
            </div>
          </div>

          <div className="flex-1 pt-2 md:pt-16 space-y-4 w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
                    {userData.name}
                  </h1>
                  <Badge
                    variant="outline"
                    className={`${CurrentRole.style} px-3 py-0.5 text-xs uppercase tracking-wider font-semibold`}
                  >
                    <RoleIcon className="w-3 h-3 mr-1.5" />
                    {userData.role}
                  </Badge>
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4" /> {userData.email}
                </p>
              </div>

              <Link to="/dashboard/profile/update">
                <Button className="rounded-full px-6 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-lg hover:shadow-xl">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800">
              <InfoItem
                icon={MapPin}
                label="Location"
                value={userData.location}
                color="text-blue-500"
              />
              <InfoItem
                icon={Phone}
                label="Phone"
                value={userData.phone}
                color="text-green-500"
              />
              <InfoItem
                icon={Calendar}
                label="Member Since"
                value={userData.joined}
                color="text-purple-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line
const InfoItem = ({ icon: Icon, label, value, color }) => (
  <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
    <div
      className={`p-2.5 rounded-full bg-white dark:bg-zinc-900 shadow-sm ${color}`}
    >
      <Icon className="w-4 h-4" />
    </div>
    <div>
      <p className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400">
        {label}
      </p>
      <p
        className="text-sm font-medium text-zinc-900 dark:text-zinc-200 truncate max-w-[140px]"
        title={value}
      >
        {value}
      </p>
    </div>
  </div>
);

export default ProfileHero;
