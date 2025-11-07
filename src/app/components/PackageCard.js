'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const InfoIcon = ({ icon, text }) => (
  <div className="flex items-center gap-1 text-sm text-gray-200">
    {icon}
    <span>{text}</span>
  </div>
);

export default function PackageCard({ onQuickViewClick, imageUrl, destination, duration, rating, price, status }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };
  
  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickViewClick(); // This function is passed down from the parent page
  };

  const getBadgeStyle = () => {
    switch (status) {
      case 'Bestseller': return 'bg-orange-500 text-white';
      case 'New': return 'bg-green-500 text-white';
      case 'Limited': return 'bg-red-500 text-white';
      case 'Honeymoon': return 'bg-pink-500 text-white';
      case 'Adventure': return 'bg-teal-500 text-white';
      case 'Cultural': return 'bg-purple-500 text-white';
      default: return 'bg-gray-700 text-white';
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div variants={cardVariants}>
      <div className="group bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl">
        <Link href="/destinations">
          <div className="relative h-60 w-full overflow-hidden">
            {/* --- NEW QUICK VIEW BUTTON --- */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <button 
                onClick={handleQuickView}
                className="bg-white text-gray-800 font-semibold py-2 px-6 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Quick View
              </button>
            </div>
            
            {status && ( <div className={`absolute top-4 left-4 z-20 text-xs font-bold px-3 py-1 rounded-full ${getBadgeStyle()}`}>{status}</div> )}
            <div onClick={toggleWishlist} className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm cursor-pointer hover:bg-white/40 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill={isWishlisted ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
              </svg>
            </div>
            <Image src={imageUrl} alt={`Image of ${destination}`} layout="fill" objectFit="cover" className="group-hover:scale-110 transition-transform duration-500 ease-in-out" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 text-white z-10">
               <div className="flex items-center gap-4">
                <InfoIcon icon="🗓️" text={`${duration} Days`} />
                <InfoIcon icon="⭐" text={rating} />
              </div>
            </div>
          </div>
          <div className="p-5">
            <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{destination}</h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Starting from</p>
                <p className="text-2xl font-semibold text-blue-600">₹{price.toLocaleString('en-IN')}</p>
              </div>
              <button className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors">Details</button>
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}

