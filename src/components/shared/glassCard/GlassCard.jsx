import React from "react";
import { cn } from "@/lib/utils";

const GlassCard = ({
  children,
  className,
  glassClassName,
  blurIntensity = "md",
  ...props
}) => {
  return (
    <div className={cn("relative group", className)} {...props}>
      <div
        className={cn(
          `absolute inset-0 -z-10 rounded-3xl border bg-opacity-10 transition-all duration-300 group-hover:shadow-xl backdrop-blur-${blurIntensity}`,
          glassClassName
        )}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

export default GlassCard;
