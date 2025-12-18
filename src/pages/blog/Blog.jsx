import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Heart, TrendingUp, BookOpen, MessageCircle } from "lucide-react";
import Loading from "@/components/shared/Loading";
import useAxios from "../../hooks/useAxios";
import { Button } from "@/components/ui/button";
import Container from "@/components/shared/container/Container";
import SectionHeader from "@/components/shared/SectionHeader";
import BlogCard from "@/components/cards/BlogCard";

const Blog = () => {
  const api = useAxios();
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["published-blogs"],
    queryFn: async () => {
      const res = await api.get("blogs?status=published");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen pt-28 pb-20 bg-gradient-primary">
      <Container>
        {/* Section Header */}
        <SectionHeader
          icon={BookOpen}
          badge="Knowledge Hub"
          title="Stories That"
          highlight="Save Lives"
          description="Discover inspiring stories, medical insights, and expert advice from our community of donors, medical professionals, and life-saving heroes."
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="card-container text-center py-8">
            <BookOpen className="w-8 h-8 text-red-600 dark:text-red-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-zinc-900 dark:text-white mb-1">
              {blogs.length}
            </div>
            <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Articles Published
            </div>
          </div>
          <div className="card-container text-center py-8">
            <MessageCircle className="w-8 h-8 text-red-600 dark:text-red-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-zinc-900 dark:text-white mb-1">
              500+
            </div>
            <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Community Stories
            </div>
          </div>
          <div className="card-container text-center py-8">
            <TrendingUp className="w-8 h-8 text-red-600 dark:text-red-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-zinc-900 dark:text-white mb-1">
              10K+
            </div>
            <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Monthly Readers
            </div>
          </div>
          <div className="card-container text-center py-8">
            <Heart className="w-8 h-8 text-red-600 dark:text-red-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-zinc-900 dark:text-white mb-1">
              95%
            </div>
            <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Donor Engagement
            </div>
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>

        {/* Empty State */}
        {blogs.length === 0 && (
          <div className="text-center py-20 card-container bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
            <div className="w-24 h-24 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-red-500/10 rounded-full animate-pulse"></div>
              <BookOpen className="w-24 h-24 text-red-400 mx-auto relative z-10" />
            </div>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">
              No articles yet
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-md mx-auto mb-8">
              Our medical experts are preparing valuable content about blood
              donation, health tips, and inspiring stories. Check back soon!
            </p>
            <Button className="bg-brand-gradient">Subscribe for Updates</Button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Blog;
