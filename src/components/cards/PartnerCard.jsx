import React from "react";

const PartnerCard = ({ partner }) => {
  return (
    <div className="group relative flex items-center gap-4 p-5 mx-4 bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-lg hover:-translate-y-2 hover:border-red-300 dark:hover:border-red-700 transition-all duration-500 cursor-pointer">
      <div
        className={`relative z-10 p-3 rounded-xl bg-linear-to-br ${partner.color} shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
      >
        <div className="relative">{partner.icon}</div>
      </div>

      {/* Partner Info */}
      <div className="relative z-10 flex flex-col items-start">
        <span className="text-lg font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
          {partner.name}
        </span>
        <span className="text-xs text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 mt-1">
          {partner.type || "Medical Partner"}
        </span>
      </div>

      {/* Hover Indicator */}
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-red-500 rounded-full animate-ping"></div>
      </div>
    </div>
  );
};

export default PartnerCard;
