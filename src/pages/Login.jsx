import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import "../styles/login.css";
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    console.log("Form submitted with:", email, password);
  };

  return (
    <div>
      {/* <p>Seller?</p>
      <Link to="/seller/login">Login</Link> */}
      <div className="container">
        <div className="row justify-content-center login my-5">
          <div className="col-md-4">
            <form onSubmit={handleSubmit} className="shadow-lg p-4 rounded bg-white">
              <h3 className="mb-4 text-center">Login</h3>

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

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

              <button
                type="submit"
                className="btn btn-primary btn-block mt-4"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
              <div className="d-flex justify-content-center my-3">
                <p>Not a user?</p>
                <Link to="/signup">Signup</Link>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
