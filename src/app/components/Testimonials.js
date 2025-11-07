'use client'; // This component uses hooks for interactivity

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

// --- Testimonial Data ---
const testimonials = [
  {
    quote: "GlobeTrails planned the most incredible trip to Japan for us. Every detail was perfect, from the hotels to the tours. Truly a five-star experience!",
    name: "Aarav Sharma",
    location: "Mumbai, India",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=387&auto=format&fit=crop",
  },
  {
    quote: "Our honeymoon in Santorini was a dream come true, all thanks to the GlobeTrails team. The recommendations were spot on. We can't wait to book our next trip!",
    name: "Priya Patel",
    location: "London, UK",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=387&auto=format&fit=crop",
  },
  {
    quote: "The Kerala backwaters tour was absolutely serene and well-organized. It was the perfect relaxing getaway we needed. Highly recommended for a peaceful retreat.",
    name: "Rohan Das",
    location: "Bengaluru, India",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=387&auto=format&fit=crop",
  },
    {
    quote: "I never thought I'd see the Northern Lights, but GlobeTrails made it happen! The entire trip to Norway was seamless and magical. A life-changing experience.",
    name: "Ananya Rao",
    location: "Singapore",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=461&auto=format&fit=crop",
  },
];

// --- Star Rating Component ---
const StarRating = ({ rating }) => (
  <div className="flex text-yellow-400">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className={`w-5 h-5 ${i < rating ? 'fill-current' : 'text-gray-300'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
    ))}
  </div>
);


// --- Main Testimonials Component ---
export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">What Our Travelers Say</h2>
        <p className="text-center text-gray-600 mb-12">Real stories from our happy customers.</p>
        
        <div className="relative">
          <div className="embla" ref={emblaRef}>
            <div className="embla__container">
              {testimonials.map((testimonial, index) => (
                <div className="embla__slide p-4 md:p-6" key={index} style={{ flex: '0 0 100%', md: { flex: '0 0 50%' }, lg: { flex: '0 0 33.33%' }}}>
                  <div className="bg-gray-50 p-8 rounded-xl shadow-sm h-full flex flex-col">
                    <StarRating rating={testimonial.rating} />
                    <p className="text-gray-600 mt-4 flex-grow">"{testimonial.quote}"</p>
                    <div className="mt-6 flex items-center">
                      <Image
                        src={testimonial.imageUrl}
                        alt={testimonial.name}
                        width={50}
                        height={50}
                        className="rounded-full"
                        objectFit="cover"
                      />
                      <div className="ml-4">
                        <p className="font-semibold text-gray-800">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button onClick={scrollPrev} className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 hidden md:block">
             <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <button onClick={scrollNext} className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 hidden md:block">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
