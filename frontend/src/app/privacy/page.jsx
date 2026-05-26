'use client';

import React from 'react';
import { ShieldCheck, EyeOff, ClipboardList, Lock } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="flex-grow bg-dark-950 text-dark-100 font-sans min-h-[calc(100vh-64px)] relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-3xl mx-auto space-y-10 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 border-b border-dark-800 pb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-500/10 text-primary-500 border border-primary-500/20">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-outfit text-white tracking-tight">Privacy & Data Security Policy</h1>
          <p className="text-sm text-dark-400 font-light max-w-lg mx-auto leading-relaxed">
            Your trust is our greatest asset. Learn how ReclaimX protects your personal details and wipes your media devices securely.
          </p>
        </div>

        {/* Content sections */}
        <div className="space-y-8">
          {/* Rule 1: Data sanitation */}
          <div className="glass-panel p-6 rounded-2xl border-dark-800/80 hover:border-primary-500/15 transition-colors flex items-start gap-4">
            <div className="p-3 bg-primary-500/10 text-primary-400 rounded-xl border border-primary-500/20 flex-shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold font-outfit text-white text-lg">NIST 800-88 Data Destruction</h3>
              <p className="text-xs text-dark-400 leading-relaxed font-light">
                All media storage electronics (hard drives, flash disks, tablets, laptops) accepted by our certified processing facilities undergo absolute hardware sanitation using strict **NIST SP 800-88 standards**. Your old files are completely irrecoverable before recycling.
              </p>
            </div>
          </div>

          {/* Rule 2: Zero Data Resale */}
          <div className="glass-panel p-6 rounded-2xl border-dark-800/80 hover:border-primary-500/15 transition-colors flex items-start gap-4">
            <div className="p-3 bg-teal-500/10 text-teal-400 rounded-xl border border-teal-500/20 flex-shrink-0">
              <EyeOff className="h-6 w-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold font-outfit text-white text-lg">Zero Data Resale Promise</h3>
              <p className="text-xs text-dark-400 leading-relaxed font-light">
                ReclaimX is built to fund environment restoration, not data brokers. We **never sell** your name, contact numbers, email addresses, or coordinates. Any profiling data is strictly used for routing dispatches and carbon offset certificates.
              </p>
            </div>
          </div>

          {/* Rule 3: Chain of Custody */}
          <div className="glass-panel p-6 rounded-2xl border-dark-800/80 hover:border-primary-500/15 transition-colors flex items-start gap-4">
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20 flex-shrink-0">
              <ClipboardList className="h-6 w-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold font-outfit text-white text-lg">Transparent Chain of Custody</h3>
              <p className="text-xs text-dark-400 leading-relaxed font-light">
                Every pickup is logged with encrypted GPS stamps and temporal coordinates. The recycler assigned is audited by our platform to ensure secure transport and immediate smelting or component separation compliance.
              </p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="text-center pt-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center py-2.5 px-6 bg-dark-900 hover:bg-dark-850 text-dark-200 text-xs font-bold rounded-xl border border-dark-800 hover:border-dark-700 transition-all duration-200"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
