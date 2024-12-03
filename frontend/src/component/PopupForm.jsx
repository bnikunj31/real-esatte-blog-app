import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const PopupForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Configure Axios base URL
  axios.defaults.baseURL = `${import.meta.env.VITE_API_ROUTE}/api`; // Change to your backend URL

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ROUTE}/api/enquiry/add`,
        formData
      );
      console.log(response);
      if (response.status === 200) {
        const result = response.data;
        toast.success(result.msg || "Enquiry submitted successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        const error = await response.data;
        toast.error(error.msg || "Failed to submit enquiry.");
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred while submitting the enquiry.");
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isOpen) {
        openPopup();
      }
    }, 180000);

    return () => clearInterval(intervalId);
  }, [isOpen]);

  return (
    <div>
      <ToastContainer />
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center z-50 justify-end m-2"
          onClick={closePopup}
        >
          <div
            className={`bg-white rounded-lg shadow-lg p-6 transform transition-transform duration-500 ease-in-out ${
              isOpen ? "translate-y-0" : "translate-y-full"
            } w-full sm:w-3/4 md:w-1/2 lg:w-[30%] h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">Get Latest Price List</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number:
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message:
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  rows="4"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupForm;
