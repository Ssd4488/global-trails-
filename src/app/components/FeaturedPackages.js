'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Compass, ArrowRight } from 'lucide-react';
// CRITICAL FIX: Pulling from your local data, NOT Firebase
import { packages } from '../data/packages'; 
import PackageCard from './PackageCard';

const categories = ['All', 'India', 'International', 'Beach', 'Mountain'];

export default function FeaturedPackages() {
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter directly from your local packages.js
  const filteredPackages = packages
    .filter((pkg) => {
      if (activeCategory === 'All') return true;
      if (activeCategory === 'India' || activeCategory === 'International') return pkg.category === activeCategory;
      return pkg.experience === activeCategory;
    })
    .slice(0, 8); // Show up to 8 items in the row

  return (
    <section className="py-24 bg-white font-sans overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Compass className="w-6 h-6 text-blue-600" />
              <span className="font-black text-blue-600 uppercase tracking-[0.2em] text-xs">
                Handpicked Journeys
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
              Featured Destinations
            </h2>
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 w-full md:w-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex-shrink-0 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 
                ${activeCategory === category
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Netflix Horizontal Row */}
        <div className="relative -mx-6 px-6">
          <div className="flex gap-6 overflow-x-auto no-scrollbar snap-x scroll-smooth pb-8">
            {filteredPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
            
            {/* View All Circle at the end */}
            {filteredPackages.length > 0 && (
               <div className="flex-shrink-0 w-[220px] md:w-[260px] snap-start flex items-center justify-center">
                 <Link href="/destinations" className="flex flex-col items-center gap-4 text-slate-400 hover:text-blue-600 transition-colors group">
                   <div className="w-16 h-16 rounded-full border-2 border-current flex items-center justify-center group-hover:scale-110 transition-transform">
                     <ArrowRight size={24} />
                   </div>
                   <span className="font-bold uppercase tracking-widest text-xs">View All</span>
                 </Link>
               </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}