import React from "react";
import {
  Users,
  Activity,
  Hospital,
  Stethoscope,
  Heart,
  Building,
  Shield,
  Plus,
  ShieldCheck,
  HeartHandshake,
  Handshake,
} from "lucide-react";
import Marquee from "react-fast-marquee";
import { Button } from "@/components/ui/button";
import Container from "@/components/shared/container/Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SectionHeader from "@/components/shared/SectionHeader";

const TrustedPartners = () => {
  const partners = [
    {
      icon: <Hospital className="w-6 h-6 text-white" />,
      name: "Dhaka Medical College",
      type: "Teaching Hospital",
      color: "from-red-500 to-rose-600",
    },
    {
      icon: <Stethoscope className="w-6 h-6 text-white" />,
      name: "Square Hospital",
      type: "Multi-Specialty",
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: <Heart className="w-6 h-6 text-white" />,
      name: "National Heart Foundation",
      type: "Cardiac Care",
      color: "from-rose-500 to-pink-600",
    },
    {
      icon: <Building className="w-6 h-6 text-white" />,
      name: "Apollo Hospitals",
      type: "International Chain",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: <Activity className="w-6 h-6 text-white" />,
      name: "United Hospital",
      type: "Critical Care",
      color: "from-purple-500 to-violet-600",
    },
    {
      icon: <Shield className="w-6 h-6 text-white" />,
      name: "Bangladesh Red Crescent",
      type: "Emergency Response",
      color: "from-red-600 to-orange-600",
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      name: "Ibn Sina Hospital",
      type: "Network Hospital",
      color: "from-amber-500 to-yellow-600",
    },
    {
      icon: <Plus className="w-6 h-6 text-white" />,
      name: "Labaid Hospital",
      type: "Specialized Care",
      color: "from-cyan-500 to-teal-600",
    },
  ];

  return (
    <Container>
      <div className="mt-20  lg:mt-30 relative">
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
          <Marquee
            gradient={false}
            speed={50}
            pauseOnHover={true}
            className="py-4"
          >
            <div className="flex items-center gap-8 px-4">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="group relative flex items-center gap-4 p-5 px-8 mx-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-lg hover:-translate-y-2 hover:border-red-300 
                      dark:hover:border-red-700 transition-all duration-500 cursor-pointer"
                >
                  <div
                    className={`relative z-10 p-3 rounded-xl bg-linear-to-br ${partner.color} shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
                  >
                    <div className="relative">{partner.icon}</div>
                  </div>

                  {/* Partner Info */}
                  <div className="relative z-10 flex flex-col items-start">
                    <span className="text-lg font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      {partner.name}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 mt-1">
                      {partner.type || "Medical Partner"}
                    </span>
                  </div>

                  {/* Hover Indicator */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-red-500 rounded-full animate-ping"></div>
                  </div>
                </div>
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
            {/* <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-800"></div> */}
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                100K+
              </div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                Blood Units Managed
              </div>
            </div>
            {/* <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-800"></div> */}
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
          <Card className="flex-1 bg-linear-to-br from-red-600 to-red-800 text-white border-none shadow-xl shadow-red-900/20 relative overflow-hidden gap-3">
            <div className="absolute bottom-0 right-0 p-8 opacity-10 transform translate-x-6 translate-y-6 rotate-12 pointer-events-none">
              <ShieldCheck size={120} />
            </div>

            <CardHeader className="relative z-10">
              <div className="mb-2 w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner border border-white/10">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-white">
                Community Trust
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2 relative z-10">
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black">100 %</span>
                <span className="mb-2 text-red-100 font-semibold text-base">
                  Verified
                </span>
              </div>
              <p className="text-red-100/90 text-sm leading-relaxed min-h-10">
                Every donor profile is manually reviewed to ensure a safe and
                reliable network for all patients.
              </p>
              <Button
                variant="secondary"
                className="w-full mt-1 bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-md transition-all duration-300"
              >
                Learn about verification
              </Button>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="flex-1 bg-linear-to-br from-red-600 to-red-800 text-white border-none shadow-xl shadow-red-900/20 relative overflow-hidden gap-3">
            <div className="absolute bottom-0 right-0 p-8 opacity-10 transform translate-x-6 translate-y-6 rotate-12 pointer-events-none">
              <HeartHandshake size={120} />
            </div>

            <CardHeader className="relative z-10">
              <div className="mb-2 w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner border border-white/10">
                <HeartHandshake className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-white">
                Community Impact
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2 relative z-10">
              <div className="flex items-end gap-3">
                <span className="text-4xl font-black tracking-tighter">
                  2.5 k +
                </span>
                <span className="mb-2 text-red-100 font-semibold text-base">
                  Lives Saved
                </span>
              </div>
              <p className="text-red-100/90 text-sm leading-relaxed min-h-10">
                Join the fastest growing blood donation network and help us
                reach every corner of the country.
              </p>
              <Button
                variant="secondary"
                className="w-full mt-1 bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-md transition-all duration-300"
              >
                Read Success Stories
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default TrustedPartners;
