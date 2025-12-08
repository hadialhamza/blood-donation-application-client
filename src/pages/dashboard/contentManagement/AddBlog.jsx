import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import JoditEditor from "jodit-react";
import { uploadImage } from "../../../utils/uploadImage";

const AddBlog = () => {
  const editor = useRef(null);
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
        content: content, // HTML content from editor
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
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Create New Blog</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div className="form-control">
          <label className="label font-bold">Title</label>
          <input
            type="text"
            className="input input-bordered"
            {...register("title", { required: true })}
          />
        </div>

        {/* Thumbnail */}
        <div className="form-control">
          <label className="label font-bold">Thumbnail Image</label>
          <input
            type="file"
            className="file-input file-input-bordered"
            {...register("thumbnail", { required: true })}
          />
        </div>

        {/* Content */}
        <div className="form-control">
          <label className="label font-bold">Content</label>
          {/* Use JoditEditor here if installed, otherwise Textarea */}
          <textarea
            className="textarea textarea-bordered h-40"
            placeholder="Write your blog content here (HTML supported)..."
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        <button className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
