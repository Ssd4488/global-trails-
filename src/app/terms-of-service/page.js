'use client';

import React from 'react';
import { FileText, UserCheck, CreditCard, AlertTriangle } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="bg-[#fdfdfd] min-h-screen pt-32 pb-24 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-16">
          <p className="text-orange-600 font-bold uppercase tracking-[0.3em] text-xs mb-4">User Agreement</p>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight">
            Terms of <span className="text-orange-600">Service.</span>
          </h1>
          <p className="mt-8 text-xl text-slate-600 max-w-3xl leading-relaxed">
            These Terms of Service govern your use of the GLOBETRAIL TRAVELS website and services.  By accessing or using our website, you agree to comply with these terms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Services */}
          <div className="group bg-white p-8 rounded-3xl border border-slate-100 hover:border-blue-500 transition-all duration-300">
            <FileText className="text-blue-600 mb-6" size={32} />
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Services</h2>
            <p className="text-slate-600 leading-relaxed">
              GLOBETRAIL TRAVELS provides tour planning, travel bookings, and related travel services. All services are subject to availability and confirmation. 
            </p>
          </div>

          {/* Responsibilities */}
          <div className="group bg-white p-8 rounded-3xl border border-slate-100 hover:border-blue-500 transition-all duration-300">
            <UserCheck className="text-blue-600 mb-6" size={32} />
            <h2 className="text-2xl font-bold text-slate-900 mb-4">User Responsibilities</h2>
            <p className="text-slate-600 leading-relaxed">
              You agree to provide accurate information during inquiries and bookings. You are responsible for ensuring travel documents and compliance with laws. 
            </p>
          </div>

          {/* Payments */}
          <div className="group bg-white p-8 rounded-3xl border border-slate-100 hover:border-blue-500 transition-all duration-300">
            <CreditCard className="text-blue-600 mb-6" size={32} />
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Payments</h2>
            <p className="text-slate-600 leading-relaxed">
              All prices are subject to change.  Payments must be completed as per the agreed booking terms. 
            </p>
          </div>

          {/* Liability */}
          <div className="group bg-white p-8 rounded-3xl border border-slate-100 hover:border-orange-500 transition-all duration-300">
            <AlertTriangle className="text-orange-600 mb-6" size={32} />
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Liability</h2>
            <p className="text-slate-600 leading-relaxed">
              We are not responsible for delays, cancellations, or losses caused by third-party service providers or natural events. 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}