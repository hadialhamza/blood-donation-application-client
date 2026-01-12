import React from "react";
import { Lightbulb, MapPin, Heart, CheckCircle } from "lucide-react";
import Container from "@/components/shared/container/Container";
import SectionHeader from "@/components/shared/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HowItWorks = () => {
  const steps = [
    {
      icon: Lightbulb,
      number: "01",
      title: "Register & Create Profile",
      description:
        "Sign up as a donor or patient. Complete your profile with medical information and blood group details for seamless matching.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: MapPin,
      number: "02",
      title: "Find or Request Blood",
      description:
        "Browse available donors in your area or submit an urgent blood request. Our smart matching finds compatible donors instantly.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Heart,
      number: "03",
      title: "Connect & Coordinate",
      description:
        "Get matched with donors or patients in your area. Coordinate donation details, timing, and location with easy messaging.",
      color: "from-red-500 to-rose-500",
    },
    {
      icon: CheckCircle,
      number: "04",
      title: "Complete & Track",
      description:
        "Complete the donation or receive blood. Track your donation history and impact on the community dashboard.",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <section className="mt-20 lg:mt-30">
      <Container>
        <SectionHeader
          icon={Lightbulb}
          badge="Get Started"
          title="How It"
          highlight="Works"
          description="A simple four-step process to connect donors with those in need. From registration to donation, we make it easy and efficient."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connecting line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-24 left-full w-6 h-0.5 bg-linear-to-r from-red-500 to-transparent" />
                )}

                <Card className="h-full bg-white dark:bg-slate-900 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div
                      className={`w-16 h-16 rounded-xl bg-linear-to-br ${step.color} flex items-center justify-center mb-4 shadow-lg`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-sm font-bold text-red-600">
                      {step.number}
                    </div>
                    <CardTitle className="text-lg mt-2">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;
