import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './useAuthcontext.jsx';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const login = async (formData) => {
        setIsLoading(true);
        setError(null);

        try {
            const res = await axios.post("/api/auth/login", formData);

            // const response = JSON.stringify(res.data);

            localStorage.setItem("user_token", JSON.stringify(res.data));  // Save token to localStorage

            dispatch({ type: "LOGIN", payload: res.data }); // update the global state of authcontext

            setIsLoading(false);

            navigate("/profile");  // Redirect to profile page
        } catch (error) {
            // setError(error.response.data.message);
            alert("Failed to login. Please check your credentials and try again.");
            console.log("Error logging in:", error);
            setIsLoading(false);
        }
    };

    return { login, error, isLoading };
};