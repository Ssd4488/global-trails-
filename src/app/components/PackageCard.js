'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, Star, ChevronRight } from 'lucide-react';

export default function PackageCard({ pkg }) {
  return (
    /* Fixed width: 220px on mobile, 260px on desktop. 
       'flex-shrink-0' is critical to prevent the cards from squashing. */
    <div className="flex-shrink-0 w-[220px] md:w-[260px] group cursor-pointer snap-start">
      <Link href={`/destinations/${pkg.id}`}>
        {/* Aspect ratio 3:4 is standard for professional travel "tiles" */}
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-3 shadow-md border border-slate-100">
          <Image
            src={pkg.image}
            alt={pkg.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 220px, 260px"
          />
          {/* Subtle gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
          
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="font-bold text-lg leading-tight line-clamp-2 drop-shadow-sm">
              {pkg.title}
            </h3>
          </div>
        </div>
      </Link>
      
      {/* Modern, Minimalist Info Row */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-wider">
            <CalendarDays size={14} className="text-blue-500" /> {pkg.duration}
          </span>
          <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-wider">
            <Star size={14} className="text-orange-500 fill-orange-500" /> {pkg.rating}
          </span>
        </div>
        <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-500 transition-all" />
      </div>
    </div>
  );
}