import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
// import { FaUserShield, FaUserTie } from "react-icons/fa";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [filterStatus, setFilterStatus] = useState("");

  const { data: users = [], refetch } = useQuery({
    queryKey: ["all-users", filterStatus],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-users?status=${filterStatus}`);
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

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Users</h2>
        <select
          className="select select-bordered"
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-base-200">
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={user.avatar} alt="Avatar" />
                    </div>
                  </div>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`badge ${
                      user.role === "admin"
                        ? "badge-primary"
                        : user.role === "volunteer"
                        ? "badge-secondary"
                        : "badge-ghost"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge ${
                      user.status === "active"
                        ? "badge-success text-white"
                        : "badge-error text-white"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td>
                  <div className="dropdown dropdown-left">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-sm btn-ghost m-1"
                    >
                      ...
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-1 menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      {/* Status Actions */}
                      {user.status === "active" ? (
                        <li>
                          <a
                            onClick={() => handleStatusChange(user, "blocked")}
                          >
                            Block
                          </a>
                        </li>
                      ) : (
                        <li>
                          <a onClick={() => handleStatusChange(user, "active")}>
                            Unblock
                          </a>
                        </li>
                      )}

                      {/* Role Actions */}
                      <li>
                        <a onClick={() => handleRoleChange(user, "volunteer")}>
                          Make Volunteer
                        </a>
                      </li>
                      <li>
                        <a onClick={() => handleRoleChange(user, "admin")}>
                          Make Admin
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
