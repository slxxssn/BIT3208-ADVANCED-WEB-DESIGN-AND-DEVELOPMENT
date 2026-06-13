import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TrendingNow = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const navigate = useNavigate();

  const scrollRef = useRef(null);
  const isPaused = useRef(false);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get(
          'http://localhost:5000/api/products/trending/all'
        );
        setTrendingProducts(res.data);
      } catch (err) {
        console.error('Error fetching trending products:', err);
      }
    };

    fetchTrending();
  }, []);

  // 🔥 Infinite scroll engine (UNCHANGED)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || trendingProducts.length === 0) return;

    let animationFrame;

    const step = () => {
      if (!isPaused.current && el) {
        el.scrollLeft += 1;

        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }

      animationFrame = requestAnimationFrame(step);
    };

    animationFrame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrame);
  }, [trendingProducts]);

  const pause = () => (isPaused.current = true);
  const resume = () => (isPaused.current = false);

  const loopedProducts = [...trendingProducts, ...trendingProducts];

  return (
    <div className="space-y-6 mt-12">

      {/* HEADER */}
      <div className="space-y-2">

        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          🔥 Trending <span className="text-blue-600">Now</span>
        </h2>

        <p className="text-sm text-gray-500">
          Most popular items people are viewing right now
        </p>

        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

      </div>

      {/* SCROLL */}
      <div
        ref={scrollRef}
        className="overflow-hidden flex gap-6 whitespace-nowrap py-2"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
      >

        {loopedProducts.length === 0 && (
          <p className="text-gray-400 text-sm w-full text-center">
            No trending products yet
          </p>
        )}

        {loopedProducts.map((product, index) => (
          <div
            key={index}
            onClick={() => navigate(`/products/${product.id}`)}
            className="min-w-[260px] inline-block rounded-2xl overflow-hidden
            bg-white border border-gray-100 shadow-sm
            hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]
            transition cursor-pointer"
          >

            {/* IMAGE (NO INNER BOX — FULL BLEED STYLE) */}
            <div className="w-full h-44 overflow-hidden">

              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover
                transition-transform duration-300
                hover:scale-110"
              />

            </div>

            {/* CONTENT */}
            <div className="p-4 space-y-2">

              <p className="text-gray-800 font-semibold text-base truncate">
                {product.name}
              </p>

              <p className="text-blue-600 font-bold text-lg">
                KES {product.price?.toLocaleString() ?? 'N/A'}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/products/${product.id}`);
                }}
                className="w-full mt-2 py-2 rounded-lg text-sm font-medium
                bg-blue-50 border border-blue-200 text-blue-600
                hover:bg-blue-600 hover:text-white
                transition"
              >
                View Details
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default TrendingNow;