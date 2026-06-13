import React, { useEffect, useState, useCallback } from 'react';
import { FaCamera, FaTimes } from 'react-icons/fa';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState({ id: null, name: '', email: '', avatar: null });
  const [editMode, setEditMode] = useState(false);
  const [tempUser, setTempUser] = useState({ name: '', email: '' });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [newAvatarFile, setNewAvatarFile] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });

  const userId = localStorage.getItem('userId');

  const loadUser = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/users/${userId}`);
      const u = res.data;

      setUser({
        id: u.id,
        name: u.username,
        email: u.email,
        avatar: u.profile_image,
      });

      setTempUser({ name: u.username, email: u.email });

      setAvatarPreview(
        u.profile_image
          ? `http://localhost:5000/uploads/${u.profile_image}`
          : null
      );
    } catch (err) {
      console.error('Failed to load user:', err);
    }
  }, [userId]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setNewAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleRemoveAvatar = async () => {
    if (!userId) return;
    try {
      await axios.post(
        `http://localhost:5000/api/users/upload-profile/${userId}`,
        null
      );

      setAvatarPreview(null);
      setNewAvatarFile(null);
      await loadUser();

      setMessage({ text: 'Profile photo removed successfully!', type: 'success' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } catch (err) {
      console.error(err);
      setMessage({ text: 'Failed to remove profile photo.', type: 'error' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    }
  };

  const handleSave = async () => {
    if (!userId) return;
    try {
      await axios.put(`http://localhost:5000/api/users/update/${userId}`, {
        username: tempUser.name,
        email: tempUser.email,
      });

      if (newAvatarFile) {
        const formData = new FormData();
        formData.append('avatar', newAvatarFile);

        await axios.post(
          `http://localhost:5000/api/users/upload-profile/${userId}`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
      } else if (!avatarPreview) {
        await axios.post(
          `http://localhost:5000/api/users/upload-profile/${userId}`,
          null
        );
      }

      await loadUser();
      setEditMode(false);
      setNewAvatarFile(null);

      setMessage({ text: 'Profile updated successfully!', type: 'success' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } catch (err) {
      console.error('Failed to save profile:', err);
      setMessage({ text: 'Failed to save profile.', type: 'error' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 relative">

      {/* Toast Message */}
      {message.text && (
        <div
          className={`absolute top-8 left-1/2 -translate-x-1/2 px-6 py-2 rounded-lg text-white text-sm shadow-lg transition ${
            message.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 space-y-8">

        {/* Title */}
        <h2 className="text-3xl font-semibold text-gray-800 text-center">
          My Profile
        </h2>

        {/* Avatar Section */}
        <div className="flex flex-col items-center space-y-4">

          <div className="relative w-32 h-32 group">

            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Avatar"
                className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-4xl border-2 border-gray-200">
                <span className="material-icons">person</span>
              </div>
            )}

            {editMode && (
              <>
                {/* Upload */}
                <label className="absolute bottom-1 right-1 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                  <FaCamera className="text-white text-xs" />
                </label>

                {/* Remove */}
                {avatarPreview && (
                  <button
                    onClick={handleRemoveAvatar}
                    className="absolute top-1 right-1 bg-gray-300 p-2 rounded-full hover:bg-gray-400 transition"
                  >
                    <FaTimes className="text-gray-700 text-xs" />
                  </button>
                )}
              </>
            )}
          </div>

          {/* Info Section */}
          <div className="w-full space-y-4">

            {editMode ? (
              <>
                <input
                  type="text"
                  value={tempUser.name}
                  onChange={(e) => setTempUser({ ...tempUser, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Name"
                />

                <input
                  type="email"
                  value={tempUser.email}
                  onChange={(e) => setTempUser({ ...tempUser, email: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Email"
                />

                <div className="flex justify-center gap-4">

                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditMode(false)}
                    className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>

                </div>
              </>
            ) : (
              <>
                <p className="text-gray-700 text-center">
                  <span className="font-semibold">Name:</span> {user.name || 'Not set'}
                </p>

                <p className="text-gray-700 text-center">
                  <span className="font-semibold">Email:</span> {user.email || 'Not set'}
                </p>

                <div className="flex justify-center">
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Edit Profile
                  </button>
                </div>
              </>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProfilePage;