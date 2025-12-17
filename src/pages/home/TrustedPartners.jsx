import React from "react";
import { ShieldCheck, HeartHandshake, Handshake } from "lucide-react";
import Marquee from "react-fast-marquee";
import Container from "@/components/shared/container/Container";
import SectionHeader from "@/components/shared/SectionHeader";
import { partners } from "@/data/Data";
import PartnerCard from "@/components/cards/PartnerCard";
import ImpactCard from "@/components/cards/ImpactCard";

const TrustedPartners = () => {
  return (
    <Container>
      <div className="mt-20 lg:mt-30 relative">
        {/* Section Title */}
        <SectionHeader
          icon={Handshake}
          badge="Trusted Partners"
          title="Partnered with Leading"
          highlight="Medical Institutions"
          description="Collaborating with hospitals and healthcare organizations nationwide to ensure blood reaches those in need"
        />

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden py-2">
          {/* Left Shadow */}
          <div className="absolute top-0 left-0 w-32 h-full bg-linear-to-r from-[#ffeded] via-[#ffeded]/80 to-transparent dark:from-black dark:via-black/80 dark:to-transparent z-10 pointer-events-none" />

          {/* Right Shadow */}
          <div className="absolute top-0 right-0 w-32 h-full bg-linear-to-l from-[#fff2f2] via-[#fff2f2]/80 to-transparent dark:from-black dark:via-black/80 dark:to-transparent z-10 pointer-events-none" />

          <Marquee
            gradient={false}
            speed={50}
            pauseOnHover={true}
            className="py-4"
          >
            <div className="flex items-center gap-8 p-8">
              {partners.map((partner, index) => (
                <PartnerCard key={index} partner={partner} />
              ))}
            </div>
          </Marquee>
        </div>

        {/* Additional Partner Stats */}
        <div className="mt-6 mb-12 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 px-8 py-4 rounded-2xl my-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                50+
              </div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                Partner Hospitals
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                100K+
              </div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                Blood Units Managed
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                24/7
              </div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                Emergency Support
              </div>
            </div>
          </div>
        </div>

        {/* Trust cards */}
        <div className="flex flex-col md:flex-row items-stretch gap-12 max-w-4xl mx-auto">
          {/* Card 1 */}
          <ImpactCard
            icon={ShieldCheck}
            title="Community Trust"
            value="100 %"
            subtitle="Verified"
            description="Every donor profile is manually reviewed to ensure a safe and reliable network for all patients."
            buttonText="Learn about verification"
          />

          {/* Card 2 */}
          <ImpactCard
            icon={HeartHandshake}
            title="Community Impact"
            value="2.5 k +"
            subtitle="Lives Saved"
            description="Join the fastest growing blood donation network and help us reach every corner of the country."
            buttonText="Read Success Stories"
          />
        </div>
      </div>
    </Container>
  );
};

export default TrustedPartners;
