'use client';

import React from 'react';
import { ShieldCheck, Phone, Map, Recycle } from 'lucide-react';

export default function RecyclerCard({ recycler }) {
  const { id, companyName, contact, serviceArea } = recycler;

  return (
    <div className="glass-card p-6 border border-green-100 hover:border-primary-500/35 hover:shadow-xl hover:shadow-green-950/5 transition-all duration-300 font-sans group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary-500/10 text-primary-500 flex items-center justify-center border border-primary-500/20 group-hover:bg-primary-500/20 transition-all duration-300">
            <Recycle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 font-outfit leading-tight group-hover:text-primary-600 transition-colors">
              {companyName}
            </h3>
            <span className="text-[10px] text-primary-600 font-bold uppercase tracking-wider">Facility ID #{id}</span>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-250 px-2 py-0.5 rounded-md uppercase tracking-wider">
          <ShieldCheck className="h-3 w-3" />
          Certified
        </span>
      </div>

      <div className="space-y-2.5 text-xs text-slate-600 border-t border-green-100/50 pt-3">
        <div className="flex items-center gap-2">
          <Phone className="h-3.5 w-3.5 text-slate-400" />
          <span>Contact: <strong className="text-slate-700 font-semibold">{contact}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <Map className="h-3.5 w-3.5 text-slate-400" />
          <span>Area: <strong className="text-slate-700 font-semibold">{serviceArea}</strong></span>
        </div>
      </div>

      {/* Mock details for premium aesthetic */}
      <div className="mt-4 pt-3 border-t border-green-100/40 grid grid-cols-2 gap-2 text-center text-[10px]">
        <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
          <p className="text-slate-450 font-medium">Processed</p>
          <p className="text-xs font-bold text-slate-750 mt-0.5">1,240 kg</p>
        </div>
        <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
          <p className="text-slate-450 font-medium">Eco Rating</p>
          <p className="text-xs font-bold text-amber-500 mt-0.5">★ 4.9</p>
        </div>
      </div>
    </div>
  );
}
