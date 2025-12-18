'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getPackageById } from '../../lib/getData';
import ImageGallery from '../../components/ImageGallery';
import Link from 'next/link';

// --- Icons ---
const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-400">
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-green-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

export default function PackageDetailsPage() {
  const params = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPackage() {
      if (params?.id) {
        const data = await getPackageById(params.id);
        setPkg(data);
        setLoading(false);
      }
    }
    loadPackage();
  }, [params?.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Package Not Found</h1>
        <p className="text-gray-600 mb-8">We couldn't find the package you're looking for.</p>
        <Link href="/destinations" className="text-blue-600 font-bold hover:underline">
          &larr; Back to Destinations
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen pb-20">
      <div className="container mx-auto px-4 md:px-6 py-8">
        
        {/* --- 1. Header Section --- */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-3">{pkg.destination}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1 font-bold text-gray-900">
              <StarIcon />
              <span>{pkg.rating}</span>
              <span className="text-gray-500 font-normal underline cursor-pointer hover:text-gray-900">(128 reviews)</span>
            </div>
            <span>•</span>
            <span className="font-medium">{pkg.experience}</span>
            <span>•</span>
            <span className="font-medium">{pkg.duration} Days</span>
          </div>
        </div>

        {/* --- 2. Photo Gallery --- */}
        {/* We pass an array of images. Since your data currently has just one 'imageUrl', 
            we wrap it in an array or let the component handle fallbacks. 
            Ideally, your DB should have an 'images' array field later. */}
        <ImageGallery images={pkg.images || [pkg.imageUrl]} title={pkg.destination} />

        {/* --- 3. Main Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
          
          {/* LEFT COLUMN: Content */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this trip</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Experience the magic of {pkg.destination}. This {pkg.duration}-day journey is designed for {pkg.mood?.toLowerCase()} travelers seeking an unforgettable {pkg.experience?.toLowerCase()} adventure. 
                Enjoy premium accommodations, expert guides, and curated experiences that showcase the very best of the region.
                {/* Note: This is placeholder text. Later you can add a 'description' field to your DB. */}
              </p>
            </section>

            {/* Amenities / What's Included */}
            <section className="py-8 border-t border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What's included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Premium Accommodation', 'Daily Breakfast', 'Airport Transfers', 'Expert Guide', 'Entrance Fees', 'Private Transport'].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-gray-700">
                    <CheckIcon />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Itinerary (Placeholder for now) */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Itinerary</h2>
              <div className="space-y-6">
                {[...Array(pkg.duration)].map((_, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                        {i + 1}
                      </div>
                      {i < pkg.duration - 1 && <div className="w-0.5 h-full bg-gray-200 my-2"></div>}
                    </div>
                    <div className="pb-6">
                      <h3 className="font-bold text-gray-900 mb-1">Day {i + 1}: Exploration & Adventure</h3>
                      <p className="text-gray-600 text-sm">
                        A full day of sightseeing and activities in the heart of {pkg.destination}. Discover local culture and hidden gems.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN: Sticky Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-2xl shadow-[0_6px_30px_rgba(0,0,0,0.12)] border border-gray-200 p-6">
              
              <div className="flex justify-between items-end mb-6">
                <div>
                  <span className="text-3xl font-bold text-gray-900">₹{pkg.price.toLocaleString('en-IN')}</span>
                  <span className="text-gray-500"> / person</span>
                </div>
                <div className="text-sm font-bold text-gray-500 line-through">₹{(pkg.price * 1.2).toLocaleString('en-IN')}</div>
              </div>

              {/* Date Picker Placeholder */}
              <div className="border border-gray-300 rounded-xl overflow-hidden mb-4">
                <div className="grid grid-cols-2 border-b border-gray-300">
                  <div className="p-3 border-r border-gray-300">
                    <label className="block text-xs font-bold text-gray-800 uppercase">Check-in</label>
                    <input type="text" placeholder="Add date" className="w-full text-sm outline-none text-gray-600 bg-transparent placeholder:text-gray-400" />
                  </div>
                  <div className="p-3">
                    <label className="block text-xs font-bold text-gray-800 uppercase">Check-out</label>
                    <input type="text" placeholder="Add date" className="w-full text-sm outline-none text-gray-600 bg-transparent placeholder:text-gray-400" />
                  </div>
                </div>
                <div className="p-3">
                  <label className="block text-xs font-bold text-gray-800 uppercase">Guests</label>
                  <input type="text" placeholder="1 guest" className="w-full text-sm outline-none text-gray-600 bg-transparent placeholder:text-gray-400" />
                </div>
              </div>

              {/* Reserve Button */}
              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200 active:scale-95">
                Reserve
              </button>
              
              <p className="text-center text-xs text-gray-500 mt-3">You won't be charged yet</p>

              {/* Price Breakdown */}
              <div className="mt-6 space-y-3 text-gray-600 text-sm">
                <div className="flex justify-between">
                  <span className="underline">₹{pkg.price.toLocaleString('en-IN')} x 1 guest</span>
                  <span>₹{pkg.price.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="underline">Service fee</span>
                  <span>₹2,500</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-4 font-bold text-gray-900 text-base">
                  <span>Total</span>
                  <span>₹{(pkg.price + 2500).toLocaleString('en-IN')}</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}