'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // --- HYDRATION FIX ---
  const [isMounted, setIsMounted] = useState(false);
  
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
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
  }, []); 

  const isActive = (path) => pathname === path;

  const navLinkHoverClass = `relative text-[17px] font-medium px-3 py-3 transition-all duration-300 group transform hover:-translate-y-0.5 after:absolute after:bottom-2 after:left-0 after:h-[2px] after:w-full after:origin-center after:scale-x-0 after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100`;

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

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out font-sans backdrop-blur-md ${navClasses}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">


<div className="flex items-center gap-3">
  {/* Your new logo! */}
<Image 
    src="/logo.jpeg" 
    alt="Globe Trail Logo" 
    width={80} 
    height={80} 
    className="object-contain rounded-md" // Added rounded-md for slightly soft corners, remove if you want razor-sharp edges!
  />
  
          {/* --- Logo (Left Side) --- */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <span className={`font-extrabold tracking-tight transition-all duration-500 ${logoClasses}`}>
                Globe Trail Travels  <span className={logoDotClasses}>.</span>
              </span>
            </Link>
            </div>
</div>

          

          {/* --- Desktop Navigation (Right Side) --- */}
          <div className="hidden md:flex items-center space-x-1 ml-auto">
            <div className="flex items-center space-x-6 h-full">
              <Link href="/" className={linkClasses('/')}>Home</Link>
              <Link href="/destinations" className={linkClasses('/destinations')}>Destinations</Link>
              <Link href="/about" className={linkClasses('/about')}>About Us</Link>
              <Link href="/contact" className={linkClasses('/contact')}>Contact</Link>
            </div>
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
        </div>
      </div>
    </nav>
  );
}