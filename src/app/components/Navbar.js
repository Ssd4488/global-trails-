'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  
  // --- HYDRATION FIX ---
  // This state ensures we don't apply scroll logic until the client has mounted.
  const [isMounted, setIsMounted] = useState(false);
  // ---------------------
  
  const pathname = usePathname();

  useEffect(() => {
    // --- HYDRATION FIX ---
    // Now that we are on the client, set mounted to true
    setIsMounted(true);
    // ---------------------

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Empty dependency array is correct

  const isActive = (path) => pathname === path;

  const destinationCategories = [
    { name: 'Beach Escapes', icon: '🌊', href: '/destinations?experience=Beach' },
    { name: 'Mountain Treks', icon: '🏔️', href: '/destinations?experience=Mountain' },
    { name: 'City Breaks', icon: '🏙️', href: '/destinations?experience=City+Break' },
    { name: 'Cultural Journeys', icon: '🏛️', href: '/destinations?experience=Cultural' },
    { name: 'Honeymoon Specials', icon: '💍', href: '/destinations?mood=Romantic' },
    { name: 'Solo Adventures', icon: '🎒', href: '/destinations?mood=Solo+Adventure' },
  ];

  // --- HYDRATION FIX ---
  // Fixed multi-line string that can cause errors. This must be one line.
  const navLinkHoverClass = `relative text-[17px] font-medium px-3 py-3 transition-all duration-300 group transform hover:-translate-y-0.5 after:absolute after:bottom-2 after:left-0 after:h-[2px] after:w-full after:origin-center after:scale-x-0 after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100`;
  // ---------------------

  // --- HYDRATION FIX ---
  // We only apply the 'scrolled' classes IF isMounted is true.
  // Otherwise, we *always* render the default state, matching the server.
  const navClasses = isMounted && isScrolled
    ? 'bg-blue-600/95 text-white shadow-lg py-3'
    : 'bg-white/90 text-gray-800 shadow-sm py-5';

  const logoClasses = isMounted && isScrolled
    ? 'text-white text-2xl'
    : 'text-blue-900 text-3xl';
    
  const logoDotClasses = isMounted && isScrolled ? 'text-blue-200' : 'text-orange-500';

  const linkClasses = (path) => {
    const active = (path === '/destinations') ? pathname?.startsWith('/destinations') : isActive(path);
    const base = isMounted && isScrolled
      ? 'text-blue-100 group-hover:text-white after:bg-white'
      : 'text-gray-600 group-hover:text-blue-600 after:bg-blue-600';
    const activeState = active ? 'font-bold after:scale-x-100' : 'after:scale-x-0';
    return `${navLinkHoverClass} ${base} ${activeState}`;
  };
  
  const mobileHamburgerClasses = isMounted && isScrolled ? 'text-white' : 'text-gray-800';
  // --- END HYDRATION FIX ---

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out font-sans backdrop-blur-md ${navClasses}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* --- Logo --- */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <span className={`font-extrabold tracking-tight transition-all duration-500 ${logoClasses}`}>
                GlobeTrails<span className={logoDotClasses}>.</span>
              </span>
            </Link>
          </div>

          {/* --- Desktop Navigation --- */}
          <div className="hidden md:flex items-center space-x-1">
            <div className="flex items-center space-x-6 mr-8 h-full">
              <Link href="/" className={linkClasses('/')}>Home</Link>

              {/* === MEGA MENU WRAPPER === */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => setIsMegaMenuOpen(true)}
                onMouseLeave={() => setIsMegaMenuOpen(false)}
              >
                 <Link href="/destinations" className={`${linkClasses('/destinations')} flex items-center gap-1`}>
                  Destinations
                  <svg className={`w-4 h-4 transition-transform duration-300 ${isMegaMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </Link>

                {/* === THE MEGA MENU === */}
                <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 pt-6 w-[600px] transition-all duration-300 origin-top
                    ${isMegaMenuOpen ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'}`}
                >
                    <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 grid grid-cols-3 gap-6 overflow-hidden">
                        <div className="col-span-2 space-y-4">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Explore by Interest</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {destinationCategories.map((cat) => (
                                    <Link
                                        key={cat.name}
                                        href={cat.href}
                                        onClick={() => setIsMegaMenuOpen(false)}
                                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                                    >
                                        <span className="text-2xl">{cat.icon}</span>
                                        <span className="text-gray-700 font-medium group-hover:text-blue-600">{cat.name}</span>
                                    </Link>
                                ))}
                            </div>
                             <Link href="/destinations" onClick={() => setIsMegaMenuOpen(false)} className="block mt-4 text-center text-blue-600 font-semibold hover:underline">
                                View All Packages &rarr;
                            </Link>
                        </div>
                        <div className="relative h-full min-h-[250px] rounded-xl overflow-hidden group">
                             <Image
                                src="https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2070&auto=format&fit=crop"
                                alt="Featured Destination"
                                layout="fill"
                                objectFit="cover"
                                className="transition-transform duration-700 group-hover:scale-110"
                             />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                                 <div className="text-white">
                                     <p className="text-xs font-bold text-orange-400 uppercase mb-1">Trending Now</p>
                                     <p className="font-bold text-lg leading-tight">Experience Cherry Blossoms in Japan</p>
                                 </div>
                             </div>
                        </div>
                    </div>
                </div>
                {/* === END MEGA MENU === */}
              </div>

              <Link href="/about" className={linkClasses('/about')}>About Us</Link>
              <Link href="/contact" className={linkClasses('/contact')}>Contact</Link>
            </div>

            {/* === AUTH LOGIC === */}
            <div className="flex items-center gap-4">
              {!isLoggedIn ? (
                // --- LOGGED-OUT STATE ---
                <>
                  <button className={`${linkClasses('/login')} ${isMounted && isScrolled ? 'text-blue-100' : 'text-gray-600'}`}>
                    Log In
                  </button>
                  <button className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5
                      ${isMounted && isScrolled
                        ? 'bg-white text-blue-600 hover:bg-gray-100'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`
                  }>
                    Get Started
                  </button>
                </>
              ) : (
                // --- LOGGED-IN STATE ---
                <>
                  <Link
                    href="/my-bookings"
                    className={linkClasses('/my-bookings')}
                  >
                    My Bookings
                  </Link>
                  <button className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110
                    ${isMounted && isScrolled ? 'bg-white/20 hover:bg-white/30' : 'bg-gray-100 hover:bg-gray-200'}`
                  }>
                    <svg className={`w-6 h-6 ${isMounted && isScrolled ? 'text-white' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  </button>
                </>
              )}
            </div>
            {/* === END AUTH LOGIC === */}

          </div>

          {/* --- Mobile Menu Hamburger --- */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 transition-colors duration-300 ${mobileHamburgerClasses}`}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* --- Mobile Menu Drawer --- */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-xl transition-all duration-300 ease-in-out overflow-hidden
          ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`
      }>
        <div className="px-6 py-8 space-y-4 flex flex-col border-t border-gray-100">
          <Link href="/" onClick={() => setIsOpen(false)} className={`text-xl font-medium py-3 px-4 rounded-xl transition-all ${isActive('/') ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}>Home</Link>
          <Link href="/destinations" onClick={() => setIsOpen(false)} className={`text-xl font-medium py-3 px-4 rounded-xl transition-all ${isActive('/destinations') ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}>Destinations</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className={`text-xl font-medium py-3 px-4 rounded-xl transition-all ${isActive('/about') ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}>About Us</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className={`text-xl font-medium py-3 px-4 rounded-xl transition-all ${isActive('/contact') ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}>Contact</Link>

          {/* Mobile Auth */}
          <div className="pt-6 flex flex-col gap-3">
             {!isLoggedIn ? (
              <>
                <button className="w-full py-3 text-lg font-semibold text-gray-600 border-2 border-gray-200 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all">
                    Log In
                </button>
                <button className="w-full py-3 text-lg font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-md transition-all">
                    Get Started
                </button>
              </>
             ) : (
              <>
                <Link href="/my-bookings" onClick={() => setIsOpen(false)} className="w-full text-center py-3 text-lg font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-md transition-all">
                    My Bookings
                </Link>
                <button className="w-full py-3 text-lg font-semibold text-gray-600 border-2 border-gray-200 rounded-xl hover:border-gray-600 hover:text-black transition-all">
                    Log Out
                </button>
              </>
             )}
          </div>
        </div>
      </div>
    </nav>
  );
}