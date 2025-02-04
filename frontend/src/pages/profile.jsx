import { useLogout } from "../hooks/useLogout.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../hooks/useAuthcontext.jsx';
import Navbar from "../components/Navbar.jsx";

const Profile = () => {
    const { logout } = useLogout();
    const handleLogout = () => {
        logout();
    }
    // const { user } = useAuthContext();
    // const navigate = useNavigate();

    // useEffect(() => {
    //     const token = localStorage.getItem("user_token");
    //     // if (!token) {
    //     //     navigate("/login");
    //     // }
    //     const fetchData = async () => {
    //         try {
    //             const res = await axios.get("http://localhost:5000/api/profile", {
    //                 headers: {
    //                     Authorization: `Bearer ${user.token}`
    //                 }
    //             });
    //             console.log(res.data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     fetchData();
    // }, []);


    return (
        <div>
            {/* <Navbar /> */}
            <h1>Profile</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Profile;