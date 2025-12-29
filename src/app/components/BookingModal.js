'use client';

import React, { useState, useEffect } from 'react';
import { X, Calendar, Users, Calculator } from 'lucide-react';

export default function BookingModal({ isOpen, onClose, packageData, onSubmit, currentUser }) {
  if (!isOpen) return null;

  const [date, setDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(packageData?.price || 0);

  // Recalculate price whenever guests number changes
  useEffect(() => {
    if (packageData?.price) {
      setTotalPrice(packageData.price * guests);
    }
  }, [guests, packageData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create the final booking object to save to Firestore
    const bookingData = {
      packageId: packageData.id,
      packageTitle: packageData.title,
      pricePerPerson: packageData.price,
      totalPrice: totalPrice,
      date: date,
      guests: Number(guests),
      location: packageData.location || 'Unknown',
      userId: currentUser?.uid,
      userEmail: currentUser?.email,
      status: 'Confirmed', // We auto-confirm for this demo
      createdAt: new Date()
    };

    onSubmit(bookingData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
        
        {/* Header */}
        <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
          <h3 className="text-lg font-bold">Book Your Trip</h3>
          <button onClick={onClose} className="hover:bg-blue-700 p-1 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h4 className="text-xl font-bold text-gray-900">{packageData.title}</h4>
            <p className="text-gray-500 text-sm">per person: ${packageData.price}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Date Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
                <input 
                  type="date" 
                  required
                  min={new Date().toISOString().split('T')[0]} // Disable past dates
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Guests Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
              <div className="relative">
                <Users className="absolute left-3 top-3 text-gray-400" size={18} />
                <input 
                  type="number" 
                  min="1"
                  max="20"
                  required
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-gray-50 p-4 rounded-xl flex justify-between items-center border border-gray-100">
              <div className="flex items-center gap-2 text-gray-600">
                <Calculator size={18} />
                <span className="font-medium">Total Price:</span>
              </div>
              <span className="text-2xl font-bold text-blue-600">${totalPrice.toLocaleString()}</span>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-blue-500/30 active:scale-[0.98]"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}