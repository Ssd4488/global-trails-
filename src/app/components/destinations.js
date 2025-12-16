'use client';

import Image from 'next/image';

// --- Icons for the Search Bar ---
const MapPinIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
);
const CalendarIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
);
const UserIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
);
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
);

export default function DestinationsHero() {
  return (
    <div className="relative h-[500px] flex items-center justify-center">
      
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"
          alt="Destinations Hero"
          fill
          className="object-cover brightness-[0.6]"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            Explore All Destinations
          </h1>
          <p className="text-lg text-blue-100 mt-4 max-w-2xl mx-auto font-medium">
            Find your next perfect getaway from our curated selection of premium packages.
          </p>
        </div>

        {/* === Glassmorphic Search Bar === */}
        <div className="bg-white rounded-2xl shadow-2xl p-2 md:p-3 flex flex-col md:flex-row gap-2 items-center">
          
          {/* Destination Input */}
          <div className="flex-grow flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl w-full md:w-auto focus-within:ring-2 ring-blue-100 transition-all">
            <MapPinIcon />
            <div className="flex-grow">
               <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Where to?</label>
               <input 
                 type="text" 
                 placeholder="Search destinations..." 
                 className="w-full bg-transparent text-gray-900 font-semibold placeholder:text-gray-400 focus:outline-none text-base"
               />
            </div>
          </div>

          {/* Divider (Desktop) */}
          <div className="hidden md:block w-px h-10 bg-gray-200"></div>

          {/* Dates Input */}
          <div className="flex-grow flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl w-full md:w-auto cursor-pointer hover:bg-gray-100 transition-all">
            <CalendarIcon />
             <div>
               <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">When?</label>
               <span className="text-gray-900 font-semibold">Add dates</span>
            </div>
          </div>

           {/* Divider (Desktop) */}
          <div className="hidden md:block w-px h-10 bg-gray-200"></div>

          {/* Travelers Input */}
          <div className="flex-grow flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl w-full md:w-auto cursor-pointer hover:bg-gray-100 transition-all">
            <UserIcon />
             <div>
               <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Who?</label>
               <span className="text-gray-900 font-semibold">Add guests</span>
            </div>
          </div>

          {/* Search Button */}
          <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-[1.02] active:scale-95 shadow-md flex items-center justify-center gap-2">
            <SearchIcon />
            <span>Search</span>
          </button>

        </div>
      </div>

    </div>
  );
}