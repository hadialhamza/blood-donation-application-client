import React from "react";
import GlobalBackground from "../components/shared/GlobalBackground";
import Navbar from "../components/layout/navbar/Navbar";
import { Outlet, ScrollRestoration } from "react-router";
import Footer from "../components/layout/footer/Footer";

const MainLayout = () => {
  return (
    <GlobalBackground>
      <ScrollRestoration />
      <Navbar />
      <Outlet />
      <Footer />
    </GlobalBackground>
  );
};

export default MainLayout;
