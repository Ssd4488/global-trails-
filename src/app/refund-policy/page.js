'use client';

import React from 'react';
import { RefreshCcw, CheckCircle, Clock } from 'lucide-react';

export default function RefundPolicy() {
  return (
    <div className="bg-[#fdfdfd] min-h-screen pt-32 pb-24 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 text-blue-600 rounded-full mb-6">
            <RefreshCcw size={40} />
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">Refund Policy</h1>
          <p className="text-xl text-slate-500 italic">"Transparency in every transaction."</p>
        </div>

        <div className="bg-white rounded-[3rem] shadow-2xl shadow-blue-900/5 border border-slate-50 overflow-hidden">
          <div className="p-10 md:p-16 space-y-12">
            <section className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
                <CheckCircle size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">Eligibility</h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Refunds are subject to the terms of the specific travel package booked. Requests must be made within the designated window of cancellation. 
                </p>
              </div>
            </section>

            <section className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-orange-500 text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/20">
                <Clock size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">Processing</h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Approved refunds will be processed using the original payment method.  GLOBETRAIL TRAVELS reserves the right to deduct applicable service or cancellation fees.
                </p>
              </div>
            </section>
          </div>
          
          <div className="bg-slate-50 p-8 text-center text-slate-400 text-sm border-t border-slate-100">
            Certain bookings may be non-refundable due to supplier policies. 
          </div>
        </div>
      </div>
    </div>
  );
}