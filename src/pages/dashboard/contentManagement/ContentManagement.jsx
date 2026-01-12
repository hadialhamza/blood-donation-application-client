import React, { useState } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  Plus,
  Trash2,
  MoreVertical,
  FileText,
  Globe,
  PenTool,
  Archive,
  Search,
} from "lucide-react";
import GridCardSkeleton from "@/components/skeletons/GridCardSkeleton";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const ContentManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: blogs = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/blogs");
      return res.data;
    },
  });

  // Client-side Filtering
  const filteredBlogs = blogs.filter((blog) => {
    const matchesStatus = filter === "all" || blog.status === filter;
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Handle Status Change
  const handleStatusChange = async (id, newStatus) => {
    const res = await axiosSecure.patch(`/blogs/status/${id}`, {
      status: newStatus,
    });
    if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        icon: "success",
        title: newStatus === "published" ? "Published!" : "Unpublished!",
        text: `Blog is now ${newStatus}.`,
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  // Handle Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
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

  if (isLoading) return <GridCardSkeleton />;

  return (
    <div className="p-4 md:p-8 min-h-screen bg-slate-50 dark:bg-zinc-950">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <FileText className="w-8 h-8 text-red-600" /> Content Manager
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage, edit, and publish your blog posts.
          </p>
        </div>
        <Link to="/dashboard/add-blog">
          <Button className="bg-red-600 hover:bg-red-700 text-white gap-2 shadow-lg shadow-red-500/20">
            <Plus className="w-4 h-4" /> Create New Blog
          </Button>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
        <Tabs
          defaultValue="all"
          className="w-full md:w-auto"
          onValueChange={setFilter}
        >
          <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
            <TabsTrigger value="all">All Post</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            className="pl-9 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Content Grid */}
      {filteredBlogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-800">
          <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-full mb-4">
            <FileText className="w-8 h-8 text-zinc-400" />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
            No articles found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <Card
              key={blog._id}
              className="group overflow-hidden border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
            >
              {/* Thumbnail Area */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Status Badge Overlay */}
                <div className="absolute top-3 right-3">
                  {blog.status === "published" ? (
                    <Badge className="bg-green-500/90 hover:bg-green-600 text-white backdrop-blur-md border-0 shadow-sm">
                      <Globe className="w-3 h-3 mr-1" /> Published
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="bg-yellow-500/90 hover:bg-yellow-600 text-white backdrop-blur-md border-0 shadow-sm"
                    >
                      <PenTool className="w-3 h-3 mr-1" /> Draft
                    </Badge>
                  )}
                </div>
              </div>

              {/* Content Area */}
              <CardContent className="p-5 grow">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white line-clamp-2 leading-tight mb-2 group-hover:text-red-600 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-3">
                  Click "View" to read the full content preview.
                </p>
              </CardContent>

              {/* Footer Actions */}
              <CardFooter className="p-4 pt-0 flex justify-between items-center border-t border-zinc-100 dark:border-zinc-800 mt-auto bg-zinc-50/50 dark:bg-zinc-900/50">
                <span className="text-xs font-medium text-muted-foreground">
                  ID: {blog._id.slice(-6).toUpperCase()}
                </span>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {blog.status === "draft" ? (
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusChange(blog._id, "published")
                        }
                        className="cursor-pointer"
                      >
                        <Globe className="w-4 h-4 mr-2 text-green-600" />{" "}
                        Publish Now
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(blog._id, "draft")}
                        className="cursor-pointer"
                      >
                        <Archive className="w-4 h-4 mr-2 text-yellow-600" />{" "}
                        Unpublish
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={() => handleDelete(blog._id)}
                      className="text-red-600 focus:text-red-600 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4 mr-2" /> Delete Permanently
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentManagement;
