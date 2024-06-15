import { useContext } from "react";
import { SellerAuthContext } from "../context/SellerAuthContext";

export const useSellerAuthContext = () => {
    const context = useContext(SellerAuthContext);

    if (!context) {
        throw new Error("useSellerAuthContext must be used inside a SellerAuthContextProvider");
    }

    return context;
};
