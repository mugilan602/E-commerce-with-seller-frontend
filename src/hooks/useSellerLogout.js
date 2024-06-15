import { useSellerAuthContext } from "./useSellerAuthContext";
import { useNavigate } from "react-router-dom";

export const useSellerLogout = () => {
    const { dispatch } = useSellerAuthContext();
    const navigate = useNavigate(); 

    const logout = () => {
        localStorage.removeItem('seller');
        dispatch({ type: "LOGOUT" });
        navigate("/");

    };

    return {logout}
};

