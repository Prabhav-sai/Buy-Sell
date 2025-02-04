import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthcontext.jsx";

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("user_token");
        dispatch({ type: "LOGOUT" });
        navigate("/login");
    };

    return { logout };
};