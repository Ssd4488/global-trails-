'use client';

import Image from 'next/image';

export default function ImageGallery({ images, title }) {
  // Use provided images or fallbacks if the array is empty/short
  // In a real app, you'd want to handle this more robustly or ensure data integrity
  const displayImages = images && images.length >= 5 ? images : [
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070",
    "https://images.unsplash.com/photo-1502602898657-3e91760c0341?q=80&w=2070",
    "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2070",
    "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=80&w=2070",
    "https://images.unsplash.com/photo-1533105079780-52b9be462077?q=80&w=2070"
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[400px] md:h-[500px] rounded-2xl overflow-hidden relative mb-8">
      {/* Main Large Image */}
      <div className="md:col-span-2 md:row-span-2 relative h-full">
        <Image 
          src={displayImages[0]} 
          alt={`Main view of ${title}`} 
          fill 
          className="object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
          priority
        />
      </div>

      {/* Side Images */}
      <div className="hidden md:block relative h-full">
        <Image 
          src={displayImages[1]} 
          alt="Gallery view 1" 
          fill 
          className="object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
        />
      </div>
      <div className="hidden md:block relative h-full">
        <Image 
          src={displayImages[2]} 
          alt="Gallery view 2" 
          fill 
          className="object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
        />
      </div>
      <div className="hidden md:block relative h-full">
        <Image 
          src={displayImages[3]} 
          alt="Gallery view 3" 
          fill 
          className="object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
        />
      </div>
      <div className="hidden md:block relative h-full group cursor-pointer">
        <Image 
          src={displayImages[4]} 
          alt="Gallery view 4" 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* "View All" Overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
          <span className="text-white font-bold text-sm bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/20">
            View All Photos
          </span>
        </div>
      </div>
    </div>
  );
}