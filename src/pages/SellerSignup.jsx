import { useState } from "react";
import { useSellerSignup } from "../hooks/useSellerSignup";
import { Link } from 'react-router-dom';

const SellerSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSellerSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
    console.log("Form submitted with:", email, password);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-4">
          <form onSubmit={handleSubmit} className="shadow-lg p-4 rounded bg-white">
            <h3 className="mb-4 text-center">Sign Up</h3>

            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="alert alert-danger mt-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-block mt-4"
              disabled={isLoading}
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>
            <p>Already a seller?</p>
            <Link to="/seller/login" > Login </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerSignup;
