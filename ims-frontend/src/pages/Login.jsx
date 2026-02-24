import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Paper,
  Typography
} from "@mui/material";
import API from "../api/axios";
import { jwtDecode } from "jwt-decode";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });

      const token = res.data.token;
      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      localStorage.setItem("role", decoded.role);

      window.location.href = "/dashboard";

    } catch {
      alert("Invalid Credentials");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >

      <Paper
        elevation={10}
        sx={{
          p: 5,
          width: 400,
          borderRadius: 4,
          backdropFilter: "blur(10px)",
          background: "rgba(255,255,255,0.1)",
          color: "#fff",
          textAlign: "center"
        }}
      >

        <Typography variant="h4" fontWeight="bold" gutterBottom>
          IMS System
        </Typography>

        <Typography variant="subtitle1" sx={{ mb: 3, opacity: 0.8 }}>
          Login to your dashboard
        </Typography>

        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          InputLabelProps={{ style: { color: "#fff" } }}
          sx={{
            input: { color: "#fff" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#fff" }
            }
          }}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          InputLabelProps={{ style: { color: "#fff" } }}
          sx={{
            input: { color: "#fff" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#fff" }
            }
          }}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            py: 1.2,
            borderRadius: 3,
            background: "linear-gradient(135deg, #3b82f6, #6366f1)",
            fontWeight: "bold",
            fontSize: "1rem"
          }}
          onClick={handleLogin}
        >
          Login
        </Button>

      </Paper>
    </Box>
  );
}