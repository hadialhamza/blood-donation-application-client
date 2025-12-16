import React from "react";
import {
  HeartPulse,
  Clock,
  Users,
  MapPin,
  Bell,
  AlertTriangle,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Container from "@/components/container/Container";

const Featured = () => {
  const features = [
    {
      icon: <HeartPulse className="w-6 h-6 text-white" />,
      title: "Emergency Blood Matching",
      description:
        "Urgent blood requests are prioritized and instantly matched with eligible nearby donors, helping hospitals respond faster during critical situations.",
      gradient: "from-red-500 to-rose-600",
      stat: "Avg. match time < 5 min",
      cta: "See emergency flow",
      colSpan: "md:col-span-2",
    },
    {
      icon: <Clock className="w-6 h-6 text-white" />,
      title: "Real-Time Donor Availability",
      description:
        "Donor status updates automatically based on medically approved donation intervals, ensuring only eligible donors are contacted.",
      gradient: "from-blue-500 to-indigo-500",
      stat: "Eligibility tracked live",
      cta: "Check eligibility rules",
      colSpan: "md:col-span-1",
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: "Blood Group Network",
      description:
        "Easily connect with compatible donors across all major blood groups, including rare types, for accurate and safe transfusions.",
      gradient: "from-violet-500 to-purple-500",
      stat: "All major blood groups",
      cta: "Explore blood groups",
      colSpan: "md:col-span-1",
    },
    {
      icon: <MapPin className="w-6 h-6 text-white" />,
      title: "Smart Location Search",
      description:
        "Find donors near hospitals or specific areas using intelligent radius and location-based filtering to reduce response time.",
      gradient: "from-emerald-500 to-green-500",
      stat: "Hospital-focused search",
      cta: "View search logic",
      colSpan: "md:col-span-2",
    },
    {
      icon: <Bell className="w-6 h-6 text-white" />,
      title: "Targeted Notifications",
      description:
        "Donors receive alerts only for compatible blood types and nearby requests, preventing alert fatigue while ensuring fast action.",
      gradient: "from-orange-500 to-amber-500",
      stat: "Instant & relevant alerts",
      cta: "See notification system",
      colSpan: "md:col-span-2",
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-white" />,
      title: "Critical Shortage Alerts",
      description:
        "Get notified when specific blood groups are running low in your area and help prevent shortages before emergencies occur.",
      gradient: "from-pink-500 to-rose-500",
      stat: "Early warning system",
      cta: "View shortage insights",
      colSpan: "md:col-span-1",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-white" />,
      title: "Donation Safety & Privacy",
      description:
        "We follow medically approved safety guidelines and protect personal data, sharing donor information only when absolutely necessary.",
      gradient: "from-teal-500 to-cyan-500",
      stat: "Safety-first platform",
      cta: "Read safety policy",
      colSpan: "md:col-span-2",
    },
  ];

  return (
    <section className="mt-20 lg:mt-32">
      <Container>
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="section-badge">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>Core Features</span>
            </div>

            <h2 className="gradient-title">
              Smart blood donation solutions for{" "}
              <span>emergency situations</span>
            </h2>

            <p className="subtitle">
              Built to connect donors, patients, and hospitals efficiently —
              ensuring safe, fast, and reliable blood access when every second
              matters.
            </p>

            {/* Trust Signals */}
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
              <span>✔ Verified Donors</span>
              <span>✔ Medically Safe Intervals</span>
              <span>✔ Privacy Protected</span>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:px-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative py-6 px-6 rounded-3xl border-2
                  bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-lg
                  hover:shadow-2xl hover:-translate-y-2
                  transition-all duration-500 overflow-hidden
                  ${feature.colSpan} flex flex-col`}
              >
                {/* Accent Line */}
                <div
                  className={`absolute top-0 left-0 w-full h-0.5 bg-linear-to-r ${feature.gradient}
                  transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon + Stat */}
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg
                        bg-linear-to-br ${feature.gradient}
                        group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                    >
                      {feature.icon}
                    </div>

                    <span
                      className="text-sm font-semibold px-3 py-1.5 rounded-full
                      bg-red-50 dark:bg-red-900/30
                      text-red-700 dark:text-red-300"
                    >
                      {feature.stat}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4 grow">
                    {feature.description}
                  </p>

                  {/* CTA */}
                  <div
                    className="flex items-center text-red-600 dark:text-red-400
                    font-semibold text-sm opacity-0 -translate-x-4
                    group-hover:opacity-100 group-hover:translate-x-0
                    transition-all duration-300 mt-auto"
                  >
                    {feature.cta}
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Featured;
