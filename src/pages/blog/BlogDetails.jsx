import React from "react";
import { useParams } from "react-router"; // Fixed import
import { useQuery } from "@tanstack/react-query";
import { TbFidgetSpinner } from "react-icons/tb";
import useAxios from "../../hooks/useAxios";

const BlogDetails = () => {
    const { id } = useParams();
    const api = useAxios();

    const { data: blog = {}, isLoading } = useQuery({
        queryKey: ["blog", id],
        queryFn: async () => {
            const res = await api.get(`/blogs/${id}`);
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
        <div className="pt-24 pb-12 px-4 max-w-4xl mx-auto min-h-screen">
            <div className="bg-base-100 shadow-xl rounded-xl overflow-hidden">
                {/* Thumbnail */}
                <figure className="h-64 md:h-96 w-full">
                    <img
                        src={blog.thumbnail}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                </figure>

                <div className="p-8">
                    {/* Title */}
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">
                        {blog.title}
                    </h1>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
                        {/* Timestamp could be formatted here */}
                        {/* <span>{new Date(blog.createdAt).toLocaleDateString()}</span> */}
                    </div>

                    {/* Content */}
                    <div
                        className="prose prose-lg max-w-none prose-red"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;
