import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo1.jpg";

const AdminNavbar = () => {
  return (
    <nav className="border-gray-200  bg-[#2c3e50] dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white flex flex-col">
            {/* Responsive Image */}
            <img
              src={logo}
              alt="RealEstate Logo"
              className="h-10 w-auto md:h-12 lg:h-14 object-contain"
            />
            <span className="text-sm">Property Mission</span>
          </span>
        </Link>

        <button
          data-collapse-toggle="navbar-solid-bg"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-solid-bg"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
          <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                aria-current="page"
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                ABOUT
              </Link>
            </li>

            {/* All Categories with Hover Dropdown */}
            <li className="relative group">
              <Link
                to="#"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                All Categories
              </Link>

              <ul className="absolute hidden group-hover:block z-10 mt-2 bg-white rounded-lg shadow-lg py-2 w-48 dark:bg-gray-700">
                <li>
                  <Link
                    to="/category/2bhk"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white"
                  >
                    2BHK Flats
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/3bhk"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white"
                  >
                    3BHK Flats
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/4bhk"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white"
                  >
                    4BHK Flats
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link
                to="/contact"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                CONTACT
              </Link>
            </li>

            <li className="flex">
              <Link
                to="/Register"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Signup
              </Link>
              <span className="text-white">/</span>
              <Link
                to="/Signin"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Signin
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
