import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Search,
  Users,
  ShieldCheck,
  Clock,
} from "lucide-react";

const Banner = () => {
  return (
    <section className="relative w-full overflow-hidden flex items-center justify-center py-20 lg:py-32">
      <div
        className="absolute inset-0 z-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/12227661/pexels-photo-12227661.jpeg)",
        }}
      />
      <div className="absolute inset-0 z-10 bg-linear-to-b from-black/80 via-black/60 to-black/90" />
      <div className="relative z-20 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-sm text-red-300 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <span className="flex h-2 w-2 rounded-full bg-red-500 mr-2 animate-pulse shadow-[0_0_10px_#ef4444]"></span>
            Urgent: Annual Blood Donation Drive
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl drop-shadow-lg animate-in fade-in slide-in-from-bottom-8 duration-700 leading-tight">
            Donate Blood, 
            <span className="bg-linear-to-r from-red-500 to-rose-600 bg-clip-text text-transparent">
              Save a Life Today
            </span>
          </h1>

          {/* Subtext */}
          <p className="mx-auto max-w-2xl text-lg text-gray-200 md:text-xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
            Every two seconds, someone needs blood. Your single donation can
            save up to three lives. Join our community of 5000+ heroes who are
            making a difference. Whether you're here to give hope or find help,
            we bridge the gap between donors and those in critical need.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2 animate-in fade-in zoom-in duration-1000 delay-200">
            <Link to="/register">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 h-14 text-lg shadow-[0_4px_14px_0_rgba(220,38,38,0.39)] transition-all hover:scale-105 hover:shadow-[0_6px_20px_rgba(220,38,38,0.23)] rounded-full"
              >
                <Heart className="mr-2 h-5 w-5 fill-current" />
                Join as a Donor
              </Button>
            </Link>

            <Link to="/search">
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 bg-white/5 text-white backdrop-blur-md hover:bg-white/10 hover:text-white hover:border-white/40 font-semibold px-8 h-14 text-lg transition-all rounded-full"
              >
                <Search className="mr-2 h-5 w-5" />
                Find Donors
              </Button>
            </Link>
          </div>

          {/* Trust Indicators / Stats */}
          <div className="pt-10 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-1000 delay-500">
            {[
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
            ].map((stat, index) => (
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
