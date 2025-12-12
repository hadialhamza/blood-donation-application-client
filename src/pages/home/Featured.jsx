import React from "react";
import {
  HeartPulse,
  Clock,
  Users,
  MapPin,
  Bell,
  AlertTriangle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Container from "@/components/container/Container";

const Featured = () => {
  const features = [
    {
      icon: <HeartPulse className="w-6 h-6 text-white" />,
      title: "Emergency Matching",
      description:
        "Critical cases get prioritized automatically. Our system instantly connects urgent requests with compatible donors within a 10km radius.",
      gradient: "from-red-500 to-rose-600",
      delay: "0",
      stat: "Under 5 min response",
      colSpan: "md:col-span-2",
    },
    {
      icon: <Clock className="w-6 h-6 text-white" />,
      title: "Real-Time Availability",
      description:
        "See donor availability live. Our system tracks when donors are eligible to donate next.",
      gradient: "from-blue-500 to-indigo-500",
      delay: "100",
      stat: "Updated every 30s",
      colSpan: "md:col-span-1",
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: "Blood Group Network",
      description:
        "Connect with rare blood type communities. Find O-negative universal donors or match specific requirements like CMV-negative blood.",
      gradient: "from-violet-500 to-purple-500",
      delay: "200",
      stat: "8+ Blood Types",
      colSpan: "md:col-span-1",
    },
    {
      icon: <MapPin className="w-6 h-6 text-white" />,
      title: "Location Intelligence",
      description:
        "Smart radius search finds donors near hospitals. Filter by district, upazila, or specific medical facilities for faster response times.",
      gradient: "from-emerald-500 to-green-500",
      delay: "300",
      stat: "500+ Locations",
      colSpan: "md:col-span-2",
    },
    {
      icon: <Bell className="w-6 h-6 text-white" />,
      title: "Smart Notifications",
      description:
        "Get alerts for matching blood requests. Donors receive notifications only for compatible blood types and nearby emergencies.",
      gradient: "from-orange-500 to-amber-500",
      delay: "400",
      stat: "Instant Alerts",
      colSpan: "md:col-span-2",
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-white" />,
      title: "Critical Shortage Alerts",
      description:
        "Receive notifications when specific blood types are running low in your area. Help prevent blood bank shortages.",
      gradient: "from-pink-500 to-rose-500",
      delay: "500",
      stat: "Proactive System",
      colSpan: "md:col-span-1",
    },
  ];

  return (
    <section className="mt-20">
      <Container>
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="section-badge">
              <Sparkles className="w-4 h-4" />
              <span>Core Features</span>
            </div>

            <h2 className="gradient-title">
              Smart solutions for{" "}
              <span className="">emergency situations.</span>
            </h2>
            <p className="subtitle">
              Our platform combines cutting-edge technology with compassionate
              community to ensure no patient waits for blood when every second
              counts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:px-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative py-5 px-6 rounded-3xl border-2 
                    bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-lg
                    hover:shadow-2xl hover:-translate-y-2 
                    transition-all duration-500 overflow-hidden
                    ${feature.colSpan} flex flex-col`}
              >
                {/* Top Accent Line */}
                <div
                  className={`absolute top-0 left-0 w-full h-0.5 bg-linear-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                ></div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon & Stat Row */}
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className={`
                                w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg
                                bg-linear-to-br ${feature.gradient} 
                                group-hover:scale-110 group-hover:rotate-3 transition-all duration-300
                            `}
                    >
                      {feature.icon}
                    </div>
                    <span className="text-sm font-bold px-3 py-1.5 rounded-full bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                      {feature.stat}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 ">
                    {feature.title}
                  </h3>

                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-2 grow">
                    {feature.description}
                  </p>

                  {/* Learn More Link */}
                  <div className="flex items-center text-red-600 dark:text-red-400 font-semibold text-sm opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 mt-auto">
                    How it works{" "}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
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
