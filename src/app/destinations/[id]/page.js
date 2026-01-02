'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { MapPin, Clock, Star, ArrowLeft, Check, AlertCircle } from 'lucide-react';
// Ensure we import correctly from your data file
import { allPackages as packages } from '../../data/packages'; 
import BookingModal from '../../components/BookingModal';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

// A nice fallback image in case one is missing in the data
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop";

export default function DestinationDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { currentUser } = useAuth();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // 1. Find the package
  const pkg = packages.find((p) => p.id.toString() === id);

  if (!pkg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl text-gray-400">Destination not found</h1>
        <button onClick={() => router.push('/destinations')} className="text-blue-600 hover:underline">
          Back to all destinations
        </button>
      </div>
    );
  }

  // 2. Handle "Book Now" Click
  const handleBookClick = () => {
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setIsModalOpen(true);
  };

  // 3. Handle Booking Submission
  const handleBookingSubmit = async (bookingData) => {
    try {
      // Safety check: Ensure no fields are undefined
      const safeBookingData = {
        ...bookingData,
        packageTitle: bookingData.packageTitle || pkg.title || 'Untitled Package',
        location: bookingData.location || pkg.location || 'Unknown Location',
        pricePerPerson: bookingData.pricePerPerson || pkg.price || 0,
        userId: currentUser?.uid || 'anonymous',
        userEmail: currentUser?.email || 'unknown',
        createdAt: new Date() // Ensure we have a date
      };

      await addDoc(collection(db, 'bookings'), safeBookingData);
      
      setIsModalOpen(false);
      setBookingSuccess(true);
      
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
      
    } catch (error) {
      console.error("Error saving booking:", error);
      alert("Failed to save booking. Please try again.");
    }
  };

  // 4. Render Success Screen
  if (bookingSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 animate-fade-in">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-sm mx-4">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Check size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  // 5. Render Main Detail Page
  // We use pkg.image || FALLBACK_IMAGE to prevent the crash
  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Hero Image */}
      <div className="relative h-[50vh] w-full">
        <Image 
          src={pkg.image ? pkg.image : FALLBACK_IMAGE} 
          alt={pkg.title || 'Destination'} 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <button 
          onClick={() => router.back()}
          className="absolute top-6 left-6 bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/30 transition-all z-10"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-8">
          <div className="max-w-7xl mx-auto">
             <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-3 inline-block shadow-sm">
               {pkg.category || 'Adventure'}
             </span>
             <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 shadow-sm">{pkg.title}</h1>
             <div className="flex items-center text-gray-200 gap-4">
               <span className="flex items-center gap-1"><MapPin size={18} /> {pkg.location}</span>
               <span className="flex items-center gap-1"><Clock size={18} /> {pkg.duration || '5 Days'}</span>
               <span className="flex items-center gap-1 text-yellow-400"><Star size={18} fill="currentColor" /> {pkg.rating || 4.8}</span>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-gray-600 leading-relaxed text-lg">{pkg.description}</p>
          </section>

          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold mb-6">Itinerary Highlights</h2>
            <div className="space-y-6">
               <div className="flex gap-4 group">
                 <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">1</div>
                 <div>
                   <h3 className="font-bold text-lg">Arrival & Welcome</h3>
                   <p className="text-gray-500">Arrive at the destination and transfer to your hotel. Welcome dinner included.</p>
                 </div>
               </div>
               <div className="flex gap-4 group">
                 <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">2</div>
                 <div>
                   <h3 className="font-bold text-lg">Guided Exploration</h3>
                   <p className="text-gray-500">Full day guided tour of major landmarks and hidden local gems.</p>
                 </div>
               </div>
               <div className="flex gap-4 group">
                 <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">3</div>
                 <div>
                   <h3 className="font-bold text-lg">Leisure & Departure</h3>
                   <p className="text-gray-500">Morning at leisure for shopping or relaxation before transfer to airport.</p>
                 </div>
               </div>
            </div>
          </section>
        </div>

        {/* Sidebar / Booking Card */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 sticky top-24">
            <div className="flex justify-between items-end mb-6">
               <div>
                 <span className="text-gray-500">Price per person</span>
                 <div className="text-3xl font-bold text-blue-600">${pkg.price}</div>
               </div>
               <div className="flex gap-1 text-sm text-gray-500">
                 <Star className="text-yellow-400" size={16} fill="currentColor" />
                 <span>{pkg.rating || 4.8} ({pkg.reviews || 120} reviews)</span>
               </div>
            </div>

            <hr className="border-gray-100 mb-6" />

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-gray-600">
                <Check className="text-green-500" size={20} />
                <span>Free cancellation up to 24h</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Check className="text-green-500" size={20} />
                <span>Instant confirmation</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Check className="text-green-500" size={20} />
                <span>Expert local guide</span>
              </div>
            </div>
            
            <button 
              onClick={handleBookClick}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-xl hover:shadow-blue-500/30 transform hover:-translate-y-1"
            >
              Book Now
            </button>
            
            {!currentUser && (
               <p className="text-xs text-center text-gray-400 mt-3 flex items-center justify-center gap-1">
                 <AlertCircle size={12} />
                 You need to login to book
               </p>
            )}
          </div>
        </div>
      </div>

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        packageData={pkg}
        onSubmit={handleBookingSubmit}
        currentUser={currentUser}
      />
    </div>
  );
}