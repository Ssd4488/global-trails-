'use client'; // This directive is necessary for using hooks like useState

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
              GlobeTrails
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link href="/destinations" className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Destinations</Link>
              <Link href="/about" className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">About Us</Link>
              <Link href="/contact" className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
            </div>
          </div>
          <div className="hidden md:block">
             <button className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300">
                Sign In
             </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon for menu open/close */}
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link href="/destinations" className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Destinations</Link>
            <Link href="/about" className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">About Us</Link>
            <Link href="/contact" className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Contact</Link>
            <button className="w-full text-left bg-blue-600 text-white font-semibold mt-2 px-3 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300">
                Sign In
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}