import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { MoreHorizontal } from "lucide-react";

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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [filterStatus, setFilterStatus] = useState("all");

  const { data: users = [], refetch } = useQuery({
    queryKey: ["all-users", filterStatus],
    queryFn: async () => {
      const query = filterStatus === "all" ? "" : `?status=${filterStatus}`;
      const res = await axiosSecure.get(`/all-users${query}`);
      return res.data;
    },
  });

  // Handle Status Change (Block/Unblock)
  const handleStatusChange = (user, newStatus) => {
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
  };

  // Handle Role Change (Make Admin/Volunteer)
  const handleRoleChange = (user, newRole) => {
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
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-purple-500 hover:bg-purple-600 border-transparent text-white";
      case "volunteer":
        return "bg-orange-500 hover:bg-orange-600 border-transparent text-white";
      default:
        return "bg-gray-500 hover:bg-gray-600 border-transparent text-white";
    }
  };

  const getStatusBadgeColor = (status) => {
    return status === "active"
      ? "bg-green-500 hover:bg-green-600 border-transparent text-white"
      : "bg-red-500 hover:bg-red-600 border-transparent text-white";
  };

  return (
    <div className="p-6 space-y-6">
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

      <div className="rounded-md border">
        <Table>
          <TableHeader>
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
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge className={getRoleBadgeColor(user.role)}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeColor(user.status)}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      {/* Status Actions */}
                      {user.status === "active" ? (
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(user, "blocked")}
                          className="text-red-600 focus:text-red-600"
                        >
                          Block User
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(user, "active")}
                          className="text-green-600 focus:text-green-600"
                        >
                          Unblock User
                        </DropdownMenuItem>
                      )}

                      <DropdownMenuSeparator />

                      {/* Role Actions */}
                      <DropdownMenuItem
                        onClick={() => handleRoleChange(user, "volunteer")}
                      >
                        Make Volunteer
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleRoleChange(user, "admin")}
                      >
                        Make Admin
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllUsers;
