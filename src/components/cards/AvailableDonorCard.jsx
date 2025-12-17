import React from "react";
import CountUp from "react-countup";
import { Link } from "react-router";
import { Droplet, ArrowRight, Users } from "lucide-react";

const getThemeClasses = (theme) => {
  const themes = {
    red: {
      bg: "bg-red-500/10 dark:bg-red-900/20",
      border: "border-red-200/50 dark:border-red-700/30",
      text: "text-red-700 dark:text-red-400",
      iconBg: "bg-red-100 dark:bg-red-900/50",
      btn: "hover:bg-red-500 dark:hover:bg-red-600",
      shadow: "239, 68, 68",
    },
    rose: {
      bg: "bg-rose-500/10 dark:bg-rose-900/20",
      border: "border-rose-200/50 dark:border-rose-700/30",
      text: "text-rose-700 dark:text-rose-400",
      iconBg: "bg-rose-100 dark:bg-rose-900/50",
      btn: "hover:bg-rose-500 dark:hover:bg-rose-600",
      shadow: "244, 63, 94",
    },
    purple: {
      bg: "bg-purple-500/10 dark:bg-purple-900/20",
      border: "border-purple-200/50 dark:border-purple-700/30",
      text: "text-purple-700 dark:text-purple-400",
      iconBg: "bg-purple-100 dark:bg-purple-900/50",
      btn: "hover:bg-purple-500 dark:hover:bg-purple-600",
      shadow: "168, 85, 247",
    },
    indigo: {
      bg: "bg-indigo-500/10 dark:bg-indigo-900/20",
      border: "border-indigo-200/50 dark:border-indigo-700/30",
      text: "text-indigo-700 dark:text-indigo-400",
      iconBg: "bg-indigo-100 dark:bg-indigo-900/50",
      btn: "hover:bg-indigo-500 dark:hover:bg-indigo-600",
      shadow: "99, 102, 241",
    },
    blue: {
      bg: "bg-blue-500/10 dark:bg-blue-900/20",
      border: "border-blue-200/50 dark:border-blue-700/30",
      text: "text-blue-700 dark:text-blue-400",
      iconBg: "bg-blue-100 dark:bg-blue-900/50",
      btn: "hover:bg-blue-500 dark:hover:bg-blue-600",
      shadow: "59, 130, 246",
    },
    cyan: {
      bg: "bg-cyan-500/10 dark:bg-cyan-900/20",
      border: "border-cyan-200/50 dark:border-cyan-700/30",
      text: "text-cyan-700 dark:text-cyan-400",
      iconBg: "bg-cyan-100 dark:bg-cyan-900/50",
      btn: "hover:bg-cyan-500 dark:hover:bg-cyan-600",
      shadow: "6, 182, 212",
    },
    orange: {
      bg: "bg-orange-500/10 dark:bg-orange-900/20",
      border: "border-orange-200/50 dark:border-orange-700/30",
      text: "text-orange-700 dark:text-orange-400",
      iconBg: "bg-orange-100 dark:bg-orange-900/50",
      btn: "hover:bg-orange-500 dark:hover:bg-orange-600",
      shadow: "249, 115, 22",
    },
    amber: {
      bg: "bg-amber-500/10 dark:bg-amber-900/20",
      border: "border-amber-200/50 dark:border-amber-700/30",
      text: "text-amber-700 dark:text-amber-400",
      iconBg: "bg-amber-100 dark:bg-amber-900/50",
      btn: "hover:bg-amber-500 dark:hover:bg-amber-600",
      shadow: "245, 158, 11",
    },
  };

  return themes[theme] || themes.red;
};

const AvailableDonorCard = ({ item }) => {
  const theme = getThemeClasses(item.theme);
  return (
    <div
      className={`p-6 rounded-3xl border flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-2 shadow-md hover:shadow-xl ${theme.bg} ${theme.border} ${theme.text}`}
    >
      {/* Icon */}
      <div className="flex justify-between items-center mb-5">
        <div
          className={`p-3 rounded-2xl ${theme.iconBg} ${theme.text}`}
          style={{
            boxShadow: `inset 0px 0px 15px 5px rgba(${theme.shadow}, 0.2)`,
          }}
        >
          <Droplet className="w-8 h-8 fill-current" />
        </div>
        <h3
          className={`text-5xl p-2.5 rounded-2xl font-black ${theme.text} opacity-90`}
          style={{
            boxShadow: `inset 0px 0px 15px 5px rgba(${theme.shadow}, 0.2)`,
          }}
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

      {/* Button */}
      <div className="mt-auto">
        <Link to={`/search?bloodGroup=${encodeURIComponent(item.group)}`}>
          <button
            className={`w-full py-3 px-4 rounded-xl bg-background/80 dark:bg-black/40 font-bold text-sm flex items-center justify-center gap-2 ${theme.text} ${theme.btn} hover:text-white dark:hover:text-white transition-all duration-300 group-hover:shadow-md`}
          >
            View Details{" "}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AvailableDonorCard;
