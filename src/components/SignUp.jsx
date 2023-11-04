import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const dataObj = {
      phone: formData.get("phone"),
      dial_code: "+91",
    };

    const response = await axios.post(
      "https://staging.fastor.in/v1/pwa/user/register",
      dataObj,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    if (response.status == 200) {
      localStorage.setItem("phone", formData.get("phone"));
      navigate("/login");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          pt: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
        }}
      >
        <Typography
          sx={{ textAlign: "left", fontWeight: "bold" }}
          component="h2"
          variant="h5"
        >
          Enter Your Mobile Number
        </Typography>
        <Typography
          sx={{
            textAlign: "left",
            fontSize: "14px",
            color: "rgba(81, 80, 82, 0.67)",
          }}
          variant="h7"
        >
          We will send you the 6 digit verification code
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <TextField
            sx={{ backgroundColor: "#F7F8F9" }}
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Enter Mobile Number"
            name="phone"
            autoComplete="phone"
            type="number"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#FF6D6A",
              height: "45px",
              fontSize: "13px",
              textTransform: "none",
            }}
          >
            Send Code
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
