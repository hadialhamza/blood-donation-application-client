import React from "react";
import {
  MoreVertical,
  UserCog,
  UserX,
  UserCheck,
  CheckCircle,
  XCircle,
  Heart,
  HandHeart,
  Crown,
  Mail,
  Phone,
  Calendar,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserCard = ({
  user,
  currentUser,
  handleStatusChange,
  handleRoleChange,
}) => {
  const getRoleBadge = (role) => {
    const styles = {
      admin: "bg-linear-to-r from-purple-600 to-violet-600 text-white border-0",
      volunteer:
        "bg-linear-to-r from-orange-500 to-amber-500 text-white border-0",
      donor: "bg-linear-to-r from-red-500 to-rose-500 text-white border-0",
    };
    return styles[role] || "bg-zinc-100 text-zinc-700";
  };

  const getStatusBadge = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/10 dark:text-green-300"
      : "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/10 dark:text-red-300";
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <Crown className="w-3.5 h-3.5 mr-1" />;
      case "volunteer":
        return <HandHeart className="w-3.5 h-3.5 mr-1" />;
      default:
        return <Heart className="w-3.5 h-3.5 mr-1" />;
    }
  };

  return (
    <Card className="group card-container hover:border-red-300 dark:hover:border-red-900 hover:shadow-xl transition-all duration-500 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full -mr-12 -mt-12 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

      <CardContent className="p-6 relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="relative">
              <Avatar className="h-16 w-16 border-2 border-white dark:border-zinc-800 shadow-xl group-hover:scale-105 transition-transform duration-500">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-brand-gradient text-white text-xl font-bold">
                  {user.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {user.status === "active" && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-white dark:border-zinc-900 rounded-full"></div>
              )}
            </div>

            <div className="space-y-3 flex-1">
              <div>
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h4 className="font-black text-lg text-zinc-900 dark:text-white">
                    {user.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${getRoleBadge(
                        user.role
                      )}`}
                    >
                      {getRoleIcon(user.role)}
                      {user.role}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusBadge(
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

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 font-medium italic">
                    <Mail className="w-3.5 h-3.5 text-zinc-400" />
                    {user.email}
                  </div>
                  {user.phone && (
                    <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                      <Phone className="w-3.5 h-3.5 text-zinc-400" />
                      {user.phone}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-zinc-400 dark:text-zinc-500 font-bold">
                    <Calendar className="w-3.5 h-3.5" />
                    Joined:{" "}
                    {user.timestamp
                      ? new Date(user.timestamp).toLocaleDateString()
                      : "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {currentUser?.email !== user.email && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-zinc-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 rounded-xl border-zinc-100 dark:border-zinc-800 shadow-2xl"
              >
                <DropdownMenuItem className="py-2.5 font-bold text-zinc-600 dark:text-zinc-400">
                  <UserCog className="w-4 h-4 mr-2" />
                  View Full Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <div className="p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg m-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 px-1">
                    Manage Privileges
                  </p>
                  <div className="grid grid-cols-1 gap-1">
                    {user.role !== "admin" && (
                      <DropdownMenuItem
                        className="text-xs h-8 justify-start font-bold hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-purple-900/20 w-full cursor-pointer"
                        onSelect={(e) => {
                          e.preventDefault();
                          setTimeout(
                            () => handleRoleChange(user, "admin"),
                            300
                          );
                        }}
                      >
                        <Shield className="w-3.5 h-3.5 mr-2" /> Make Admin
                      </DropdownMenuItem>
                    )}
                    {user.role !== "volunteer" && (
                      <DropdownMenuItem
                        className="text-xs h-8 justify-start font-bold hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 w-full cursor-pointer"
                        onSelect={() => {
                          setTimeout(
                            () => handleRoleChange(user, "volunteer"),
                            300
                          );
                        }}
                      >
                        <HandHeart className="w-3.5 h-3.5 mr-2" /> Make
                        Volunteer
                      </DropdownMenuItem>
                    )}
                    {user.role !== "donor" && (
                      <DropdownMenuItem
                        className="text-xs h-8 justify-start font-bold hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-900/20 w-full cursor-pointer"
                        onSelect={() => {
                          setTimeout(
                            () => handleRoleChange(user, "donor"),
                            300
                          );
                        }}
                      >
                        <Heart className="w-3.5 h-3.5 mr-2" /> Make Donor
                      </DropdownMenuItem>
                    )}
                  </div>
                </div>

                <DropdownMenuSeparator />
                {user.status === "active" ? (
                  <DropdownMenuItem
                    onSelect={() =>
                      setTimeout(() => handleStatusChange(user, "blocked"), 300)
                    }
                    className="text-red-600 focus:text-white focus:bg-red-600/90 py-2.5 font-bold cursor-pointer"
                  >
                    <UserX className="w-4 h-4 mr-2" />
                    Restrict Access
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    onSelect={() =>
                      setTimeout(() => handleStatusChange(user, "active"), 300)
                    }
                    className="text-green-600 focus:text-white focus:bg-green-600/90 py-2.5 font-bold cursor-pointer"
                  >
                    <UserCheck className="w-4 h-4 mr-2" />
                    Restore Access
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
