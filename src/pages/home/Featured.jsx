import React from "react";
import { Sparkles } from "lucide-react";
import Container from "@/components/shared/container/Container";
import SectionHeader from "@/components/shared/SectionHeader";
import { features } from "@/data/Data";
import FeaturedCard from "@/components/cards/FeaturedCard";

const Featured = () => {
  return (
    <section className="mt-20">
      <Container>
        <div className="relative z-10">
          {/* Header */}
          <SectionHeader
            icon={Sparkles}
            badge="Core Features"
            title="Smart blood donation solutions for"
            highlight="emergency situations"
            description="Built to connect donors, patients, and hospitals efficiently — ensuring safe, fast, and reliable blood access when every second matters."
          />

          {/* Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeaturedCard key={index} feature={feature} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Featured;
