'use client';

import React from 'react';
import { User, Mail } from 'lucide-react';

export default function UserCard({ user }) {
  const { id, name, email, role } = user;

  const getRoleColor = (userRole) => {
    const cleanRole = (userRole || 'USER').toUpperCase();
    switch (cleanRole) {
      case 'ADMIN': return 'bg-rose-50 text-rose-700 border-rose-200/60';
      case 'RECYCLER': return 'bg-teal-50 text-teal-700 border-teal-200/60';
      default: return 'bg-blue-50 text-blue-700 border-blue-200/60';
    }
  };

  return (
    <div className="glass-card p-5 border border-green-100 hover:border-primary-500/25 hover:shadow-lg hover:shadow-green-950/4 transition-all duration-200 flex items-center justify-between font-sans">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 text-primary-500 flex items-center justify-center">
          <User className="h-4.5 w-4.5" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800 font-outfit text-sm leading-tight">{name}</h3>
          <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500">
            <Mail className="h-3 w-3 text-slate-450" />
            <span className="truncate max-w-[150px] sm:max-w-none">{email}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className={`px-2 py-0.5 text-[9px] font-bold rounded-md border uppercase tracking-wider ${getRoleColor(role)}`}>
          {role}
        </span>
        <span className="text-[10px] text-slate-400 font-medium">ID: #{id}</span>
      </div>
    </div>
  );
}
