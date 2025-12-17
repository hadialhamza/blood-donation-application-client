import React from "react";
import { Activity } from "lucide-react";
import Container from "@/components/shared/container/Container";
import SectionHeader from "@/components/shared/SectionHeader";
import AvailableDonorCard from "@/components/cards/AvailableDonorCard";

const AvailableDonors = () => {
  const bloodGroups = [
    { group: "A+", count: 145, theme: "red" },
    { group: "A-", count: 32, theme: "rose" },
    { group: "B+", count: 168, theme: "purple" },
    { group: "B-", count: 45, theme: "indigo" },
    { group: "O+", count: 210, theme: "blue", featured: true },
    { group: "O-", count: 18, theme: "cyan" },
    { group: "AB+", count: 76, theme: "orange" },
    { group: "AB-", count: 12, theme: "amber" },
  ];

  return (
    <section className="mt-20 lg:mt-30">
      <Container>
        <div className="relative z-10">
          {/* Section Header */}
          <SectionHeader
            icon={Activity}
            badge="Live Database Status"
            title="Available"
            highlight="Blood Donors"
            description="We track donor availability in real-time. Below is a snapshot of our current active donor pool, ready to respond to emergencies."
          />

          {/* Blood group cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {bloodGroups.map((item, index) => (
              <AvailableDonorCard key={index} item={item} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AvailableDonors;
