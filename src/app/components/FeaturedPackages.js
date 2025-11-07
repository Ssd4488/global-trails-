'use client';

import { useState } from 'react';
import PackageCard from './PackageCard';
import { motion } from 'framer-motion'; // Import framer-motion

const allPackages = [
  {
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760c0341?q=80&w=2070&auto=format&fit=crop",
    destination: "Charming Paris, France",
    duration: 7,
    rating: 4.8,
    price: 95000,
    status: 'Bestseller',
    category: 'International',
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2070&auto=format&fit=crop",
    destination: "Vibrant Tokyo, Japan",
    duration: 10,
    rating: 4.9,
    price: 180000,
    status: 'New',
    category: 'International',
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=80&w=2070&auto=format&fit=crop",
    destination: "Idyllic Santorini, Greece",
    duration: 8,
    rating: 4.7,
    price: 145000,
    status: 'Limited',
    category: 'Honeymoon',
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1533105079780-52b9be462077?q=80&w=2070&auto=format&fit=crop",
    destination: "Serene Backwaters of Kerala",
    duration: 5,
    rating: 4.8,
    price: 45000,
    status: 'Bestseller',
    category: 'Domestic',
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1567634453399-691552b09337?q=80&w=1974&auto=format&fit=crop",
    destination: "Romantic Venice, Italy",
    duration: 6,
    rating: 4.9,
    price: 130000,
    status: 'New',
    category: 'Honeymoon',
  },
];
const categories = ['All', 'Bestseller', 'International', 'Honeymoon', 'Domestic'];

export default function FeaturedPackages() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPackages = allPackages.filter(pkg => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Bestseller') return pkg.status === 'Bestseller';
    return pkg.category === activeCategory;
  });
  
  // Framer Motion container variant
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // This creates the staggered effect
      },
    },
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">Explore Our Top Destinations</h2>
        <p className="text-center text-gray-600 mb-12">Find the perfect trip from our curated selection of packages.</p>
        
        <div className="flex justify-center flex-wrap gap-3 mb-12">
          {categories.map(category => ( <button key={category} onClick={() => setActiveCategory(category)} className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${activeCategory === category ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>{category}</button>))}
        </div>
        
        {/* --- Updated Animated Grid --- */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" // Animate when the component is in view
          viewport={{ once: true }} // Only animate once
        >
          {filteredPackages.map((pkg, index) => (
            <PackageCard key={index} {...pkg} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

