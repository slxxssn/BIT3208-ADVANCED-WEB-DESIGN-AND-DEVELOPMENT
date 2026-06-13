import React from 'react';
import Cart from '../components/Cart';

const CartPage = () => {
  return (
    <div className="w-full min-h-screen bg-[#0b0f19] text-white px-4 md:px-10 py-10 space-y-8">

      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold drop-shadow-[0_0_15px_#38bdf8]">
          My Cart
        </h1>
        <p className="text-gray-400 text-sm">
          Review your selected items and complete checkout
        </p>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        <Cart />
      </div>

    </div>
  );
};

export default CartPage;