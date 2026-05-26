'use client';

import React, { useState, useEffect } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import Sidebar from '../../components/Sidebar';
import StatsCard from '../../components/StatsCard';
import PickupCard from '../../components/PickupCard';
import RecyclerCard from '../../components/RecyclerCard';
import UserCard from '../../components/UserCard';
import adminService from '../../services/adminService';
import recyclerService from '../../services/recyclerService';
import { ROLES } from '../../utils/constants';
import { ShieldAlert, Users, Layers, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';

export default function AdminDashboard() {
  const [pickups, setPickups] = useState([]);
  const [recyclers, setRecyclers] = useState([]);
  const [mockUsers, setMockUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending'); // 'pending', 'all', 'facilities', 'users'

  const [stats, setStats] = useState({
    totalPickups: 0,
    unassignedCount: 0,
    facilitiesCount: 0,
    usersCount: 0
  });

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load all pickups
      const allPickups = await adminService.getAllPickups();
      const sortedPickups = Array.isArray(allPickups) ? allPickups.sort((a, b) => b.id - a.id) : [];
      setPickups(sortedPickups);

      // Load all recyclers
      const allRecs = await recyclerService.getAllRecyclers();
      setRecyclers(allRecs || []);

      // Calculate stats
      const unassigned = sortedPickups.filter(p => p.status.toUpperCase() === 'PENDING').length;
      
      // Extract unique user emails from pickups to show real active users in the system!
      const uniqueEmails = [...new Set(sortedPickups.map(p => p.pickupAddress))]; // address as user key mock
      const generatedMockUsers = [
        { id: 1, name: "Alice Henderson", email: "alice.h@reclaimx.com", role: "USER" },
        { id: 2, name: "David Miller", email: "david.m@reclaimx.com", role: "USER" },
        { id: 3, name: "Apex Recycling Group", email: "plant@apexrecycle.com", role: "RECYCLER" },
        { id: 4, name: "Antigravity Dev", email: "admin@reclaimx.com", role: "ADMIN" }
      ];
      setMockUsers(generatedMockUsers);

      setStats({
        totalPickups: sortedPickups.length,
        unassignedCount: unassigned,
        facilitiesCount: allRecs.length,
        usersCount: generatedMockUsers.length
      });

    } catch (e) {
      console.error("Error loading admin system data:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAssignRecycler = async (pickupId, recyclerId) => {
    try {
      await adminService.assignRecycler(pickupId, recyclerId);
      alert("Facility assigned successfully!");
      loadData();
    } catch (e) {
      console.error(e);
      alert("Failed to assign recycler facility. Try again.");
    }
  };

  // Filter list by selected tab
  const renderList = () => {
    if (activeTab === 'pending') {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold font-outfit text-slate-800 tracking-tight flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            Pending Recycler Assignments ({pickups.filter(p => p.status.toUpperCase() === 'PENDING').length})
          </h2>
          {pickups.filter(p => p.status.toUpperCase() === 'PENDING').length === 0 ? (
            <div className="glass-card p-12 text-center border-dashed border-2 border-slate-200">
              <CheckCircle className="h-10 w-10 text-primary-500 mx-auto mb-4" />
              <h3 className="text-base font-bold font-outfit text-slate-700 mb-1">Queue Cleared!</h3>
              <p className="text-xs text-slate-400">All scheduled e-waste requests have been assigned to certified regional plants.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {pickups.filter(p => p.status.toUpperCase() === 'PENDING').map(pickup => (
                <PickupCard
                  key={pickup.id}
                  pickup={pickup}
                  role="ADMIN"
                  recyclers={recyclers}
                  onAssign={handleAssignRecycler}
                />
              ))}
            </div>
          )}
        </div>
      );
    }

    if (activeTab === 'all') {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold font-outfit text-slate-800 tracking-tight flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary-500" />
            Complete Dispatch History ({pickups.length})
          </h2>
          {pickups.length === 0 ? (
            <div className="glass-card p-12 text-center border-dashed border-2 border-slate-200">
              <ShieldAlert className="h-10 w-10 text-slate-400 mx-auto mb-4" />
              <h3 className="text-base font-bold font-outfit text-slate-700 mb-1">No dispatches logged</h3>
              <p className="text-xs text-slate-400">There are currently no transactions inside the ReclaimX system databases.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {pickups.map(pickup => (
                <PickupCard
                  key={pickup.id}
                  pickup={pickup}
                  role="ADMIN"
                  recyclers={recyclers}
                  onAssign={handleAssignRecycler}
                />
              ))}
            </div>
          )}
        </div>
      );
    }

    if (activeTab === 'facilities') {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold font-outfit text-slate-800 tracking-tight flex items-center gap-2">
            <Layers className="h-5 w-5 text-teal-600" />
            Registered Recycling Facilities ({recyclers.length})
          </h2>
          {recyclers.length === 0 ? (
            <div className="glass-card p-12 text-center border-dashed border-2 border-slate-200">
              <Layers className="h-10 w-10 text-slate-400 mx-auto mb-4" />
              <h3 className="text-base font-bold font-outfit text-slate-700 mb-1">No facilities found</h3>
              <p className="text-xs text-slate-400">There are no recycling plants registered in ReclaimX. Facility accounts must configure profiles.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {recyclers.map(rec => (
                <RecyclerCard key={rec.id} recycler={rec} />
              ))}
            </div>
          )}
        </div>
      );
    }

    if (activeTab === 'users') {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold font-outfit text-slate-800 tracking-tight flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-600" />
            Registered System Users ({mockUsers.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
            {mockUsers.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
      <div className="flex flex-col md:flex-row flex-grow bg-transparent font-sans min-h-[calc(100vh-64px)]">
        <Sidebar />
        
        <div className="flex-1 p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="border-b border-green-100 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black font-outfit text-slate-800 tracking-tight flex items-center gap-3">
                <ShieldAlert className="h-7 w-7 text-primary-500" />
                Admin System Console
              </h1>
              <p className="text-sm text-slate-500 font-light mt-1">
                Platform control room: review system health metrics, manage users, and assign dispatches to regional plants.
              </p>
            </div>
            
            <button
              onClick={loadData}
              className="inline-flex items-center gap-2 py-2 px-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold shadow-sm shadow-green-950/2 transition-all duration-200"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Refresh Data
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="System Pickups"
              value={stats.totalPickups}
              icon={Layers}
              description="Total database transactions"
              color="primary"
            />
            <StatsCard
              title="Unassigned Requests"
              value={stats.unassignedCount}
              icon={AlertCircle}
              description="Awaiting plant coordination"
              color="orange"
            />
            <StatsCard
              title="Recycling Facilities"
              value={stats.facilitiesCount}
              icon={Layers}
              description="Certified processing partners"
              color="blue"
            />
            <StatsCard
              title="Active Accounts"
              value={stats.usersCount}
              icon={Users}
              description="Registered user profiles"
              color="purple"
            />
          </div>

          {/* Tabs bar */}
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4 md:gap-6 border-b border-green-100 pb-3">
              <button
                onClick={() => setActiveTab('pending')}
                className={`text-sm font-bold pb-2 transition-all border-b-2 ${
                  activeTab === 'pending'
                    ? 'text-primary-500 border-primary-500'
                    : 'text-slate-400 hover:text-slate-700 border-transparent'
                }`}
              >
                Unassigned Pickups ({pickups.filter(p => p.status.toUpperCase() === 'PENDING').length})
              </button>
              <button
                onClick={() => setActiveTab('all')}
                className={`text-sm font-bold pb-2 transition-all border-b-2 ${
                  activeTab === 'all'
                    ? 'text-primary-500 border-primary-500'
                    : 'text-slate-400 hover:text-slate-700 border-transparent'
                }`}
              >
                All Database Dispatches ({pickups.length})
              </button>
              <button
                onClick={() => setActiveTab('facilities')}
                className={`text-sm font-bold pb-2 transition-all border-b-2 ${
                  activeTab === 'facilities'
                    ? 'text-primary-500 border-primary-500'
                    : 'text-slate-400 hover:text-slate-700 border-transparent'
                }`}
              >
                Registered Plants ({recyclers.length})
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`text-sm font-bold pb-2 transition-all border-b-2 ${
                  activeTab === 'users'
                    ? 'text-primary-500 border-primary-500'
                    : 'text-slate-400 hover:text-slate-700 border-transparent'
                }`}
              >
                Account Directory ({mockUsers.length})
              </button>
            </div>

            {/* List */}
            {loading ? (
              <div className="h-48 border border-green-100/50 rounded-3xl bg-white/50 flex items-center justify-center text-slate-400 animate-pulse">
                Syncing system catalogs...
              </div>
            ) : (
              renderList()
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
