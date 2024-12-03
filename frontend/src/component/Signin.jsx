import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import CryptoJS from "crypto-js";
import { auth, provider } from "../Google/config";
import { signInWithPopup } from "firebase/auth";
import SigninImg from "../assets/login.jpg";

const secretKey = import.meta.env.VITE_REACT_APP_ENCRYPTION_KEY;

const Signin = () => {
  const [email_phone, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
  sessionStorage.removeItem("userRole");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Show a toast message indicating login is in progress
    const loadingToastId = toast.loading("Logging in...");

    try {
      // Send login request
      const response = await axios.post(
        `${import.meta.env.VITE_API_ROUTE}/api/users/login`,
        {
          email_phone,
          password,
        }
      );
      if (response.status === 401) {
        toast.error("You are not verified.");
      }
      if (response.status === 200) {
        const { user, token } = response.data;
        if (user) {
          // Update toast message on success
          toast.update(loadingToastId, {
            render: "Logged in successfully!",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          // Encrypt and store session data
          const encryptedRole = CryptoJS.AES.encrypt(
            user.role,
            secretKey
          ).toString();
          const encryptedToken = CryptoJS.AES.encrypt(
            token,
            secretKey
          ).toString();

          sessionStorage.setItem("userRole", encryptedRole);
          sessionStorage.setItem("token", encryptedToken);

          // Navigate based on user role
          setTimeout(() => {
            navigate("/");
            window.location.reload();
          }, 2000);
        } else {
          toast.update(loadingToastId, {
            render: response.data.message || "Login failed!",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        }
      } else {
        toast.error("Unable to Verify.");
      }
    } catch (error) {
      toast.update(loadingToastId, {
        render: error.response?.data.message || "Login failed!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen px-0 sm:px-5">
      <ToastContainer />
      <div className="flex w-full max-w-sm overflow-hidden bg-white border rounded-lg shadow-lg lg:max-w-4xl">
        <div
          className="hidden bg-cover bg-center md:block lg:w-1/2"
          style={{
            backgroundImage: `url(${SigninImg})`,
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <p className="text-xl text-center text-gray-600">Welcome back!</p>
          <form onSubmit={handleLogin}>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Email Address
              </label>
              <input
                className="block w-full px-4 py-2 text-gray-700 border border-gray-300 rounded focus:outline-2 focus:outline-blue-700"
                type="text"
                value={email_phone}
                onChange={(e) => setEmail(e.target.value)}
                required
                name="email_phone"
                aria-label="Email Address"
              />
            </div>
            <div className="relative flex flex-col justify-between mt-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Password
              </label>
              <input
                className="block w-full px-4 py-2 text-gray-700 border border-gray-300 rounded focus:outline-2 focus:outline-blue-700"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-label="Password"
              />
              <a
                href="/forgot-password"
                className="w-full mt-2 text-xs text-gray-500 hover:text-gray-900 text-end"
              >
                Forget Password
              </a>

              <div
                className="absolute transform -translate-y-1/2 cursor-pointer right-4 top-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash size={20} color="#4B5563" />
                ) : (
                  <FaEye size={20} color="#4B5563" />
                )}
              </div>
            </div>
            <button
              className="w-full px-4 py-2 mt-8 font-bold text-white bg-blue-700 rounded hover:bg-blue-600"
              type="submit"
            >
              Login
            </button>
            <div>
              <p className="text-sm text-gray-500 mt-2 text-center ">
                Don't have an account{" "}
                <a href="/register " className="text-blue-500 mt-2">
                  Signup
                </a>
              </p>
            </div>
            <div>
              <p className="text-sm text-center text-gray-500  ">OR</p>
            </div>
            <div className="mt-2">
              {/* <button className="flex items-center justify-center w-full px-4 py-2 text-white bg-red-600 rounded-lg shadow-md hover:bg-red-500">
              <span className="mr-2">Sign in with Google</span>
            </button> */}
              <button
                type="button"
                class="login-with-google-btn flex items-center justify-center w-full px-4 py-2"
                onClick={handleGoogleSignIn}
              >
                Sign in with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
