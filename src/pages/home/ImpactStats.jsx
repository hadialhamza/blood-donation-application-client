import React from "react";
import { Heart, Users, Award, Zap } from "lucide-react";
import Container from "@/components/shared/container/Container";
import SectionHeader from "@/components/shared/SectionHeader";
import ImpactCard from "@/components/cards/ImpactCard";

const ImpactStats = () => {
  const stats = [
    {
      icon: Heart,
      title: "Lives Saved",
      value: "5,000+",
      subtitle: "people",
      description:
        "Through our platform, thousands of lives have been saved by connecting donors with those in critical need.",
    },
    {
      icon: Users,
      title: "Active Donors",
      value: "2,500+",
      subtitle: "heroes",
      description:
        "Our growing community of generous donors committed to making a difference in their communities.",
    },
    {
      icon: Award,
      title: "Blood Groups",
      value: "8",
      subtitle: "types",
      description:
        "We support all major blood groups including rare types to ensure comprehensive coverage.",
    },
    {
      icon: Zap,
      title: "Response Time",
      value: "<5",
      subtitle: "min",
      description:
        "Our smart matching system ensures urgent blood requests are matched with eligible donors in minutes.",
    },
  ];

  return (
    <section className="mt-20 lg:mt-30">
      <Container>
        <SectionHeader
          icon={Heart}
          badge="Our Impact"
          title="Making a Real"
          highlight="Difference"
          description="Every donation counts. Here's the measurable impact our community has achieved so far."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <ImpactCard key={index} {...stat} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ImpactStats;
