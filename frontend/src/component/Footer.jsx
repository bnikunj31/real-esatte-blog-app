import React from "react";

import logo from "../assets/FooterLogo.png";
import SocialMediaLinks from "./SocialMediaLinks";
const Footer = () => {
  return (
    <footer className="pt-8 bg-gray-100 border-t border-gray-300 mt-4 sm:mt-0">
      <div className="container grid grid-cols-1 gap-8 px-6 mx-auto sm:grid-cols-2 lg:grid-cols-4 lg:px-16">
        {/* Company Info */}
        <div className="text-center lg:text-left">
          <img
            src={logo}
            alt="Reality Solutions Logo"
            className="mx-auto lg:mx-0 w-32"
          />
          <p className="mt-4 text-gray-700 text-left">
            PropertyMission24x7 is your trusted real estate partner in the
            Tricity area, specializing in buying, selling, renting, and
            financial services. Located in Panchkula, we are available 24x7 at
            <span>
              {" "}
              <a href="tel:+917015433569">7015433569</a>{" "}
            </span>{" "}
            or{" "}
            <a href="mailto:propertymission81@gmail.com">
              propertymission81@gmail.com
            </a>
            . We prioritize your privacy and security in all transactions.
          </p>
        </div>

        {/* Useful Links */}
        <div className="text-center lg:text-left">
          <h3 className="mb-4 text-lg font-bold">Useful Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                About
              </a>
            </li>

            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
            <li>
              <a href="/PrivacyPolicy" className="hover:underline">
                Privacy & Policy
              </a>
            </li>
          </ul>
        </div>

        {/* More Links */}
        <div className="text-center lg:text-left">
          <h3 className="mb-4 text-lg font-bold">Additional Services</h3>
          <ul className="space-y-2">
            <li>
              <p>Interior Design</p>
            </li>
            <li>
              <p>Mutual Funds </p>
            </li>
            <li>
              <p>Loan</p>
            </li>
          </ul>
        </div>

        {/* Quick Connect */}
        <div className=" lg:text-left border-red-50">
          <h3 className="mb-4 text-lg font-bold">Quick Connect</h3>
          <p className="text-gray-700"></p>
          <p className="text-gray-700">
            <b>Address: </b>House No. 1450, Sector 15, Panchkula
          </p>
          <p className="text-gray-700">
            <b>Phone</b>:<a href="tel:+917015433569">+91 7015433569</a>
          </p>

          <div className="flex">
            <p>
              <b>Email:</b>{" "}
            </p>
            <p className="text-gray-700">
              <a href="mailto:propertymission81@gmail.com">
                &nbsp;propertymission81@gmail.com
              </a>
            </p>
          </div>
          <SocialMediaLinks />
        </div>
      </div>

      {/* Copyright Section */}
      <div className="py-4 mt-8 text-center text-white bg-black">
        <p>Copyright © 2024 Flats in Zirakpur | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
