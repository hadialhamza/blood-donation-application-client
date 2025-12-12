import React from "react";
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  User,
  Clock,
  ArrowLeft,
  Heart,
  Share2,
  MessageCircle,
  Tag,
  TrendingUp,
  Bookmark,
} from "lucide-react";
import Loading from "@/components/shared/Loading";
import useAxios from "../../hooks/useAxios";
import { Button } from "@/components/ui/button";

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

  if (isLoading) return <Loading />;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content?.replace(/<[^>]*>/g, "").split(/\s+/).length || 0;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const readTime = calculateReadTime(blog.content);

  return (
    <div className="bg-linear-to-b from-white to-red-50 dark:from-zinc-950 dark:to-red-950/10 min-h-screen">

      <div className="pt-24 pb-8 px-4 max-w-7xl mx-auto">
        <Button variant="ghost" className="group mb-4" asChild>
          <Link to="/blog">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Stories
          </Link>
        </Button>
      </div>

      <div className="pb-16 px-4 max-w-4xl mx-auto">

        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 mb-6">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-red-600 dark:text-red-400">
              {blog.category || "Life-Saving Story"}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white mb-6 leading-tight">
            {blog.title}
          </h1>


          <div className="flex flex-wrap items-center gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <User className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="font-semibold text-zinc-900 dark:text-white">
                  {blog.author || "BloodLine Team"}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Author
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <Calendar className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="font-semibold text-zinc-900 dark:text-white">
                  {formatDate(blog.createdAt)}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Published
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <Clock className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="font-semibold text-zinc-900 dark:text-white">
                  {readTime} min read
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Reading time
                </p>
              </div>
            </div>
          </div>
        </div>


        <div className="relative rounded-3xl overflow-hidden mb-12 shadow-2xl group">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent"></div>


          <div className="absolute bottom-6 left-6 right-6 text-white">
            <p className="text-sm opacity-80">Featured Image</p>
          </div>
        </div>


        <article className="prose prose-lg dark:prose-invert max-w-none">
          <div className="relative">
            <div
              className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-zinc-900 dark:prose-headings:text-white 
                            prose-p:text-zinc-700 dark:prose-p:text-zinc-300 prose-strong:text-red-600 dark:prose-strong:text-red-400
                            prose-a:text-red-600 dark:prose-a:text-red-400 hover:prose-a:text-red-700 dark:hover:prose-a:text-red-300
                            prose-blockquote:border-red-300 dark:prose-blockquote:border-red-700 prose-blockquote:bg-red-50 dark:prose-blockquote:bg-red-900/10
                            prose-blockquote:rounded-xl prose-blockquote:p-6"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </article>


        {blog.tags?.length > 0 && (
          <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3 mb-4">
              <Tag className="w-5 h-5 text-red-600 dark:text-red-400" />
              <h3 className="text-lg font-semibold">Topics</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 
                                    rounded-full border border-red-100 dark:border-red-800 text-sm font-medium hover:bg-red-100 
                                    dark:hover:bg-red-900/30 transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}


        <div className="mt-16 p-8 rounded-3xl bg-linear-to-r from-red-50 to-rose-50 dark:from-red-900/10 dark:to-rose-900/10 border border-red-100 dark:border-red-800">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-red-500 to-rose-600 flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                About the Author
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                {blog.authorBio ||
                  "Medical professional and blood donation advocate with years of experience in healthcare and community service."}
              </p>
              <div className="flex items-center gap-4">
                <span className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  15+ articles
                </span>
                <span className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  500+ readers
                </span>
              </div>
            </div>
          </div>
        </div>


        <div className="mt-16 p-8 rounded-3xl bg-linear-to-r from-red-600 to-rose-700 text-white text-center shadow-2xl">
          <Heart className="w-16 h-16 mx-auto mb-6" />
          <h3 className="text-2xl font-bold mb-4">Inspired by this story?</h3>
          <p className="text-red-100 mb-8 max-w-2xl mx-auto">
            Join our community of life-saving heroes. Your single donation can
            save up to three lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-red-600 hover:bg-red-50 rounded-full px-8 py-6 text-lg">
              Become a Donor
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg"
            >
              Read More Stories
            </Button>
          </div>
        </div>


        <div
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 lg:hidden bg-white dark:bg-zinc-900 
                    rounded-full shadow-2xl border border-zinc-200 dark:border-zinc-800 px-6 py-3 flex items-center gap-4 z-50"
        >
          <Button variant="ghost" size="sm" className="rounded-full">
            <Heart className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full">
            <Bookmark className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
