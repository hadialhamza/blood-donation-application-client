import React from "react";
import { Trophy, Loader2 } from "lucide-react";
import Container from "@/components/shared/container/Container";
import SectionHeader from "@/components/shared/SectionHeader";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import TopDonorCard from "@/components/cards/TopDonorCard";

const donorStats = [
  { quote: "Saving lives is my passion.", donationCount: 12 },
  { quote: "Every drop counts.", donationCount: 15 },
  { quote: "Proud to serve humanity.", donationCount: 8 },
  { quote: "Be the reason for a smile.", donationCount: 20 },
  { quote: "Giving back to the world.", donationCount: 14 },
  { quote: "Hope flows in our veins.", donationCount: 25 },
  { quote: "Stronger together.", donationCount: 10 },
  { quote: "Love is in the blood.", donationCount: 18 },
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
            {displayDonors.map((donor, index) => {
              const { quote, donationCount } =
                donorStats[index % donorStats.length];

              return (
                <TopDonorCard
                  key={donor._id}
                  donor={donor}
                  quote={quote}
                  donationCount={donationCount}
                />
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
};

export default TopDonors;
