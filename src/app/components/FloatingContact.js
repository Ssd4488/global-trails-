'use client';

import React from 'react';
import { MessageCircle, Instagram } from 'lucide-react';

export default function FloatingContact() {
  // Replace with your actual Instagram handle link
  const instaLink = "https://www.instagram.com/globetrailtravels_pvt_ltd?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="; 
  
  // Your WhatsApp number and the pre-filled generic inquiry message
  const whatsappNumber = "919606987605";
  const whatsappMessage = "Hi GlobeTrails! I am on your website and would like to inquire about planning a trip.";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
<div className="fixed bottom-20 right-6 md:bottom-10 md:right-10 z-[999] flex flex-col gap-4 items-center">
      
      {/* Instagram Button */}
      <a
        href={instaLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow us on Instagram"
        className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-pink-500/40 hover:scale-110 transition-all duration-300"
      >
        <Instagram size={24} className="md:w-7 md:h-7" />
      </a>

      {/* WhatsApp Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-110 transition-all duration-300 relative"
      >
        <MessageCircle size={28} className="md:w-8 md:h-8" />
        {/* Optional: Small online indicator dot */}
        <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-white rounded-full animate-pulse"></span>
      </a>

    </div>
  );
}