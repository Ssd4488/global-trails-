'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle, 
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin,
  Send
} from 'lucide-react';

export default function ContactPage() {
  // Added 'phone' to the state
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', destination: '', message: ''
  });
  const [status, setStatus] = useState('idle'); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Find out WHICH button the user clicked
    const actionMethod = e.nativeEvent.submitter.value; 
    setStatus('loading');

    // 1. OPEN WHATSAPP IMMEDIATELY
    if (actionMethod === 'whatsapp') {
      const myWhatsAppNumber = "919606987605"; 
      
      // 👇 NEW: Added Email to the WhatsApp message template 👇
      const whatsappText = `Hi GlobeTrails! I just filled out the website form.%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Interested in:* ${formData.destination || 'A trip'}%0A*Message:* ${formData.message}`;
      
      window.open(`https://wa.me/${myWhatsAppNumber}?text=${whatsappText}`, '_blank');
    }

    try {
      // 2. Send the email backup in the background
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, method: actionMethod }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', destination: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        if (actionMethod === 'email') setStatus('error');
      }
    } catch (error) {
      if (actionMethod === 'email') setStatus('error');
    }
  };

  const contactMethods = [
    {
      label: "Email Us",
      value: "info@globetrail.in", 
      icon: <Mail className="w-6 h-6" />,
      link: "mailto:info@globetrail.in",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      label: "Call Us",
      value: "+91-9606987605", 
      icon: <Phone className="w-6 h-6" />,
      link: "tel:+919606987605",
      bgColor: "bg-green-50",
      textColor: "text-green-600"
    },
    {
      label: "WhatsApp",
      value: "+91-9606987605", 
      icon: <MessageCircle className="w-6 h-6" />,
      link: "https://wa.me/919606987605",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600"
    }
  ];

  const socialLinks = [
    { name: "Instagram", icon: <Instagram className="w-6 h-6" />, link: "#" },
    { name: "Facebook", icon: <Facebook className="w-6 h-6" />, link: "#" },
    { name: "Twitter", icon: <Twitter className="w-6 h-6" />, link: "#" },
    { name: "LinkedIn", icon: <Linkedin className="w-6 h-6" />, link: "#" }
  ];

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen font-sans pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header Section --- */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight">
            Get in <span className="text-blue-600">Touch.</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed border-l-4 border-orange-500 pl-6">
            "At GLOBETRAIL TRAVELS, we believe travel is more than just visiting new places — it’s about creating stories that stay with you for a lifetime." 
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* --- Left Column: Contact Methods & Socials --- */}
          <div className="lg:col-span-5 space-y-8">
            <div className="grid grid-cols-1 gap-4">
              {contactMethods.map((method, index) => (
                <a 
                  key={index}
                  href={method.link}
                  className="flex items-center gap-6 p-6 bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 hover:border-blue-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className={`${method.bgColor} ${method.textColor} p-4 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300`}>
                    {method.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{method.label}</p>
                    <p className="text-slate-900 font-bold text-lg">{method.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="p-8 bg-slate-900 rounded-3xl text-white shadow-2xl relative overflow-hidden">
               <MapPin className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5 rotate-12" />
               <h3 className="text-xs font-bold text-orange-400 uppercase tracking-[0.2em] mb-4">Our Head Office</h3>
               <p className="text-lg font-medium leading-relaxed relative z-10">
                 Second Floor.951, 24th Main Road, R. K Colony, Marenahalli, 2nd Phase, J.P.Nagar, Bengaluru 
               </p>
            </div>

            <div className="pt-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">Follow Our Journey</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.link}
                    className="w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#ff7f32] hover:border-[#ff7f32] hover:shadow-lg transition-all transform hover:scale-110"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* --- Right Column: Inquiry Form --- */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-50 relative">
            <h3 className="text-3xl font-bold text-slate-900 mb-2">Send an Inquiry</h3>
            <p className="text-slate-500 mb-8 italic">Tell us about the story you want to create... </p>
            
            {status === 'success' && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 border border-green-200 rounded-xl font-bold text-sm">
                Message sent successfully! We will be in touch shortly.
              </div>
            )}
            {status === 'error' && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl font-bold text-sm">
                Oops, something went wrong. Please try again or use the WhatsApp button on the left.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-900 uppercase ml-1">Your Name</label>
                  <input 
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text" 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all placeholder:text-slate-300 outline-none"
                    placeholder="E.g. Sahana Mutalik" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-900 uppercase ml-1">Email Address</label>
                  <input 
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email" 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all placeholder:text-slate-300 outline-none"
                    placeholder="info@globetrail.in" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-900 uppercase ml-1">Phone Number</label>
                  <input 
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="tel" 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all placeholder:text-slate-300 outline-none"
                    placeholder="+91 98765 43210" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-900 uppercase ml-1">Destination</label>
                  <input 
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    type="text" 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all placeholder:text-slate-300 outline-none"
                    placeholder="Where do you want to go?" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-900 uppercase ml-1">Message</label>
                <textarea 
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 text-slate-900 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all resize-none placeholder:text-slate-500 outline-none"
                  placeholder="Tell us about your travel dreams..."
                ></textarea>
              </div>

              {/* Two Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <button 
                  type="submit"
                  name="action"
                  value="whatsapp"   
                  disabled={status === 'loading'}
                  className="flex items-center justify-center gap-3 w-full py-5 bg-[#25D366] text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-[#1ebd5a] hover:shadow-xl hover:shadow-green-600/30 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <MessageCircle size={20} />
                  Chat on WhatsApp
                </button>

                <button 
                  type="submit"
                  name="action"
                  value="email"
                  disabled={status === 'loading'}
                  className="flex items-center justify-center gap-3 w-full py-5 bg-slate-900 text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-600/30 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                  Send Email Only
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}