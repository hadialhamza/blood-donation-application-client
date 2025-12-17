import React from "react";
import { Droplet, Quote, HeartHandshake } from "lucide-react";

const TopDonorCard = ({ donor, quote, donationCount }) => {
  return (
    <div className="group relative h-[450px] w-full rounded-3xl overflow-hidden bg-zinc-900 transition-transform duration-500 hover:-translate-y-3">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={donor.avatar}
          alt={donor.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/60 opacity-60"></div>
      </div>

      <div className="absolute top-4 right-4 z-20">
        <div className="flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-zinc-900 rounded-full transition-transform duration-300 group-hover:scale-105">
          <div className="p-1.5 bg-red-500/10 rounded-full">
            <Droplet className="w-4 h-4 text-red-600 fill-current" />
          </div>
          <span className="text-xl font-black text-zinc-800 dark:text-white font-mono tracking-tighter">
            {donor.bloodGroup}
          </span>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 z-20">
        <div className="bg-white/70 dark:bg-zinc-950/70 p-3 rounded-2xl">
          {/* Header */}
          <div className="flex justify-between items-start mb-1">
            <div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white leading-tight">
                {donor.name}
              </h3>
              <p className="text-xs font-semibold text-red-600 uppercase tracking-wider mt-1">
                Top Donor
              </p>
            </div>
            {/* Decoration Icon */}
            <HeartHandshake className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
          </div>

          {/* Quote Section */}
          <div className="relative pl-2 border-l-2 border-red-500/30 mb-2">
            <p className="text-sm text-zinc-800 dark:text-zinc-300 italic line-clamp-2 leading-relaxed">
              <Quote className="w-4 h-4 fill-current inline-block mr-1" />"
              {quote}"
            </p>
          </div>

          {/* Stats Row */}
          <div className="flex items-center justify-between pt-1 border-t border-zinc-200 dark:border-zinc-800">
            <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Total Impact
            </span>
            <div className="flex items-baseline gap-1">
              <span className="mr-2 text-2xl font-black text-zinc-900 dark:text-white">
                {donationCount}
              </span>
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                Donations
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopDonorCard;
