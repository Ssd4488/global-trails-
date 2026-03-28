'use client';

import { packages } from '../data/packages';
import PackageCard from '../components/PackageCard';
import DestinationsHero from '../components/DestinationsHero';

export default function DestinationsPage() {
  const rows = [
    { title: "Trending Now", category: "All" },
    { title: "Domestic Wonders", category: "India" },
    { title: "International Escapes", category: "International" },
    { title: "Beach Paradises", experience: "Beach" },
    { title: "Mountain Treks", experience: "Mountain" }
  ];

  return (
    <div className="bg-white min-h-screen pb-20 font-sans">
      <DestinationsHero />
      
      <div className="pt-10 space-y-16">
        {rows.map((row) => (
          <section key={row.title} className="relative group">
            {/* Row Title */}
            <div className="container mx-auto px-6 mb-6 flex justify-between items-end">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter">
                {row.title}
              </h2>
              <button className="text-blue-600 font-bold text-sm hover:underline">
                Explore All
              </button>
            </div>

            {/* The Netflix-Style Scroll Container */}
            <div className="relative">
              <div className="flex gap-6 overflow-x-auto px-6 md:px-12 pb-6 no-scrollbar snap-x scroll-smooth">
                {packages
                  .filter(p => 
                    row.category === "All" || 
                    p.category === row.category || 
                    p.experience === row.experience
                  )
                  .map((pkg) => (
                    <PackageCard key={pkg.id} pkg={pkg} />
                  ))}
                
                {/* Spacer at the end of the row */}
                <div className="flex-shrink-0 w-6 md:w-12 h-full" />
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}