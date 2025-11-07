'use client';
import { useState, useEffect } from 'react';

const taglines = [
  "Find Your Next Escape.",
  "Discover Hidden Gems.",
  "Live Your Next Story."
];

export default function DestinationsHero() {
  const [tagline, setTagline] = useState(taglines[0]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % taglines.length;
      setTagline(taglines[i]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="relative h-80 bg-cover bg-center flex items-center justify-center text-white"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1935&auto=format&fit=crop')" }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Where to next?</h1>
        <div className="relative">
          {/* UPDATED: Added bg-white for visibility */}
          <input 
            type="text" 
            placeholder="Search for a city, destination or tour..."
            className="w-full pl-12 pr-4 py-4 border-0 rounded-full shadow-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg className="w-6 h-6 text-gray-400 absolute top-1/2 left-4 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <p className="mt-4 text-lg opacity-80 h-6 transition-opacity duration-500">{tagline}</p>
      </div>
    </div>
  );
}

