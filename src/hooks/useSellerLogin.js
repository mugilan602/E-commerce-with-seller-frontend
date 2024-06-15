import { useSellerAuthContext } from "./useSellerAuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useSellerLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useSellerAuthContext();
  const navigate = useNavigate(); 

  const login = async (email, password) => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/seller/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "Login failed");
      }

      console.log("User logged in:", json);
      localStorage.setItem("seller", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      navigate("/seller/dashboard");

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
