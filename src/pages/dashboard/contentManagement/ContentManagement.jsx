import React from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaPlus, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ContentManagement = () => {
  const axiosSecure = useAxiosSecure();

  const { data: blogs = [], refetch } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/blogs"); // Admin gets all
      return res.data;
    },
  });

  // Handle Status Change (Draft <-> Published)
  const handleStatusChange = async (id, newStatus) => {
    const res = await axiosSecure.patch(`/blogs/status/${id}`, {
      status: newStatus,
    });
    if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire("Updated", `Blog is now ${newStatus}`, "success");
    }
  };

  // Handle Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this blog?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/blogs/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Blog has been removed.", "success");
          refetch();
        }
      }
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Content Management</h2>
        <Link to="/dashboard/add-blog" className="btn btn-primary text-white">
          <FaPlus /> Add Blog
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="card bg-base-100 shadow-xl border">
            <figure className="h-48 overflow-hidden">
              <img
                src={blog.thumbnail}
                alt="Thumbnail"
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title text-lg">{blog.title}</h3>
              <div className="flex justify-between items-center mt-4">
                {/* Status Badge/Toggle */}
                {blog.status === "draft" ? (
                  <button
                    onClick={() => handleStatusChange(blog._id, "published")}
                    className="btn btn-xs btn-outline btn-warning"
                  >
                    Draft (Click to Publish)
                  </button>
                ) : (
                  <button
                    onClick={() => handleStatusChange(blog._id, "draft")}
                    className="btn btn-xs btn-success text-white"
                  >
                    Published
                  </button>
                )}

                <button
                  onClick={() => handleDelete(blog._id)}
                  className="btn btn-sm btn-ghost text-red-500"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentManagement;
