import { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useLogin } from "../hooks/useLogin.jsx";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, error, isLoading } = useLogin();
  const [captcha, setCaptcha] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    // if(!captcha){
    //   alert("Captcha not verified");
    //   return;
    // };
    e.preventDefault();
    await login(formData);
    // console.log("login " + formData);

  };
  const Verifycaptha = (value) => {
    setCaptcha(value);
  };

  return (
    <Container>
      <Typography variant="h4">Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Email" name="email" onChange={handleChange} fullWidth />
        <TextField label="Password" type="password" name="password" onChange={handleChange} fullWidth />
        <Button type="submit" disabled={isLoading}>Login</Button>
        <Typography>If you don't have an account{" "}
          <Link component={RouterLink} to="/register">
            Register
          </Link>
        </Typography>
        <ReCAPTCHA
        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
        onChange={Verifycaptha}
        />
      </form>
      {error && <Typography color="error">{error}</Typography>}
    </Container>
  );
};

export default Login;
