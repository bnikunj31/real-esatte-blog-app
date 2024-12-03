import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "react-toastify/dist/ReactToastify.css";

const OTPPage = () => {
  const [otp, setOtp] = useState("");
  const email = sessionStorage.getItem("email");
  const navigate = useNavigate(); // Initialize navigate

  // Fetch OTP on component mount

  const handleInputChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      toast.warn("Please enter the OTP.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ROUTE}/api/users/otp`,
        { otp, email }
      );

      console.log(response.data);
      if (response.status === 200) {
        toast.success("OTP Verified Successfully!");
        navigate("/login");
      } else {
        toast.error("Invalid OTP, please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("An error occurred while verifying OTP.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Enter OTP
        </h2>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600"
              htmlFor="otp"
            >
              OTP Code
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={handleInputChange}
              maxLength="6"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue focus:border-transparent"
              placeholder="Enter 6-digit OTP"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 font-semibold text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Verify OTP
          </button>
        </form>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
};

export default OTPPage;
