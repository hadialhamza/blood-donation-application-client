import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Heart, Search, Users, ShieldCheck, Clock } from "lucide-react";

const Banner = () => {
  const trustCards = [
    {
      icon: ShieldCheck,
      value: "100% Verified",
      label: "Secure & Trusted Platform",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
    {
      icon: Clock,
      value: "24/7 Support",
      label: "Always Here When Needed",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      icon: Users,
      value: "5000+ Donors",
      label: "Active Community",
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
    },
  ];
  return (
    <section className="relative w-full overflow-hidden flex items-center justify-center pt-32 pb-20">
      <div
        className="absolute inset-0 z-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/12227661/pexels-photo-12227661.jpeg)",
        }}
      />
      <div className="absolute inset-0 z-10 bg-linear-to-b from-black/80 via-black/60 to-black/90" />
      <div className="relative z-20 container mx-auto px-4 text-center">
        <div className="max-w-5xl mx-auto space-y-7">
          <div className="inline-flex items-center rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs md:text-sm text-red-200 backdrop-blur-sm animate-in fade-in slide-in-from-top-8 duration-1000 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <span className="flex h-2 w-2 rounded-full bg-red-500 mr-2 animate-pulse shadow-[0_0_10px_#ef4444]"></span>
            Annual Blood Donation Drive
          </div>
          <h1 className="px-4 md:px-0 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl drop-shadow-lg animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200 leading-tight">
            Donate Blood,
            <span className="bg-linear-to-r from-red-500 to-rose-600 bg-clip-text text-transparent">
              {" "}
              Save a Life Today
            </span>
          </h1>

          {/* Subtext */}
          <p className="mx-auto px-5 md:px-0 max-w-3xl text-base text-gray-200 md:text-xl leading-relaxed animate-in fade-in slide-in-from-bottom-15 duration-1000 delay-200">
            Every two seconds, someone needs blood. Your single donation can
            save up to three lives. Join our community of 5000+ heroes who are
            making a difference. Whether you're here to give hope or find help,
            we bridge the gap between donors and those in critical need.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
            <div className="animate-in fade-in slide-in-from-left-100 duration-1000 delay-300">
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold h-10 md:h-13 text-lg shadow-[0_4px_14px_0_rgba(220,38,38,0.39)] transition-all hover:scale-105 hover:shadow-[0_6px_20px_rgba(220,38,38,0.23)] duration-300 rounded-full"
                >
                  <Heart className="h-5 w-5 fill-current" />
                  Join as a Donor
                </Button>
              </Link>
            </div>
            <div className="animate-in fade-in slide-in-from-right-100 duration-1000 delay-300">
              <Link to="/search">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 bg-white/5 text-white backdrop-blur-md hover:bg-white/10 hover:text-white hover:border-white/40 hover:scale-105 font-semibold h-10 md:h-13 text-lg transition-all rounded-full duration-300"
                >
                  <Search className="h-5 w-5" />
                  Find Donors
                </Button>
              </Link>
            </div>
          </div>

          {/* Trust Indicators / Stats */}
          <div className="pt-10 md:pt-5 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-1000 delay-200">
            {trustCards.map((stat, index) => (
              <div
                key={index}
                className={`flex flex-col items-center justify-center p-6 rounded-2xl border backdrop-blur-md transition-transform hover:-translate-y-1 duration-300 ${stat.borderColor} ${stat.bgColor} bg-opacity-10`}
              >
                <div
                  className={`p-3 rounded-full bg-white/5 mb-3 ${stat.color}`}
                >
                  <stat.icon className="h-8 w-8" />
                </div>
                <span className="block text-2xl font-bold text-white mb-1">
                  {stat.value}
                </span>
                <span className="text-sm font-medium text-gray-300">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
