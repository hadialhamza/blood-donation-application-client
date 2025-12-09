import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { uploadImage } from "../../../utils/uploadImage";
import { TbFidgetSpinner } from "react-icons/tb";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AddBlog = () => {
  const [content, setContent] = useState(""); // For Rich Text
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // 1. Upload Image
      const imageUrl = await uploadImage(data.thumbnail[0]);

      // 2. Save Blog
      const blogData = {
        title: data.title,
        thumbnail: imageUrl,
        content: content,
      };

      const res = await axiosSecure.post("/blogs", blogData);
      if (res.data.insertedId) {
        Swal.fire("Success", "Blog created successfully", "success");
        navigate("/dashboard/content-management");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to create blog", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Create New Blog</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="font-bold">Title</Label>
              <Input
                id="title"
                type="text"
                {...register("title", { required: true })}
              />
            </div>

            {/* Thumbnail */}
            <div className="space-y-2">
              <Label htmlFor="thumbnail" className="font-bold">Thumbnail Image</Label>
              <Input
                id="thumbnail"
                type="file"
                className="cursor-pointer"
                {...register("thumbnail", { required: true })}
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="content" className="font-bold">Content</Label>
              <Textarea
                id="content"
                className="h-40"
                placeholder="Write your blog content here (HTML supported)..."
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            <Button className="w-full bg-red-600 hover:bg-red-700 font-bold" disabled={loading}>
              {loading ? (
                <>
                  <TbFidgetSpinner className="animate-spin text-xl mr-2" /> Creating...
                </>
              ) : "Create Blog"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddBlog;
