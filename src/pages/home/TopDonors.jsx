import React from "react";
import { Droplet, Quote, Trophy } from "lucide-react";
import Container from "@/components/container/Container";

const TopDonors = () => {
  const donors = [
    {
      id: 1,
      name: "Hadi Al Hamza",
      bloodGroup: "O +",
      totalDonations: 24,
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop",
      quote: "Saving lives is my passion.",
    },
    {
      id: 2,
      name: "Jannatul Ferdousi",
      bloodGroup: "A +",
      totalDonations: 19,
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop",
      quote: "Every drop counts.",
    },
    {
      id: 3,
      name: "Rahim Ahmed",
      bloodGroup: "B -",
      totalDonations: 15,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop",
      quote: "Proud to serve humanity.",
    },
    {
      id: 4,
      name: "Sarah Khan",
      bloodGroup: "AB +",
      totalDonations: 12,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
      quote: "Be the reason for a smile.",
    },
    {
      id: 5,
      name: "Michael Chen",
      bloodGroup: "O -",
      totalDonations: 10,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
      quote: "Giving back to the world.",
    },
    {
      id: 6,
      name: "Emily Davis",
      bloodGroup: "B +",
      totalDonations: 9,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop",
      quote: "Hope flows in our veins.",
    },
    {
      id: 7,
      name: "David Wilson",
      bloodGroup: "A -",
      totalDonations: 8,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1770&auto=format&fit=crop",
      quote: "Stronger together.",
    },
    {
      id: 8,
      name: "Lisa Anderson",
      bloodGroup: "AB -",
      totalDonations: 6,
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
      quote: "Love is in the blood.",
    },
  ];

  return (
    <section className="relative overflow-hidden mt-20  lg:mt-30">
      <Container>
        {/* --- Header --- */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="section-badge">
            <Trophy className="w-4 h-4 animate-pulse" />
            <span>Hall of Fame</span>
          </div>
          <h2 className="gradient-title">
            Our <span> Top Donors</span>
          </h2>
          <p className="subtitle">
            We proudly honor our top donors who make a lasting impact. Their
            generosity drives our mission forward, saving lives and creating a
            stronger community.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {donors.map((donor) => (
            <div
              key={donor.id}
              className="group relative h-[450px] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <img
                src={donor.image}
                alt={donor.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

              {/* Floating blood group */}
              <div className="absolute top-4 right-4">
                <div className="backdrop-blur-md bg-black/40 border border-white/20 text-white text-2xl drop-shadow-md px-3 py-1.5 rounded-xl font-poppins font-extrabold flex items-center gap-1 shadow-lg">
                  <Droplet className="w-4 h-4 fill-red-500 text-red-500" />
                  {donor.bloodGroup}
                </div>
              </div>

              {/* Bottom Panel (Info) */}
              <div className="absolute bottom-4 left-4 right-4">
                <div
                  className="
                                    backdrop-blur-xl bg-white/10 dark:bg-black/40 
                                    border border-white/20 dark:border-white/10
                                    p-5 rounded-2xl shadow-lg
                                    transform transition-all duration-300
                                    group-hover:bg-white/20 dark:group-hover:bg-black/60
                                "
                >
                  {/* Name */}
                  <h3 className="text-xl font-bold text-white mb-1 tracking-wide">
                    {donor.name}
                  </h3>

                  <div className="flex items-center gap-2 text-white/70 text-xs mb-3 italic">
                    <Quote className="w-3 h-3" /> {donor.quote}
                  </div>

                  {/* Donation Count Badge */}
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/20">
                    <span className="text-sm font-medium text-white/90 uppercase tracking-wider text-[10px]">
                      Donations
                    </span>
                    <span className="text-2xl font-black text-white">
                      {donor.totalDonations}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TopDonors;
