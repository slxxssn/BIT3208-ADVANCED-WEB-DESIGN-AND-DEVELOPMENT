import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaShoppingCart,
  FaBoxOpen,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus
} from 'react-icons/fa';

const ProfileMenu = ({ showLogoutModal, setShowLogoutModal, resetHistory }) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const navigate = useNavigate();
  const menuRef = useRef();

  // Fetch user info
  const fetchUser = async () => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      setUser(null);
      setAvatar(null);
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/users/${userId}`);
      const data = await res.json();

      setUser({ id: data.id, name: data.username, email: data.email });

      setAvatar(
        data.profile_image
          ? `http://localhost:5000/uploads/${data.profile_image}`
          : null
      );
    } catch (err) {
      console.error('Failed to fetch user:', err);
      setUser(null);
      setAvatar(null);
    }
  };

  useEffect(() => {
    fetchUser();

    const handleStorageChange = () => fetchUser();
    window.addEventListener('storage', handleStorageChange);

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userAvatar');

    setUser(null);
    setAvatar(null);
    setOpen(false);

    resetHistory?.();
    navigate('/');
  };

  const profileItems = user
    ? [
        { label: 'My Profile', path: '/profile', icon: <FaUser /> },
        { label: 'My Orders', path: '/orders', icon: <FaBoxOpen /> },
        { label: 'My Cart', path: '/cart', icon: <FaShoppingCart /> },
        { label: 'Logout', action: () => setShowLogoutModal(true), icon: <FaSignOutAlt /> }
      ]
    : [
        { label: 'Login', path: '/login', icon: <FaSignInAlt /> },
        { label: 'Sign Up', path: '/register', icon: <FaUserPlus /> }
      ];

  return (
    <div className="relative flex justify-end" ref={menuRef}>

      {/* Profile Button */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md hover:bg-gray-50 transition cursor-pointer"
      >
        {avatar ? (
          <img
            src={avatar}
            alt="Avatar"
            className="w-9 h-9 rounded-full object-cover border border-gray-300"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            <FaUser />
          </div>
        )}

        {user && (
          <span className="hidden md:inline text-gray-800 font-medium">
            Hi, {user.name}
          </span>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">

          {profileItems.map((item) => (
            <div
              key={item.label}
              onClick={() => {
                if (item.path) navigate(item.path);
                if (item.action) item.action();
                setOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition"
            >
              <span className="text-base">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </div>
          ))}

        </div>
      )}

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl p-6 w-80 text-center shadow-xl">

            {!loggingOut ? (
              <>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Do you want to log out?
                </h3>

                <div className="flex justify-center gap-4">

                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    onClick={() => {
                      setLoggingOut(true);

                      setTimeout(() => {
                        handleLogout();
                        setLoggingOut(false);
                        setShowLogoutModal(false);
                      }, 1200);
                    }}
                  >
                    Yes
                  </button>

                  <button
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                    onClick={() => setShowLogoutModal(false)}
                  >
                    No
                  </button>

                </div>
              </>
            ) : (
              <h3 className="text-lg font-semibold text-gray-700">
                Logging out...
              </h3>
            )}

          </div>

        </div>
      )}

    </div>
  );
};

export default ProfileMenu;