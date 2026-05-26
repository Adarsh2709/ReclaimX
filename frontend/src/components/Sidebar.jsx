'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import { ROLES } from '../utils/constants';
import { 
  LayoutDashboard, 
  PlusCircle, 
  History, 
  TrendingUp, 
  Settings, 
  ShieldAlert, 
  Layers,
  Leaf
} from 'lucide-react';

export default function Sidebar() {
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  // Navigation schema based on Roles
  const getNavLinks = () => {
    switch (user.role) {
      case ROLES.ADMIN:
        return [
          { name: 'Admin Console', href: '/admin', icon: ShieldAlert },
          { name: 'Impact Analytics', href: '/analytics', icon: TrendingUp },
        ];
      case ROLES.RECYCLER:
        return [
          { name: 'Recycler Hub', href: '/recycler', icon: Layers },
          { name: 'Plant Analytics', href: '/analytics', icon: TrendingUp },
        ];
      case ROLES.USER:
      default:
        return [
          { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
          { name: 'Request Pickup', href: '/pickup/create', icon: PlusCircle },
          { name: 'Pickup History', href: '/pickup', icon: History },
          { name: 'My Eco-Impact', href: '/analytics', icon: Leaf },
        ];
    }
  };

  const navLinks = getNavLinks();

  return (
    <aside className="w-full md:w-64 flex-shrink-0 bg-dark-950/40 border-r border-dark-800/80 p-4 font-sans min-h-[calc(100vh-64px)] flex flex-col justify-between">
      <div className="space-y-6">
        <div>
          <span className="text-[10px] font-bold text-dark-500 tracking-widest uppercase px-3">
            Navigation Menu
          </span>
          <nav className="mt-3 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20'
                      : 'text-dark-400 hover:text-dark-100 hover:bg-dark-900 border border-transparent'
                  }`}
                >
                  <Icon className={`h-4.5 w-4.5 group-hover:scale-105 transition-transform ${
                    isActive ? 'text-primary-400' : 'text-dark-500 group-hover:text-dark-300'
                  }`} />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User context quick view */}
        <div className="glass-panel p-4 rounded-2xl border-primary-500/5 shadow-md">
          <h4 className="text-xs font-semibold text-dark-200 font-outfit mb-1">Eco-Tip of the Day</h4>
          <p className="text-[11px] text-dark-400 leading-relaxed">
            Unplugging your home electronics when fully charged prevents "phantom energy drain" and reduces your overall energy footprint!
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-dark-800/80 text-[11px] text-dark-500 text-center">
        ReclaimX v1.0.0
      </div>
    </aside>
  );
}
