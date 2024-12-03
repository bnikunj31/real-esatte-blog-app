import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import CryptoJS from "crypto-js";

import Navbar from "./component/Navbar.jsx";
import Navbar2 from "./component/Navbar2.jsx";
import Footer from "./component/Footer.jsx";
import About from "./component/About.jsx";
import Contact from "./component/Contact.jsx";
import Register from "./component/Register.jsx";
import Signin from "./component/Signin.jsx";
import OTPPage from "./component/OTPPage.jsx";
import AddCategory from "./component/AddCategory.jsx";
import PropertyForm from "./component/PropertyForm.jsx";
import ProtectedRoute from "./component/ProtectedRoute.jsx";
import Forgot from "./component/Forgot.jsx";
import UsersData from "./Admin/UsersData.jsx";
import UpdateUserForm from "./Admin/UpdateUserForm.jsx";
import CategoryData from "./Admin/CategoryData.jsx";
import UpdateCategory from "./Admin/UpdateCategory.jsx";
import Enquires from "./Admin/Enquires.jsx";
import PropertiesData from "./Admin/PropertiesData.jsx";
import EditProperty from "./Admin/EditProperty.jsx";

import CardsGrid from "./component/CardsGrid.jsx";
import ImageCard from "./component/ImageCard.jsx";
import VerifyForgot from "./component/VerifyForgot.jsx";
import PropertyDetail from "./component/PropertyDetail.jsx";
import SpeedDial from "./component/SpeedDial.jsx";
import CategoriesCards from "./component/CategoriesCards.jsx";
import PrivacyPolicy from "./component/PrivacyPolicy.jsx";
import PopupForm from "./component/PopupForm.jsx";
import PageNotFound404 from "./component/PageNotFound404.jsx";
const App = () => {
  const key = import.meta.env.VITE_REACT_APP_ENCRYPTION_KEY;
  const [role, setRole] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const encryptedData = sessionStorage.getItem("userRole");
    if (encryptedData) {
      const decryptedData = CryptoJS.AES.decrypt(encryptedData, key).toString(
        CryptoJS.enc.Utf8
      );
      setRole(decryptedData);
    }
  }, []);

  // List of paths where PopupForm should not be shown
  const excludePopupPaths = [
    "/register",
    "/Otp_verify",
    "/Signin",
    "/forgot-password",
    "/forgotVerify",
    "/contact",
    "/PrivacyPolicy",
    "/admin", // Exclude admin routes from showing the popup
    "/AddCategory",
    "/PropertyForm",
    "/users",
    "/edit/users",
    "/category",
    "/edit/category",
    "/enquires",
    "/properties",
    "/edit/property",
  ];

  const shouldShowPopup =
    !excludePopupPaths.includes(location.pathname) && role !== "admin";

  // Disable right-click
  document.addEventListener("contextmenu", (event) => event.preventDefault());

  // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, and Ctrl+U
  document.onkeydown = (event) => {
    if (
      event.key === "F12" ||
      (event.ctrlKey &&
        event.shiftKey &&
        (event.key === "I" || event.key === "J")) ||
      (event.ctrlKey && event.key === "U")
    ) {
      event.preventDefault();
    }
  };

  const detectDevToolsByConsole = () => {
    const startTime = new Date();

    debugger; // This triggers a pause if DevTools is open
    const endTime = new Date();

    // If DevTools is open, the `debugger` statement causes a noticeable delay
    if (endTime - startTime > 100) {
      alert("DevTools are open. Please close them to continue.");
      sessionStorage.clear();
      window.location.href = "/Signin";
    }
  };

  setInterval(detectDevToolsByConsole, 0);

  return (
    <div className="flex flex-col min-h-screen">
      {role === "admin" ? <Navbar2 /> : <Navbar />}

      <div className="flex-grow">
        {/* Conditionally render PopupForm */}
        {shouldShowPopup && <PopupForm />}
        <Routes>
          {/* Public Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/Otp_verify" element={<OTPPage />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="/forgotVerify" element={<VerifyForgot />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/" element={<CardsGrid />} />
          <Route path="/cards" element={<ImageCard />} />
          <Route path="/about" element={<About />} />
          <Route path="/Property/:id" element={<PropertyDetail />} />
          <Route path="/category/:categoryId" element={<CategoriesCards />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role={role} requiredRole="admin" redirectTo="/">
                <CardsGrid />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AddCategory"
            element={
              <ProtectedRoute role={role} requiredRole="admin" redirectTo="/">
                <AddCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/PropertyForm"
            element={
              <ProtectedRoute role={role} requiredRole="admin" redirectTo="/">
                <PropertyForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute role={role} requiredRole="admin" redirectTo="/">
                <UsersData />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/users"
            element={
              <ProtectedRoute role={role} requiredRole="admin" redirectTo="/">
                <UpdateUserForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/category"
            element={
              <ProtectedRoute role={role} requiredRole="admin" redirectTo="/">
                <CategoryData />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/category"
            element={
              <ProtectedRoute role={role} requiredRole="admin" redirectTo="/">
                <UpdateCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/enquires"
            element={
              <ProtectedRoute role={role} requiredRole="admin" redirectTo="/">
                <Enquires />
              </ProtectedRoute>
            }
          />
          <Route
            path="/properties"
            element={
              <ProtectedRoute role={role} requiredRole="admin" redirectTo="/">
                <PropertiesData />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/property"
            element={
              <ProtectedRoute role={role} requiredRole="admin" redirectTo="/">
                <EditProperty />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<PageNotFound404 />} />
        </Routes>
      </div>
      <SpeedDial />
      <Footer />
    </div>
  );
};

export default App;
