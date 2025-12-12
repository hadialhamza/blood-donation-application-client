import React from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  User,
  ArrowRight,
  Heart,
  Clock,
  TrendingUp,
  BookOpen,
  MessageCircle,
} from "lucide-react";
import Loading from "@/components/shared/Loading";
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
    <div className="bg-linear-to-b from-white to-red-50 dark:from-zinc-950 dark:to-red-950/10 min-h-screen">
      <section className="pt-28 pb-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 mb-6">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-red-600 dark:text-red-400">
              Knowledge Hub
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
            Stories That{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-rose-600">
              Save Lives
            </span>
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Discover inspiring stories, medical insights, and expert advice from
            our community of donors, medical professionals, and life-saving
            heroes.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-center shadow-sm">
            <BookOpen className="w-8 h-8 text-red-600 dark:text-red-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-zinc-900 dark:text-white">
              {blogs.length}
            </div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">
              Articles Published
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-center shadow-sm">
            <MessageCircle className="w-8 h-8 text-red-600 dark:text-red-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-zinc-900 dark:text-white">
              500+
            </div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">
              Community Stories
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-center shadow-sm">
            <TrendingUp className="w-8 h-8 text-red-600 dark:text-red-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-zinc-900 dark:text-white">
              10K+
            </div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">
              Monthly Readers
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-center shadow-sm">
            <Heart className="w-8 h-8 text-red-600 dark:text-red-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-zinc-900 dark:text-white">
              95%
            </div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">
              Donor Engagement
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Card
              key={blog._id}
              className="group relative overflow-hidden border border-zinc-200 dark:border-zinc-800 
                bg-white dark:bg-zinc-900 shadow-lg hover:shadow-2xl hover:-translate-y-2 
                transition-all duration-500 flex flex-col h-full"
            >
              <div
                className="absolute inset-0 bg-linear-to-br from-red-500/0 via-red-500/0 to-red-500/0 
                group-hover:from-red-500/5 group-hover:to-rose-500/5 transition-all duration-500 z-0 pointer-events-none"
              />

              <div
                className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-red-500 via-rose-500 to-red-500 
                transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10"
              />

              <div className="relative z-10">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div
                    className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 
                    group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-full shadow-lg">
                      {blog.category || "Health"}
                    </span>
                  </div>

                  <div
                    className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 bg-black/60 backdrop-blur-sm 
                    rounded-full text-white text-xs"
                  >
                    <Clock className="w-3 h-3" />
                    <span>5 min read</span>
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
                  <CardTitle
                    className="text-xl font-bold text-zinc-900 dark:text-white 
                    group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2"
                  >
                    {blog.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-6 pt-0">
                  <div
                    className="text-zinc-600 dark:text-zinc-400 line-clamp-3 text-sm leading-relaxed mb-4"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />

                  <div className="flex flex-wrap gap-2 mt-4">
                    {(blog.tags || []).slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 
                        text-xs font-medium rounded-full border border-red-100 dark:border-red-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </div>

              <CardFooter className="p-6 pt-0 mt-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full group/btn border-red-300 dark:border-red-800 
                      text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 
                      hover:text-red-700 dark:hover:text-red-300 hover:border-red-400 
                      dark:hover:border-red-700 transition-all duration-300"
                  asChild
                >
                  <Link to={`/blog/${blog._id}`}>
                    <span>Read Full Story</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {blogs.length === 0 && (
          <div className="text-center py-20">
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
            <Button className="bg-linear-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white">
              Subscribe for Updates
            </Button>
          </div>
        )}

        {blogs.length > 0 && (
          <div className="mt-20 p-8 rounded-3xl bg-linear-to-r from-red-600 to-rose-700 text-white shadow-2xl">
            <div className="max-w-3xl mx-auto text-center">
              <Heart className="w-12 h-12 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">
                Stay Updated with Life-Saving Stories
              </h3>
              <p className="text-red-100 mb-8">
                Subscribe to receive the latest articles, donor stories, and
                medical insights directly in your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-full border-0 text-zinc-900 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-600"
                />
                <Button className="bg-white text-red-600 hover:bg-red-50 rounded-full px-8">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Blog;
