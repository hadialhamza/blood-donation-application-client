import React from "react";
import GlobalBackground from "../components/shared/GlobalBackground";
import Navbar from "../components/layout/navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/layout/footer/Footer";

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
