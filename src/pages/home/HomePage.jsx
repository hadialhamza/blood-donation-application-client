import React from "react";
import Banner from "./Banner";
import Featured from "./Featured";
import ContactUs from "./ContactUs";
import FeaturedDonors from "./AvailableDonors";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <Featured />
      <FeaturedDonors />
      <ContactUs />
    </div>
  );
};

export default HomePage;
