import React, { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SocialMediaLinks from "./SocialMediaLinks";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.message) newErrors.message = "Message is required";
    if (formData.message && formData.message.length > 250) {
      newErrors.message = "Message can be max 250 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_ROUTE}/api/enquiry/add`,
          formData
        );
        if (response.status === 200) {
          const result = await response.data;
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
    }
  };

  return (
    // NPM
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gray-900 text-gray-100 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://www.goldfishre.com.au/img/about-us.jpg")',
      }}
    >
      {" "}
      <ToastContainer />
      <div className="max-w-6xl w-full">
        <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>
        <p className="text-center text-lg mb-12">
          We’re here to assist you 24x7 with all your real estate needs. Whether
          you’re buying, selling, renting, or need financial services like loans
          and mutual fund guidance, our team is just a call or message away.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <div className="mb-4">
              <h3 className="font-bold">Phone:</h3>
              <p className="flex items-center gap-2">
                <FaPhoneAlt />
                <a href="tel:+917015433569">+91 7015433569</a>
              </p>
            </div>
            <div className="mb-4">
              <h3 className="font-bold">Email:</h3>
              <p className="flex items-center gap-2">
                <MdEmail />{" "}
                <a href="mailto:propertymission81@gmail.com">
                  &nbsp;propertymission81@gmail.com
                </a>
              </p>
              <p className="text-sm text-gray-600">
                We’ll get back to you as soon as possible.
              </p>
            </div>
            <div className="mb-4">
              <h3 className="font-bold">Visit Our Office:</h3>
              <p>House No. 1450, Sector 15, Panchkula</p>
            </div>
            <div className="mb-4">
              <h3 className="font-bold">Working Hours:</h3>
              <p>
                <strong>Monday to Sunday:</strong> 24x7
              </p>
              <p>We are always available to assist you, no matter the time.</p>
            </div>
            <div className="mb-2 ">
              <h3 className="font-bold">We’re Here to Help!</h3>

              <p className="text-justify">
                Feel free to contact us with any questions or to schedule a
                consultation. We look forward to assisting you with your next
                property transaction.
              </p>
            </div>
            <div className="flex">
              {/* <h3 className="font-bold">Social Media</h3> */}
              <SocialMediaLinks />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Leave a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block font-medium">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
              <div>
                <label htmlFor="message" className="block font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Write your message (max 250 characters)"
                  maxLength="250"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
