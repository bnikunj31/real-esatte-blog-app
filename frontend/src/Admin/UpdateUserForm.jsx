import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  MenuItem,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateUserForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {};

  const [userData, setUserData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "",
  });

  const roles = ["admin", "user"];

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_ROUTE}/api/users/${user._id}`,
        userData
      );
      if (response.status === 200) {
        toast.success(response.data.msg); // Show success toast message
        navigate("/users"); // Navigate back to the users page
      }
    } catch (error) {
      console.error("Error updating user information:", error);
      toast.error("Error updating user information. Please try again."); // Show error toast message
    }
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        maxWidth: 400,
        mx: "auto",
        p: 3,
        mt: 5,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Update User Information
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          name="user_name"
          value={userData.username} // Use username instead of user_name
          InputProps={{
            readOnly: true,
          }}
          fullWidth
          variant="standard"
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={userData.email}
          onChange={handleChange}
          fullWidth
          required
          variant="standard"
          sx={{ mb: 2 }}
        />
        <TextField
          label="Phone Number"
          name="phone"
          type="tel"
          value={userData.phone}
          onChange={handleChange}
          fullWidth
          required
          variant="standard"
          sx={{ mb: 2 }}
        />
        <TextField
          label="Role"
          name="role"
          select
          value={userData.role}
          onChange={handleChange}
          fullWidth
          required
          variant="standard"
          sx={{ mb: 3 }}
        >
          {roles.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Update User
        </Button>
      </form>
    </Box>
  );
};

export default UpdateUserForm;
