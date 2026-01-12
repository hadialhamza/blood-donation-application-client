import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Heart, Search } from "lucide-react";
import { trustCards } from "@/data/Data";
import TrustCard from "@/components/cards/TrustCard";

const Banner = () => {
  return (
    <section className="relative w-full overflow-hidden flex items-center justify-center min-h-[60vh]">
      <div
        className="absolute inset-0 z-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/12227661/pexels-photo-12227661.jpeg)",
        }}
      />
      <div className="absolute inset-0 z-10 bg-linear-to-b from-black/80 via-black/60 to-black/90" />
      <div className="relative z-20 container mx-auto px-4 text-center pt-24 pb-12 lg:py-20">
        <div className="max-w-5xl mx-auto space-y-4 lg:space-y-6">
          <div className="inline-flex items-center rounded-full border border-teal-500/30 bg-teal-500/10 px-3 lg:px-4 py-1 lg:py-1.5 text-xs lg:text-sm text-emerald-300 backdrop-blur-sm animate-in fade-in slide-in-from-top-8 duration-1000 shadow-[0_0_15px_rgba(20,184,166,0.2)]">
            <span className="flex h-2 w-2 rounded-full bg-teal-500 mr-2 animate-pulse shadow-[0_0_10px_#14b8a6]"></span>
            Be a Hero to Someone Today
          </div>
          <h1 className="px-4 md:px-0 text-3xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200 leading-tight">
            Donate Blood,
            <span className="text-gradient"> Share the Gift of Life</span>
          </h1>

          {/* Subtext */}
          <p className="mx-auto px-5 md:px-0 max-w-3xl text-sm lg:text-base xl:text-lg text-gray-200 leading-relaxed animate-in fade-in slide-in-from-bottom-15 duration-1000 delay-200">
            Every two seconds, someone needs blood. Your single donation can
            save up to three lives. Join our community of 5000+ heroes who are
            making a difference. Whether you're here to give hope or find help,
            we bridge the gap between donors and those in critical need.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center items-center pt-2 lg:pt-4">
            <div className="animate-in fade-in slide-in-from-left-100 duration-1000 delay-300">
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold h-9 lg:h-12 text-base lg:text-lg shadow-[0_4px_14px_0_rgba(220,38,38,0.39)] transition-all hover:scale-105 hover:shadow-[0_6px_20px_rgba(220,38,38,0.23)] duration-300 rounded-full px-4 lg:px-6"
                >
                  <Heart className="h-5 w-5" />
                  Join as a Donor
                </Button>
              </Link>
            </div>
            <div className="animate-in fade-in slide-in-from-right-100 duration-1000 delay-300">
              <Link to="/search">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white hover:border-white/40 hover:scale-105 font-semibold h-9 lg:h-12 text-base lg:text-lg transition-all rounded-full duration-300 px-4 lg:px-6"
                >
                  <Search className="h-5 w-5" />
                  Find Donors
                </Button>
              </Link>
            </div>
          </div>

          <div className="pt-8 lg:pt-10 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 animate-in fade-in duration-1000 delay-200">
            {trustCards.map((stat, index) => (
              <TrustCard key={index} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
