import React, { useState, useEffect } from 'react';
import Products from '../components/Products';

const ProductsPage = () => {
  const [user, setUser] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    if (userId && userName) {
      setUser({ id: userId, name: userName });
    } else {
      setUser(null);
    }
  }, []);

  const handleRequireLogin = () => {
    setShowLoginPrompt(true);
    setTimeout(() => setShowLoginPrompt(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 px-4 md:px-10 py-10">

      {/* PAGE HEADER */}
      <div className="max-w-7xl mx-auto mb-10 space-y-2">

        <h1 className="text-2xl md:text-4xl font-bold tracking-wide text-gray-800">
          Explore Our{" "}
          <span className="text-blue-600">Products</span>
        </h1>

        <p className="text-gray-500 text-sm max-w-2xl">
          Browse through our latest and most popular tech items
        </p>

        {/* clean divider */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

      </div>

      {/* PRODUCTS */}
      <div className="max-w-7xl mx-auto">
        <Products
          requireLogin={!user}
          onRequireLogin={handleRequireLogin}
        />
      </div>

      {/* LOGIN TOAST */}
      <div
        className={`fixed bottom-6 left-1/2 transform -translate-x-1/2
        bg-gray-900 text-white px-6 py-3 rounded-full shadow-xl text-sm
        transition-all duration-300
        ${showLoginPrompt
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6 pointer-events-none'
        }`}
      >
        Please log in to add products to your cart!
      </div>

    </div>
  );
};

export default ProductsPage;