import React, { useState } from 'react'; // Import useState from React
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles1.css';
import Logo from './Logo.svg'; // Ensure the correct path to Logo.svg
import '../index.css'; // This can be removed if unnecessary

const Login = () => {
  const [formData, setFormData] = useState({
    Email: '',
    Password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate input
    if (!formData.Email || !formData.Password) {
      setError('Email and Password are required.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);

      if (response.data.message === 'Login successful') {
        alert('Login successful!');
        // Redirect to dashboard or home page
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Error Response:', err.response?.data);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gray-900 text-white py-4 px-6 flex items-center justify-center fixed top-0 left-0 w-full z-50">
        <img src={Logo} alt="Logo" className="logo" />
        <h1 className="Title-01 text-xl font-semibold">Incident Management System</h1>
      </div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center">Login</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
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
                  <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                </form>
                <p className="mt-3 text-center">
                  Don't have an account? <a href="/signup">Sign Up</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
