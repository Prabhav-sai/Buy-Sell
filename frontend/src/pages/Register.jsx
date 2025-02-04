import { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography , Box , Link} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useRegister } from "../hooks/useRegister.jsx";

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        age: "",
        contactNumber: "",
    });

    const { register , error , isLoading } = useRegister();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(formData);
        console.log("register "+ formData);    
    };

    return (
        <Container>
        <Typography variant="h4">Register</Typography>
        <form onSubmit={handleSubmit}>
            <TextField label="First Name" name="firstName" onChange={handleChange} fullWidth />
            <TextField label="Last Name" name="lastName" onChange={handleChange} fullWidth />
            <TextField label="Email" name="email" onChange={handleChange} fullWidth />
            <TextField label="Password" type="password" name="password" onChange={handleChange} fullWidth />
            <TextField label="Age" type="number" name="age" onChange={handleChange} fullWidth />
            <TextField label="Contact Number" name="contactNumber" onChange={handleChange} fullWidth />
            <Button type="submit" disabled ={isLoading}>Register</Button>
            <Typography>If already have account{" "}
                <Link component={RouterLink} to="/login">
                    Login
                </Link>
            </Typography>
        </form>
        {error && <Typography color="error">{error}</Typography>}
        </Container>
    );
};

export default Register;
