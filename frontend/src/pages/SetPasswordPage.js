import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { BASE_URL } from '../api';

const SetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  const username = location.state?.username;

  useEffect(() => {
    if (!email || !username) {
      navigate('/register');
    }
  }, [email, username, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/api/users/register`,
        { username, email, password }
      );

      setMessage(res.data.message);

      setTimeout(() => {
        navigate('/login', {
          state: {
            successMessage: 'Account created successfully. Please login.'
          }
        });
      }, 2000);

    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">
            Create Password
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Set a secure password for
          </p>

          <p className="text-sm font-medium text-gray-700">
            {username} ({email})
          </p>
        </div>

        {/* Message */}
        {message && (
          <p className="bg-gray-100 text-gray-700 text-sm p-2 rounded mb-4 text-center">
            {message}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Create Account
          </button>

        </form>

      </div>
    </div>
  );
};

export default SetPasswordPage;