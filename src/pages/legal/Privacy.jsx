import React from "react";
import { Shield, Lock, FileText } from "lucide-react";
import Container from "@/components/shared/container/Container";
import SectionHeader from "@/components/shared/SectionHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Privacy = () => {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <Container>
        <div className="text-center mb-16">
          <SectionHeader
            icon={Shield}
            badge="Privacy & Terms"
            title="We Value Your"
            highlight="Privacy & Trust"
            description="Transparency is at the core of everything we do. Read our policies to understand how we protect your data."
          />
        </div>

        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg shadow-slate-200/50 dark:shadow-black/20 border border-slate-100 dark:border-gray-800">
          <Tabs defaultValue="privacy" className="w-full">
            <div className="bg-slate-50 dark:bg-gray-800/50 border-b border-slate-200 dark:border-gray-800 px-6 pt-6">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto h-12 bg-white dark:bg-gray-900 p-1 border border-slate-200 dark:border-gray-700">
                <TabsTrigger
                  value="privacy"
                  className="data-[state=active]:bg-red-500 data-[state=active]:text-white rounded-md transition-all font-medium"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Privacy Policy
                </TabsTrigger>
                <TabsTrigger
                  value="terms"
                  className="data-[state=active]:bg-red-500 data-[state=active]:text-white rounded-md transition-all font-medium"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Terms of Service
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-8 md:p-12">
              <TabsContent
                value="privacy"
                className="space-y-8 mt-0 animate-in fade-in-50"
              >
                <div className="prose dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-400">
                  <h3>1. Information We Collect</h3>
                  <p>
                    We collect information you provide directly to us, such as
                    when you create an account, update your profile, request
                    blood, or communicate with us. This information may include
                    your name, email address, phone number, blood group, and
                    location.
                  </p>

                  <h3>2. How We Use Your Information</h3>
                  <p>
                    We use the information we collect to provide, maintain, and
                    improve our services, including to facilitate connections
                    between blood donors and recipients. We may also use your
                    information to send you technical notices, updates, security
                    alerts, and support messages.
                  </p>

                  <h3>3. Data Security</h3>
                  <p>
                    We take reasonable measures to help protect information
                    about you from loss, theft, misuse and unauthorized access,
                    disclosure, alteration and destruction. We use
                    industry-standard encryption for sensitive data.
                  </p>

                  <h3>4. Sharing of Information</h3>
                  <p>
                    We do not share your personal information with third parties
                    except as described in this privacy policy. We may share
                    your information with other users (e.g., donors seeing
                    recipient requests) as necessary to provide our services.
                  </p>
                </div>
              </TabsContent>

              <TabsContent
                value="terms"
                className="space-y-8 mt-0 animate-in fade-in-50"
              >
                <div className="prose dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-400">
                  <h3>1. Acceptance of Terms</h3>
                  <p>
                    By accessing or using our services, you agree to be bound by
                    these Terms of Service. If you do not agree to these terms,
                    you may not use our services.
                  </p>

                  <h3>2. User Responsibilities</h3>
                  <p>
                    You are responsible for your use of the services and for any
                    content you provide. You agree not to use the services for
                    any illegal or unauthorized purpose. Selling blood is
                    strictly prohibited and illegal; our platform is for
                    voluntary donation only.
                  </p>

                  <h3>3. Verification of Information</h3>
                  <p>
                    While we strive to verify contact information, we cannot
                    guarantee the accuracy of all user-provided data. Users are
                    encouraged to verify details independently before meeting or
                    proceeding with donations.
                  </p>

                  <h3>4. Limitation of Liability</h3>
                  <p>
                    To the fullest extent permitted by law, BloodLine shall not
                    be liable for any indirect, incidental, special,
                    consequential or punitive damages, or any loss of profits or
                    revenues, whether incurred directly or indirectly.
                  </p>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </Container>
    </div>
  );
};

export default Privacy;
