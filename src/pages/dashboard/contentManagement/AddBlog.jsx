import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { uploadImage } from "../../../utils/uploadImage";

import {
  PenTool,
  ImagePlus,
  Type,
  FileText,
  Save,
  ArrowLeft,
  Loader2,
} from "lucide-react"; // Icons

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-4 md:p-8">
      {/* Top Navigation / Breadcrumb area */}
      <div className="max-w-4xl mx-auto mb-6">
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent hover:text-red-600 transition-colors"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Button>
      </div>

      <Card className="max-w-4xl mx-auto border-none shadow-2xl bg-white dark:bg-zinc-900 overflow-hidden">
        {/* Header Section */}
        <div className="bg-red-600 dark:bg-red-900/30 h-2 w-full"></div>
        <CardHeader className="pt-8 px-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-xl text-red-600">
              <PenTool className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold text-zinc-900 dark:text-white">
                Create New Blog
              </CardTitle>
              <CardDescription>
                Share your thoughts, medical tips, or news with the community.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <Separator className="bg-slate-100 dark:bg-zinc-800" />

        <CardContent className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* 1. Title Input */}
            <div className="space-y-3">
              <Label
                htmlFor="title"
                className="text-base font-semibold flex items-center gap-2"
              >
                <Type className="w-4 h-4 text-zinc-500" /> Blog Title
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter an engaging title..."
                className="h-12 text-lg border-zinc-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800/50 focus-visible:ring-red-500"
                {...register("title", { required: true })}
              />
            </div>

            {/* 2. Thumbnail Input (Styled) */}
            <div className="space-y-3">
              <Label
                htmlFor="thumbnail"
                className="text-base font-semibold flex items-center gap-2"
              >
                <ImagePlus className="w-4 h-4 text-zinc-500" /> Cover Image
              </Label>
              <div className="relative group">
                <Input
                  id="thumbnail"
                  type="file"
                  className="cursor-pointer pt-[7px] h-12 border-dashed border-2 border-zinc-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800/50 
                               file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0
                               file:text-xs file:font-semibold file:bg-red-600 file:text-white
                               hover:file:bg-red-700 transition-all text-sm text-zinc-600"
                  {...register("thumbnail", { required: true })}
                />
              </div>
              <p className="text-xs text-muted-foreground ml-1">
                Supported formats: JPG, PNG, WEBP. Max size: 5MB.
              </p>
            </div>

            {/* 3. Content Textarea */}
            <div className="space-y-3">
              <Label
                htmlFor="content"
                className="text-base font-semibold flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-zinc-500" /> Article Content
              </Label>
              <Textarea
                id="content"
                className="min-h-[300px] resize-y p-4 text-base leading-relaxed border-zinc-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800/50 focus-visible:ring-red-500 font-sans"
                placeholder="Start writing your amazing story here..."
                onChange={(e) => setContent(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground text-right">
                HTML formatting is supported.
              </p>
            </div>

            {/* Submit Action */}
            <div className="pt-4 flex items-center justify-end">
              <Button
                className="w-full md:w-auto min-w-[200px] bg-red-600 hover:bg-red-700 text-white font-bold h-12 rounded-xl shadow-lg hover:shadow-xl transition-all"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin text-xl mr-2" />{" "}
                    Publishing...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" /> Publish Blog
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddBlog;
