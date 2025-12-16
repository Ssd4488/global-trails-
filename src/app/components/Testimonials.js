'use client';

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Image from 'next/image';
import { motion } from 'framer-motion';

// --- Premium Section Header Icon (Chat Bubble) ---
const ChatIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" clipRule="evenodd" />
  </svg>
);

// --- Star Rating Component ---
const StarRating = ({ rating }) => (
  <div className="flex text-yellow-400 gap-0.5">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className={`w-5 h-5 ${i < Math.floor(rating) ? 'fill-current' : 'text-gray-200'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
      </svg>
    ))}
  </div>
);

// --- Skeleton Loader for Testimonials ---
const TestimonialSkeleton = () => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col animate-pulse">
    <div className="flex gap-1 mb-6">
      {[...Array(5)].map((_, i) => <div key={i} className="w-5 h-5 bg-gray-200 rounded-full"></div>)}
    </div>
    <div className="flex-grow space-y-3">
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="h-4 bg-gray-200 rounded w-4/6"></div>
    </div>
    <div className="mt-8 flex items-center">
      <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
      <div>
        <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 w-16 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);

// --- Main Component ---
export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const querySnapshot = await getDocs(collection(db, "testimonials"));
        const data = querySnapshot.docs.map(doc => doc.data());
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  return (
    <section className="py-24 bg-[#faf9f6]"> {/* A very subtle 'warm' off-white background */}
      <div className="container mx-auto px-6">
        
        {/* --- Premium Section Header --- */}
        <div className="text-center mb-16">
          <ChatIcon className="w-12 h-12 mx-auto text-orange-500 mb-4 opacity-80" />
          <span className="font-semibold text-orange-600 uppercase tracking-wider text-sm">
            Real Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2">
            What Our Travelers Say
          </h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Don't just take our word for it. Hear from the adventurers who have explored the world with us.
          </p>
        </div>

        {/* --- Carousel Area --- */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons (Desktop) */}
          <button onClick={scrollPrev} className="hidden md:flex absolute top-1/2 -left-12 z-10 -translate-y-1/2 bg-white text-gray-800 p-3 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110 border border-gray-100">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <button onClick={scrollNext} className="hidden md:flex absolute top-1/2 -right-12 z-10 -translate-y-1/2 bg-white text-gray-800 p-3 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110 border border-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
          </button>

          <div className="embla overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="embla__container flex">
              
              {loading ? (
                // Show 3 skeletons while loading
                [...Array(3)].map((_, i) => (
                  <div className="embla__slide flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 px-4" key={i}>
                    <TestimonialSkeleton />
                  </div>
                ))
              ) : (
                // Show actual testimonials
                testimonials.map((testimonial, index) => (
                  <motion.div 
                    className="embla__slide flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 px-4 py-2" 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow h-full flex flex-col border border-gray-100 relative overflow-hidden">
                      {/* Decorative Giant Quote Mark */}
                      <span className="absolute top-2 right-6 text-[10rem] text-gray-50 opacity-[0.06] font-serif leading-none select-none pointer-events-none">
                        ”
                      </span>
                      
                      <StarRating rating={testimonial.rating} />
                      
                      <blockquote className="mt-6 flex-grow relative z-10">
                        <p className="text-gray-700 text-lg leading-relaxed italic">
                          "{testimonial.quote}"
                        </p>
                      </blockquote>
                      
                      <div className="mt-8 flex items-center relative z-10 pt-6 border-t border-gray-50">
                        <div className="relative w-14 h-14 flex-shrink-0">
                          <Image
                            src={testimonial.imageUrl}
                            alt={testimonial.name}
                            fill
                            className="rounded-full object-cover border-2 border-white shadow-md"
                          />
                        </div>
                        <div className="ml-4">
                          <p className="font-bold text-gray-900">{testimonial.name}</p>
                          <div className="flex items-center text-sm text-gray-500 mt-0.5">
                            <svg className="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                            {testimonial.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Mobile Navigation Dots */}
          <div className="flex md:hidden justify-center gap-2 mt-8">
             {/* We can add dots here if needed, or just rely on swipe for mobile */}
             <p className="text-sm text-gray-400">Swipe to see more</p>
          </div>

        </div>
      </div>
    </section>
  );
}