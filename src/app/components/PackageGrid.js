'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Star, ArrowRight } from 'lucide-react';

export default function PackageCard({ pkg }) {
  return (
    /* We use a fixed width (w-[250px]) to create the Netflix "thumbnail" look */
    <div className="flex-shrink-0 w-[250px] md:w-[280px] group cursor-pointer snap-start">
      <Link href={`/destinations/${pkg.id}`}>
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-3 shadow-md">
          <Image
            src={pkg.image || pkg.imageUrl}
            alt={pkg.title || pkg.destination}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="280px"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
          
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="font-bold text-lg leading-tight group-hover:text-blue-400 transition-colors">
              {pkg.title || pkg.destination}
            </h3>
          </div>
        </div>
      </Link>
      
      {/* Modern Info Bar: No prices, just clean icons */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <Calendar size={14} className="text-blue-500" /> {pkg.duration}
          </span>
          <span className="flex items-center gap-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <Star size={14} className="text-orange-500 fill-orange-500" /> {pkg.rating}
          </span>
        </div>
        <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
      </div>
    </div>
  );
}