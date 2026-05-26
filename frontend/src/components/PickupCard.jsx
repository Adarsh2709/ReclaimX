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
    <div className="glass-card p-6 border-dark-800 hover:border-primary-500/20 hover:bg-dark-900/60 transition-all duration-300 flex flex-col justify-between h-full font-sans group">
      <div>
        {/* Header */}
        <div className="flex justify-between items-start gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl p-2 bg-dark-950 rounded-xl border border-dark-800 group-hover:scale-105 transition-transform">
              {getMaterialIcon(itemType)}
            </span>
            <div>
              <h3 className="font-semibold text-dark-100 font-outfit leading-tight group-hover:text-primary-400 transition-colors">
                {getMaterialName(itemType)}
              </h3>
              <p className="text-[11px] text-dark-500 font-medium">ID: #{id}</p>
            </div>
          </div>
          <span className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border uppercase tracking-wider ${
            STATUS_COLORS[status.toUpperCase()] || 'bg-dark-800 text-dark-400 border-dark-700'
          }`}>
            {status}
          </span>
        </div>

        {/* Details list */}
        <div className="space-y-2 text-xs text-dark-300 border-t border-b border-dark-800/60 py-3 mb-4">
          <p className="italic text-dark-400">"{description || 'No description provided'}"</p>
          
          <div className="flex items-center gap-2">
            <Weight className="h-3.5 w-3.5 text-primary-500/70" />
            <span>Weight: <strong className="text-dark-100">{weight} kg</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 text-primary-500/70" />
            <span>Date: <strong className="text-dark-100">{formatDate(pickupDate)}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-primary-500/70" />
            <span className="truncate" title={pickupAddress}>Address: <strong className="text-dark-100">{pickupAddress}</strong></span>
          </div>

          {recycler && (
            <div className="flex items-center gap-2 pt-1 mt-1 border-t border-dark-800/40 text-[11px] text-dark-400">
              <Award className="h-3 w-3 text-yellow-500" />
              <span>Plant: <strong className="text-dark-200">{recycler.companyName || recycler.plantName || 'Authorized Plant'}</strong></span>
            </div>
          )}
        </div>
      </div>

      <div>
        {/* Footprint Indicator */}
        <div className="flex items-center justify-between bg-primary-500/5 border border-primary-500/10 rounded-xl px-3 py-2 mb-4">
          <span className="text-[10px] text-primary-400 font-bold uppercase tracking-wider">CO2 Saved Offset:</span>
          <span className="text-xs font-black text-primary-400 font-outfit">{carbonSavings} kg</span>
        </div>

        {/* Dynamic Context Buttons */}
        <div className="flex gap-2">
          {/* USER role controls */}
          {role === 'USER' && (status.toUpperCase() === 'PENDING' || status.toUpperCase() === 'ASSIGNED') && (
            <button
              onClick={() => onDelete && onDelete(id)}
              className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-dark-950 text-xs font-bold rounded-xl transition-all duration-200 border border-red-500/20 hover:border-red-500"
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
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 bg-primary-500 hover:bg-primary-600 text-dark-950 text-xs font-bold rounded-xl transition-all duration-200"
                >
                  <CheckCircle className="h-3.5 w-3.5" />
                  Accept Assignment
                </button>
              )}
              {status.toUpperCase() === 'ACCEPTED' && (
                <button
                  onClick={() => onCollect && onCollect(id)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 bg-teal-500 hover:bg-teal-600 text-dark-950 text-xs font-bold rounded-xl transition-all duration-200"
                >
                  <Truck className="h-3.5 w-3.5" />
                  Mark Collected
                </button>
              )}
              {status.toUpperCase() === 'COLLECTED' && (
                <button
                  onClick={() => onRecycle && onRecycle(id)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 bg-emerald-500 hover:bg-emerald-600 text-dark-950 text-xs font-bold rounded-xl transition-all duration-200"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Mark Recycled
                </button>
              )}
            </>
          )}

          {/* ADMIN role controls */}
          {role === 'ADMIN' && status.toUpperCase() === 'PENDING' && (
            <div className="w-full">
              <label className="block text-[9px] text-dark-400 font-bold uppercase tracking-wider mb-1">Assign Recycler</label>
              <select
                onChange={(e) => onAssign && onAssign(id, e.target.value)}
                defaultValue=""
                className="w-full px-2 py-1.5 bg-dark-950 border border-dark-800 rounded-xl text-xs text-dark-200 focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                <option value="" disabled>Select Plant...</option>
                {recyclers.map(rec => (
                  <option key={rec.id} value={rec.id}>{rec.plantName}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
