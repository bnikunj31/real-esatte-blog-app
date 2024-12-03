import React, { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Style/Contact.css";
import SocialMediaLinks from "./SocialMediaLinks";

const Contact = ({ name }) => {
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
        const response = await fetch("/api/enquiry/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          const result = await response.json();
          toast.success(result.msg || "Enquiry submitted successfully!");
          setFormData({ name: "", email: "", phone: "", message: "" });
        } else {
          const error = await response.json();
          toast.error(error.msg || "Failed to submit enquiry.");
        }
      } catch {
        toast.error("An error occurred while submitting the enquiry.");
      }
    }
  };

  return (
    <div className="   text-gray-100  flex flex-col items-center justify-center px-4 py-8 ">
      <ToastContainer />
      <div className=" w-full">
        <div className="grid grid-cols-1 ">
          {/* Contact Details */}

          {/* Contact Form */}
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Get Latest {name} Price List
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
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
