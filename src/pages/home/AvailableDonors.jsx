import React from "react";
import CountUp from "react-countup";
import { Link } from "react-router";
import { Droplet, ArrowRight, Users, Activity } from "lucide-react";
import Container from "@/components/container/Container";
import GlassCard from "../../components/glassCard/GlassCard";

const AvailableDonors = () => {
  const bloodGroups = [
    { group: "A+", count: 145, theme: "red" },
    { group: "A-", count: 32, theme: "rose" },
    { group: "B+", count: 168, theme: "purple" },
    { group: "B-", count: 45, theme: "indigo" },
    { group: "O+", count: 210, theme: "blue", featured: true },
    { group: "O-", count: 18, theme: "cyan" },
    { group: "AB+", count: 76, theme: "orange" },
    { group: "AB-", count: 12, theme: "amber" },
  ];

  const getThemeClasses = (theme, featured) => {
    const themes = {
      red: {
        bg: "bg-red-500/10 dark:bg-red-900/20",
        border: "border-red-200/50 dark:border-red-700/30",
        text: "text-red-700 dark:text-red-400",
        iconBg: "bg-red-100 dark:bg-red-900/50",
        btn: "hover:bg-red-500 dark:hover:bg-red-600",
      },
      rose: {
        bg: "bg-rose-500/10 dark:bg-rose-900/20",
        border: "border-rose-200/50 dark:border-rose-700/30",
        text: "text-rose-700 dark:text-rose-400",
        iconBg: "bg-rose-100 dark:bg-rose-900/50",
        btn: "hover:bg-rose-500 dark:hover:bg-rose-600",
      },
      purple: {
        bg: "bg-purple-500/10 dark:bg-purple-900/20",
        border: "border-purple-200/50 dark:border-purple-700/30",
        text: "text-purple-700 dark:text-purple-400",
        iconBg: "bg-purple-100 dark:bg-purple-900/50",
        btn: "hover:bg-purple-500 dark:hover:bg-purple-600",
      },
      indigo: {
        bg: "bg-indigo-500/10 dark:bg-indigo-900/20",
        border: "border-indigo-200/50 dark:border-indigo-700/30",
        text: "text-indigo-700 dark:text-indigo-400",
        iconBg: "bg-indigo-100 dark:bg-indigo-900/50",
        btn: "hover:bg-indigo-500 dark:hover:bg-indigo-600",
      },
      blue: {
        bg: "bg-blue-500/10 dark:bg-blue-900/20",
        border: "border-blue-200/50 dark:border-blue-700/30",
        text: "text-blue-700 dark:text-blue-400",
        iconBg: "bg-blue-100 dark:bg-blue-900/50",
        btn: "hover:bg-blue-500 dark:hover:bg-blue-600",
      },
      cyan: {
        bg: "bg-cyan-500/10 dark:bg-cyan-900/20",
        border: "border-cyan-200/50 dark:border-cyan-700/30",
        text: "text-cyan-700 dark:text-cyan-400",
        iconBg: "bg-cyan-100 dark:bg-cyan-900/50",
        btn: "hover:bg-cyan-500 dark:hover:bg-cyan-600",
      },
      orange: {
        bg: "bg-orange-500/10 dark:bg-orange-900/20",
        border: "border-orange-200/50 dark:border-orange-700/30",
        text: "text-orange-700 dark:text-orange-400",
        iconBg: "bg-orange-100 dark:bg-orange-900/50",
        btn: "hover:bg-orange-500 dark:hover:bg-orange-600",
      },
      amber: {
        bg: "bg-amber-500/10 dark:bg-amber-900/20",
        border: "border-amber-200/50 dark:border-amber-700/30",
        text: "text-amber-700 dark:text-amber-400",
        iconBg: "bg-amber-100 dark:bg-amber-900/50",
        btn: "hover:bg-amber-500 dark:hover:bg-amber-600",
      },
    };

    const base = themes[theme];
    if (featured) {
      return {
        ...base,
        border: `border-2 ${base.border} shadow-lg shadow-blue-500/10`,
      };
    }
    return base;
  };

  return (
    <section className="mt-20 lg:mt-30">
      <Container>
        <div className="relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="section-badge">
              <Activity className="w-4 h-4 animate-pulse" />
              <span>Live Database Status</span>
            </div>

            <h2 className="gradient-title">
              Available <span>Blood Donors</span>
            </h2>

            <p className="subtitle">
              We track donor availability in real-time. Below is a snapshot of
              our current active donor pool, ready to respond to emergencies.
            </p>
          </div>

          {/* Blood group cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {bloodGroups.map((item, index) => {
              const theme = getThemeClasses(item.theme, item.featured);

              return (
                <GlassCard
                  key={index}
                  className={`p-6 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between h-full ${theme.text}`}
                  glassClassName={`${theme.bg} ${theme.border}`}
                >
                  {/* Icon */}
                  <div className="flex justify-between items-center mb-5">
                    <div
                      className={`p-3 shadow-md rounded-2xl ${theme.iconBg} ${theme.text}`}
                    >
                      <Droplet className="w-8 h-8 fill-current" />
                    </div>
                    <h3
                      className={`text-5xl shadow-md p-2.5 rounded-2xl font-black ${theme.text} opacity-90`}
                    >
                      {item.group}
                    </h3>
                  </div>

                  {/* Counter */}
                  <div className="mb-5 flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className={`w-4 h-4 ${theme.text} opacity-70`} />
                      <span className="text-muted-foreground font-medium text-sm uppercase tracking-wider">
                        Available
                      </span>
                    </div>
                    <div className="text-4xl font-bold text-foreground flex flex-col items-center gap-1">
                      <CountUp
                        end={item.count}
                        duration={2.5}
                        enableScrollSpy
                        scrollSpyOnce
                      />
                      <span className="text-lg font-semibold text-muted-foreground/60">
                        Donors
                      </span>
                    </div>
                  </div>

                  {/* button */}
                  <div className="mt-auto">
                    <Link
                      to={`/search?bloodGroup=${encodeURIComponent(
                        item.group
                      )}`}
                    >
                      <button
                        className={`w-full py-3 px-4 rounded-xl bg-background/80 dark:bg-black/40 backdrop-blur-sm border border-border font-bold text-sm flex items-center justify-center gap-2 ${theme.text} ${theme.btn} hover:text-white dark:hover:text-white transition-all duration-300 group-hover:shadow-md`}
                      >
                        View Details{" "}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AvailableDonors;
