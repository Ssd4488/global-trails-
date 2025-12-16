'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllPackages } from '../lib/getData';
import PackageCard from './PackageCard';
import { motion } from 'framer-motion';

// --- NEW: Premium Header Icon ---
const CompassIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
    <circle cx="12" cy="12" r="3" />
    <path d="m13.4 10.6 5.6 2.4-2.4 5.6-5.6-2.4 2.4-5.6z" />
  </svg>
);

// --- NEW: Skeleton Card for Professional Loading ---
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
    <div className="aspect-[4/3] w-full bg-gray-200"></div>
    <div className="p-5">
      <div className="h-5 w-3/4 bg-gray-200 rounded-lg"></div>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <div className="h-3 w-20 bg-gray-200 rounded-lg mb-2"></div>
          <div className="h-8 w-32 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
      </div>
    </div>
  </div>
);

// --- UPDATED: Categories based on your actual data (status & experience) ---
const categories = ['All', 'Bestseller', 'New', 'Honeymoon', 'Cultural'];
const MAX_PACKAGES = 6; // Show 6 packages on the homepage

export default function FeaturedPackages() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPackages() {
      setLoading(true);
      const data = await getAllPackages();
      setPackages(data);
      setLoading(false);
    }
    loadPackages();
  }, []);

  // --- UPDATED: Filtering logic to match new categories ---
  const filteredPackages = packages
    .filter((pkg) => {
      if (activeCategory === 'All') return true;
      if (activeCategory === 'Cultural') return pkg.experience === 'Cultural';
      return pkg.status === activeCategory;
    })
    .slice(0, MAX_PACKAGES); // Only show the first 6

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    // --- NEW: Section Atmosphere Gradient ---
    <section className="py-24 bg-gradient-to-b from-white via-blue-50/50 to-white">
      <div className="container mx-auto px-6">
        
        {/* --- NEW: Premium Section Header --- */}
        <div className="text-center mb-16">
          <CompassIcon className="w-12 h-12 mx-auto text-blue-600 mb-4" />
          <span className="font-semibold text-blue-600 uppercase tracking-wider text-sm">
            Handpicked Journeys
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 mt-2">
            Explore Our Top Destinations
          </h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Find the perfect trip from our curated selection of packages,
            designed to create unforgettable memories.
          </p>
        </div>

        {/* --- NEW: Polished Filter Pills --- */}
        <div className="flex justify-center flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 transform hover:-translate-y-0.5
                ${activeCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 shadow-sm hover:shadow-md'
                }`
              }
            >
              {category}
            </button>
          ))}
        </div>

        {/* --- NEW: Loading State with Skeletons --- */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : (
          <>
            {/* Animated Package Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              key={activeCategory} // Re-trigger animation when category changes
            >
              {filteredPackages.map((pkg) => (
                <PackageCard key={pkg.id} {...pkg} />
              ))}
            </motion.div>

            {/* Fallback if no packages match */}
            {!loading && filteredPackages.length === 0 && (
              <p className="text-center text-gray-500 mt-8">
                No packages found for the "{activeCategory}" category yet.
              </p>
            )}

            {/* --- NEW: View All CTA Button --- */}
            <div className="text-center mt-16">
              <Link href="/destinations">
                <button className="bg-white text-blue-600 font-bold py-4 px-10 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 border border-blue-100">
                  View All Packages &rarr;
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}