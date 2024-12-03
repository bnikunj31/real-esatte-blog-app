import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateCategory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (location.state && location.state.category) {
      setCategory(location.state.category.type_name);
      setIsEditMode(true);
    }
  }, [location.state]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (isEditMode) {
        response = await axios.patch(
          `${import.meta.env.VITE_API_ROUTE}/api/property/${
            location.state.category._id
          }`,
          {
            type_name: category,
          }
        );
      } else {
        response = await axios.post(
          `${import.meta.env.VITE_API_ROUTE}/api/property/propertyTypeAdd`,
          {
            type_name: category,
          }
        );
      }
      if (response.status === 200) {
        toast.success(response.data.msg || "Category updated successfully.", {
          position: "top-center",
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate("/category");
        }, 3000);
      }
      setCategory("");
    } catch (error) {
      console.error("Error:", error);
      const errorMsg = error.response?.data?.message || "Internal Server Error";
      toast.error(errorMsg, {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
          {isEditMode ? "Update Category" : "Add New Category"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Box sx={{ "& .MuiTextField-root": { m: 2, width: "42ch" } }}>
            <TextField
              id="category"
              value={category}
              onChange={handleCategoryChange}
              label="Category"
              variant="standard"
            />
          </Box>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white transition-colors bg-[#2c3e50] rounded-md hover:bg-[#2c354f]"
          >
            {isEditMode ? "Update Category" : "Add Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
