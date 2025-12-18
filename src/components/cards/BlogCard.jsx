import React from "react";
import { Link } from "react-router";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const BlogCard = ({ blog }) => {
  return (
    <Card className="group relative overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full rounded-2xl">
      <div className="absolute inset-0 bg-linear-to-br from-red-500/0 via-red-500/0 to-red-500/0 group-hover:from-red-500/5 group-hover:to-rose-500/5 transition-all duration-500 z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="relative h-56 overflow-hidden">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-full shadow-lg">
              {blog.category || "Health"}
            </span>
          </div>

        </div>

        <CardHeader className="p-6 pb-3">
          <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 mb-3">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {blog.author || "BloodLine Team"}
            </div>
          </div>
          <CardTitle className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2">
            {blog.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 pt-0 grow">
          <div
            className="text-zinc-600 dark:text-zinc-400 line-clamp-3 text-sm leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          <div className="flex flex-wrap gap-2 mt-4">
            {(blog.tags || []).slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs font-medium rounded-full border border-red-100 dark:border-red-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0 mt-auto">
          <Button
            variant="outline"
            size="lg"
            className="w-full group/btn border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 hover:border-red-400 dark:hover:border-red-700 transition-all duration-300 rounded-xl"
            asChild
          >
            <Link to={`/blog/${blog._id}`}>
              <span>Read Full Story</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default BlogCard;
