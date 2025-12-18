'use client';

import { useState, useEffect, useMemo } from 'react';
import { getAllPackages } from '../lib/getData'; // UPDATED: Fetch from Firebase
import FilterSidebar from '../components/FilterSidebar';
import PackageGrid from '../components/PackageGrid';
import DestinationsHero from '../components/DestinationsHero';
import SortingBar from '../components/SortingBar';
import QuickViewModal from '../components/QuickViewModal';

export default function DestinationsPage() {
  const [allPackages, setAllPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [filters, setFilters] = useState({ experience: [], mood: [] });
  const [activeSort, setActiveSort] = useState("✨ Featured");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // --- NEW: Fetch Data from Firebase ---
  useEffect(() => {
    async function loadPackages() {
      setLoading(true);
      try {
        const data = await getAllPackages();
        setAllPackages(data);
      } catch (error) {
        console.error("Failed to load packages:", error);
      } finally {
        setLoading(false);
      }
    }
    loadPackages();
  }, []);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const filteredAndSortedPackages = useMemo(() => {
    let packages = [...allPackages];

    if (filters.experience && filters.experience.length > 0) {
      packages = packages.filter(p => filters.experience.includes(p.experience));
    }
    if (filters.mood && filters.mood.length > 0) {
      packages = packages.filter(p => filters.mood.includes(p.mood));
    }

    if (activeSort === "💸 Price (Low-High)") {
      packages.sort((a, b) => a.price - b.price);
    } else if (activeSort === "🌟 Top Rated") {
      packages.sort((a, b) => b.rating - a.rating);
    }

    return packages;
  }, [allPackages, filters, activeSort]);

  const handleOpenModal = (pkg) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  return (
    <>
      <DestinationsHero />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
          
          <div className="flex-grow">
            <SortingBar 
              activeSort={activeSort}
              onSortChange={setActiveSort}
              resultCount={filteredAndSortedPackages.length}
            />
            
            {loading ? (
               // Simple loading skeleton for grid
               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                 {[...Array(6)].map((_, i) => (
                   <div key={i} className="h-96 bg-gray-100 rounded-2xl animate-pulse"></div>
                 ))}
               </div>
            ) : (
              <PackageGrid 
                packages={filteredAndSortedPackages} 
                onPackageQuickView={handleOpenModal} 
              />
            )}
          </div>
        </div>
      </div>

      <QuickViewModal pkg={selectedPackage} onClose={handleCloseModal} />
    </>
  );
}