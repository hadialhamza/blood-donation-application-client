import React from "react";
import { Link } from "react-router"; // or 'react-router-dom'
import { Button } from "@/components/ui/button"; // shadcn button
import { Heart, Search, ArrowRight } from "lucide-react"; // Icons

const Banner = () => {
  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Parallax effect */}
      <div
        className="absolute inset-0 z-0 w-full h-full bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage:
            "url(https://plus.unsplash.com/premium_photo-1723132609837-97583cde95ba)",
        }}
      />

      {/* Modern Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-linear-to-b from-black/70 via-black/50 to-black/80" />

      {/* Content Container */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Badge / Tagline */}
          <div className="inline-flex items-center rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-sm text-red-300 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <span className="flex h-2 w-2 rounded-full bg-red-500 mr-2 animate-pulse"></span>
            Urgent: Blood donors needed
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl drop-shadow-sm animate-in fade-in slide-in-from-bottom-8 duration-700">
            Donate Blood, <span className="text-red-500">Save Life</span>
          </h1>

          {/* Subtext */}
          <p className="mx-auto max-w-2xl text-lg text-gray-200 md:text-xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
            Your contribution is more than just charity; it's a lifeline. Join
            our community to help those in critical need or easily find donors
            in your local area.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-in fade-in zoom-in duration-1000 delay-200">
            {/* Primary Action */}
            <Link to="/register">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 h-12 text-base shadow-lg shadow-red-900/20 transition-all hover:scale-105"
              >
                <Heart className="mr-2 h-5 w-5 fill-current" />
                Join as a Donor
              </Button>
            </Link>

            {/* Secondary Action */}
            <Link to="/search">
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 bg-white/5 text-white backdrop-blur-sm hover:bg-white hover:text-black font-semibold px-8 h-12 text-base transition-all"
              >
                <Search className="mr-2 h-5 w-5" />
                Find Donors
              </Button>
            </Link>
          </div>

          {/* Trust Indicators / Stats (Optional decoration) */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-3 gap-8 text-white/60 text-sm font-medium border-t border-white/10 mt-12 animate-in fade-in duration-1000 delay-500">
            <div>
              <span className="block text-2xl font-bold text-white">100%</span>
              Non-profit
            </div>
            <div>
              <span className="block text-2xl font-bold text-white">24/7</span>
              Support Available
            </div>
            <div className="hidden md:block">
              <span className="block text-2xl font-bold text-white">500+</span>
              Active Donors
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
