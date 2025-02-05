import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout.jsx";

const Logout = () => {
    const { logout } = useLogout();
    const navigate = useNavigate();

    useEffect(() => {
        try {
            logout();
            navigate("/login");
        } catch (e) {
            console.log(e);
        }
    }, [logout, navigate]);

    return <div>Logging Out ........</div>;
};

export default Logout;