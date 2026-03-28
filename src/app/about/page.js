'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutUs() {
  return (
    <div className="bg-white font-sans">
      {/* --- Hero Section --- */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070&auto=format&fit=crop" 
          alt="Travel Story" 
          fill 
          className="object-cover brightness-50"
          priority
        />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 font-medium leading-relaxed italic">
            "At GLOBETRAIL TRAVELS, we believe travel is more than just visiting new places — it’s about creating stories that stay with you for a lifetime." 
          </p>
        </div>
      </section>

      {/* --- Founders & Mission Section --- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-bold uppercase tracking-wider">
              Established September 2024 
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Crafting Memorable Journeys with Passion and Expertise.
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Founded by <span className="text-gray-900 font-semibold">Sahana Mutalik and Praveen Mutalik</span>, GLOBETRAIL TRAVELS was born from a shared passion for exploration and a commitment to delivering seamless, memorable travel experiences. 
              </p>
              <p>
                With <span className="text-gray-900 font-semibold">4 years of hands-on experience</span> in planning, organizing, and managing travel journeys, we bring deep industry knowledge and a traveler-first mindset to every itinerary. 
              </p>
              <p>
                Whether you’re dreaming of a relaxing getaway, an adventurous escape, or a culturally rich journey, we focus on <span className="text-blue-600 font-bold">comfort, safety, authenticity, and value</span>.
              </p>
            </div>
          </div>
          <div className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl transform lg:rotate-2">
            <Image 
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop" 
              alt="Exploration" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* --- Why Choose Us Section --- */}
      <section className="bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16">Why Travel With Us? </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: "Personalized Packages", 
                desc: "Tour packages tailored specifically to your individual needs and style. ",
                icon: "✨" 
              },
              { 
                title: "Transparent Pricing", 
                desc: "No hidden surprises. What you see is exactly what you get.",
                icon: "💎" 
              },
              { 
                title: "Reliable Planning", 
                desc: "Every trip is backed by real-world experience and industry expertise.",
                icon: "🗺️" 
              },
              { 
                title: "End-to-End Support", 
                desc: "We are here for you before, during, and after your journey. ",
                icon: "🤝" 
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-left">
                <div className="text-4xl mb-6">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Call to Action --- */}
      <section className="py-24 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Ready to turn your dreams into reality?
        </h2>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Whether you’re traveling solo, with family, or in a group, we’re here to help you start planning. 
        </p>
        <Link 
          href="/destinations" 
          className="inline-block bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition shadow-xl shadow-blue-500/20"
        >
          Explore Destinations
        </Link>
      </section>
    </div>
  );
}