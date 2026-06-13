import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleContinue = async () => {
    setError('');

    if (!username.trim()) {
      setError('Username is required');
      return;
    }

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    try {
      setLoading(true);

      // Send OTP
      await axios.post('http://localhost:5000/api/users/send-otp', { email });

      // Redirect to OTP page
      navigate('/register/verify-otp', { state: { email, username } });
    } catch (err) {
      console.log(err);
      setError('Failed to send OTP. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Create account</h2>
          <p className="text-gray-500 text-sm mt-1">Sign up to get started</p>
        </div>

        {/* Error */}
        {error && (
          <p className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4 text-center">
            {error}
          </p>
        )}

        {/* Inputs */}
        <div className="space-y-4">

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={loading}
          className="w-full mt-5 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-60"
        >
          {loading ? 'Sending OTP...' : 'Continue'}
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-200" />
          <span className="px-3 text-xs text-gray-400">OR</span>
          <hr className="flex-grow border-gray-200" />
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2 transition duration-200 hover:shadow-md hover:bg-gray-50 hover:border-gray-400 active:scale-[0.99]"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            className="w-5 h-5"
            alt="Google"
          />
          <span className="text-gray-700 font-medium">
            Continue with Google
          </span>
        </button>

      </div>
    </div>
  );
};

export default Register;