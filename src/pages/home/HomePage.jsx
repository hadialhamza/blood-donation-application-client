import React from "react";
import Banner from "./Banner";
import Featured from "./Featured";
import ContactUs from "./ContactUs";
import AvailableDonors from "./AvailableDonors";
import TrustedPartners from "./TrustedPartners";
import TopDonors from "./TopDonors";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <Featured />
      <TopDonors />
      <TrustedPartners />
      <AvailableDonors />
      <ContactUs />
    </div>
  );
};

export default HomePage;
