'use client';

import React from 'react';

export default function StatsCard({ title, value, icon: Icon, description, trend, color = 'primary' }) {
  
  const getColorClasses = () => {
    switch (color) {
      case 'yellow':
        return {
          iconBg: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
          glow: 'shadow-yellow-500/5',
          borderHover: 'hover:border-yellow-500/20'
        };
      case 'blue':
        return {
          iconBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
          glow: 'shadow-blue-500/5',
          borderHover: 'hover:border-blue-500/20'
        };
      case 'red':
        return {
          iconBg: 'bg-red-500/10 text-red-400 border-red-500/20',
          glow: 'shadow-red-500/5',
          borderHover: 'hover:border-red-500/20'
        };
      case 'purple':
        return {
          iconBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
          glow: 'shadow-purple-500/5',
          borderHover: 'hover:border-purple-500/20'
        };
      case 'primary':
      default:
        return {
          iconBg: 'bg-primary-500/10 text-primary-400 border-primary-500/20',
          glow: 'shadow-primary-500/5',
          borderHover: 'hover:border-primary-500/20'
        };
    }
  };

  const classes = getColorClasses();

  return (
    <div className={`glass-card p-6 border-dark-800 transition-all duration-300 font-sans shadow-lg ${classes.glow} ${classes.borderHover} group relative overflow-hidden`}>
      {/* Decorative radial background glow */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary-500/5 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500"></div>
      
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-dark-400 uppercase tracking-wider">{title}</p>
          <h3 className="text-3xl font-black font-outfit text-white mt-1.5 leading-none tracking-tight">
            {value}
          </h3>
        </div>
        <div className={`h-11 w-11 rounded-xl flex items-center justify-center border group-hover:scale-105 transition-transform duration-300 ${classes.iconBg}`}>
          <Icon className="h-5.5 w-5.5" />
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-dark-800/40 text-xs">
        <span className="text-dark-400">{description}</span>
        {trend && (
          <span className={`font-semibold ${
            trend.startsWith('+') ? 'text-primary-400' : 'text-red-400'
          }`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
