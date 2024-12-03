import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const VerifyForgot = () => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);
  const navigate = useNavigate();

  const toggleNewPasswordVisibility = () =>
    setShowNewPassword(!showNewPassword);
  const toggleVerifyPasswordVisibility = () =>
    setShowVerifyPassword(!showVerifyPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== verifyPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (otp.length !== 6) {
      toast.error("OTP should be 6 digits long.");
      return;
    }
    const email = sessionStorage.getItem("email");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ROUTE}/api/users/updatePassword`,
        {
          otp,
          newPassword,
          email,
        }
      );
      if (response.status === 200) {
        toast.success(response.data.msg);
        sessionStorage.clear();
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      const errorMsg =
        error.response?.data.msg || "An error occurred. Please try again.";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-700">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              OTP
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={6}
              placeholder="Enter your OTP"
            />
          </div>

          <div className="relative mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new password"
            />
            <div
              className="absolute inset-y-0 flex items-center cursor-pointer right-3 top-7"
              onClick={toggleNewPasswordVisibility}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <div className="relative mb-4">
            <label className="block mb--2 text-sm font-medium text-gray-700">
              Verify New Password
            </label>
            <input
              type={showVerifyPassword ? "text" : "password"}
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Verify new password"
            />
            <div
              className="absolute inset-y-0 flex items-center cursor-pointer right-3 top-7"
              onClick={toggleVerifyPasswordVisibility}
            >
              {showVerifyPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyForgot;
