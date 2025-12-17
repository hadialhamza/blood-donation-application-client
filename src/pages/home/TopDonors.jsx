import React from "react";
import { Droplet, Quote, Trophy, Loader2 } from "lucide-react";
import Container from "@/components/shared/container/Container";
import SectionHeader from "@/components/shared/SectionHeader";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const quotes = [
  "Saving lives is my passion.",
  "Every drop counts.",
  "Proud to serve humanity.",
  "Be the reason for a smile.",
  "Giving back to the world.",
  "Hope flows in our veins.",
  "Stronger together.",
  "Love is in the blood.",
  "A chord of hope.",
  "Life flowing to life.",
];

const TopDonors = () => {
  const axiosPublic = useAxios();

  const { data: donors = [], isLoading } = useQuery({
    queryKey: ["top-donors"],
    queryFn: async () => {
      const res = await axiosPublic.get("/search-donors");
      return res.data;
    },
  });

  // Deterministic helper to generate consistent "random" data based on ID
  const getDeterministicData = (id, max, min = 0) => {
    if (!id) return min;
    const hash = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (hash % (max - min)) + min;
  };

  // Determine how many to show (e.g., top 8)
  const displayDonors = donors.slice(0, 8);

  if (isLoading) {
    return (
      <section className="relative overflow-hidden mt-20 lg:mt-30 min-h-[400px] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-red-500 animate-spin" />
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden mt-20 lg:mt-30">
      <Container>
        {/* --- Header --- */}
        <SectionHeader
          icon={Trophy}
          badge="Hall of Fame"
          title="Our"
          highlight="Top Donors"
          description="We proudly honor our top donors who make a lasting impact. Their generosity drives our mission forward, saving lives and creating a stronger community."
        />

        {displayDonors.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No donors found at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayDonors.map((donor) => {
              // Generate deterministic values
              const donationCount = getDeterministicData(donor._id, 30, 5);
              const quoteIndex = getDeterministicData(
                donor._id,
                quotes.length
              );
              const quote = quotes[quoteIndex];

              return (
                <div
                  key={donor._id}
                  className="group relative h-[450px] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <img
                    src={donor.avatar}
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
                        <Quote className="w-3 h-3" /> {quote}
                      </div>

                      {/* Donation Count Badge */}
                      <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/20">
                        <span className="text-sm font-medium text-white/90 uppercase tracking-wider text-[10px]">
                          Donations
                        </span>
                        <span className="text-2xl font-black text-white">
                          {donationCount}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
};

export default TopDonors;
