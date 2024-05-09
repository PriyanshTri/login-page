import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import "./LoginForm.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleEmailChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (!email) {
      setSnackbarMessage("Email is required");
      setOpenSnackbar(true);
      return;
    }

    if (!password) {
      setSnackbarMessage("Password is required");
      setOpenSnackbar(true);
      return;
    }

    console.log(`Submitting form with email: ${email}, password: ${password}`);
    //reset the state to set to empty string
    setEmail("");
    setPassword("");
  };

  const handleBeforeUnload = (event: {
    preventDefault: () => void;
    returnValue: string;
  }) => {
    if (!password || !email) {
      event.preventDefault();
      event.returnValue = "You have some unsaved changes, do you want to exit?";
      return "You have some unsaved changes, do you want to exit?";
    }
  };
  useEffect(() => {
    if (!password || !email) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="login-form">
      <h1>Login</h1>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={handleEmailChange}
        error={!email && openSnackbar}
        helperText={!email && openSnackbar && "Email is required"}
      />
      <TextField
        label="Password"
        variant="outlined"
        fullWidth
        type={"password"}
        value={password}
        onChange={handlePasswordChange}
        error={!password && openSnackbar}
        helperText={!password && openSnackbar && "Password is required"}
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleSubmit}
      >
        Login
      </Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="error">{snackbarMessage}</Alert>
      </Snackbar>
    </div>
  );
};

export default LoginForm;
