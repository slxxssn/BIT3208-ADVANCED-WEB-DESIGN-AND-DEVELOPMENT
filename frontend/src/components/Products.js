import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { BASE_URL } from '../api';
import ProductCard from './ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [addedItems, setAddedItems] = useState([]);
  const [showLoginToast, setShowLoginToast] = useState(false);

  const userId = localStorage.getItem('userId');

  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/products`);
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddToCart = async (productId) => {
    if (!userId) {
      setShowLoginToast(true);
      setTimeout(() => setShowLoginToast(false), 2000);
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/cart`, {
        user_id: userId,
        product_id: productId,
        quantity: 1,
      });

      setAddedItems((prev) => [...prev, productId]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full px-4 md:px-10 py-10 space-y-8 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="space-y-2">

        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Our Premium <span className="text-blue-600">Products</span> 🔥
        </h2>

        <p className="text-sm text-gray-500">
          Explore high-quality products curated just for you
        </p>

        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addedItems={addedItems}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {/* LOGIN TOAST */}
      <div
        className={`fixed bottom-6 right-6 px-5 py-3
        bg-gray-900 text-white text-sm rounded-xl shadow-xl
        transition-all duration-300
        ${showLoginToast
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-5 pointer-events-none'
        }`}
      >
        Please log in to add products to your cart
      </div>

    </div>
  );
};

export default Products;