// frontend/src/pages/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: '', // can be username or email
    password: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle manual login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!formData.identifier.trim() || !formData.password) {
      setMessage('Please enter username/email and password');
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/users/login`, {
        loginIdentifier: formData.identifier,
        password: formData.password
      });

      localStorage.setItem('userId', res.data.user.id);
      localStorage.setItem('userName', res.data.user.username);
      localStorage.setItem('userEmail', res.data.user.email);

      navigate('/');
      window.location.reload();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  // Handle Google login
  const handleGoogle = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Welcome back</h2>
          <p className="text-gray-500 text-sm mt-1">Login to continue</p>
        </div>

        {/* Error message */}
        {message && (
          <p className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4 text-center">
            {message}
          </p>
        )}

        {/* Google Login */}
        <button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2 hover:shadow-md transition"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            className="w-5 h-5"
            alt="Google"
          />
          <span className="text-gray-700 font-medium">Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-200" />
          <span className="px-3 text-xs text-gray-400">OR</span>
          <hr className="flex-grow border-gray-200" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="identifier"
            placeholder="Username or Email"
            value={formData.identifier}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Login
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>

      </div>
    </div>
  );
};

export default Login;