import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCategory = () => {
  const [category, setCategory] = useState("");

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ROUTE}/api/property/propertyTypeAdd`,
        {
          category,
        }
      );
      toast.success(response.data.msg); // Show success toast
      setCategory("");
    } catch (error) {
      console.log("Error response:", error.response);
      console.log("Error message:", error.message);
      const errorMsg = error.response?.data?.message || "Internal Server Error";
      toast.error(errorMsg); // Show error toast
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
          Add New Category
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Box
              sx={{ "& .MuiTextField-root": { m: 2, width: "42ch" } }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="category"
                value={category}
                onChange={handleCategoryChange}
                label="Category"
                variant="standard"
              />
            </Box>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white transition-colors bg-[#2c3e50] rounded-md hover:bg-[#2c354f]"
          >
            Add Category
          </button>
        </form>
      </div>
      <ToastContainer /> {/* Toast container to display toasts */}
    </div>
  );
};

export default AddCategory;
