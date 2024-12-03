import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ROUTE}/api/users/forgot`,
        { email }
      );
      sessionStorage.setItem("email", email);
      console.log(response.data.user.email);
      if (response.status === 200) {
        toast.success("Check your email.");
        navigate("/forgotVerify");
      } else {
        toast.error("An error occurred, please try again later");
      }
    } catch (error) {
      toast.error("An error occurred, please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        p: 3,
        mt: 8,
        textAlign: "center",
        backgroundColor: "#f4f4f4",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <ToastContainer />
      <Typography variant="h5" gutterBottom>
        Forgot Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          type="email"
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{
            mt: 2,
            bgcolor: "#2c3e50",
            ":hover": { bgcolor: "#2c354f" },
            color: "white",
          }}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Box>
  );
};

export default Forgot;
