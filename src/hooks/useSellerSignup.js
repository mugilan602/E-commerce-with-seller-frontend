import { useSellerAuthContext } from "./useSellerAuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useSellerSignup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { dispatch } = useSellerAuthContext();
  const navigate = useNavigate(); 

  const signup = async (email, password) => {
    setError(null)
    setLoading(true)
    const response = await fetch("/api/seller/signup", {
      method: "POST",
      headers: { "Content-Type": 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()
    if (!response.ok) {
      setError(json.error)
      setLoading(false)
    }
    if (response.ok) {
      console.log('New user logged in:', response);
      localStorage.setItem('seller', JSON.stringify(json))
      dispatch({ type: "LOGIN", payload: json })
      setLoading(false)
      navigate("/seller/dashboard");

    }
  }
  return { signup, loading, error }
}

