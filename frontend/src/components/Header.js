import React from 'react';
import { Link } from 'react-router-dom';
import MenuBar from './MenuBar';
import ProfileMenu from './ProfileMenu';
import { FaHome, FaShoppingBag, FaShoppingCart } from 'react-icons/fa';

const Header = ({ showLogoutModal, setShowLogoutModal, resetHistory }) => {
  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-2">

        {/* LEFT */}
        <div className="flex items-center flex-shrink-0 hover:scale-105 transition">
          <MenuBar />
        </div>

        {/* CENTER LOGO (FIXED SCALING INSTEAD OF TRUNCATE) */}
        <div className="flex-1 flex justify-center min-w-0">

          <h1 className="flex items-baseline gap-2
                         text-[20px] sm:text-2xl md:text-4xl lg:text-5xl
                         tracking-wide cursor-pointer select-none
                         hover:scale-105 transition">

            <Link to="/" className="flex items-baseline gap-2 whitespace-nowrap">

              <span
                className="italic text-gray-700 transition hover:text-blue-600"
                style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 500 }}
              >
                Elite
              </span>

              <span
                className="italic text-primary transition hover:text-blue-600"
                style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 700 }}
              >
                Techs
              </span>

            </Link>

          </h1>

        </div>

        {/* RIGHT NAV */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">

          <nav className="flex items-center gap-2 sm:gap-4">

            <Link
              to="/"
              className="flex items-center gap-1 px-2 py-1 rounded-md
                         text-gray-700 hover:text-blue-600 hover:bg-blue-50
                         transition hover:scale-105 whitespace-nowrap"
            >
              <FaHome />
              <span className="hidden sm:inline">Home</span>
            </Link>

            <Link
              to="/products"
              className="flex items-center gap-1 px-2 py-1 rounded-md
                         text-gray-700 hover:text-blue-600 hover:bg-blue-50
                         transition hover:scale-105 whitespace-nowrap"
            >
              <FaShoppingBag />
              <span className="hidden sm:inline">Products</span>
            </Link>

            <Link
              to="/cart"
              className="flex items-center gap-1 px-2 py-1 rounded-md
                         text-gray-700 hover:text-blue-600 hover:bg-blue-50
                         transition hover:scale-105 whitespace-nowrap"
            >
              <FaShoppingCart />
              <span className="hidden sm:inline">Cart</span>
            </Link>

          </nav>

          <div className="hover:scale-105 transition flex-shrink-0">
            <ProfileMenu
              showLogoutModal={showLogoutModal}
              setShowLogoutModal={setShowLogoutModal}
              resetHistory={resetHistory}
            />
          </div>

        </div>

      </div>
    </header>
  );
};

export default Header;