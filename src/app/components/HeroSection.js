'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Navigation } from 'lucide-react';

// Array of premium high-res images for the slideshow
const heroImages = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070", // Mountain
  "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070", // Beach Coast
  "https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=2070", // City/Architecture
  "https://images.unsplash.com/photo-1542401886-65d6c61db217?q=80&w=2070"  // Desert/Adventure
];

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-advance the slideshow every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  return (
    <div className="relative h-screen min-h-[700px] w-full flex flex-col justify-center items-center font-sans overflow-hidden bg-slate-900">
      
      {/* 1. The Crossfading Background Images */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={heroImages[currentImageIndex]} 
            alt="Globe Trails Background"
            fill
            priority
            className="object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* 2. The Gradients (Kept exactly the same so text pops) */}
      <div className="absolute inset-0 bg-slate-900/30 z-[1]" />
      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-white via-white/70 to-transparent z-[1]" />

      {/* 3. The Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full mt-[-10vh]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
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
          <p className="mt-8 text-xl md:text-xl lg:text-2xl text-white font-medium max-w-3xl mx-auto drop-shadow-lg">
            Explore The Globe, One Trail At A Time.
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

      {/* 4. The Bottom "Explorer List" Cue & Slide Indicators */}
      <div className="absolute bottom-10 left-6 md:left-20 z-10 flex flex-col gap-4">
        {/* Slide Indicators */}
        <div className="flex gap-2">
          {heroImages.map((_, index) => (
            <div 
              key={index} 
              onClick={() => setCurrentImageIndex(index)}
              className={`h-1 cursor-pointer transition-all duration-500 rounded-full ${
                index === currentImageIndex ? 'w-8 bg-blue-500' : 'w-2 bg-white/50 hover:bg-white'
              }`}
            />
          ))}
        </div>
        
        {/* Explorer List Text */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-[2px] bg-blue-600"></div>
          <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs">
            The Explorer List
          </span>
        </div>
      </div>

    </div>
  );
}