'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { packages } from '../data/packages';
import PackageCard from '../components/PackageCard';
import { Map, ArrowRight } from 'lucide-react';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      const lowerQuery = query.toLowerCase();
      const filtered = packages.filter(pkg => 
        pkg.title.toLowerCase().includes(lowerQuery) ||
        pkg.category.toLowerCase().includes(lowerQuery) ||
        pkg.experience.toLowerCase().includes(lowerQuery) ||
        pkg.description.toLowerCase().includes(lowerQuery) ||
        pkg.highlights.some(h => h.toLowerCase().includes(lowerQuery))
      );
      setResults(filtered);
    }
  }, [query]);

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-20 font-sans">
      <div className="container mx-auto px-6">
        
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
          Search Results for <span className="text-blue-600">"{query}"</span>
        </h1>

        {results.length > 0 ? (
          <>
            <p className="text-slate-500 mb-10 text-lg">Found {results.length} amazing destinations for you.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
              {results.map((pkg) => (
                <div key={pkg.id} className="w-full [&>div]:!w-full [&>div]:!flex-none">
                  <PackageCard pkg={pkg} />
                </div>
              ))}
            </div>
          </>
        ) : (
          /* --- THE "NOT FOUND" LEAD CAPTURE --- */
          <div className="mt-16 bg-white p-10 md:p-16 rounded-[2.5rem] shadow-xl text-center max-w-3xl mx-auto border border-slate-100">
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Map size={40} />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
              We Couldn't Find That Exact Destination...
            </h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              But the good news is: <strong className="text-slate-900">We customize trips to anywhere in the world!</strong> Tell us where you want to go, and our experts will craft your perfect dream itinerary from scratch.
            </p>
            
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 bg-blue-600 text-white font-black text-lg px-8 py-5 rounded-2xl hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-600/30 transition-all transform hover:-translate-y-1"
            >
              Start Your Custom Trip <ArrowRight size={20} />
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}

// Next.js 13+ requires SearchParams to be wrapped in Suspense
export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center text-xl font-bold">Loading results...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}