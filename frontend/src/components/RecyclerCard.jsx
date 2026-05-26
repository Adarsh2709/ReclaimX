'use client';

import React from 'react';
import { ShieldCheck, Phone, Map, Recycle } from 'lucide-react';

export default function RecyclerCard({ recycler }) {
  const { id, companyName, contact, serviceArea } = recycler;

  return (
    <div className="glass-card p-6 border-dark-800 hover:border-primary-500/20 transition-all duration-300 font-sans group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary-500/10 text-primary-500 flex items-center justify-center border border-primary-500/20 group-hover:bg-primary-500/20 transition-all duration-300">
            <Recycle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-dark-100 font-outfit leading-tight group-hover:text-primary-400 transition-colors">
              {companyName}
            </h3>
            <span className="text-[10px] text-primary-500 font-bold uppercase tracking-wider">Facility ID #{id}</span>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 rounded-md uppercase tracking-wider">
          <ShieldCheck className="h-3 w-3" />
          Certified
        </span>
      </div>

      <div className="space-y-2.5 text-xs text-dark-300 border-t border-dark-800/60 pt-3">
        <div className="flex items-center gap-2">
          <Phone className="h-3.5 w-3.5 text-dark-500" />
          <span>Contact: <strong className="text-dark-100">{contact}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <Map className="h-3.5 w-3.5 text-dark-500" />
          <span>Area: <strong className="text-dark-100">{serviceArea}</strong></span>
        </div>
      </div>

      {/* Mock details for premium aesthetic */}
      <div className="mt-4 pt-3 border-t border-dark-800/40 grid grid-cols-2 gap-2 text-center text-[10px]">
        <div className="bg-dark-950/50 p-2 rounded-xl border border-dark-800">
          <p className="text-dark-500 font-medium">Processed</p>
          <p className="text-xs font-bold text-dark-200 mt-0.5">1,240 kg</p>
        </div>
        <div className="bg-dark-950/50 p-2 rounded-xl border border-dark-800">
          <p className="text-dark-500 font-medium">Eco Rating</p>
          <p className="text-xs font-bold text-yellow-500 mt-0.5">★ 4.9</p>
        </div>
      </div>
    </div>
  );
}
