'use client';

import { motion } from 'framer-motion';

const sortOptions = ["✨ Featured", "💸 Price (Low-High)", "🌟 Top Rated"];

export default function SortingBar({ activeSort, onSortChange, resultCount }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
      
      {/* Left Side: Sort Options */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm font-bold text-gray-400 uppercase tracking-wider mr-2">
          Sort by:
        </span>
        {sortOptions.map(option => (
          <motion.button
            key={option}
            onClick={() => onSortChange(option)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 border
              ${activeSort === option 
                ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600'
              }`
            }
          >
            {option}
          </motion.button>
        ))}
      </div>

      {/* Right Side: Result Count Badge */}
      <div className="flex items-center bg-blue-50 px-4 py-2 rounded-xl border border-blue-100 self-end sm:self-auto">
        <span className="text-sm font-medium text-blue-800">
          Found <span className="font-extrabold">{resultCount}</span> packages
        </span>
      </div>

    </div>
  );
}