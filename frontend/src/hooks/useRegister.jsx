import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './useAuthcontext.jsx';

export const useRegister = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const register = async (formData) => {
        setIsLoading(true);
        setError(null);

        try {
            const res = await axios.post("/api/auth/register", formData);

            localStorage.setItem("user_token", JSON.stringify(res.data));  // Save token to localStorage

            dispatch({ type: "LOGIN", payload: res.data }); // update the global state of authcontext

            setIsLoading(false);

            navigate("/profile");  // Redirect to profile page
        } catch (error) {
            setError(error.response.data.message);
            setIsLoading(false);
        }
    };

    return { register, error, isLoading };
};