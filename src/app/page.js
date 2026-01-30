"use client";

import React, { useState, useEffect } from 'react';
// Importing your verified local firebase configuration
import { db, auth } from './lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { 
  MapPin, 
  Globe, 
  ShieldCheck, 
  Clock, 
  Star,
  Navigation,
  Loader2,
  ChevronRight,
  Quote,
  Compass,
  Package
} from 'lucide-react';

/**
 * Public Homepage - Globe Trail India
 * FIX: Now using the specific 'artifacts' path to sync with your Admin Dashboard.
 */
export default function App() {
  const [user, setUser] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  // This ID must match the one in your Admin Dashboard for the data to link up
  const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

  // --- 1. Authentication Lifecycle ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        signInAnonymously(auth).catch((err) => console.warn("Auth check:", err.message));
      }
    });
    return () => unsubscribe();
  }, []);

  // --- 2. Live Data Sync (Matching Admin Path) ---
  useEffect(() => {
    if (!user) return;

    // We point to the EXACT same path used by the Admin Dashboard code
    const destRef = collection(db, 'artifacts', appId, 'public', 'data', 'destinations');
    const packRef = collection(db, 'artifacts', appId, 'public', 'data', 'packages');
    
    // Listen to Destinations
    const unsubDest = onSnapshot(destRef, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDestinations(docs.sort((a, b) => (b.updatedAt?.seconds || 0) - (a.updatedAt?.seconds || 0)));
      setLoading(false);
    }, (err) => console.error("Dest Sync Error:", err));

    // Listen to Packages
    const unsubPack = onSnapshot(packRef, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPackages(docs.sort((a, b) => (b.updatedAt?.seconds || 0) - (a.updatedAt?.seconds || 0)));
    }, (err) => console.error("Pack Sync Error:", err));

    return () => {
      unsubDest();
      unsubPack();
    };
  }, [user, appId]);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      
      {/* HERO SECTION */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <img 
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105 animate-slow-zoom"
          alt="Adventure Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 mb-8">
            <Compass size={16} className="text-blue-400 animate-spin-slow" />
            <span className="text-white text-[10px] font-black uppercase tracking-[0.3em]">India's Premium Travel Gateway</span>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter mb-8 leading-none uppercase">
            Globe <span className="text-blue-500 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Trail.</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Curated journeys designed for the bold. Managed in real-time for your convenience.
          </p>
          
          <button 
            onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-5 rounded-[24px] font-black text-lg transition-all shadow-2xl shadow-blue-900/40 flex items-center justify-center gap-3 group"
          >
            Explore Destinations <Navigation size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* FEATURED DESTINATIONS SECTION */}
      <section id="featured" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <div className="flex items-center gap-2 text-blue-600 mb-4">
              <div className="h-px w-8 bg-blue-600" />
              <span className="text-xs font-black uppercase tracking-[0.4em]">The Explorer List</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 leading-tight uppercase">Featured <br /> Destinations</h2>
          </div>
          <p className="text-slate-500 font-medium text-lg max-w-sm">
            Hand-picked escapes synced live with our command center.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 border-4 border-dashed rounded-[48px] border-slate-100">
            <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
            <p className="font-black text-slate-400 uppercase tracking-widest text-xs">Synchronizing with Hub...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {destinations.length > 0 ? destinations.map(dest => (
              <div key={dest.id} className="group relative bg-white rounded-[56px] overflow-hidden shadow-2xl border border-slate-50 transition-all duration-700 hover:shadow-blue-200/50 hover:-translate-y-4">
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={dest.image || dest.imageUrl || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop'} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                    alt={dest.name} 
                  />
                  <div className="absolute top-6 left-6 bg-blue-600 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">Live Asset</div>
                </div>
                <div className="p-12">
                  <div className="flex items-center gap-2 text-blue-600 mb-4">
                    <MapPin size={16} />
                    <span className="text-xs font-black uppercase tracking-widest text-blue-500/80">Adventure Gate</span>
                  </div>
                  <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter text-slate-800 leading-tight">{dest.name}</h3>
                  <p className="text-slate-500 text-sm line-clamp-3 mb-10 font-medium leading-relaxed">{dest.description}</p>
                  <button className="w-full flex items-center justify-between font-black text-xs uppercase tracking-[0.2em] bg-slate-50 text-slate-900 px-8 py-5 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    Discover More <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )) : (
              <div className="col-span-full py-24 text-center bg-slate-50 rounded-[48px] border-2 border-slate-100">
                <p className="text-slate-400 font-black uppercase tracking-widest mb-2">Syncing with Admin Hub</p>
                <p className="text-slate-300 text-sm">Destinations you add in the dashboard will appear here instantly.</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* TRIP PACKAGES SECTION (If you have data in packages) */}
      {packages.length > 0 && (
        <section className="py-32 px-6 bg-slate-900 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-16">Curated Trip Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {packages.map(pkg => (
                <div key={pkg.id} className="bg-white/5 border border-white/10 rounded-[40px] p-10 flex flex-col md:flex-row gap-8 hover:bg-white/10 transition-all">
                  <div className="w-full md:w-48 h-48 rounded-3xl overflow-hidden shrink-0">
                    <img src={pkg.image || pkg.imageUrl} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-black uppercase tracking-tight">{pkg.name}</h3>
                      <span className="text-blue-400 font-black text-xl">${pkg.price}</span>
                    </div>
                    <p className="text-slate-400 text-sm mb-8 line-clamp-2">{pkg.description}</p>
                    <button className="text-xs font-black uppercase tracking-widest border-b-2 border-blue-500 pb-1 hover:text-blue-400 transition-colors">Book Experience</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TESTIMONIALS */}
      <section className="py-32 bg-slate-50 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative">
          <Quote className="absolute -top-10 -left-10 text-blue-100 -z-0" size={120} />
          <div className="relative z-10">
            <h2 className="text-4xl font-black tracking-tight mb-16 uppercase">The Community Voice</h2>
            <div className="bg-white p-16 rounded-[64px] shadow-sm italic text-2xl text-slate-600 leading-relaxed border border-white">
              "Globe Trail transformed our trip to <span className="text-blue-600 font-bold not-italic">Mulki</span>. The curated experience and the ease of booking made it our best weekend getaway ever!"
              <div className="mt-12 not-italic flex flex-col items-center">
                <div className="h-px w-12 bg-slate-200 mb-6" />
                <p className="font-black text-slate-900 uppercase tracking-[0.3em] text-sm">Rahul Sharma</p>
                <p className="text-blue-600 text-xs font-bold mt-2 uppercase tracking-widest">Adventure Enthusiast</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-24 px-6 text-center border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black tracking-[0.4em] mb-4 text-slate-900 uppercase leading-none">Globe Trail</h2>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.8em] mb-12">Developed by Shreehari Desai</p>
          <div className="flex justify-center items-center gap-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <span>© 2026</span>
            <div className="h-1 w-1 rounded-full bg-slate-300" />
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-slate-600">Sync Active: {appId}</span>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes slow-zoom { from { transform: scale(1); } to { transform: scale(1.1); } }
        .animate-slow-zoom { animation: slow-zoom 40s infinite alternate linear; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
      `}</style>
    </div>
  );
}