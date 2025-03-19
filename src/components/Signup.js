import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './styles1.css';
import Logo from "./Logo.svg";
import React from 'react';
import ReactDOM from 'react-dom/client';


const Signup = () => {
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
    ConfirmPassword: "",
    Name: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate form data
    if (!formData.Email || !formData.Password || !formData.ConfirmPassword || !formData.Name) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    if (formData.Password !== formData.ConfirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        Email: formData.Email,
        Password: formData.Password,
        Name: formData.Name,
      });

      if (response.data.message === "User registered successfully") {
        alert("Registration successful! Please log in.");
        navigate("/");
      }
    } catch (err) {
      console.error("Error Response:", err.response?.data);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  
  // Logout Function
  const handleLogout = () => {
    // Clear user session data (e.g., token)
    localStorage.removeItem("token"); // Example: Remove token from localStorage
    alert("You have been logged out.");

    // Redirect to the login page
    navigate("/");
  };
   // Logout Function
   const handleDashboard = () => {
    // Clear user session data (e.g., token)
    localStorage.removeItem("token"); // Example: Remove token from localStorage
    alert("You have been logged out.");

    // Redirect to the login page
    navigate("/dashboard");
  };

  return (
    <>
    <div className="bg-gray-900 text-white py-4 px-6 flex items-center justify-center fixed top-0 left-0 w-full z-50">
        <img src={Logo} alt="Logo" className="logo" />
        <h1 className="Title-01 text-xl font-semibold">Incident Management System</h1>
        <button
          onClick={handleLogout}
          className="w-full1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-300"
        >
          Login
        </button>
        <div></div>
        <button
          onClick={handleDashboard}
          className="w-full2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-300"
        >
          Dashboard
        </button>
      </div>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Sign Up</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    name="Name"
                    className="form-control"
                    placeholder="Full Name"
                    value={formData.Name}
                    onChange={handleChange}
                    aria-label="Full Name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    name="Email"
                    className="form-control"
                    placeholder="Email"
                    value={formData.Email}
                    onChange={handleChange}
                    aria-label="Email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    name="Password"
                    className="form-control"
                    placeholder="Password"
                    value={formData.Password}
                    onChange={handleChange}
                    aria-label="Password"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    name="ConfirmPassword"
                    className="form-control"
                    placeholder="Confirm Password"
                    value={formData.ConfirmPassword}
                    onChange={handleChange}
                    aria-label="Confirm Password"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? "Registering..." : "Register"}
                </button>
              </form>
              <p className="mt-3 text-center">
                Already have an account? <a href="/">Login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Signup;