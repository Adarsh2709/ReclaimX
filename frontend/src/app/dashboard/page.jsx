'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import ProtectedRoute from '../../components/ProtectedRoute';
import Sidebar from '../../components/Sidebar';
import StatsCard from '../../components/StatsCard';
import PickupCard from '../../components/PickupCard';
import pickupService from '../../services/pickupService';
import { calculateCarbonSavings } from '../../utils/helpers';
import { ROLES } from '../../utils/constants';
import { Leaf, Recycle, Clock, Award, Plus, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function UserDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    carbonOffset: 0,
    recycledWeight: 0,
    activeRequests: 0,
    ecoPoints: 0
  });

  // Auto-route special roles to their dedicated spaces
  useEffect(() => {
    if (user) {
      if (user.role === ROLES.RECYCLER) {
        router.push('/recycler');
      } else if (user.role === ROLES.ADMIN) {
        router.push('/admin');
      }
    }
  }, [user, router]);

  const loadPickups = async () => {
    try {
      setLoading(true);
      const data = await pickupService.getAllPickups();
      
      // Our backend returns all pickups. Let's list and filter or show them.
      // Since there is no user filtering on backend, we will display all system pickups for this user demo
      // or we can sort them so newer ones are on top.
      const sorted = Array.isArray(data) ? data.sort((a, b) => b.id - a.id) : [];
      setPickups(sorted);

      // Accumulate stats
      let carbon = 0;
      let weight = 0;
      let active = 0;
      
      sorted.forEach(p => {
        const isRecycled = p.status.toUpperCase() === 'RECYCLED';
        const isActive = ['PENDING', 'ASSIGNED', 'ACCEPTED', 'COLLECTED'].includes(p.status.toUpperCase());
        
        if (isRecycled) {
          const savings = calculateCarbonSavings(p.itemType, p.weight);
          carbon += parseFloat(savings);
          weight += p.weight;
        }
        if (isActive) {
          active++;
        }
      });

      setStats({
        carbonOffset: carbon.toFixed(1),
        recycledWeight: weight.toFixed(1),
        activeRequests: active,
        ecoPoints: Math.round(weight * 12) // 12 EcoPoints per Kg
      });
    } catch (e) {
      console.error("Error loading dashboard data:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.role === ROLES.USER) {
      loadPickups();
    }
  }, [user]);

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
      <div className="flex flex-col md:flex-row flex-grow bg-transparent font-sans min-h-[calc(100vh-80px)]">
        <Sidebar />
        
        <div className="flex-1 p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* Welcome Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-green-100/50 pb-6">
            <div>
              <h1 className="text-3xl font-black font-outfit text-slate-800 tracking-tight">Eco-Citizen Dashboard</h1>
              <p className="text-sm text-slate-500 font-medium mt-1">
                Welcome back, <strong className="text-primary-600">{user?.name}</strong>. Monitor your environmental savings and schedule dispatches.
              </p>
            </div>
            
            <Link
              href="/pickup/create"
              className="inline-flex items-center gap-2 py-3 px-6 bg-primary-500 hover:bg-primary-600 text-white text-xs font-bold rounded-full transition-all duration-200 shadow-md shadow-primary-500/20"
            >
              <Plus className="h-4 w-4" />
              Schedule New Pickup
            </Link>
          </div>

          {/* Stats Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="CO2 Emissions Saved"
              value={`${stats.carbonOffset} kg`}
              icon={Leaf}
              description="EPA carbon offset total"
              trend="+4.8%"
              color="primary"
            />
            <StatsCard
              title="Total Weight Processed"
              value={`${stats.recycledWeight} kg`}
              icon={Recycle}
              description="Safe metal/plastic extraction"
              trend="+12.4%"
              color="blue"
            />
            <StatsCard
              title="Active Dispatches"
              value={stats.activeRequests}
              icon={Clock}
              description="Pending recycler action"
              color="yellow"
            />
            <StatsCard
              title="My EcoPoints"
              value={stats.ecoPoints}
              icon={Award}
              description="Redeemable carbon rewards"
              trend="+120 pts"
              color="purple"
            />
          </div>

          {/* Core Content */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold font-outfit text-slate-800 tracking-tight">My Active Dispatches</h2>
              <Link href="/pickup" className="text-xs font-bold text-primary-600 hover:text-primary-750 transition-colors inline-flex items-center gap-1">
                View History
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {loading ? (
              <div className="h-48 border border-green-100/30 bg-white rounded-3xl flex items-center justify-center text-slate-400 shadow-lg shadow-green-950/3 animate-pulse">
                Refreshing dispatch metrics...
              </div>
            ) : pickups.length === 0 ? (
              <div className="glass-panel p-12 text-center rounded-3xl border-dashed border-green-200 bg-white/95">
                <Recycle className="h-10 w-10 text-slate-300 mx-auto mb-4" />
                <h3 className="text-base font-bold font-outfit text-slate-800 mb-1">No active pickups scheduled</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
                  You have not scheduled any e-waste disposals yet. Register screens, power cells, or hardware to clean your space.
                </p>
                <Link
                  href="/pickup/create"
                  className="inline-flex items-center gap-2 py-2.5 px-5 bg-primary-500/10 hover:bg-primary-500 text-primary-600 hover:text-white text-xs font-bold rounded-full transition-all border border-primary-500/20 hover:border-primary-500"
                >
                  Create Your First Request
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pickups.slice(0, 3).map((pickup) => (
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
      </div>
    </ProtectedRoute>
  );
}
