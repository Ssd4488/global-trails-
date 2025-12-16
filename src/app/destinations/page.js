'use client';

import { useState, useEffect, useMemo } from 'react';
import { getAllPackages } from '../lib/getData';
import DestinationsHero from '../components/DestinationsHero';
import FilterSidebar from '../components/FilterSidebar';
import SortingBar from '../components/SortingBar';
import PackageCard from '../components/PackageCard';

export default function DestinationsPage() {
  const [allPackages, setAllPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State for Filters & Sorting
  const [activeFilters, setActiveFilters] = useState({ experience: [], mood: [] });
  const [activeSort, setActiveSort] = useState("✨ Featured");

  // 1. Fetch Data on Load
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getAllPackages();
      setAllPackages(data);
      setLoading(false);
    }
    loadData();
  }, []);

  // 2. Handle Filter Updates from Sidebar
  const handleFilterChange = (category, values) => {
    setActiveFilters(prev => ({ ...prev, [category]: values }));
  };

  // 3. Handle Sort Updates from Bar
  const handleSortChange = (option) => {
    setActiveSort(option);
  };

  // 4. Filter & Sort Logic (Memoized for performance)
  const displayedPackages = useMemo(() => {
    let result = [...allPackages];

    // Filter by Experience
    if (activeFilters.experience.length > 0) {
      result = result.filter(pkg => activeFilters.experience.includes(pkg.experience));
    }
    // Filter by Mood (Assuming 'mood' exists in your DB, if not this is safe to keep for future)
    if (activeFilters.mood.length > 0) {
      result = result.filter(pkg => activeFilters.mood.includes(pkg.mood));
    }

    // Sort Logic
    if (activeSort === "💸 Price (Low-High)") {
      result.sort((a, b) => a.price - b.price);
    } else if (activeSort === "🌟 Top Rated") {
      result.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    }
    // "Featured" uses default order

    return result;
  }, [allPackages, activeFilters, activeSort]);

  return (
    <main className="bg-gray-50 min-h-screen pb-20">
      
      {/* 1. The New Searchable Hero */}
      <DestinationsHero />

      <div className="container mx-auto px-4 md:px-6 py-12">
        
        {/* Breadcrumb (Visual Only) */}
        <div className="text-sm text-gray-400 mb-8 font-medium">
          Home <span className="mx-2">/</span> Destinations
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* 2. The Filter Sidebar (Sticky on Desktop) */}
          <aside className="w-full lg:w-80 flex-shrink-0 lg:sticky lg:top-24 z-10">
            <FilterSidebar 
              filters={activeFilters} 
              onFilterChange={handleFilterChange} 
            />
          </aside>

          {/* 3. Main Results Area */}
          <div className="flex-1 w-full">
            
            {/* Sorting Bar */}
            <SortingBar 
              activeSort={activeSort} 
              onSortChange={handleSortChange} 
              resultCount={displayedPackages.length} 
            />

            {/* Results Grid */}
            {loading ? (
              // Skeleton Loading State
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl h-[400px] animate-pulse border border-gray-100 shadow-sm"></div>
                ))}
              </div>
            ) : displayedPackages.length > 0 ? (
              // Actual Packages
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {displayedPackages.map((pkg) => (
                  <div key={pkg.id} className="h-full">
                    <PackageCard {...pkg} />
                  </div>
                ))}
              </div>
            ) : (
              // Empty State (No results)
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                <div className="text-6xl mb-4">🗺️</div>
                <h3 className="text-xl font-bold text-gray-900">No destinations found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your filters or search criteria.</p>
                <button 
                  onClick={() => setActiveFilters({ experience: [], mood: [] })}
                  className="mt-6 text-blue-600 font-bold hover:underline"
                >
                  Reset all filters
                </button>
              </div>
            )}

            {/* Pagination / Load More (Visual for now) */}
            {!loading && displayedPackages.length > 0 && (
              <div className="mt-16 flex justify-center">
                <button className="px-8 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                  Show More Results
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}