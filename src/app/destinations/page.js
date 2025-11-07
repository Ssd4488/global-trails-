'use client';

import { useState, useMemo } from 'react';
import { allPackages } from '../data/packages'; // Import our new data file
import FilterSidebar from '../components/FilterSidebar';
import PackageGrid from '../components/PackageGrid';
import DestinationsHero from '../components/DestinationsHero';
import SortingBar from '../components/SortingBar';
import QuickViewModal from '../components/QuickViewModal';

export default function DestinationsPage() {
  const [filters, setFilters] = useState({ experience: [], mood: [] });
  const [activeSort, setActiveSort] = useState("✨ Featured");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  // The core logic for filtering and sorting the packages
  const filteredAndSortedPackages = useMemo(() => {
    let packages = [...allPackages];

    // Filter by experience
    if (filters.experience && filters.experience.length > 0) {
      packages = packages.filter(p => filters.experience.includes(p.experience));
    }
    // Filter by mood
    if (filters.mood && filters.mood.length > 0) {
      packages = packages.filter(p => filters.mood.includes(p.mood));
    }

    // Sort the results
    if (activeSort === "💸 Price (Low-High)") {
      packages.sort((a, b) => a.price - b.price);
    } else if (activeSort === "🌟 Top Rated") {
      packages.sort((a, b) => b.rating - a.rating);
    }
    // "Featured" is the default order (by ID), so no special sorting is needed

    return packages;
  }, [filters, activeSort]);

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
          {/* Pass state and handlers to the sidebar */}
          <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
          
          <div className="flex-grow">
            {/* Pass state and handlers to the sorting bar */}
            <SortingBar 
              activeSort={activeSort}
              onSortChange={setActiveSort}
              resultCount={filteredAndSortedPackages.length}
            />
            {/* Pass the final, processed list of packages to the grid */}
            <PackageGrid 
              packages={filteredAndSortedPackages} 
              onPackageQuickView={handleOpenModal} 
            />
          </div>
        </div>
      </div>

      <QuickViewModal pkg={selectedPackage} onClose={handleCloseModal} />
    </>
  );
}

