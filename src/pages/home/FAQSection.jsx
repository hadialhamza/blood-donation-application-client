import React from "react";
import { HelpCircle } from "lucide-react";
import Container from "@/components/shared/container/Container";
import SectionHeader from "@/components/shared/SectionHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Who can donate blood?",
      answer:
        "Most people in good health between 18 and 65 years old can donate blood. You must weigh at least 110 lbs and have a hemoglobin level of at least 12.5 g/dL for women and 13.5 g/dL for men. Always check with your healthcare provider if you have specific health conditions.",
    },
    {
      question: "How often can I donate blood?",
      answer:
        "You can donate whole blood every 56 days (8 weeks). If you donate platelets or plasma, you can donate more frequently - up to twice a week. Our platform tracks your eligibility based on your last donation date.",
    },
    {
      question: "How long does a blood donation take?",
      answer:
        "The actual blood donation process takes about 8-10 minutes. However, the entire appointment including registration, health screening, and refreshments usually takes 45 minutes to an hour.",
    },
    {
      question: "Is it safe to donate blood?",
      answer:
        "Yes, blood donation is very safe. We use sterile, single-use needles for each donor. There are no health risks associated with donating blood. Side effects are minimal and temporary, usually just mild fatigue or dizziness.",
    },
    {
      question: "How do I request blood through this platform?",
      answer:
        "If you need blood, you can create a request on our platform with your blood group, urgency level, and location. Our matching algorithm will identify eligible donors nearby, and they'll be notified instantly. You can also contact partner hospitals.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, we take privacy very seriously. Your personal information is encrypted and only shared with medical institutions or donors when absolutely necessary with your consent. We comply with all healthcare privacy regulations.",
    },
  ];

  return (
    <section className="mt-20 lg:mt-30">
      <Container>
        <SectionHeader
          icon={HelpCircle}
          badge="Questions?"
          title="Frequently Asked"
          highlight="Questions"
          description="Find answers to common questions about blood donation, eligibility, and how our platform works."
        />

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-gray-200 dark:border-gray-700 rounded-lg px-6 py-2 bg-white dark:bg-slate-900 hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="hover:no-underline text-left py-4">
                  <span className="text-base font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  );
};

export default FAQSection;
