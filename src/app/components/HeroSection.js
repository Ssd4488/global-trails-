'use client';

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import Image from 'next/image';

// --- Reusable Button Components ---
const PrevButton = ({ enabled, onClick }) => (
  <button
    className="embla__button absolute top-1/2 left-4 z-20 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white disabled:opacity-30"
    onClick={onClick}
    disabled={!enabled}
  >
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
  </button>
);

const NextButton = ({ enabled, onClick }) => (
  <button
    className="embla__button absolute top-1/2 right-4 z-20 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white disabled:opacity-30"
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

// --- Slide Data ---
const slides = [
  {
    imageUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop',
    headline: 'Your Journey Begins Here',
    subtext: 'Discover breathtaking destinations and create unforgettable memories.',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760c0341?q=80&w=2070&auto=format&fit=crop',
    headline: 'Experience the Magic of Paris',
    subtext: 'Walk through charming streets and witness iconic landmarks.',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2070&auto=format&fit=crop',
    headline: 'Explore the Wonders of Tokyo',
    subtext: 'A perfect blend of ancient tradition and futuristic technology.',
  },
];

// --- Main Hero Section Component ---
export default function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

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

  return (
    <div className="relative">
      <div className="embla h-[60vh] md:h-[85vh]" ref={emblaRef}>
        <div className="embla__container h-full">
          {slides.map((slide, index) => (
            <div className="embla__slide" key={index}>
              <div className="relative h-full w-full flex items-center justify-center text-white">
                <Image src={slide.imageUrl} alt={slide.headline} layout="fill" objectFit="cover" className="absolute inset-0" priority={index === 0} />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 text-center px-4">
                  <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 tracking-wide">{slide.headline}</h1>
                  <p className="text-lg md:text-2xl font-light mb-8 max-w-2xl mx-auto">{slide.subtext}</p>
                  <Link href="/destinations">
                    <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">Explore Packages</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
      
      <div className="embla__dots absolute bottom-6 left-0 right-0 flex justify-center items-center">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}