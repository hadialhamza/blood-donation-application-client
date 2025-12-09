import React from "react";
import { HeartPulse, HandHeart, Users, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Featured = () => {
  const features = [
    {
      icon: <HeartPulse className="h-8 w-8 text-red-500" />,
      title: "Save Lives",
      description:
        "One pint of blood can save up to three lives. Your single contribution makes a massive, direct impact on emergency care.",
    },
    {
      icon: <HandHeart className="h-8 w-8 text-red-500" />,
      title: "Health Benefits",
      description:
        "Regular donation helps balance iron levels, reduces the risk of heart disease, and stimulates new blood cell production.",
    },
    {
      icon: <Users className="h-8 w-8 text-red-500" />,
      title: "Community Support",
      description:
        "Join a network of everyday heroes. Be the safety net for your community when disasters or emergencies strike.",
    },
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-zinc-900/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-medium text-red-600 dark:border-red-900/30 dark:bg-red-900/10 dark:text-red-400">
            Why Donate?
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Be the reason for someone's{" "}
            <span className="text-red-600">heartbeat</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Donating blood is a simple procedure that can be done within an
            hour, but its impact lasts a lifetime for the receiver.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-transparent bg-white/50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-zinc-900/50 dark:border-zinc-800"
            >
              {/* Decorative gradient blob on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <CardHeader className="relative pb-2">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-red-50 dark:bg-red-900/20 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                  {/* Clone element to apply hover color logic easily if needed, or rely on group-hover in parent */}
                  <div className="transition-colors duration-300 group-hover:text-white">
                    {feature.icon}
                  </div>
                </div>
                <CardTitle className="text-xl font-bold">
                  {feature.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="relative">
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>

                {/* Learn More Link (Optional) */}
                <div className="mt-6 flex items-center text-sm font-medium text-red-600 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-2">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
