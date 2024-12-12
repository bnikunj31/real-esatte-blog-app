import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
import axios from "axios";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!sessionStorage.getItem("token")
  );
  const [categories, setCategories] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!sessionStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_ROUTE}/api/property/propertyTypeAdd`
        );
        setCategories(response.data.propertyTypes);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
    window.location.reload();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="border-b mb-3 border-gray-200 bg-[#2c3e50] dark:border-gray-700 sm:mb-2">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-2 mx-auto">
        <Link to="/" className="flex items-center" onClick={closeMenu}>
          <img
            src={logo}
            alt="RealEstate Logo"
            className="w-40 h-auto md:h-12"
            tabIndex="-1"
          />
        </Link>

        <button
          type="button"
          onClick={toggleMenu}
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden focus:outline-none"
          aria-controls="navbar"
          aria-expanded={isMenuOpen ? "true" : "false"}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar"
        >
          <ul className="flex flex-col items-center space-y-4 font-medium md:flex-row md:space-x-8 md:space-y-0 text-white">
            <li>
              <Link
                to="/"
                className="px-3 py-2 text-white hover:text-blue-500"
                onClick={closeMenu}
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="px-3 py-2 text-white hover:text-blue-500"
                onClick={closeMenu}
              >
                ABOUT
              </Link>
            </li>
            <li className="relative group">
              <span className="px-3 py-2 text-white cursor-pointer hover:text-blue-500">
                All Categories
              </span>
              <ul className="absolute z-10 hidden w-48 p-1 mt-1 bg-gray-700 text-white rounded-lg shadow-lg group-hover:block">
                {categories &&
                  categories.length > 0 &&
                  categories.map((category) => (
                    <li key={category._id}>
                      <Link
                        to={`/category/${category._id}`}
                        className="block px-4 py-2 text-white hover:bg-gray-500 dark:hover:bg-gray-600 dark:text-white"
                        onClick={closeMenu}
                      >
                        {category.type_name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </li>
            <li>
              <Link
                to="/contact"
                className="px-3 py-2 text-white hover:text-blue-500"
                onClick={closeMenu}
              >
                Contact
              </Link>
            </li>

            {isAuthenticated ? (
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="px-3 py-2 text-white hover:text-blue-500"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li className="flex">
                <Link
                  to="/register"
                  className="px-3 py-2 text-white hover:text-blue-500"
                  onClick={closeMenu}
                >
                  Signup
                </Link>
                <Link
                  to="/login"
                  className="px-3 py-2 text-white hover:text-blue-500"
                  onClick={closeMenu}
                >
                  Signin
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
