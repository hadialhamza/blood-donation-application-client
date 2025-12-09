import React from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { TbFidgetSpinner } from "react-icons/tb";
import useAxios from "../../hooks/useAxios";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
          <Card key={blog._id} className="shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-between overflow-hidden">
            <div>
              <div className="h-48 overflow-hidden">
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-xl line-clamp-2">{blog.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div
                  className="text-muted-foreground line-clamp-3 text-sm"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </CardContent>
            </div>
            <CardFooter className="p-4 pt-0 flex justify-end">
              <Link to={`/blog/${blog._id}`}>
                <Button variant="outline" size="sm" className="border-red-600 text-red-600 hover:bg-red-50">
                  Read More
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Blog;
