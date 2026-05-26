import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-dark-950 border-t border-dark-850 py-8 px-4 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Branding */}
        <div className="flex items-center select-none">
          <Link href="/" className="flex items-center group">
            <img
              src="/reclaimX.png"
              alt="ReclaimX Logo"
              className="h-11 w-auto object-contain transition-all duration-300 transform group-hover:scale-[1.02]"
            />
          </Link>
        </div>

        {/* Dynamic Credits */}
        <p className="text-xs text-dark-400">
          © {new Date().getFullYear()} ReclaimX E-Waste Management. Empowering global local recycling.
        </p>

        {/* Mock secondary links */}
        <div className="flex gap-6">
          <Link href="/privacy" className="text-xs text-dark-500 hover:text-dark-300 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="text-xs text-dark-500 hover:text-dark-300 transition-colors">Terms of Service</Link>
          <Link href="/support" className="text-xs text-dark-500 hover:text-dark-300 transition-colors">Support</Link>
        </div>
      </div>
    </footer>
  );
}
