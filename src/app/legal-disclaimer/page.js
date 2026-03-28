'use client';

import React from 'react';
import { Info, ExternalLink, ShieldAlert } from 'lucide-react';

export default function LegalDisclaimer() {
  return (
    <div className="bg-[#0f172a] min-h-screen pt-32 pb-24 font-sans text-slate-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-20">
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8">
            Disclaimer<span className="text-blue-500">.</span>
          </h1>
          <div className="h-1 w-32 bg-blue-500 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="space-y-4">
            <h3 className="text-blue-400 font-bold uppercase tracking-widest text-sm">Usage</h3>
            <p className="text-lg leading-relaxed">
              This website is intended for informational and booking purposes only. You agree not to misuse the website or attempt unauthorized access.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-blue-400 font-bold uppercase tracking-widest text-sm">Accuracy</h3>
            <p className="text-lg leading-relaxed">
              While we strive for accuracy, we do not guarantee that all content is error-free or up to date. 
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-blue-400 font-bold uppercase tracking-widest text-sm">Links</h3>
            <p className="text-lg leading-relaxed">
              We may link to third-party websites.  We are not responsible for their content or policies. 
            </p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 p-12 rounded-[3rem] backdrop-blur-sm">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-20 h-20 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
              <ShieldAlert size={40} />
            </div>
            <p className="text-xl leading-relaxed text-slate-400">
              <span className="text-white font-bold block mb-2">Legal Disclaimer:</span>
              This is a general template for informational purposes only and does not constitute legal advice. Please consult a qualified attorney before publishing. 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}