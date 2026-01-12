import React from "react";
import Banner from "./Banner";
import Featured from "./Featured";
import ContactUs from "./ContactUs";
import AvailableDonors from "./AvailableDonors";
import TrustedPartners from "./TrustedPartners";
import TopDonors from "./TopDonors";
import ImpactStats from "./ImpactStats";
import HowItWorks from "./HowItWorks";
import FAQSection from "./FAQSection";
import Testimonials from "./Testimonials";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <Featured />
      <ImpactStats />
      <HowItWorks />
      <TopDonors />
      <TrustedPartners />
      <AvailableDonors />
      <Testimonials />
      <FAQSection />
      <ContactUs />
    </div>
  );
};

export default HomePage;
