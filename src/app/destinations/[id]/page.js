'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Calendar, 
  Star, 
  CheckCircle2, 
  ArrowLeft, 
  Clock,
  MapPin,
  Compass
} from 'lucide-react';
// Correct import to reach your data file
import { packages } from '../../data/packages';

export default function DestinationDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  // Find the package data
  const pkg = packages.find((p) => p.id === id);

  // Error handling if ID doesn't match
  if (!pkg) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-black text-slate-900 mb-4">Destination Not Found</h2>
        <button 
          onClick={() => router.push('/destinations')}
          className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold"
        >
          Back to Destinations
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20 font-sans text-slate-900">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-12">
          <button 
            onClick={() => router.back()}
            className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-white/40 transition-all"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                {pkg.category}
              </span>
              <span className="flex items-center gap-1 text-white text-sm font-bold">
                <Star size={16} className="text-orange-400 fill-orange-400" /> {pkg.rating}
              </span>
            </div>
            <h1 className="text-4xl md:text-8xl font-black text-white tracking-tighter leading-[0.9]">
              {pkg.title}
            </h1>
          </div>
        </div>
      </section>

      {/* --- QUICK INFO BAR --- */}
      <div className="container mx-auto px-4 -mt-10 relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</p>
            <div className="flex items-center gap-2 text-slate-900 font-bold italic">
              <Calendar size={18} className="text-blue-600" /> {pkg.duration}
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Experience</p>
            <div className="flex items-center gap-2 text-slate-900 font-bold italic">
              <Compass size={18} className="text-blue-600" /> {pkg.experience}
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Style</p>
            <div className="flex items-center gap-2 text-slate-900 font-bold italic">
              <Clock size={18} className="text-blue-600" /> {pkg.mood}
            </div>
          </div>
          <div className="flex items-center justify-end">
            <Link 
              href="/contact"
              className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* --- LEFT COLUMN: ITINERARY --- */}
        <div className="lg:col-span-8 space-y-20">
          
          <section>
            <h2 className="text-3xl font-black mb-8 border-l-4 border-blue-600 pl-6">Trip Overview</h2>
            <p className="text-xl text-slate-600 leading-relaxed font-medium italic">
              "{pkg.description}" 
            </p>
          </section>

          <section>
            <h3 className="text-3xl font-black mb-12">Day-by-Day Itinerary</h3>
            <div className="space-y-12 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
              {pkg.itinerary.map((day, i) => (
                <div key={i} className="relative pl-16 group">
                  <div className="absolute left-0 top-0 w-12 h-12 bg-white border-4 border-slate-50 rounded-2xl flex items-center justify-center font-black text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md z-10">
                    {day.day}
                  </div>
                  <div className="bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100 group-hover:border-blue-500 transition-all">
                    <h4 className="text-xl font-bold mb-3">{day.title}</h4>
                    <p className="text-slate-600 leading-relaxed">{day.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* --- RIGHT COLUMN: SIDEBAR --- */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-slate-900 text-white p-10 rounded-[3rem] sticky top-24 shadow-2xl">
            <h3 className="text-2xl font-bold mb-8">What's Included</h3>
            <ul className="space-y-6 mb-10">
              {pkg.includes.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <CheckCircle2 size={20} className="text-blue-500 flex-shrink-0 mt-1" />
                  <span className="text-slate-300 font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <div className="pt-8 border-t border-white/10 text-center">
              <p className="text-slate-400 text-sm mb-8 italic">
                Focusing on comfort, safety, authenticity, and value.
              </p>
              <Link 
                href="/contact" 
                className="block w-full py-5 bg-[#ff7f32] text-white font-black uppercase tracking-widest rounded-2xl hover:bg-orange-600 transition-all"
              >
                Inquire Now
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}