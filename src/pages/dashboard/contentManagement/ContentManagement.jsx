import React from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaPlus, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
        <Link to="/dashboard/add-blog">
          <Button className="gap-2 bg-red-600 hover:bg-red-700">
            <FaPlus /> Add Blog
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Card key={blog._id} className="shadow-md overflow-hidden flex flex-col justify-between">
            <div>
              <div className="h-48 overflow-hidden">
                <img
                  src={blog.thumbnail}
                  alt="Thumbnail"
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
              <CardContent className="p-4">
                <CardTitle className="text-lg line-clamp-2">{blog.title}</CardTitle>
              </CardContent>
            </div>

            <CardFooter className="p-4 pt-0 flex justify-between items-center">
              {/* Status Badge/Toggle */}
              {blog.status === "draft" ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange(blog._id, "published")}
                  className="text-yellow-600 border-yellow-200 hover:bg-yellow-50"
                >
                  Draft (Click to Publish)
                </Button>
              ) : (
                <Button
                  variant="default" // Using default green-ish if I customized or just use a class
                  size="sm"
                  onClick={() => handleStatusChange(blog._id, "draft")}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Published
                </Button>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(blog._id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <FaTrash />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContentManagement;
