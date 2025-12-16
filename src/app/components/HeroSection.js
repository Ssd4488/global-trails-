'use client';

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

// --- Reusable Button Components ---
const PrevButton = ({ enabled, onClick }) => (
  <button
    className="embla__button absolute top-1/2 left-4 z-20 -translate-y-1/2 bg-black/30 backdrop-blur-sm p-3 rounded-full text-white disabled:opacity-30 transition-all hover:bg-black/50"
    onClick={onClick}
    disabled={!enabled}
  >
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
  </button>
);

const NextButton = ({ enabled, onClick }) => (
  <button
    className="embla__button absolute top-1/2 right-4 z-20 -translate-y-1/2 bg-black/30 backdrop-blur-sm p-3 rounded-full text-white disabled:opacity-30 transition-all hover:bg-black/50"
    onClick={onClick}
    disabled={!enabled}
  >
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
  </button>
);

const DotButton = ({ selected, onClick }) => (
  <button
    className={`embla__dot ${selected ? 'embla__dot--selected' : ''}`}
    type="button"
    onClick={onClick}
  />
);

// --- Animation Variants ---
const textContainerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { delay: 0.3, staggerChildren: 0.15 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 }
  },
};

const textItemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
};

// --- Main Component ---
export default function HeroSection() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  useEffect(() => {
    async function fetchSlides() {
      try {
        const slidesCollection = collection(db, "heroSlides");
        const q = query(slidesCollection, orderBy("order", "asc"));
        const querySnapshot = await getDocs(q);
        const fetchedSlides = querySnapshot.docs.map(doc => doc.data());
        if (fetchedSlides.length > 0) {
          setSlides(fetchedSlides);
        }
      } catch (error) {
        console.error("Error fetching hero slides: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSlides();
  }, []);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  if (loading) {
    return (
      <div className="relative h-[85vh] w-full bg-gray-900 animate-pulse flex items-center justify-center">
         <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative h-[85vh] text-white bg-black">
      {/* Carousel Viewport */}
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container h-full">
          {slides.map((slide, index) => (
            <div className="embla__slide" key={index}>
              <div className="relative h-full w-full">
                <Image
                  src={slide.imageUrl}
                  alt={slide.headline}
                  fill
                  priority={index === 0}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Text Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
        <AnimatePresence mode="wait">
          {slides.length > 0 && slides[selectedIndex] && (
            <motion.div
              key={selectedIndex}
              variants={textContainerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col items-center max-w-4xl"
            >
              <motion.span variants={textItemVariants} className="text-orange-500 font-bold uppercase tracking-[0.2em] text-sm md:text-base mb-4 drop-shadow-md">
                {slides[selectedIndex].microTagline}
              </motion.span>

              <motion.h1 variants={textItemVariants} className="text-4xl md:text-7xl font-extrabold leading-tight mb-6 tracking-tight drop-shadow-lg">
                {slides[selectedIndex].headline}
              </motion.h1>

              <motion.p variants={textItemVariants} className="text-lg md:text-2xl text-gray-200 font-medium mb-10 max-w-2xl mx-auto drop-shadow">
                {slides[selectedIndex].subtext}
              </motion.p>

              <motion.div variants={textItemVariants}>
                <Link href="/destinations">
                  <button className="bg-blue-600 text-white font-bold py-4 px-10 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1">
                    Explore Packages
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />

      <div className="embla__dots absolute bottom-10 left-0 right-0 flex justify-center items-center gap-4">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>

      {/* Scroll Cue */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 hidden md:block pointer-events-none opacity-70">
        <div className="w-6 h-6 text-white animate-bounce">
          <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}