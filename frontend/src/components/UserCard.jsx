'use client';

import React from 'react';
import { User, Mail } from 'lucide-react';

export default function UserCard({ user }) {
  const { id, name, email, role } = user;

  const getRoleColor = (userRole) => {
    const cleanRole = (userRole || 'USER').toUpperCase();
    switch (cleanRole) {
      case 'ADMIN': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'RECYCLER': return 'bg-teal-500/10 text-teal-400 border-teal-500/20';
      default: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    }
  };

  return (
    <div className="glass-card p-5 border-dark-800 hover:border-primary-500/10 transition-all duration-200 flex items-center justify-between font-sans">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-dark-900 border border-dark-800 text-primary-500 flex items-center justify-center">
          <User className="h-4.5 w-4.5" />
        </div>
        <div>
          <h3 className="font-semibold text-dark-100 font-outfit text-sm leading-tight">{name}</h3>
          <div className="flex items-center gap-1.5 mt-1 text-xs text-dark-400">
            <Mail className="h-3 w-3 text-dark-500" />
            <span className="truncate max-w-[150px] sm:max-w-none">{email}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className={`px-2 py-0.5 text-[9px] font-bold rounded-md border uppercase tracking-wider ${getRoleColor(role)}`}>
          {role}
        </span>
        <span className="text-[10px] text-dark-500 font-medium">ID: #{id}</span>
      </div>
    </div>
  );
}
