import React from "react";
import CountUp from "react-countup";
import GlassCard from "@/components/shared/glassCard/GlassCard";

const TrustCard = ({ stat, index }) => {
  return (
    <GlassCard
      className="flex flex-col items-center justify-center p-3 lg:p-6 transition-all hover:-translate-y-2 duration-300 h-full"
      glassClassName={`${stat.borderColor} ${stat.bgColor}`}
      blurIntensity="sm"
    >
      {/* Icon Container */}
      <div className="flex items-center justify-center">
        <div
          className={`p-2 lg:p-4 w-auto rounded-full bg-white/5 mb-2 lg:mb-3 ${stat.color} shadow-[0_0_10px_rgba(0,0,0,0.1)]`}
        >
          <stat.icon className="h-5 w-5 lg:h-8 lg:w-8" />
        </div>
      </div>
      {/* Counter Number */}
      <span className="block text-xl lg:text-3xl font-bold text-white mb-0 lg:mb-1">
        <CountUp
          end={stat.count}
          duration={3}
          separator=","
          enableScrollSpy={true}
          scrollSpyOnce={true}
          scrollSpyDelay={index * 200}
        />
        <span className={stat.color}>{stat.suffix}</span>
      </span>

      {/* Labels */}
      <p className="text-xs lg:text-base font-semibold text-white text-center leading-tight">
        {stat.label}
      </p>
      <span className="text-xs lg:text-sm font-medium text-gray-400 mt-1 hidden sm:block">
        {stat.subtext}
      </span>
    </GlassCard>
  );
};

export default TrustCard;
