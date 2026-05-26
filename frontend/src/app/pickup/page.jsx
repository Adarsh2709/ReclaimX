'use client';

import React, { useState, useEffect } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import Sidebar from '../../components/Sidebar';
import PickupCard from '../../components/PickupCard';
import pickupService from '../../services/pickupService';
import { ROLES, PICKUP_STATUS } from '../../utils/constants';
import { History, Search, Filter } from 'lucide-react';

export default function PickupHistoryPage() {
  const [pickups, setPickups] = useState([]);
  const [filteredPickups, setFilteredPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const loadPickups = async () => {
    try {
      setLoading(true);
      const data = await pickupService.getAllPickups();
      const sorted = Array.isArray(data) ? data.sort((a, b) => b.id - a.id) : [];
      setPickups(sorted);
      setFilteredPickups(sorted);
    } catch (e) {
      console.error("Error loading pickup list:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPickups();
  }, []);

  // Filter pipeline
  useEffect(() => {
    let result = [...pickups];

    // Status filter
    if (statusFilter !== 'ALL') {
      result = result.filter(p => p.status.toUpperCase() === statusFilter.toUpperCase());
    }

    // Keyword search
    if (search.trim()) {
      const term = search.toLowerCase();
      result = result.filter(p => 
        p.itemType.toLowerCase().includes(term) || 
        (p.description && p.description.toLowerCase().includes(term)) ||
        p.pickupAddress.toLowerCase().includes(term)
      );
    }

    setFilteredPickups(result);
  }, [search, statusFilter, pickups]);

  const handleDeletePickup = async (id) => {
    if (confirm("Are you sure you want to cancel this pickup request?")) {
      try {
        await pickupService.deletePickup(id);
        loadPickups();
      } catch (e) {
        alert("Failed to cancel pickup request. Please try again.");
      }
    }
  };

  return (
    <ProtectedRoute allowedRoles={[ROLES.USER]}>
      <div className="flex flex-col md:flex-row flex-grow bg-dark-950 font-sans min-h-[calc(100vh-64px)]">
        <Sidebar />
        
        <div className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="border-b border-dark-800/80 pb-6">
            <h1 className="text-3xl font-black font-outfit text-white tracking-tight flex items-center gap-3">
              <History className="h-7 w-7 text-primary-500" />
              Pickup Request History
            </h1>
            <p className="text-sm text-dark-400 font-light mt-1">
              Browse, filter, and monitor the real-time status of your scheduled environmental dispatches.
            </p>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-dark-900/30 border border-dark-800/60 p-4 rounded-2xl">
            {/* Search */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search description/address..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-dark-950/50 border border-dark-800/80 rounded-xl text-xs text-dark-100 placeholder-dark-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-dark-500" />
            </div>

            {/* Filter Status Pills */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              <span className="text-[10px] font-bold text-dark-500 uppercase tracking-wider mr-2 hidden sm:inline">
                Filter Status:
              </span>
              <button
                onClick={() => setStatusFilter('ALL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  statusFilter === 'ALL'
                    ? 'bg-primary-500 text-dark-950'
                    : 'bg-dark-900/60 text-dark-400 hover:text-dark-200 border border-dark-800'
                }`}
              >
                All
              </button>
              {Object.keys(PICKUP_STATUS).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    statusFilter === status
                      ? 'bg-primary-500 text-dark-950'
                      : 'bg-dark-900/60 text-dark-400 hover:text-dark-200 border border-dark-800'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Results Grid */}
          {loading ? (
            <div className="h-64 border border-dark-850 rounded-3xl flex items-center justify-center text-dark-500 animate-pulse">
              Refreshing transaction records...
            </div>
          ) : filteredPickups.length === 0 ? (
            <div className="glass-panel p-16 text-center rounded-3xl border-dashed border-dark-800">
              <History className="h-10 w-10 text-dark-600 mx-auto mb-4" />
              <h3 className="text-base font-bold font-outfit text-dark-200 mb-1">No requests found</h3>
              <p className="text-xs text-dark-400 max-w-xs mx-auto">
                No scheduled pickups matched your selected filter criteria. Clear filters or add new entries.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {filteredPickups.map((pickup) => (
                <PickupCard
                  key={pickup.id}
                  pickup={pickup}
                  role="USER"
                  onDelete={handleDeletePickup}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
