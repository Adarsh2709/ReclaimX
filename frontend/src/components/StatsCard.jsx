'use client';

import React from 'react';

export default function StatsCard({ title, value, icon: Icon, description, trend, color = 'primary' }) {
  
  const getColorClasses = () => {
    switch (color) {
      case 'orange':
      case 'yellow':
        return {
          iconBg: 'bg-secondary-50 text-secondary-500 border-secondary-100',
          glow: 'shadow-secondary-500/5',
          borderHover: 'hover:border-secondary-500/20'
        };
      case 'blue':
        return {
          iconBg: 'bg-blue-50 text-blue-650 border-blue-100',
          glow: 'shadow-blue-500/5',
          borderHover: 'hover:border-blue-500/20'
        };
      case 'red':
        return {
          iconBg: 'bg-rose-50 text-rose-600 border-rose-100',
          glow: 'shadow-rose-500/5',
          borderHover: 'hover:border-rose-500/20'
        };
      case 'purple':
        return {
          iconBg: 'bg-purple-50 text-purple-650 border-purple-100',
          glow: 'shadow-purple-500/5',
          borderHover: 'hover:border-purple-500/20'
        };
      case 'primary':
      default:
        return {
          iconBg: 'bg-primary-50 text-primary-600 border-primary-100',
          glow: 'shadow-primary-500/5',
          borderHover: 'hover:border-primary-500/20'
        };
    }
  };

  const classes = getColorClasses();

  return (
    <div className={`glass-card p-6 border border-green-100 transition-all duration-300 font-sans shadow-lg ${classes.glow} ${classes.borderHover} group relative overflow-hidden`}>
      {/* Decorative radial background glow */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary-500/5 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500"></div>
      
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-450 uppercase tracking-wider">{title}</p>
          <h3 className="text-3xl font-black font-outfit text-slate-800 mt-1.5 leading-none tracking-tight">
            {value}
          </h3>
        </div>
        <div className={`h-11 w-11 rounded-xl flex items-center justify-center border group-hover:scale-105 transition-transform duration-300 ${classes.iconBg}`}>
          <Icon className="h-5.5 w-5.5" />
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-green-100/40 text-xs">
        <span className="text-slate-500">{description}</span>
        {trend && (
          <span className={`font-semibold ${
            trend.startsWith('+') ? 'text-primary-600' : 'text-rose-600'
          }`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
