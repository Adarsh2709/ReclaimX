import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-green-100 py-8 px-4 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Branding */}
        <div className="flex items-center select-none">
          <Link href="/" className="flex items-center group">
            <img
              src="/reclaimX.png"
              alt="ReclaimX Logo"
              className="h-11 w-auto object-contain transition-all duration-300 transform group-hover:scale-[1.02]"
              style={{ filter: 'drop-shadow(1px 1px 0px rgba(30, 41, 59, 0.85)) drop-shadow(-1px 1px 0px rgba(30, 41, 59, 0.85)) drop-shadow(1px -1px 0px rgba(30, 41, 59, 0.85)) drop-shadow(-1px -1px 0px rgba(30, 41, 59, 0.85))' }}
            />
          </Link>
        </div>

        {/* Dynamic Credits */}
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} ReclaimX E-Waste Management. Empowering global local recycling.
        </p>

        {/* Mock secondary links */}
        <div className="flex gap-6">
          <Link href="/privacy" className="text-xs text-slate-400 hover:text-primary-500 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="text-xs text-slate-400 hover:text-primary-500 transition-colors">Terms of Service</Link>
          <Link href="/support" className="text-xs text-slate-400 hover:text-primary-500 transition-colors">Support</Link>
        </div>
      </div>
    </footer>
  );
}
