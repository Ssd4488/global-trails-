'use client';

import { useState } from 'react';
import PackageCard from './PackageCard';
import { motion } from 'framer-motion';

const ITEMS_PER_PAGE = 6;

// This component now receives the packages to display as a prop
export default function PackageGrid({ packages, onPackageQuickView }) {
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

  const loadMore = () => {
    setVisibleItems(prev => prev + ITEMS_PER_PAGE);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="w-full">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={packages.length} // Add key to re-trigger animation on filter change
      >
        {packages.slice(0, visibleItems).map((pkg) => (
          <PackageCard 
            key={pkg.id} 
            {...pkg} 
            onQuickViewClick={() => onPackageQuickView(pkg)}
          />
        ))}
      </motion.div>

      {/* Show a message if no packages match the filter */}
      {packages.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-2xl font-semibold text-gray-700">No Packages Found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your filters to find your perfect trip.</p>
        </div>
      )}

      {visibleItems < packages.length && (
        <div className="text-center mt-12">
          <button 
            onClick={loadMore}
            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

