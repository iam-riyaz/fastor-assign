import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Otp = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dataObj = {
      phone: localStorage.getItem("phone"),
      dial_code: "+91",
      otp: value,
    };

    const response = await axios.post(
      "https://staging.fastor.in/v1/pwa/user/login",
      dataObj,
      { Headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const authToken = response.data.data.token;
    sessionStorage.setItem("authToken", authToken);
    if (response.status == 200) {
      navigate("/listing");
    }
  };

  const handleChange = (newValue) => {
    setValue(newValue);
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
          OTP verification
        </Typography>
        <Typography
          sx={{
            textAlign: "left",
            fontSize: "14px",
            color: "rgba(81, 80, 82, 0.67)",
          }}
          variant="h7"
        >
          Enter the varification code we just sent on your Mobile Number
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <MuiOtpInput
            sx={{
              ".MuiOtpInput-TextField": {
                backgroundColor: "#F7F8F9",
                borderRadius: "4px",
                border: "none",
              },
            }}
            gap={0.5}
            length={6}
            value={value}
            onChange={handleChange}
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
            Verify
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
