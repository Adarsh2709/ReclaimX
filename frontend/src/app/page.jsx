'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { 
  Recycle, 
  ArrowRight, 
  Leaf, 
  ShieldCheck, 
  TrendingUp, 
  Zap, 
  Globe 
} from 'lucide-react';

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <div className="flex-grow bg-dark-950 text-dark-100 font-sans relative overflow-hidden flex flex-col justify-center">
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        <div className="space-y-6 text-center lg:text-left animate-slide-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-bold rounded-full uppercase tracking-wider glow-text">
            <Zap className="h-3 w-3" />
            Empowering Modern E-Waste Disposal
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-outfit text-white tracking-tight leading-tight">
            Reclaim Your Space. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-emerald-600">
              Restore the Planet.
            </span>
          </h1>

          <p className="text-dark-400 text-base sm:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed font-light">
            ReclaimX is an advanced electronic waste scheduling and recycling network. Schedule quick pickups, calculate certified carbon offsets, and join local recycling centers in a global eco-impact campaign.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            {user ? (
              <Link
                href="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 bg-primary-500 hover:bg-primary-600 text-dark-950 font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-primary-500/10"
              >
                Go to Dashboard
                <ArrowRight className="h-4.5 w-4.5" />
              </Link>
            ) : (
              <>
                <Link
                  href="/register"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 bg-primary-500 hover:bg-primary-600 text-dark-950 font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-primary-500/10"
                >
                  Get Started
                  <ArrowRight className="h-4.5 w-4.5" />
                </Link>
                <Link
                  href="/login"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 bg-dark-900 hover:bg-dark-850 text-dark-200 font-semibold rounded-xl border border-dark-800 hover:border-dark-700 transition-all duration-200"
                >
                  Log In
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Hero Vector Graphic */}
        <div className="flex justify-center items-center relative animate-fade-in">
          <div className="absolute w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-pulse-subtle"></div>
          <svg className="w-full max-w-md h-auto drop-shadow-[0_0_35px_rgba(16,185,129,0.15)] animate-float" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Base concentric rings */}
            <circle cx="250" cy="250" r="220" stroke="#1e293b" strokeWidth="2" strokeDasharray="6 6" />
            <circle cx="250" cy="250" r="170" stroke="rgba(16,185,129,0.15)" strokeWidth="1" />
            <circle cx="250" cy="250" r="120" stroke="rgba(16,185,129,0.2)" strokeWidth="2" strokeDasharray="12 12" />

            {/* Glowing active node elements */}
            <g>
              <circle cx="250" cy="250" r="60" fill="url(#grad)" className="glow-primary" />
              <path d="M250 220C233.431 220 220 233.431 220 250C220 266.569 233.431 280 250 280C266.569 280 280 266.569 280 250C280 233.431 266.569 220 250 220Z" fill="rgba(16,185,129,0.1)" />
              <path d="M239 240L247 248L261 234" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </g>

            {/* Orbiting nodes representing User, Recycler, Admin */}
            <g>
              <line x1="250" y1="250" x2="380" y2="150" stroke="rgba(16,185,129,0.3)" strokeWidth="1.5" />
              <circle cx="380" cy="150" r="28" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
              <text x="380" y="154" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">USER</text>
            </g>

            <g>
              <line x1="250" y1="250" x2="110" y2="200" stroke="rgba(16,185,129,0.3)" strokeWidth="1.5" />
              <circle cx="110" cy="200" r="28" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <text x="110" y="204" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">PLANT</text>
            </g>

            <g>
              <line x1="250" y1="250" x2="290" y2="390" stroke="rgba(16,185,129,0.3)" strokeWidth="1.5" />
              <circle cx="290" cy="390" r="28" fill="#1e293b" stroke="#a78bfa" strokeWidth="2" />
              <text x="290" y="394" fill="#a78bfa" fontSize="11" fontWeight="bold" textAnchor="middle">ADMIN</text>
            </g>

            <defs>
              <radialGradient id="grad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(250 250) rotate(90) scale(60)">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#064e3b" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* Global Impact Counter */}
      <section className="bg-dark-900/40 border-t border-b border-dark-800/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <h4 className="text-3xl font-black font-outfit text-white">24/7</h4>
            <p className="text-xs text-dark-500 font-bold uppercase tracking-wider">Platform Availability</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-3xl font-black font-outfit text-primary-400">Role-Based</h4>
            <p className="text-xs text-dark-500 font-bold uppercase tracking-wider">Access Control</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-3xl font-black font-outfit text-white">JWT</h4>
            <p className="text-xs text-dark-500 font-bold uppercase tracking-wider">Secured APIs</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-3xl font-black font-outfit text-primary-400">Real-Time</h4>
            <p className="text-xs text-dark-500 font-bold uppercase tracking-wider">Status Tracking</p>
          </div>
        </div>
      </section>

      {/* How it works features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 space-y-16">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <h2 className="text-3xl font-black font-outfit text-white tracking-tight">Recycle Seamlessly in 3 Steps</h2>
          <p className="text-sm text-dark-400 font-light">
            ReclaimX coordinates disposal securely. Log in, select items, and leave the heavy lifting to our verified partners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="glass-panel p-8 rounded-3xl border-dark-800 hover:border-primary-500/20 hover:bg-dark-900/60 transition-all duration-300 relative group">
            <div className="absolute top-4 right-6 text-5xl font-black text-dark-800/40 font-outfit select-none group-hover:text-primary-500/10 transition-colors">01</div>
            <div className="h-10 w-10 bg-primary-500/10 text-primary-500 border border-primary-500/20 rounded-xl flex items-center justify-center mb-6">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold font-outfit text-white mb-2">Schedule Online</h3>
            <p className="text-xs text-dark-400 leading-relaxed font-light">
              Select screens, computers, or batteries. Specify weight range, schedule a date, and provide your pickup address.
            </p>
          </div>

          {/* Step 2 */}
          <div className="glass-panel p-8 rounded-3xl border-dark-800 hover:border-primary-500/20 hover:bg-dark-900/60 transition-all duration-300 relative group">
            <div className="absolute top-4 right-6 text-5xl font-black text-dark-800/40 font-outfit select-none group-hover:text-primary-500/10 transition-colors">02</div>
            <div className="h-10 w-10 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-xl flex items-center justify-center mb-6">
              <Globe className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold font-outfit text-white mb-2">Verified Plant Assigns</h3>
            <p className="text-xs text-dark-400 leading-relaxed font-light">
              A certified regional recycling center claims your disposal request. They manage transportation and safely pick it up.
            </p>
          </div>

          {/* Step 3 */}
          <div className="glass-panel p-8 rounded-3xl border-dark-800 hover:border-primary-500/20 hover:bg-dark-900/60 transition-all duration-300 relative group">
            <div className="absolute top-4 right-6 text-5xl font-black text-dark-800/40 font-outfit select-none group-hover:text-primary-500/10 transition-colors">03</div>
            <div className="h-10 w-10 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-xl flex items-center justify-center mb-6">
              <Leaf className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold font-outfit text-white mb-2">Earn Green Offsets</h3>
            <p className="text-xs text-dark-400 leading-relaxed font-light">
              Upon final processing, look up your sustainability points, calculate CO2 emission offsets, and download your eco-receipt.
            </p>
          </div>
        </div>
      </section>

      {/* Modern CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-32">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl text-center border-primary-500/10 shadow-2xl relative overflow-hidden">
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-primary-500/5 rounded-full blur-3xl"></div>
          <h2 className="text-3xl sm:text-4xl font-black font-outfit text-white mb-4 tracking-tight leading-tight">
            Ready to Dispose of E-Waste Responsibly?
          </h2>
          <p className="text-sm text-dark-400 max-w-lg mx-auto mb-8 font-light leading-relaxed">
            Register your household account or recycling facility credentials and start scheduling transparent pickups today.
          </p>
          <div className="flex justify-center">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 py-3 px-6 bg-primary-500 hover:bg-primary-600 text-dark-950 font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-primary-500/20"
            >
              Start Recycling Now
              <ArrowRight className="h-4.5 w-4.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
