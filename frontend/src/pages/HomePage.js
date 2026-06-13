// frontend/src/pages/Homepage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FeaturedProducts from '../components/FeaturedProducts';
import TrendingNow from '../components/TrendingNow';
import SearchBar from '../components/SearchBar';
import FlashDeals from '../components/FlashDeals';
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 py-6 space-y-16 bg-[#f8fafc] text-gray-900 min-h-screen overflow-x-hidden">

      {/* 🔥 Announcement Bar */}
      <div className="w-full bg-blue-600 text-white text-xs sm:text-sm text-center py-2 rounded-lg shadow-sm">
        🚀 Free Delivery on orders above KES 5,000 | Pay on Delivery Available
      </div>

      {/* 🔥 Next Gen Banner */}
      <div
        onClick={() => navigate('/products')}
        className="cursor-pointer mx-auto max-w-full sm:max-w-xl text-center px-4 sm:px-6 py-3 rounded-full 
                   bg-white border border-gray-200 shadow-sm
                   hover:shadow-md hover:scale-105 transition text-sm sm:text-base"
      >
        ✨ Next-Gen Series — Experience the Future
        <span className="ml-2 text-blue-600 font-semibold">Shop now &gt;</span>
      </div>

      {/* 🔥 HERO */}
      <div className="text-center space-y-4 sm:space-y-5 mt-6">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
          Welcome to Elite Techs
        </h1>

        <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-xl mx-auto px-2">
          Your premium destination for phones, laptops, and cutting-edge tech
        </p>
      </div>

      {/* 🔥 Search + WhatsApp */}
      <div className="flex justify-center items-center gap-2 sm:gap-4 max-w-2xl mx-auto w-full">
        <div className="flex-1 min-w-0">
          <SearchBar />
        </div>

        <a
          href="https://wa.me/254700000000"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 px-3 sm:px-5 py-2 bg-green-500 text-white rounded-full shadow-sm hover:shadow-md hover:scale-105 transition whitespace-nowrap"
        >
          <FaWhatsapp className="text-lg" />
          <span className="text-sm hidden sm:inline">WhatsApp</span>
        </a>
      </div>

      {/* 🔥 CTA */}
      <div className="text-center">
        <button
          onClick={() => navigate('/products')}
          className="px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base rounded-full bg-blue-600 text-white shadow-sm hover:bg-blue-700 hover:scale-105 transition font-semibold"
        >
          Explore Products →
        </button>
      </div>

      {/* 🔥 Trust Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
        {[
          { icon: 'verified', title: '100% Original' },
          { icon: 'local_shipping', title: 'Fast Delivery' },
          { icon: 'payments', title: 'Pay on Delivery' },
          { icon: 'shield', title: 'Warranty' },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-white border border-gray-200 p-4 sm:p-5 rounded-xl text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition"
          >
            <span className="material-icons text-3xl sm:text-4xl text-blue-600">
              {item.icon}
            </span>
            <p className="mt-2 text-xs sm:text-sm font-semibold text-gray-700">
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {/* 🔥 Categories */}
      <div className="space-y-4 sm:space-y-5">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Categories</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { name: 'Phones', path: '/category/phones', icon: 'smartphone' },
            { name: 'Laptops', path: '/category/laptops', icon: 'laptop' },
            { name: 'Accessories', path: '/category/accessories', icon: 'headphones' },
            { name: 'Smart Watches', path: '/category/smartwatches', icon: 'watch' },
          ].map((cat) => (
            <div
              key={cat.name}
              onClick={() => navigate(cat.path)}
              className="cursor-pointer p-4 sm:p-6 rounded-xl bg-white border border-gray-200 shadow-sm
                         hover:shadow-md hover:border-blue-400 hover:-translate-y-1 transition"
            >
              <span className="material-icons text-3xl sm:text-4xl text-blue-600">
                {cat.icon}
              </span>
              <h3 className="mt-2 sm:mt-3 text-sm sm:text-base font-semibold text-gray-700">
                {cat.name}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 Flash Deals */}
      <FlashDeals navigate={navigate} />

      {/* Featured */}
      <FeaturedProducts />

      {/* Trending */}
      <TrendingNow />

      {/* 🔥 Reviews */}
      <div className="space-y-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Customer Reviews</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
          {[
            { text: 'Amazing service and fast delivery!', name: 'Sarah K.' },
            { text: 'Products are 100% genuine.', name: 'David M.' },
            { text: 'Support team is very helpful!', name: 'Aisha N.' },
          ].map((r, i) => (
            <div
              key={i}
              className="p-3 sm:p-5 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition text-center space-y-2"
            >
              <span className="material-icons text-2xl sm:text-3xl text-blue-600">
                format_quote
              </span>

              <p className="text-gray-600 text-xs sm:text-sm">"{r.text}"</p>

              <div className="flex items-center justify-center gap-1 sm:gap-2 text-gray-700">
                <span className="material-icons text-sm">person</span>
                <p className="text-xs sm:text-sm font-semibold">{r.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 Social Icons */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">

        <a href="https://www.tiktok.com/@yourpage" target="_blank" rel="noreferrer"
          className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md hover:scale-110 transition">
          <FaTiktok className="text-black text-lg sm:text-xl" />
        </a>

        <a href="https://www.instagram.com/yourpage" target="_blank" rel="noreferrer"
          className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md hover:scale-110 transition">
          <FaInstagram className="text-pink-500 text-lg sm:text-xl" />
        </a>

        <a href="https://www.facebook.com/yourpage" target="_blank" rel="noreferrer"
          className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md hover:scale-110 transition">
          <FaFacebookF className="text-blue-600 text-lg sm:text-xl" />
        </a>

        <a href="https://wa.me/254700000000" target="_blank" rel="noreferrer"
          className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-green-500 shadow-sm hover:shadow-md hover:scale-110 transition">
          <FaWhatsapp className="text-white text-lg sm:text-xl" />
        </a>

      </div>

      {/* 🔥 Newsletter */}
      <div className="text-center space-y-4">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800">Stay Updated</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-2 rounded-full bg-white border border-gray-300 text-gray-900 w-full max-w-xs outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

    </div>
  );
};

export default Homepage;