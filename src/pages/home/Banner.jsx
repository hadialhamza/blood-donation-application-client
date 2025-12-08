import React from "react";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://plus.unsplash.com/premium_photo-1723132609837-97583cde95ba)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Donate Blood, Save Life</h1>
          <p className="mb-5">
            Your contribution can save a life. Join our community to help those
            in need or find donors near you.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/register" className="btn btn-error text-white">
              Join as a donor
            </Link>
            <Link to="/search" className="btn btn-outline text-white">
              Search Donors
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
