import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  HelpCircle,
  MessageSquare,
  LifeBuoy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Container from "@/components/container/Container";

const ContactUs = () => {
  return (
    <section className="relative min-h-screen mt-20 lg:mt-30">
      {/* --- Top Banner Section --- */}
      <div className="bg-red-600 dark:bg-red-900/80 pt-20 pb-32 relative overflow-hidden">
        <Container>
          <div className="text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white font-bold text-sm mb-6 backdrop-blur-md shadow-sm">
              <LifeBuoy className="w-4 h-4 animate-pulse" />
              <span>Support Center</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              We're here to help.
            </h2>
            <p className="text-red-100 text-lg max-w-2xl mx-auto leading-relaxed">
              Have questions about donation eligibility or need urgent
              assistance? Our team is ready to support you.
            </p>
          </div>
        </Container>
      </div>

      {/* --- Main Content --- */}
      <Container>
        <div className="container mx-auto px-4 -mt-24 relative z-20 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT COLUMN: */}
            <div className="lg:col-span-5 space-y-8">
              {/* Quick Contact Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
                {/* Emergency Card */}
                <Card className="shadow-xl bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md border-l-8 border-l-red-500">
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className="p-3 bg-red-200 dark:bg-red-900/70 rounded-full text-red-600">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        Emergency
                      </p>
                      <p className="text-2xl font-bold text-zinc-900 dark:text-white mt-1">
                        +880 1765 060 631
                      </p>
                      <p className="text-xs text-red-500 mt-1 font-medium">
                        Available 24/7 for urgent requests
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* General Info Card */}
                <Card className="shadow-xl bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md border-l-8 border-l-blue-500">
                  <CardContent className="p-6 space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-zinc-900 dark:text-white">
                          Email Support
                        </p>
                        <p className="text-sm text-muted-foreground">
                          hamzaglory@gmail.com
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-orange-600">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-zinc-900 dark:text-white">
                          Headquarters
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Mahiganj, Rangpur Sadar, Bangladesh.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Compact FAQ Section */}
              <div className="bg-white dark:bg-zinc-800/90 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-zinc-100 dark:border-zinc-800">
                <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-zinc-900 dark:text-white">
                  <HelpCircle className="w-5 h-5 text-zinc-500" />
                  Quick Answers
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem
                    value="item-1"
                    className="border-b-zinc-100 dark:border-b-zinc-800"
                  >
                    <AccordionTrigger className="text-sm hover:no-underline">
                      Who can donate?
                    </AccordionTrigger>
                    <AccordionContent className="text-xs text-muted-foreground">
                      Ages 18-60, 45kg+, good health, no donation in last 4
                      months.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem
                    value="item-2"
                    className="border-b-zinc-100 dark:border-b-zinc-800"
                  >
                    <AccordionTrigger className="text-sm hover:no-underline">
                      Is it safe?
                    </AccordionTrigger>
                    <AccordionContent className="text-xs text-muted-foreground">
                      100% safe. We use sterile, disposable equipment for every
                      donor.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3" className="border-0">
                    <AccordionTrigger className="text-sm hover:no-underline">
                      How to request blood?
                    </AccordionTrigger>
                    <AccordionContent className="text-xs text-muted-foreground">
                      Use the "Donation Requests" page or call our hotline for
                      emergencies.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            {/* form section */}
            <div className="lg:col-span-7">
              <Card className="h-full border-none shadow-2xl bg-white dark:bg-zinc-800/90 backdrop-blur-md overflow-hidden relative">
                <div className="absolute top-0 left-0 w-2 h-full bg-linear-to-b from-red-500 via-orange-500 to-yellow-500"></div>

                <CardHeader className="pt-8 pb-2 px-8">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <MessageSquare className="w-6 h-6 text-red-600" /> Send a
                    Message
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">
                    We usually respond within a few hours.
                  </p>
                </CardHeader>

                <CardContent className="p-8 pt-4">
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label
                          htmlFor="name"
                          className="text-xs font-bold uppercase text-muted-foreground"
                        >
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          placeholder="Your full name"
                          className="bg-slate-50 dark:bg-zinc-800/50 border-slate-200 dark:border-zinc-700 h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="text-xs font-bold uppercase text-muted-foreground"
                        >
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          className="bg-slate-50 dark:bg-zinc-800/50 border-slate-200 dark:border-zinc-700 h-11"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="message"
                        className="text-xs font-bold uppercase text-muted-foreground"
                      >
                        Your Message
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="How can we help you today?"
                        className="min-h-[180px] bg-slate-50 dark:bg-zinc-800/50 border-slate-200 dark:border-zinc-700 resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <Button type="text" size="lg" className="w-full ">
                        <Send className="w-4 h-4 mr-2" /> Send Message
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactUs;
