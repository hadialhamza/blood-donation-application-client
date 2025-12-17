import React from "react";
import { ArrowRight } from "lucide-react";

const FeaturedCard = ({ feature }) => {
  return (
    <div
      className={`group relative p-6 rounded-3xl border-2 bg-white/80 dark:bg-zinc-900/80 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden ${feature.colSpan} flex flex-col`}
    >
      <div
        className={`absolute top-0 left-0 w-full h-0.5 bg-linear-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 origin-left`}
      />
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg bg-linear-to-br ${feature.gradient}  group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
          >
            {feature.icon}
          </div>
          <span className="text-sm font-semibold px-3 py-1.5 rounded-full bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300">
            {feature.stat}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
          {feature.title}
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4 grow">
          {feature.description}
        </p>
        <div className="flex items-center text-red-600 dark:text-red-400 font-semibold text-sm opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 mt-auto">
          {feature.cta}
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;
