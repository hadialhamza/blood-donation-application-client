import React from "react";

const SectionHeader = ({
  icon: Icon,
  badge,
  title,
  highlight,
  description,
  className = "",
}) => {
  return (
    <div
      className={`text-center max-w-3xl mx-auto mb-15 space-y-3 md:space-y-5 ${className}`}
    >
      {badge && (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 font-bold text-xs md:text-sm shadow-sm md:mb-5">
          {Icon && <Icon className="w-3 h-3 md:w-4 md:h-4 animate-pulse" />}
          <span>{badge}</span>
        </div>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground tracking-tight drop-shadow-md">
        {title}{" "}
        <span className="bg-linear-to-r from-rose-500 to-red-600 bg-clip-text text-transparent">
          {highlight}
        </span>
      </h2>
      {description && (
        <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
