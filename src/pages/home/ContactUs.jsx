import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ContactUs = () => {
  return (
    <section className="bg-slate-50 dark:bg-zinc-950 py-24 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-muted-foreground">
            Whether you have a question about the donation process, need to find
            a specific blood type, or want to partner with us, we're here to
            help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* LEFT COLUMN: Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Emergency Card */}
            <Card className="border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-900/20 shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-red-600 text-lg">
                  <Phone className="h-5 w-5" /> Emergency Hotline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-red-600/80 mb-1">
                  24/7 Urgent Blood Requests
                </p>
                <p className="text-3xl font-bold text-red-600">+880 1234 567</p>
              </CardContent>
            </Card>

            {/* General Info Card */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Reach out to our support team directly.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-muted-foreground">
                      support@bloodline.com
                    </p>
                    <p className="text-sm text-muted-foreground">
                      partners@bloodline.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Headquarters</p>
                    <p className="text-sm text-muted-foreground">
                      123 Health Avenue, Medical District
                      <br />
                      Dhaka, Bangladesh 1200
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Office Hours</p>
                    <p className="text-sm text-muted-foreground">
                      Sun - Thu: 9:00 AM - 6:00 PM
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Fri - Sat: Closed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN: Contact Form */}
          <div className="lg:col-span-2">
            <Card className="h-full border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and our team will get back to you
                  within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number (Optional)</Label>
                      <Input id="phone" type="tel" placeholder="+880..." />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="How can we help?" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      className="min-h-[150px]"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full sm:w-auto">
                    <Send className="w-4 h-4 mr-2" /> Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* BOTTOM SECTION: FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold flex items-center justify-center gap-2">
              <HelpCircle className="w-6 h-6 text-primary" /> Frequently Asked
              Questions
            </h3>
          </div>

          <Accordion
            type="single"
            collapsible
            className="w-full bg-white dark:bg-zinc-900 rounded-xl px-4 py-2 border shadow-sm"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>Who can donate blood?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Generally, anyone aged 18-60, weighing at least 45kg (100lbs),
                and in good health can donate. You should not have donated in
                the last 3-4 months.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                How long does the donation process take?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                The actual blood draw takes only about 8-10 minutes. However,
                the entire process (registration, screening, and recovery) takes
                about 45 minutes to an hour.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it safe to donate blood?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes, it is completely safe. We use sterile, disposable equipment
                for every donor. There is no risk of contracting infections
                during the donation process.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                How can I request blood for an emergency?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                For immediate emergencies, please call our 24/7 Hotline
                displayed above. Alternatively, you can use the "Donation
                Requests" page to post a public request.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
