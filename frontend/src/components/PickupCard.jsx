'use client';

import React from 'react';
import { formatDate, calculateCarbonSavings, getMaterialName } from '../utils/helpers';
import { STATUS_COLORS } from '../utils/constants';
import { 
  Calendar, 
  MapPin, 
  Weight, 
  Trash2, 
  CheckCircle, 
  Truck, 
  Award,
  RefreshCw
} from 'lucide-react';

export default function PickupCard({ 
  pickup, 
  role, 
  onDelete, 
  onAccept, 
  onCollect, 
  onRecycle, 
  recyclers = [], 
  onAssign 
}) {
  const { id, itemType, description, weight, pickupAddress, pickupDate, status, recycler } = pickup;

  // Resolve custom icon
  const getMaterialIcon = (type) => {
    switch(type) {
      case 'SCREENS': return '📺';
      case 'IT_HARDWARE': return '💻';
      case 'BATTERIES': return '🔋';
      case 'LIGHTING': return '💡';
      default: return '🔌';
    }
  };

  const carbonSavings = calculateCarbonSavings(itemType, weight);

  return (
    <div className="glass-card p-6 border border-green-100 hover:border-primary-500/35 hover:bg-green-50/10 hover:shadow-xl hover:shadow-green-950/4 transition-all duration-300 flex flex-col justify-between h-full font-sans group">
      <div>
        {/* Header */}
        <div className="flex justify-between items-start gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl p-2 bg-slate-50 rounded-2xl border border-slate-100 group-hover:scale-110 transition-transform duration-200">
              {getMaterialIcon(itemType)}
            </span>
            <div>
              <h3 className="font-semibold text-slate-800 font-outfit leading-tight group-hover:text-primary-600 transition-colors">
                {getMaterialName(itemType)}
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">ID: #{id}</p>
            </div>
          </div>
          <span className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border uppercase tracking-wider ${
            STATUS_COLORS[status.toUpperCase()] || 'bg-slate-50 text-slate-400 border-slate-200'
          }`}>
            {status}
          </span>
        </div>

        {/* Details list */}
        <div className="space-y-2 text-xs text-slate-600 border-t border-b border-green-100/50 py-3 mb-4">
          <p className="italic text-slate-500">"{description || 'No description provided'}"</p>
          
          <div className="flex items-center gap-2">
            <Weight className="h-3.5 w-3.5 text-primary-500/70" />
            <span>Weight: <strong className="text-slate-800 font-semibold">{weight} kg</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 text-primary-500/70" />
            <span>Date: <strong className="text-slate-800 font-semibold">{formatDate(pickupDate)}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-primary-500/70" />
            <span className="truncate max-w-[200px]" title={pickupAddress}>Address: <strong className="text-slate-800 font-semibold">{pickupAddress}</strong></span>
          </div>

          {recycler && (
            <div className="flex items-center gap-2 pt-1.5 mt-1.5 border-t border-green-100/40 text-[11px] text-slate-500">
              <Award className="h-3.5 w-3.5 text-amber-500" />
              <span>Plant: <strong className="text-slate-700 font-semibold">{recycler.companyName || recycler.plantName || 'Authorized Plant'}</strong></span>
            </div>
          )}
        </div>
      </div>

      <div>
        {/* Footprint Indicator */}
        <div className="flex items-center justify-between bg-primary-500/5 border border-primary-500/10 rounded-2xl px-3.5 py-2.5 mb-4">
          <span className="text-[10px] text-primary-600 font-bold uppercase tracking-wider">CO2 Saved Offset:</span>
          <span className="text-xs font-black text-primary-600 font-outfit">{carbonSavings} kg</span>
        </div>

        {/* Dynamic Context Buttons */}
        <div className="flex gap-2">
          {/* USER role controls */}
          {role === 'USER' && (status.toUpperCase() === 'PENDING' || status.toUpperCase() === 'ASSIGNED') && (
            <button
              onClick={() => onDelete && onDelete(id)}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white text-xs font-bold rounded-2xl transition-all duration-200 border border-rose-100 hover:border-rose-500 shadow-sm"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Cancel Request
            </button>
          )}

          {/* RECYCLER role controls */}
          {role === 'RECYCLER' && (
            <>
              {status.toUpperCase() === 'ASSIGNED' && (
                <button
                  onClick={() => onAccept && onAccept(id)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-primary-500 hover:bg-primary-600 text-white text-xs font-bold rounded-2xl transition-all duration-200 shadow-md shadow-primary-500/10"
                >
                  <CheckCircle className="h-3.5 w-3.5" />
                  Accept Assignment
                </button>
              )}
              {status.toUpperCase() === 'ACCEPTED' && (
                <button
                  onClick={() => onCollect && onCollect(id)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-secondary-500 hover:bg-secondary-600 text-white text-xs font-bold rounded-2xl transition-all duration-200 shadow-md shadow-secondary-500/10"
                >
                  <Truck className="h-3.5 w-3.5" />
                  Mark Collected
                </button>
              )}
              {status.toUpperCase() === 'COLLECTED' && (
                <button
                  onClick={() => onRecycle && onRecycle(id)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-primary-500 hover:bg-primary-600 text-white text-xs font-bold rounded-2xl transition-all duration-200 shadow-md shadow-primary-500/10"
                >
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '3s' }} />
                  Mark Recycled
                </button>
              )}
            </>
          )}

          {/* ADMIN role controls */}
          {role === 'ADMIN' && status.toUpperCase() === 'PENDING' && (
            <div className="w-full">
              <label className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1 pl-1">Assign Recycler</label>
              <select
                onChange={(e) => onAssign && onAssign(id, e.target.value)}
                defaultValue=""
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all duration-200"
              >
                <option value="" disabled>Select Plant...</option>
                {recyclers.map(rec => (
                  <option key={rec.id} value={rec.id}>{rec.companyName || rec.plantName || `Plant #${rec.id}`}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
