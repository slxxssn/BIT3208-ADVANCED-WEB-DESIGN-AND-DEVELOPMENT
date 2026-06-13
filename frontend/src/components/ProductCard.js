import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, addedItems, onAddToCart }) => {
  const navigate = useNavigate();
  const isAdded = addedItems.includes(product.id);

  return (
    <div className={`relative rounded-2xl p-4 flex flex-col justify-between
      bg-white border border-gray-100 shadow-sm
      transition-all duration-300
      hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]
      ${isAdded ? 'opacity-80' : ''}`}>

      {/* IMAGE */}
      <div className="w-full h-40 rounded-xl mb-3 overflow-hidden bg-gray-100 border border-gray-100">

        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            No Image
          </div>
        )}

      </div>

      {/* INFO */}
      <div className="space-y-1">

        <h3 className="text-gray-800 font-semibold text-base hover:text-blue-600 transition">
          {product.name}
        </h3>

        <p className="text-gray-500 text-xs line-clamp-2">
          {product.description || 'No description available'}
        </p>

        <p className="text-blue-600 font-bold text-sm">
          Ksh {product.price?.toLocaleString()}
        </p>

      </div>

      {/* DETAILS */}
      <div className="mt-2 text-[11px] text-gray-500 space-y-1">

        {product.brand && <p>Brand: {product.brand}</p>}
        {product.category && <p>Category: {product.category}</p>}
        {product.stock !== undefined && <p>Stock: {product.stock}</p>}

      </div>

      {/* BUTTONS */}
      <div className="mt-4 space-y-2">

        {/* VIEW DETAILS */}
        <button
          onClick={() => navigate(`/products/${product.id}`)}
          className="w-full py-2 rounded-lg
          bg-blue-50 border border-blue-200
          text-blue-600 text-sm font-medium
          transition-all duration-200
          hover:bg-blue-600 hover:text-white hover:shadow-md"
        >
          View Details
        </button>

        {/* ADD TO CART */}
        <button
          onClick={() => onAddToCart(product.id)}
          className={`w-full py-2 rounded-lg text-sm font-medium transition-all duration-200
          ${isAdded
            ? 'bg-green-500 text-white'
            : 'bg-gray-900 text-white hover:bg-gray-800'
          }`}
        >
          {isAdded ? '✔ Added' : 'Add to Cart'}
        </button>

      </div>

    </div>
  );
};

export default ProductCard;