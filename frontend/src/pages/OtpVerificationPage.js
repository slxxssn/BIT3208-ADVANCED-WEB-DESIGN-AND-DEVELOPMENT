import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { BASE_URL } from '../api';

const OtpVerificationPage = () => {
  const [otp, setOtp] = useState('');
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

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      setMessage('Please enter the OTP');
      return;
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/api/users/verify-otp`,
        { email, otp }
      );

      setMessage(res.data.message);

      navigate('/register/create-pass', {
        state: { email, username }
      });
    } catch (err) {
      setMessage(err.response?.data?.message || 'OTP verification failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">
            Verify OTP
          </h2>

          {email && username && (
            <p className="text-sm text-gray-500 mt-2">
              We sent a 6-digit code to <span className="font-medium text-gray-700">{email}</span>
            </p>
          )}
        </div>

        {/* Message */}
        {message && (
          <p className="bg-gray-100 text-gray-700 text-sm p-2 rounded mb-4 text-center">
            {message}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleVerify} className="space-y-4">

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            className="w-full px-4 py-2 text-center tracking-widest text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Verify OTP
          </button>

        </form>

      </div>
    </div>
  );
};

export default OtpVerificationPage;