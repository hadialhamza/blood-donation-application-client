import React from "react";
import BloodLineLogo from "../logo/BloodLineLogo";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content border-t border-base-300">
      <div className="max-w-7xl mx-auto p-10">
        <div className="footer grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Section */}
          <aside className="flex flex-col gap-4">
            <BloodLineLogo width={180} />
            <p className="text-sm opacity-75">
              BloodLine Organization.
              <br />
              Connecting donors with those in need since 2024.
              <br />
              Saving lives, one drop at a time.
            </p>
          </aside>

          {/* Services Section */}
          <nav className="flex flex-col gap-2">
            <h6 className="footer-title opacity-100 text-primary">Services</h6>
            <Link to="/donation-requests" className="link link-hover hover:text-primary transition-colors">
              Donation Request
            </Link>
            <Link to="/search" className="link link-hover hover:text-primary transition-colors">
              Find Donors
            </Link>
            <Link to="/blog" className="link link-hover hover:text-primary transition-colors">
              Blog & News
            </Link>
            <a className="link link-hover hover:text-primary transition-colors">Blood Bank</a>
          </nav>

          {/* Company Section */}
          <nav className="flex flex-col gap-2">
            <h6 className="footer-title opacity-100 text-primary">Company</h6>
            <a className="link link-hover hover:text-primary transition-colors">About us</a>
            <a className="link link-hover hover:text-primary transition-colors">Contact</a>
            <a className="link link-hover hover:text-primary transition-colors">Volunteers</a>
            <a className="link link-hover hover:text-primary transition-colors">Press kit</a>
          </nav>

          {/* Legal / Social Section */}
          <nav className="flex flex-col gap-2">
            <h6 className="footer-title opacity-100 text-primary">Legal</h6>
            <a className="link link-hover hover:text-primary transition-colors">Terms of use</a>
            <a className="link link-hover hover:text-primary transition-colors">Privacy policy</a>
            <a className="link link-hover hover:text-primary transition-colors">Cookie policy</a>
          </nav>
        </div>

        {/* Divider & Copyright */}
        <div className="divider my-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-center md:text-left">
            Copyright © {new Date().getFullYear()} - All rights reserved by BloodLine Ltd
          </p>

          <div className="flex gap-4">
            <a href="#" className="btn btn-ghost btn-circle btn-sm hover:bg-base-300 hover:text-primary">
              <FaFacebook className="w-5 h-5" />
            </a>
            <a href="#" className="btn btn-ghost btn-circle btn-sm hover:bg-base-300 hover:text-primary">
              <FaTwitter className="w-5 h-5" />
            </a>
            <a href="#" className="btn btn-ghost btn-circle btn-sm hover:bg-base-300 hover:text-primary">
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a href="#" className="btn btn-ghost btn-circle btn-sm hover:bg-base-300 hover:text-primary">
              <FaGithub className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
