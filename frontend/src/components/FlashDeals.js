import React, { useEffect, useRef, useState } from 'react';

const FlashDeals = ({ navigate }) => {
  const scrollRef = useRef(null);
  const isPaused = useRef(false);

  // 🔥 DEALS
  const deals = [
    {
      id: 1,
      title: 'iPhone 15 Pro Max Deal',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
      badge: 'HOT',
      price: 145000,
      duration: 24 * 60 * 60 * 1000,
    },
    {
      id: 2,
      title: 'MacBook Air M2 Offer',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
      badge: 'SAVE',
      price: 180000,
      duration: 48 * 60 * 60 * 1000,
    },
    {
      id: 3,
      title: 'Samsung Smart Watch Ultra',
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
      badge: 'NEW',
      price: 45000,
      duration: 12 * 60 * 60 * 1000,
    },
    {
      id: 4,
      title: 'AirPods Pro Deal',
      image: 'https://images.unsplash.com/photo-1580894908361-967195033215',
      badge: 'HOT',
      price: 25000,
      duration: 36 * 60 * 60 * 1000,
    },
  ];

  const [items] = useState(() =>
    deals.map((d) => ({
      ...d,
      endsAt: Date.now() + d.duration,
    }))
  );

  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const loopedDeals = [...items, ...items];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let frame;

    const step = () => {
      if (!isPaused.current) {
        el.scrollLeft += 0.8;

        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft -= el.scrollWidth / 2;
        }
      }

      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, []);

  const pause = () => (isPaused.current = true);
  const resume = () => (isPaused.current = false);

  const formatTime = (end) => {
    const diff = end - now;
    if (diff <= 0) return 'Expired';

    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    return `${h}h ${m}m ${s}s`;
  };

  return (
    <div className="space-y-4 mt-10">

      {/* TITLE */}
      <h2 className="text-lg font-semibold text-gray-800">
        ⚡ Flash Deals
      </h2>

      {/* SCROLLER */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-hidden whitespace-nowrap"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
      >

        {loopedDeals.map((item, i) => (
          <div
            key={i}
            onClick={() => navigate(`/products/${item.id}`)}
            className="min-w-[85%] sm:min-w-[320px] rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm
                       hover:shadow-md hover:-translate-y-1 transition cursor-pointer relative"
          >

            {/* BADGE */}
            <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
              {item.badge}
            </span>

            {/* TIMER */}
            <span className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
              ⏳ {formatTime(item.endsAt)}
            </span>

            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.title}
              className="h-44 sm:h-52 w-full object-cover"
            />

            {/* CONTENT */}
            <div className="p-3 text-center space-y-1">

              <p className="font-semibold text-gray-800 text-sm sm:text-base">
                {item.title}
              </p>

              <p className="text-blue-600 font-bold text-base">
                KES {item.price.toLocaleString()}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/products/${item.id}`);
                }}
                className="w-full mt-2 py-2 rounded-lg text-sm font-medium
                           bg-blue-600 text-white hover:bg-blue-700 transition"
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

export default FlashDeals;