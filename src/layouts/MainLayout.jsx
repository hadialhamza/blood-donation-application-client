import React from "react";
import GlobalBackground from "../components/shared/GlobalBackground";
import Navbar from "../components/navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/footer/Footer";

const MainLayout = () => {
  return (
    <GlobalBackground>
      <Navbar />
      <Outlet />
      <Footer />
    </GlobalBackground>
  );
};

export default MainLayout;
