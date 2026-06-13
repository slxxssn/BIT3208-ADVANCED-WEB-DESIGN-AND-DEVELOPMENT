import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar, FaWhatsapp, FaTruck, FaHeart } from 'react-icons/fa';
import axios from 'axios';

const ProductDetailsPage = ({ onAddToCart, addedItems }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        const data = res.data;
        const details = data.details || {};

        let imagesArray = [];
        if (details.images?.length) {
          imagesArray = details.images.slice(0, 3);
        } else if (data.image_url) {
          imagesArray = [data.image_url];
        }
        while (imagesArray.length < 3) imagesArray.push('/images/placeholder.jpg');

        setProduct({
          ...data,
          images: imagesArray,
          keyFeatures: details.keyFeatures || null,
          rating: details.rating ?? null,
          reviews: details.reviews ?? null,
          oldPrice: details.oldPrice ?? null,
          stock: details.stock ?? null,
          delivery: details.delivery ?? null,
        });

        setSelectedImage(imagesArray[0]);
      } catch (err) {
        console.error('Failed to fetch product:', err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product)
    return (
      <div className="text-center py-20 text-gray-400">
        Loading product...
      </div>
    );

  const savings =
    product.oldPrice && product.price ? product.oldPrice - product.price : null;

  const handleThumbnailClick = (idx) => {
    if (idx === 0) return;
    const newImages = [...product.images];
    [newImages[0], newImages[idx]] = [newImages[idx], newImages[0]];
    setProduct({ ...product, images: newImages });
    setSelectedImage(newImages[0]);
  };

  const isAdded = addedItems?.includes(product.id);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white py-10 px-4 sm:px-6 lg:px-20">

      {/* MAIN CARD */}
      <div className="max-w-6xl mx-auto
                      bg-white/5 backdrop-blur-xl border border-white/10
                      rounded-2xl shadow-lg p-6 sm:p-10
                      grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* LEFT: IMAGES */}
        <div>

          {/* MAIN IMAGE */}
          <div className="rounded-xl overflow-hidden border border-white/10 bg-white/10">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-80 sm:h-96 object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-3 mt-4">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumb ${idx}`}
                onClick={() => handleThumbnailClick(idx)}
                className={`w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg cursor-pointer
                            border transition hover:scale-105
                            ${selectedImage === img
                              ? 'border-cyan-400'
                              : 'border-white/10'
                            }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: INFO */}
        <div className="flex flex-col justify-between space-y-6">

          <div className="space-y-4">

            {/* NAME */}
            <h1 className="text-2xl sm:text-3xl font-bold">
              {product.name}
            </h1>

            {/* RATING */}
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar
                    key={i}
                    className={
                      product.rating && i + 0.5 < product.rating
                        ? 'text-yellow-400'
                        : 'text-gray-600'
                    }
                  />
                ))}
              </div>

              <span className="text-gray-400 text-sm">
                {product.reviews !== null
                  ? `${product.reviews} verified reviews`
                  : 'Not provided'}
              </span>
            </div>

            {/* PRICE */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-2xl font-bold text-cyan-400">
                Ksh {product.price?.toLocaleString() ?? 'Not provided'}
              </span>

              <span className="text-gray-500 line-through text-sm">
                {product.oldPrice
                  ? `Ksh ${product.oldPrice.toLocaleString()}`
                  : 'Not provided'}
              </span>

              {savings !== null && (
                <span className="text-green-400 text-sm font-semibold">
                  You save Ksh {savings.toLocaleString()}
                </span>
              )}
            </div>

            {/* DELIVERY */}
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <FaTruck className="text-cyan-400" />
              <span>{product.delivery ?? 'Not provided'}</span>
            </div>

            {/* FEATURES */}
            <div>
              <h2 className="font-semibold text-white mb-2">
                Key Features
              </h2>

              {product.keyFeatures ? (
                <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
                  {product.keyFeatures.map((feat, idx) => (
                    <li key={idx}>{feat}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">Not provided</p>
              )}
            </div>

          </div>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">

            {/* WHATSAPP */}
            <a
              href={`https://wa.me/254000000000?text=Hi! I'm interested in ${product.name} for Ksh ${product.price}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2
                         py-3 rounded-xl
                         bg-green-500/20 border border-green-400
                         hover:bg-green-500 text-white transition"
            >
              <FaWhatsapp />
              Order via WhatsApp
            </a>

            {/* ADD TO CART (LOGIC UNCHANGED) */}
            <button
              onClick={() => onAddToCart(product.id)}
              className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition
              ${isAdded
                ? 'bg-green-500 text-white'
                : 'bg-cyan-500/10 border border-cyan-400 text-cyan-300 hover:bg-cyan-500 hover:text-white'
              }`}
            >
              {isAdded ? '✔ Added' : 'Add to Cart (Pay on Delivery)'}
            </button>

            {/* WISHLIST */}
            <button
              className="p-3 rounded-xl bg-white/10 border border-white/10
                         hover:border-red-400 hover:text-red-400 transition"
            >
              <FaHeart />
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetailsPage;