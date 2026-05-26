'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { 
  ArrowRight, 
  Leaf, 
  TrendingUp, 
  Zap, 
  Globe 
} from 'lucide-react';

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <div className="flex-grow bg-transparent text-slate-800 font-sans relative overflow-hidden flex flex-col justify-center">
      {/* Soft decorative ambient mint glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl"></div>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        <div className="space-y-6 text-center lg:text-left animate-slide-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-green-100/60 text-primary-600 text-xs font-bold rounded-full uppercase tracking-wider shadow-sm select-none">
            <span role="img" aria-label="leaf">☘️</span>
            Start Collecting Waste
          </div>
          
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-outfit text-slate-800 tracking-tight leading-tight">
            No time to <span className="text-secondary-500">waste</span>,<br />
            raise awareness and go on a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">fun adventure!</span>
          </h1>

          <p className="text-slate-500 text-base sm:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
            ReclaimX is an advanced electronic waste scheduling and circular recycling network. Schedule clean dispatches, calculate certified carbon offsets, and join local recycling centers in a global eco-impact campaign.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            {user ? (
              <Link
                href="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-8 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-full transition-all duration-200 shadow-lg shadow-primary-500/20"
              >
                Go to Dashboard
                <ArrowRight className="h-4.5 w-4.5" />
              </Link>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-8 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-full transition-all duration-200 shadow-lg shadow-primary-500/20"
                >
                  Dashboard
                  <ArrowRight className="h-4.5 w-4.5" />
                </Link>
                <Link
                  href="/login"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-8 bg-white hover:bg-slate-50 text-primary-600 font-bold rounded-full border border-primary-500/30 hover:border-primary-500/50 transition-all duration-200"
                >
                  Learn More
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Hero Vector Graphic (Dribbble shot matching: Phone on hand, playful cat, sorting bins) */}
        <div className="flex justify-center items-center relative animate-fade-in">
          <div className="absolute w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-pulse-subtle"></div>
          <svg className="w-full max-w-lg h-auto drop-shadow-[0_15px_35px_rgba(61,168,87,0.12)] animate-float" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Background Hills */}
            <path d="M50 350C150 280 250 320 350 280C450 240 480 320 500 350V480H50V350Z" fill="#e8f5ec" opacity="0.6" />
            <path d="M0 380C100 340 180 390 280 350C380 310 420 370 500 380V480H0V380Z" fill="#cbebd5" opacity="0.4" />
            <line x1="0" y1="450" x2="500" y2="450" stroke="#98d5ab" strokeWidth="6" />

            {/* Playful Eco-Cat Mascot */}
            <g transform="translate(60, 310) scale(0.75)">
              {/* Head */}
              <circle cx="100" cy="100" r="45" fill="#fddb92" />
              {/* Ears */}
              <polygon points="55,70 75,30 90,60" fill="#fddb92" />
              <polygon points="55,70 75,30 90,60" fill="#fbb03b" transform="scale(0.85) translate(15, 15)" />
              <polygon points="145,70 125,30 110,60" fill="#fddb92" />
              <polygon points="145,70 125,30 110,60" fill="#fbb03b" transform="scale(0.85) translate(22, 15)" />
              {/* Eyes */}
              <ellipse cx="85" cy="95" rx="5" ry="6" fill="#1e293b" />
              <ellipse cx="115" cy="95" rx="5" ry="6" fill="#1e293b" />
              <circle cx="87" cy="93" r="2" fill="white" />
              <circle cx="117" cy="93" r="2" fill="white" />
              {/* Cheek pink */}
              <circle cx="75" cy="105" r="7" fill="#ffb3ba" />
              <circle cx="125" cy="105" r="7" fill="#ffb3ba" />
              {/* Nose & Mouth */}
              <polygon points="100,102 96,98 104,98" fill="#ff7d29" />
              <path d="M96 106C98 108 100 108 100 106C100 108 102 108 104 106" stroke="#ff7d29" strokeWidth="2.5" strokeLinecap="round" />
              {/* Body in Green Shirt */}
              <path d="M70 142C70 125 130 125 130 142V190H70V142Z" fill="#3da857" />
              <circle cx="100" cy="160" r="14" fill="white" opacity="0.2" />
              <path d="M95 160L98 163L105 156" stroke="white" strokeWidth="3" strokeLinecap="round" />
              {/* Arms */}
              <rect x="45" y="132" width="28" height="15" rx="7.5" fill="#fddb92" transform="rotate(-30 45 132)" />
              <rect x="127" y="132" width="28" height="15" rx="7.5" fill="#fddb92" transform="rotate(30 127 132)" />
              {/* Feet */}
              <rect x="75" y="190" width="20" height="15" rx="7.5" fill="#fddb92" />
              <rect x="105" y="190" width="20" height="15" rx="7.5" fill="#fddb92" />
            </g>

            {/* Smart Recycling Bins (Organic & Non-Organic) */}
            <g transform="translate(195, 360)">
              {/* Bin 1 (Green Organic) */}
              <rect x="0" y="20" width="45" height="70" rx="6" fill="#3da857" />
              <rect x="-2" y="14" width="49" height="10" rx="3" fill="#2d8b44" />
              <circle cx="22.5" cy="50" r="10" fill="white" opacity="0.2" />
              <path d="M22.5 44V56M17.5 50H27.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <text x="22.5" y="98" fill="#226b34" fontSize="9" fontWeight="black" textAnchor="middle">ORGANIC</text>

              {/* Bin 2 (Orange Non-Organic) */}
              <rect x="75" y="20" width="45" height="70" rx="6" fill="#ff7d29" />
              <rect x="73" y="14" width="49" height="10" rx="3" fill="#ea580c" />
              <circle cx="97.5" cy="50" r="10" fill="white" opacity="0.2" />
              <circle cx="97.5" cy="50" r="5" stroke="white" strokeWidth="2.5" />
              <text x="97.5" y="98" fill="#c2410c" fontSize="9" fontWeight="black" textAnchor="middle">PLASTIC</text>
            </g>

            {/* Floating Mobile Phone showing map adventure */}
            <g transform="translate(320, 40) rotate(5)">
              {/* Hand holding the phone (behind) */}
              <path d="M10 240C20 180 70 140 120 180" stroke="#fec5bb" strokeWidth="28" strokeLinecap="round" />

              {/* Phone Frame */}
              <rect x="30" y="40" width="130" height="260" rx="24" fill="#0f172a" />
              <rect x="35" y="45" width="120" height="250" rx="20" fill="#e8f5ec" />
              {/* Screen Adventure Map Graphics */}
              <path d="M50 240C70 160 110 180 120 100" stroke="#ff7d29" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8" />
              <circle cx="50" cy="240" r="10" fill="#3da857" />
              <circle cx="120" cy="100" r="10" fill="#3da857" />
              <circle cx="80" cy="170" r="14" fill="#ff7d29" />
              <text x="80" y="174" fill="white" fontSize="9" fontWeight="black" textAnchor="middle">★</text>
              {/* Pin Map Markers */}
              <circle cx="50" cy="240" r="3" fill="white" />
              <circle cx="120" cy="100" r="3" fill="white" />
              <text x="80" y="210" fill="#226b34" fontSize="10" fontWeight="bold" textAnchor="middle">Waste Map</text>

              {/* Dynamic Points Indicator overlay */}
              <rect x="50" y="60" width="90" height="25" rx="12.5" fill="white" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.05))" />
              <circle cx="62" cy="72.5" r="7" fill="#ffbb00" />
              <text x="62" y="75" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">★</text>
              <text x="98" y="76" fill="#1e293b" fontSize="10" fontWeight="bold">1,820 pts</text>

              {/* Dynamic Island */}
              <rect x="70" y="49" width="50" height="11" rx="5.5" fill="#0f172a" />
            </g>
          </svg>
        </div>
      </section>

      {/* Global Impact Counter */}
      <section className="bg-white/40 border-t border-b border-green-100/50 py-12 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <h4 className="text-3xl font-black font-outfit text-slate-800">24/7</h4>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Active Logistics</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-3xl font-black font-outfit text-primary-600">Dynamic</h4>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Role Interfaces</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-3xl font-black font-outfit text-slate-800">NIST 800-88</h4>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Data Destruction</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-3xl font-black font-outfit text-primary-600">Real-Time</h4>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">EPA CO2 Offset</p>
          </div>
        </div>
      </section>

      {/* How it works features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 space-y-16">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <h2 className="text-3xl font-black font-outfit text-slate-800 tracking-tight">Recycle Seamlessly in 3 Steps</h2>
          <p className="text-sm text-slate-500 font-medium">
            ReclaimX coordinates e-waste dispatches securely. Register your profile, specify items, and leave the heavy lifting to our certified facilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="glass-card p-8 hover:border-primary-500/30 hover:shadow-xl hover:shadow-green-950/5 transition-all duration-350 relative group">
            <div className="absolute top-4 right-6 text-5xl font-black text-green-100 group-hover:text-primary-500/10 transition-colors font-outfit select-none">01</div>
            <div className="h-12 w-12 bg-primary-500/10 text-primary-600 rounded-2xl flex items-center justify-center mb-6">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold font-outfit text-slate-800 mb-2">Schedule Dispatch</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Select monitors, laptops, appliances, or batteries. Specify weight range, select a pickup date, and input your address.
            </p>
          </div>

          {/* Step 2 */}
          <div className="glass-card p-8 hover:border-primary-500/30 hover:shadow-xl hover:shadow-green-950/5 transition-all duration-350 relative group">
            <div className="absolute top-4 right-6 text-5xl font-black text-green-100 group-hover:text-primary-500/10 transition-colors font-outfit select-none">02</div>
            <div className="h-12 w-12 bg-secondary-500/10 text-secondary-600 rounded-2xl flex items-center justify-center mb-6">
              <Globe className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold font-outfit text-slate-800 mb-2">Facility Assigns</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              A verified regional recycling facility claims your request. They coordinate transport logistics and execute the pickup.
            </p>
          </div>

          {/* Step 3 */}
          <div className="glass-card p-8 hover:border-primary-500/30 hover:shadow-xl hover:shadow-green-950/5 transition-all duration-350 relative group">
            <div className="absolute top-4 right-6 text-5xl font-black text-green-100 group-hover:text-primary-500/10 transition-colors font-outfit select-none">03</div>
            <div className="h-12 w-12 bg-primary-500/10 text-primary-600 rounded-2xl flex items-center justify-center mb-6">
              <Leaf className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold font-outfit text-slate-800 mb-2">Earn EcoPoints</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Upon final processing, track your carbon offset savings metrics, gain redeemable EcoPoints, and download your receipt.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl text-center border-green-100/50 shadow-2xl relative overflow-hidden bg-white/95">
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-primary-500/5 rounded-full blur-3xl"></div>
          <h2 className="text-3xl sm:text-4xl font-black font-outfit text-slate-800 mb-4 tracking-tight leading-tight">
            Ready to start your recycling adventure?
          </h2>
          <p className="text-sm text-slate-500 max-w-lg mx-auto mb-8 font-medium leading-relaxed">
            Register your citizen account or facility credentials and begin scheduling transparent, tracked pickups today.
          </p>
          <div className="flex justify-center">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 py-3.5 px-8 bg-secondary-500 hover:bg-secondary-600 text-white font-bold rounded-full transition-all duration-200 shadow-lg shadow-secondary-500/20"
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
