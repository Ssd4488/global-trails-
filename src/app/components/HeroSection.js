'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Compass, Navigation } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="relative h-screen min-h-[700px] w-full flex flex-col justify-center items-center font-sans overflow-hidden bg-slate-900">
      
      {/* 1. The Background Image (Using a guaranteed premium Unsplash link) */}
      <Image
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070" 
        alt="Globe Trails Background"
        fill
        priority
        className="object-cover object-center"
      />

      {/* 2. The Gradients */}
      {/* A subtle dark tint over the whole image so the white text pops */}
      <div className="absolute inset-0 bg-slate-900/30" />
      {/* The heavy fade-to-white at the bottom to blend seamlessly into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-white via-white/70 to-transparent" />

      {/* 3. The Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full mt-[-10vh]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center w-full"
        >
          {/* Top Pill Badge */}
          <div className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-black/20 backdrop-blur-md mb-8">
            <Compass className="w-4 h-4 text-blue-400" />
            <span className="text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
              India's Premium Travel Gateway
            </span>
          </div>

          {/* Massive Two-Tone Headline */}
          <h1 className="text-7xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter leading-none drop-shadow-2xl">
            <span className="text-white">GLOBE</span>
            <span className="text-blue-500"> TRAIL.</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-8 text-lg md:text-xl lg:text-2xl text-white font-medium max-w-3xl mx-auto drop-shadow-lg">
            Curated journeys designed for the bold. Managed in real-time for your convenience.
          </p>

          {/* Glowing Action Button */}
          <div className="mt-12">
            <Link href="/destinations">
              <button className="flex items-center justify-center gap-3 bg-blue-600 text-white font-bold text-lg py-5 px-10 rounded-2xl hover:bg-blue-500 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(37,99,235,0.8)] hover:scale-105 hover:shadow-[0_0_60px_-15px_rgba(37,99,235,1)]">
                Explore Destinations
                <Navigation className="w-5 h-5 rotate-90" />
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* 4. The Bottom "Explorer List" Cue */}
      <div className="absolute bottom-10 left-6 md:left-20 z-10 flex items-center gap-4">
        <div className="w-12 h-[2px] bg-blue-600"></div>
        <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs">
          The Explorer List
        </span>
      </div>

    </div>
  );
}