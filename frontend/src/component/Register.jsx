import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { auth, provider } from "../Google/config";
import { signInWithPopup } from "firebase/auth";
import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_REACT_APP_ENCRYPTION_KEY;
import "../Style/register.css";
import RegisterImg from "../assets/signup.jpg";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!name) {
      toast.error("Please enter your name.");
      return false;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email.");
      return false;
    }
    if (!phone || phone.length < 10) {
      toast.error("Please enter a valid phone number.");
      return false;
    }
    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }
    if (!termsAccepted) {
      toast.error("You must accept the Terms of Use and Privacy Policy.");
      return false;
    }
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const user = {
          name,
          email,
          phone,
          password,
          confirm_password: confirmPassword,
        };
        const response = await axios.post(
          `${import.meta.env.VITE_API_ROUTE}/api/users/signup`,
          user
        );

        if (response.status === 200) {
          toast.success("Good To Go...");
          const { name, email, phone, password } = response.data;
          sessionStorage.setItem("name", name);
          sessionStorage.setItem("email", email);
          sessionStorage.setItem("phone", phone);
          sessionStorage.setItem("password", password);
          navigate("/Otp_verify");
        }
      } catch (error) {
        if (error.response) {
          console.log(error);
          toast.error(error.response.data.msg || "Signup failed.");
        } else {
          toast.error("Something went wrong. Please try again later.");
        }
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const { displayName, email, accessToken } = user;
      const response = await axios.post(
        `${import.meta.env.VITE_API_ROUTE}/api/users/googleSignin`,
        {
          name: displayName,
          email,
        }
      );
      if (response.status === 200) {
        const role = response.data.role;
        console.log(role);
        const encryptedRole = CryptoJS.AES.encrypt(role, secretKey).toString();
        const token = accessToken;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userRole", encryptedRole);
        toast.success("Google Sign-In successful!");
        setTimeout(() => {
          navigate("/");
          location.reload();
        }, 2000);
      }
    } catch (error) {
      toast.error("Google Sign-In failed.");
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <div className="w-auto flex items-center justify-center sm:px-10 md:px-20  lg:px-32 sm:w-full ">
      <ToastContainer />
      <div className="flex w-full max-w-sm overflow-hidden bg-white border rounded-lg shadow-lg lg:max-w-4xl">
        <div
          className="hidden md:block lg:w-1/2"
          style={{
            backgroundImage: `url(${RegisterImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        <div className="w-full p-8 lg:w-1/2">
          <p className="text-xl text-center text-gray-600">
            Create your account
          </p>
          <form onSubmit={handleSignup} className="mt-4">
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Name
              </label>
              <input
                className="block w-full px-4 py-2 text-gray-700 border border-gray-300 rounded focus:outline-2 focus:outline-blue-700"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Email Address
              </label>
              <input
                className="block w-full px-4 py-2 text-gray-700 border border-gray-300 rounded focus:outline-2 focus:outline-blue-700"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Phone
              </label>
              <input
                className="block w-full px-4 py-2 text-gray-700 border border-gray-300 rounded focus:outline-2 focus:outline-blue-700"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="relative mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Password
              </label>
              <input
                className="block w-full px-4 py-2 text-gray-700 border border-gray-300 rounded focus:outline-2 focus:outline-blue-700"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 pt-8 text-gray-600 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="relative mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Confirm Password
              </label>
              <input
                className="block w-full px-4 py-2 text-gray-700 border border-gray-300 rounded focus:outline-2 focus:outline-blue-700"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 px-3 pt-6 text-gray-600 focus:outline-none"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                className="mr-2"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
                required
              />
              <span className="text-sm text-gray-700">
                I accept the{" "}
                <Link to={"/PrivacyPolicy"} className="text-blue-700">
                  Privacy Policy
                </Link>
              </span>
            </div>
            <div className="mt-8">
              <button
                className="w-full px-4 py-2 font-bold text-white bg-blue-700 rounded hover:bg-blue-600"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div>
            <p className="text-sm text-center text-gray-500 mt-3 ">OR</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 text-center ">
              Already registered?{" "}
              <a href="/login " className="text-blue-500 mt-2">
                Signin
              </a>
            </p>
          </div>
          <div className="mt-2">
            <button
              type="button"
              class="login-with-google-btn flex items-center justify-center w-full px-4 py-2"
              onClick={handleGoogleSignIn}
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
