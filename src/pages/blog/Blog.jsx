import React from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { TbFidgetSpinner } from "react-icons/tb";
import useAxios from "../../hooks/useAxios";

const Blog = () => {
  // Public API call
  const api = useAxios();
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["published-blogs"],
    queryFn: async () => {
      const res = await api.get("blogs?status=published");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center mt-20">
        <TbFidgetSpinner className="animate-spin text-4xl text-red-600" />
      </div>
    );

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-red-600">
        Our Blog
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div key={blog._id} className="card bg-base-100 shadow-xl">
            <figure className="h-48 overflow-hidden">
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-full object-cover hover:scale-105 transition"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{blog.title}</h3>
              {/* Render simple preview or full HTML */}
              <div
                className="text-gray-500 line-clamp-3"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
              <div className="card-actions justify-end mt-4">
                <Link
                  to={`/blog/${blog._id}`}
                  className="btn btn-primary btn-sm btn-outline"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
