'use client';

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { packages } from '../data/packages';
import PackageCard from '../components/PackageCard';
import DestinationsHero from '../components/DestinationsHero';

export default function DestinationsPage() {
  const [activeRow, setActiveRow] = useState(null);

  const rows = [
    { title: "Trending Now", category: "All" },
    { title: "Domestic Wonders", category: "India" },
    { title: "International Escapes", category: "International" },
    { title: "Beach Paradises", experience: "Beach" },
    { title: "Mountain Treks", experience: "Mountain" }
  ];

  const getFilteredPackages = (row) => {
    return packages.filter(p => 
      row.category === "All" || 
      p.category === row.category || 
      p.experience === row.experience
    );
  };

  // NEW: Smooth scroll function for opening the grid
  const handleExploreAll = (row) => {
    setActiveRow(row);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // NEW: Smooth scroll function for going back
  const handleBack = () => {
    setActiveRow(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white min-h-screen pb-20 font-sans">
      <DestinationsHero />
      
      <div className="pt-10">
        {activeRow ? (
          
          /* --- FULL GRID VIEW --- */
          <div className="container mx-auto px-4 md:px-6 animate-in fade-in zoom-in-95 duration-500">
            <button 
              onClick={handleBack}
              className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold mb-8 transition-colors group cursor-pointer"
            >
              <div className="p-2 bg-slate-50 rounded-full group-hover:bg-blue-50 transition-colors">
                <ArrowLeft size={20} /> 
              </div>
              Back to all collections
            </button>
            
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter mb-8 md:mb-10">
              {activeRow.title}
            </h2>
            
            {/* FIX: grid-cols-2 forces 2 columns on mobile. 
                The [&>div]:!w-full forces the fixed-width PackageCard to become fluid inside the grid. */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
              {getFilteredPackages(activeRow).map((pkg) => (
                <div key={pkg.id} className="w-full [&>div]:!w-full [&>div]:!flex-none">
                  <PackageCard pkg={pkg} />
                </div>
              ))}
            </div>
          </div>

        ) : (

          /* --- NETFLIX ROWS VIEW --- */
          <div className="space-y-12 md:space-y-16">
            {rows.map((row) => (
              <section key={row.title} className="relative group animate-in fade-in duration-500">
                <div className="container mx-auto px-4 md:px-6 mb-4 md:mb-6 flex justify-between items-end">
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter">
                    {row.title}
                  </h2>
                  
                  {/* FIX: Added cursor-pointer and wired up the scroll function */}
                  <button 
                    onClick={() => handleExploreAll(row)}
                    className="text-blue-600 font-bold text-[10px] md:text-xs uppercase tracking-widest hover:text-blue-800 transition-colors flex items-center gap-1 cursor-pointer py-2"
                  >
                    Explore All &rarr;
                  </button>
                </div>

                <div className="relative">
                  <div className="flex gap-4 md:gap-6 overflow-x-auto px-4 md:px-6 pb-6 no-scrollbar snap-x scroll-smooth">
                    {getFilteredPackages(row).map((pkg) => (
                      <PackageCard key={pkg.id} pkg={pkg} />
                    ))}
                    <div className="flex-shrink-0 w-4 md:w-12 h-full" />
                  </div>
                </div>
              </section>
            ))}
          </div>

        )}
      </div>
    </div>
  );
}