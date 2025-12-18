'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PackageCard({
  id, // We need the ID prop now
  onQuickViewClick,
  imageUrl,
  destination,
  duration,
  rating,
  price,
  status
}) {

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickViewClick && onQuickViewClick();
  };

  const getBadgeStyle = () => {
    switch (status) {
      case 'Bestseller': return 'bg-orange-500 text-white';
      case 'New': return 'bg-blue-500 text-white';
      case 'Limited': return 'bg-red-500 text-white';
      case 'Honeymoon': return 'bg-pink-500 text-white';
      default: return 'bg-gray-800 text-white';
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  };

  return (
    <motion.div variants={cardVariants} className="h-full">
      {/* LINK UPDATED: Now goes to the specific detail page */}
      <Link href={`/destinations/${id}`} className="group block h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ease-out border border-gray-100 hover:border-blue-100">
        
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          
          {status && (
            <div className={`absolute top-4 left-4 z-20 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm ${getBadgeStyle()}`}>
              {status}
            </div>
          )}

          <button className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/30 transition-all">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
              </svg>
          </button>

          <Image
            src={imageUrl}
            alt={`Trip to ${destination}`}
            fill
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[2px]">
            <button
              onClick={handleQuickView}
              className="bg-white text-gray-900 font-bold text-sm py-3 px-6 rounded-full shadow-lg hover:bg-blue-50 transition-transform transform hover:scale-105"
            >
              Quick View
            </button>
          </div>

          <div className="absolute bottom-0 left-0 w-full p-4 text-white flex items-center gap-4 text-sm font-medium">
            <div className="flex items-center gap-1 bg-black/20 backdrop-blur-md px-2 py-1 rounded-lg">
              <span>🗓️</span> {duration} Days
            </div>
            <div className="flex items-center gap-1 bg-black/20 backdrop-blur-md px-2 py-1 rounded-lg">
              <span>⭐</span> {rating}
            </div>
          </div>
        </div>

        <div className="p-5 flex flex-col justify-between flex-grow">
          <div>
            <h3 className="text-xl font-bold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
              {destination}
            </h3>
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Starting from</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-blue-900">₹{price?.toLocaleString('en-IN')}</span>
                <span className="text-gray-500 text-sm">/person</span>
              </div>
            </div>
             <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
             </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}