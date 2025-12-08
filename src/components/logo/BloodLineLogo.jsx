// src/components/BloodLineLogo.jsx
import React from "react";
import { MdBloodtype } from "react-icons/md";

export default function BloodLineLogo() {
  return (
    <div className="bloodline-logo">
      <div className="flex items-center gap-4">
        {/* Blood Drop Icon */}
        <MdBloodtype size={40} />

        {/* Text Content */}
        <div className="flex flex-col">
          {/* Brand Name */}
          <div className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
            <span className="bg-linear-to-r from-base-content via-red-700 to-red-600 bg-clip-text text-transparent">
              BloodLine
            </span>
          </div>

          {/* Tagline */}
          <div className="flex items-center gap-2 mt-1">
            <div className="h-0.5 w-4 bg-red-600 opacity-60" />
            <div className="text-xs md:text-sm font-semibold tracking-widest uppercase text-red-600 opacity-90 whitespace-nowrap">
              SAVE LIVES
            </div>
            <div className="h-0.5 w-4 bg-red-600 opacity-60" />
          </div>
        </div>
      </div>
    </div>
  );
}
