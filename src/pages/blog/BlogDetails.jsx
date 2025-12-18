import React from "react";
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  User,
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
import Container from "@/components/shared/container/Container";

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
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-linear-to-b from-white to-red-50 dark:from-zinc-950 dark:to-red-950/10 min-h-screen pt-32 pb-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="ghost"
              className="group pl-0 hover:bg-transparent"
              asChild
            >
              <Link to="/blog">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Stories
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full h-10 w-10 p-0"
              >
                <Bookmark className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full h-10 w-10 p-0"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Header */}
          <header className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 mb-6">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                {blog.category || "Life-Saving Story"}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-white mb-8 leading-[1.1] tracking-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-8 mb-8 border-b border-zinc-100 dark:border-zinc-800 pb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="font-bold text-zinc-900 dark:text-white">
                    {blog.author || "BloodLine Team"}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Author
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="font-bold text-zinc-900 dark:text-white">
                    {formatDate(blog.createdAt)}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Published
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* Hero Image */}
          <div className="relative rounded-4xl overflow-hidden mb-16 shadow-2xl border border-white dark:border-zinc-800">
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="w-full h-[300px] md:h-[550px] object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>
          </div>

          {/* Content */}
          <article className="prose prose-lg md:prose-xl dark:prose-invert max-w-none">
            <div
              className="prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-zinc-900 dark:prose-headings:text-white 
                prose-p:text-zinc-700 dark:prose-p:text-zinc-300 prose-p:leading-relaxed
                prose-strong:text-red-600 dark:prose-strong:text-red-400
                prose-a:text-red-600 dark:prose-a:text-red-400 hover:prose-a:text-red-700 dark:hover:prose-a:text-red-300
                prose-blockquote:border-l-4 prose-blockquote:border-red-500 prose-blockquote:bg-red-50/50 dark:prose-blockquote:bg-red-900/10
                prose-blockquote:rounded-r-2xl prose-blockquote:p-8 prose-blockquote:italic prose-blockquote:font-medium
                prose-img:rounded-3xl prose-img:shadow-xl"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </article>

          {/* Tags */}
          {blog.tags?.length > 0 && (
            <div className="mt-20 pt-10 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                  <Tag className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
                </div>
                <h3 className="text-xl font-bold">Related Topics</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-5 py-2.5 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 
                      rounded-full border border-zinc-200 dark:border-zinc-800 text-sm font-semibold hover:border-red-300 
                      dark:hover:border-red-900 hover:text-red-600 transition-all cursor-pointer shadow-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Card */}
          <div className="mt-20 p-10 rounded-[2.5rem] bg-linear-to-br from-white to-red-50/30 dark:from-zinc-900 dark:to-red-950/10 border border-red-100 dark:border-red-900/50 shadow-xl overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
              <div className="w-24 h-24 rounded-3xl bg-brand-gradient flex items-center justify-center shrink-0 shadow-lg rotate-3 group-hover:rotate-0 transition-transform duration-500">
                <User className="w-12 h-12 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">
                      {blog.author || "BloodLine Team"}
                    </h3>
                    <p className="text-red-600 font-semibold text-sm uppercase tracking-wider">
                      Medical Contributor
                    </p>
                  </div>
                  <Button className="rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-100">
                    Follow Author
                  </Button>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mb-6">
                  {blog.authorBio ||
                    "Dedicated to spreading awareness about blood donation and healthcare through evidence-based storytelling."}
                </p>
                <div className="flex items-center justify-center md:justify-start gap-6">
                  <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                    <TrendingUp className="w-4 h-4 text-red-500" />
                    <span className="font-semibold">15+ Articles</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                    <MessageCircle className="w-4 h-4 text-red-500" />
                    <span className="font-semibold">500+ Readers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Mobile Actions Bubble */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 lg:hidden z-50">
        <div className="bg-zinc-900 dark:bg-zinc-800 text-white rounded-full shadow-2xl px-6 py-4 flex items-center gap-6 backdrop-blur-md bg-opacity-90">
          <button className="hover:text-red-500 transition-colors">
            <Heart className="w-6 h-6" />
          </button>
          <div className="w-px h-6 bg-zinc-700"></div>
          <button className="hover:text-red-500 transition-colors">
            <Bookmark className="w-6 h-6" />
          </button>
          <div className="w-px h-6 bg-zinc-700"></div>
          <button className="hover:text-red-500 transition-colors">
            <Share2 className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
