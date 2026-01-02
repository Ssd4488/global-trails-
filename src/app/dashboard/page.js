'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { updateProfile } from 'firebase/auth';
import { collection, query, where, getDocs, orderBy, deleteDoc, doc } from 'firebase/firestore'; // Import deleteDoc & doc
import { db } from '../lib/firebase';
import { LogOut, User, MapPin, Calendar, Settings, Loader2, Trash2, AlertTriangle } from 'lucide-react'; // Import Trash2

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  
  // Profile State
  const [displayName, setDisplayName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [updateMsg, setUpdateMsg] = useState('');

  // 1. Protect the Route
  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
    } else {
      setDisplayName(currentUser.displayName || '');
      fetchBookings();
    }
  }, [currentUser, router]);

  // 2. Fetch User's Bookings
  const fetchBookings = async () => {
    if (!currentUser) return;
    try {
      const q = query(
        collection(db, 'bookings'),
        where('userId', '==', currentUser.uid),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const userBookings = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBookings(userBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoadingBookings(false);
    }
  };

  // 3. NEW: Cancel Booking Function
  const handleCancelBooking = async (bookingId) => {
    // Simple browser confirmation
    const isConfirmed = window.confirm("Are you sure you want to cancel this trip? This action cannot be undone.");
    
    if (!isConfirmed) return;

    try {
      // Delete from Firestore
      await deleteDoc(doc(db, 'bookings', bookingId));
      
      // Update local state (remove from list immediately)
      setBookings(prevBookings => prevBookings.filter(b => b.id !== bookingId));
      
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Failed to cancel booking. Please try again.");
    }
  };

  // 4. Update Profile Function
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(currentUser, { displayName: displayName });
      setUpdateMsg('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setUpdateMsg(''), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setUpdateMsg('Failed to update profile.');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center text-white text-2xl font-bold shadow-md">
              {currentUser.email?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Hello, {currentUser.displayName || 'Traveler'}!
              </h1>
              <p className="text-slate-500">{currentUser.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Sign Out
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`w-full flex items-center px-6 py-4 text-left transition-colors ${
                  activeTab === 'bookings' ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Calendar className="h-5 w-5 mr-3" />
                My Bookings
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center px-6 py-4 text-left transition-colors ${
                  activeTab === 'profile' ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Settings className="h-5 w-5 mr-3" />
                Profile Settings
              </button>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            
            {/* --- MY BOOKINGS TAB --- */}
            {activeTab === 'bookings' && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 min-h-[400px] p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-6">My Upcoming Trips</h2>
                
                {loadingBookings ? (
                  <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                  </div>
                ) : bookings.length > 0 ? (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="border border-slate-200 rounded-lg p-5 hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between gap-4 bg-white">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-slate-900">{booking.packageTitle}</h3>
                          
                          <div className="flex items-center text-slate-500 text-sm mt-2">
                            <MapPin className="h-4 w-4 mr-1 text-blue-500" /> {booking.location || 'Global Destination'}
                          </div>
                          
                          <div className="flex items-center text-slate-500 text-sm mt-1">
                             <Calendar className="h-4 w-4 mr-1 text-blue-500" /> 
                             Booked for: {booking.date ? new Date(booking.date).toLocaleDateString() : 'Date pending'}
                          </div>

                          <div className="mt-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {booking.status || 'Confirmed'}
                          </div>
                        </div>

                        <div className="flex flex-col justify-between items-end">
                          <div className="text-right mb-4 md:mb-0">
                            <p className="text-xs text-slate-400 uppercase font-semibold">Total Price</p>
                            <p className="text-xl font-bold text-blue-600">${booking.totalPrice?.toLocaleString() || 0}</p>
                            <p className="text-xs text-slate-400">{booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}</p>
                          </div>
                          
                          <button 
                            onClick={() => handleCancelBooking(booking.id)}
                            className="flex items-center text-sm text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Cancel Trip
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="h-8 w-8 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900">No bookings yet</h3>
                    <p className="text-slate-500 mb-6">You haven't planned any trips yet.</p>
                    <button onClick={() => router.push('/destinations')} className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors">
                      Explore Destinations
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* --- PROFILE TAB --- */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 min-h-[400px] p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Account Settings</h2>
                
                {updateMsg && (
                  <div className={`p-4 mb-4 rounded-lg ${updateMsg.includes('Success') ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
                    {updateMsg}
                  </div>
                )}

                <form onSubmit={handleUpdateProfile} className="max-w-md">
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={currentUser.email}
                      disabled
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed"
                    />
                    <p className="text-xs text-slate-400 mt-1">Email cannot be changed.</p>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Display Name
                    </label>
                    <div className="flex gap-4">
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        disabled={!isEditing}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                          isEditing ? 'bg-white border-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    {!isEditing ? (
                      <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="px-6 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                      >
                        Edit Profile
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditing(false);
                            setDisplayName(currentUser.displayName || '');
                          }}
                          className="px-6 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
                        >
                          Save Changes
                        </button>
                      </>
                    )}
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}