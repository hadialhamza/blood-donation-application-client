import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Users } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import Loading from "@/components/shared/Loading";
import UserStats from "./UserStats";
import UserFilters from "./UserFilters";
import UserCard from "./UserCard";
import UserPagination from "./UserPagination";
import AdminHeader from "../adminHomePage/AdminHeader";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user: currentUser } = useAuth();
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRole, setFilterRole] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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

  const { data: adminStats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const { data: adminProfile = {} } = useQuery({
    queryKey: ["admin-profile", currentUser?.email],
    enabled: !!currentUser?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${currentUser.email}`);
      return res.data;
    },
  });

  const stats = {
    total: users.length,
    admins: users.filter((u) => u.role === "admin").length,
    volunteers: users.filter((u) => u.role === "volunteer").length,
    donors: users.filter((u) => u.role === "donor").length,
    active: users.filter((u) => u.status === "active").length,
    blocked: users.filter((u) => u.status === "blocked").length,
  };

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

  const roleOrder = { admin: 1, volunteer: 2, donor: 3 };
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    return (roleOrder[a.role] || 3) - (roleOrder[b.role] || 3);
  });

  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleStatusChange = (user, newStatus) => {
    Swal.fire({
      title: `Confirm Status Change`,
      text: `Are you sure you want to ${
        newStatus === "active" ? "unblock" : "block"
      } ${user.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${
        newStatus === "active" ? "Restore" : "Restrict"
      }`,
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "bg-red-600 dark:bg-red-700",
        popup: "rounded-3xl dark:bg-zinc-900 border-none",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/users/status/${user._id}`, {
            status: newStatus,
          });
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Updated!",
              text: `User access has been ${
                newStatus === "active" ? "restored" : "restricted"
              }.`,
              icon: "success",
              confirmButtonColor: "#ef4444",
              customClass: {
                popup: "rounded-3xl dark:bg-zinc-900 border-none",
              },
            });
          }
        } catch (error) {
          Swal.fire(error, "Failed to update status", "error");
        }
      }
    });
  };

  // Handle Role Change
  const handleRoleChange = (user, newRole) => {
    Swal.fire({
      title: `Update User Role`,
      text: `Make ${user.name} a ${newRole}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Confirm Change`,
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "bg-blue-600 dark:bg-blue-700",
        popup: "rounded-3xl dark:bg-zinc-900 border-none",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/users/role/${user._id}`, {
            role: newRole,
          });
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Role Updated!",
              text: `${user.name} now has ${newRole} privileges.`,
              icon: "success",
              confirmButtonColor: "#ef4444",
              customClass: {
                popup: "rounded-3xl dark:bg-zinc-900 border-none",
              },
            });
          }
        } catch (error) {
          Swal.fire(error, "Failed to update role", "error");
        }
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="page-container space-y-10">
      {/* Page Header */}
      <AdminHeader
        user={currentUser}
        adminProfile={adminProfile}
        stats={adminStats}
      />

      {/* Statistics Section */}
      <UserStats stats={stats} />

      {/* Filters Section */}
      <UserFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterRole={filterRole}
        setFilterRole={setFilterRole}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        setCurrentPage={setCurrentPage}
      />

      {/* Users List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-black text-zinc-900 dark:text-white">
              Platform Personnel
            </h3>
            <Badge
              variant="secondary"
              className="rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 font-bold"
            >
              {filteredUsers.length}
            </Badge>
          </div>
        </div>

        {paginatedUsers.length === 0 ? (
          <div className="card-container p-20 text-center bg-zinc-50/50 dark:bg-zinc-900/50 border-dashed border-2">
            <Users className="w-20 h-20 text-zinc-200 dark:text-zinc-800 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-2">
              No matching users found
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium max-w-xs mx-auto">
              We couldn't find anyone matching your current search or filter
              criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
            {paginatedUsers.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                currentUser={currentUser}
                handleStatusChange={handleStatusChange}
                handleRoleChange={handleRoleChange}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pagination Container */}
      <UserPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        totalFiltered={filteredUsers.length}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export default AllUsers;
