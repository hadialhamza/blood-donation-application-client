import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import Container from "@/components/shared/container/Container";
import SectionHeader from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success("Message sent successfully! We'll get back to you soon.");
    setLoading(false);
    e.target.reset();
  };

  return (
    <div className="min-h-screen pt-28 pb-20">
      <Container>
        <div className="text-center mb-16">
          <SectionHeader
            icon={Mail}
            badge="Get in Touch"
            title="We'd Love to"
            highlight="Hear From You"
            description="Have a question about donating? Want to partner with us? Or just want to say hello? Drop us a line below."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Contact Info Cards */}
          <div className="space-y-6 lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-800">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center text-red-600 mb-6">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Call Us
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">
                Available Mon-Fri, 9am - 6pm
              </p>
              <a
                href="tel:01765060631"
                className="text-lg font-semibold text-gray-900 dark:text-white hover:text-red-600 transition-colors"
              >
                01765060631
              </a>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-800">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Email Us
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">
                We usually reply within 24 hours
              </p>
              <a
                href="mailto:hamzaglory@gmail.com"
                className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 transition-colors"
                style={{ wordBreak: "break-all" }}
              >
                hamzaglory@gmail.com
              </a>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-800">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-600 mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Visit Us
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">
                Headquarters
              </p>
              <p className="text-base font-semibold text-gray-900 dark:text-white">
                Rangpur division, <br />
                Bangladesh
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-black/20 border border-slate-100 dark:border-gray-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      placeholder="Your Name"
                      required
                      className="bg-slate-50 dark:bg-gray-800 border-slate-200 dark:border-gray-700 h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your Email"
                      required
                      className="bg-slate-50 dark:bg-gray-800 border-slate-200 dark:border-gray-700 h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="How can we help?"
                    required
                    className="bg-slate-50 dark:bg-gray-800 border-slate-200 dark:border-gray-700 h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Write your message here..."
                    required
                    className="min-h-[150px] bg-slate-50 dark:bg-gray-800 border-slate-200 dark:border-gray-700"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 h-12 text-lg font-semibold shadow-lg shadow-red-500/20"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-20 rounded-3xl overflow-hidden h-96 shadow-lg border border-slate-200 dark:border-gray-800 grayscale hover:grayscale-0 transition-all duration-500">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14607.607186120935!2d90.41251815!3d23.7508711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b86c55555555%3A0x5555555555555555!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1655555555555!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
