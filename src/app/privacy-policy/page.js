'use client';

import React from 'react';
import { ShieldCheck, Lock, Eye, Mail } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#fdfdfd] min-h-screen pt-32 pb-24 font-sans">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-1/3 h-screen bg-blue-50/30 -skew-x-12 transform origin-top-right -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header with Breadcrumb-style title */}
        <div className="mb-12">
          <p className="text-blue-600 font-bold uppercase tracking-[0.3em] text-xs mb-4">Legal & Privacy</p>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight">
            Privacy <span className="text-blue-600">Policy.</span>
          </h1>
        </div>

        <div className="space-y-16">
          {/* Introduction */}
          <section className="relative">
            <div className="absolute -left-6 top-0 bottom-0 w-1 bg-orange-500 rounded-full" />
            <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-medium">
              GLOBETRAIL TRAVELS respects your privacy and is committed to protecting your personal information. 
            </p>
          </section>

          {/* Grid Layout for Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Info Collection */}
            <div className="bg-white p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-50">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Eye size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Information We Collect</h2>
              <ul className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="text-blue-500 font-bold">•</span> 
                  Name, contact details, and travel preferences. 
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 font-bold">•</span> 
                  Information submitted via forms or inquiries. 
                </li>
              </ul>
            </div>

            {/* Usage */}
            <div className="bg-white p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-50">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">How We Use It</h2>
              <ul className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="text-orange-500 font-bold">•</span> 
                  To process bookings and inquiries. 
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-500 font-bold">•</span> 
                  To communicate travel updates and offers. 
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-500 font-bold">•</span> 
                  To improve our services and experience. 
                </li>
              </ul>
            </div>
          </div>

          {/* Data Protection Full Width */}
          <section className="bg-slate-900 text-white p-12 rounded-[3rem] relative overflow-hidden">
            <Lock className="absolute -right-8 -bottom-8 w-48 h-48 text-white/5 -rotate-12" />
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl font-bold mb-4">Data Protection</h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                We implement reasonable security measures to protect your data. However, no method of transmission is 100% secure. 
              </p>
            </div>
          </section>

          {/* Contact Footer */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-slate-100">
            <p className="text-slate-500 font-medium">For privacy concerns, reach out to our support team.</p>
            <a href="mailto:info@globetrail.in" className="flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
              <Mail size={20} />
              info@globetrail.in 
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}