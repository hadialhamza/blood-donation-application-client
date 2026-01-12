import React from "react";
import {
  HelpCircle,
  Search,
  MessageSquare,
  FileText,
  ChevronRight,
} from "lucide-react";
import Container from "@/components/shared/container/Container";
import SectionHeader from "@/components/shared/SectionHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Support = () => {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <Container>
        {/* Header & Search */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <SectionHeader
            icon={HelpCircle}
            badge="Help Center"
            title="How can we"
            highlight="Help You?"
            description="Search our knowledge base or browse frequently asked questions."
          />
          <div className="relative mt-8">
            <Input
              type="text"
              placeholder="Search for answers..."
              className="h-14 pl-12 pr-4 text-lg bg-white dark:bg-gray-900 border-slate-200 dark:border-gray-800 shadow-sm rounded-2xl"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Support Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            {
              title: "For Donors",
              icon: HeartIcon,
              desc: "Requirements, process, and tips for donors.",
            },
            {
              title: "For Recipients",
              icon: UserIcon,
              desc: "How to request blood and verify donors.",
            },
            {
              title: "Tech Support",
              icon: SettingsIcon,
              desc: "Login issues, profile settings, and bugs.",
            },
          ].map((cat, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-slate-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-xl flex items-center justify-center text-red-600 mb-4 group-hover:scale-110 transition-transform">
                <cat.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                {cat.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {cat.desc}
              </p>
              <div className="flex items-center text-red-600 text-sm font-semibold">
                View Articles <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 dark:border-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left font-semibold text-gray-700 dark:text-gray-300">
                Who can donate blood?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Generally, anyone aged 18-60, weighing at least 45kg (100lbs),
                and in good health can donate. You should not have donated blood
                in the last 3-4 months. Specific medical conditions may affect
                eligibility.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left font-semibold text-gray-700 dark:text-gray-300">
                Is it safe to donate blood?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Yes, it is completely safe. New, sterile, disposable needles and
                equipment are used for each donor. There is absolutely no risk
                of contracting any disease during the donation process.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left font-semibold text-gray-700 dark:text-gray-300">
                How do I find a donor near me?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed">
                You can use our "Search Donors" feature to filter by blood group
                and location (District/Upazila). Alternatively, you can post a
                "Donation Request" which will notify nearby donors.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left font-semibold text-gray-700 dark:text-gray-300">
                Does it cost money to use BloodLine?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed">
                No. BloodLine is a strictly non-profit platform. We do not
                charge money for finding donors, and selling blood is strictly
                prohibited and illegal.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Container>
    </div>
  );
};

// Simple Icons for local use
const HeartIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);
const UserIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);
const SettingsIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

export default Support;
