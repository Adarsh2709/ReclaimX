'use client';

import React from 'react';
import { BookOpen, AlertCircle, FileText, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="flex-grow bg-dark-950 text-dark-100 font-sans min-h-[calc(100vh-64px)] relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      {/* Background glow */}
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-primary-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-3xl mx-auto space-y-10 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 border-b border-dark-800 pb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-500/10 text-primary-500 border border-primary-500/20">
            <BookOpen className="h-6 w-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-outfit text-white tracking-tight">Terms of Service</h1>
          <p className="text-sm text-dark-400 font-light max-w-lg mx-auto leading-relaxed">
            By accessing ReclaimX, you agree to coordinate and recycle materials under safe, legal, and audited conditions.
          </p>
        </div>

        {/* Content sections */}
        <div className="space-y-8">
          {/* Section 1: User Representation */}
          <div className="glass-panel p-6 rounded-2xl border-dark-800/80 hover:border-primary-500/15 transition-colors flex items-start gap-4">
            <div className="p-3 bg-primary-500/10 text-primary-400 rounded-xl border border-primary-500/20 flex-shrink-0">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold font-outfit text-white text-lg">1. Ownership & Disposal Authorization</h3>
              <p className="text-xs text-dark-400 leading-relaxed font-light">
                By scheduling a pickup, you verify that you are the lawful owner of the scheduled hardware, or possess explicit authorization from your organization to dispose of and recycle the devices. ReclaimX is not liable for device title disputes.
              </p>
            </div>
          </div>

          {/* Section 2: Acceptable Material types */}
          <div className="glass-panel p-6 rounded-2xl border-dark-800/80 hover:border-primary-500/15 transition-colors flex items-start gap-4">
            <div className="p-3 bg-yellow-500/10 text-yellow-400 rounded-xl border border-yellow-500/20 flex-shrink-0">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold font-outfit text-white text-lg">2. Acceptable Material Thresholds</h3>
              <p className="text-xs text-dark-400 leading-relaxed font-light">
                We accept screens, IT hardware, batteries, lighting, and household appliances. We **do not accept** hazardous industrial liquids, biological waste, active household chemical agents, or uncontained radioactive devices. Recycling plants reserve the right to decline contaminated loads.
              </p>
            </div>
          </div>

          {/* Section 3: Recycler compliance */}
          <div className="glass-panel p-6 rounded-2xl border-dark-800/80 hover:border-primary-500/15 transition-colors flex items-start gap-4">
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20 flex-shrink-0">
              <FileText className="h-6 w-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold font-outfit text-white text-lg">3. Recycler Compliance Audits</h3>
              <p className="text-xs text-dark-400 leading-relaxed font-light">
                Partner recycling plants must be EPA and state-certified facilities. Upon accepting a pickup job, the plant commits to process, strip, and recycle elements in alignment with clean environmental guidelines, providing digital carbon offset reports upon treatment completion.
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
