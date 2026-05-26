'use client';

import React, { useState, useEffect } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import Sidebar from '../../components/Sidebar';
import StatsCard from '../../components/StatsCard';
import PickupCard from '../../components/PickupCard';
import recyclerService from '../../services/recyclerService';
import adminService from '../../services/adminService';
import { useAuth } from '../../hooks/useAuth';
import { ROLES } from '../../utils/constants';
import { Recycle, Truck, CheckSquare, Layers, Award, ShieldAlert, Phone, Map } from 'lucide-react';

export default function RecyclerDashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [allRecyclers, setAllRecyclers] = useState([]);
  
  // Form fields for profile setup
  const [companyName, setCompanyName] = useState('');
  const [contact, setContact] = useState('');
  const [serviceArea, setServiceArea] = useState('');
  
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('assigned'); // 'assigned', 'all'
  const [submitting, setSubmitting] = useState(false);

  const [stats, setStats] = useState({
    activeJobs: 0,
    collectedJobs: 0,
    recycledWeight: 0,
    carbonCredit: 0
  });

  const loadProfileAndPickups = async () => {
    try {
      setLoading(true);
      
      // Load recyclers list to see if our user is registered
      const recyclers = await recyclerService.getAllRecyclers();
      setAllRecyclers(recyclers || []);
      
      // Match profile by name/email (client matching)
      if (user) {
        // Try to match or find registered company
        const matched = (recyclers || []).find(r => 
          r.companyName.toLowerCase().includes(user.name.toLowerCase()) ||
          user.name.toLowerCase().includes(r.companyName.toLowerCase())
        );
        if (matched) {
          setProfile(matched);
        } else if (recyclers && recyclers.length > 0) {
          // Default to first profile for testing if there is one
          setProfile(recyclers[0]);
        }
      }

      // Load all pickups
      const allPickups = await adminService.getAllPickups();
      setPickups(allPickups || []);

      // Calculate stats
      let activeJobsCount = 0;
      let collectedJobsCount = 0;
      let weightCount = 0;
      let co2Count = 0;

      (allPickups || []).forEach(p => {
        const isAssignedToUs = matchedProfile(p.recycler);
        const status = (p.status || '').toUpperCase();
        
        if (isAssignedToUs) {
          if (status === 'ASSIGNED' || status === 'ACCEPTED') {
            activeJobsCount++;
          }
          if (status === 'COLLECTED') {
            collectedJobsCount++;
          }
          if (status === 'RECYCLED') {
            weightCount += p.weight;
            co2Count += p.weight * 1.8; // average factor
          }
        }
      });

      setStats({
        activeJobs: activeJobsCount,
        collectedJobs: collectedJobsCount,
        recycledWeight: weightCount.toFixed(1),
        carbonCredit: co2Count.toFixed(1)
      });

    } catch (e) {
      console.error("Error loading recycler profile or tasks:", e);
    } finally {
      setLoading(false);
    }
  };

  const matchedProfile = (recObj) => {
    if (!recObj || !profile) return false;
    return recObj.id === profile.id || recObj.companyName === profile.companyName;
  };

  useEffect(() => {
    if (user && user.role === ROLES.RECYCLER) {
      loadProfileAndPickups();
    }
  }, [user, profile?.id]);

  const handleCreateProfile = async (e) => {
    e.preventDefault();
    if (!companyName || !contact || !serviceArea) return;
    
    setSubmitting(true);
    try {
      const newRec = await recyclerService.createRecycler({
        companyName,
        contact,
        serviceArea
      });
      setProfile(newRec);
      loadProfileAndPickups();
    } catch (err) {
      alert("Failed to register facility. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAccept = async (id) => {
    try {
      await recyclerService.acceptPickup(id);
      loadProfileAndPickups();
    } catch (e) {
      alert("Failed to accept pickup.");
    }
  };

  const handleCollect = async (id) => {
    try {
      await recyclerService.collectPickup(id);
      loadProfileAndPickups();
    } catch (e) {
      alert("Failed to collect pickup.");
    }
  };

  const handleRecycle = async (id) => {
    try {
      await recyclerService.recyclePickup(id);
      loadProfileAndPickups();
    } catch (e) {
      alert("Failed to recycle pickup.");
    }
  };

  // Filter lists based on tab
  const getFilteredPickups = () => {
    if (!profile) return [];
    if (activeTab === 'assigned') {
      // Pickups assigned to this recycler specifically
      return pickups.filter(p => matchedProfile(p.recycler));
    } else {
      // Pickups that are unassigned and PENDING
      return pickups.filter(p => !p.recycler && p.status.toUpperCase() === 'PENDING');
    }
  };

  const listToRender = getFilteredPickups();

  return (
    <ProtectedRoute allowedRoles={[ROLES.RECYCLER]}>
      <div className="flex flex-col md:flex-row flex-grow bg-dark-950 font-sans min-h-[calc(100vh-64px)]">
        <Sidebar />
        
        <div className="flex-1 p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="border-b border-dark-800/80 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black font-outfit text-white tracking-tight flex items-center gap-3">
                <Layers className="h-7 w-7 text-primary-500" />
                Recycling Facility Center
              </h1>
              <p className="text-sm text-dark-400 font-light mt-1">
                Manage assigned dispatches, update item collection states, and verify carbon point completions.
              </p>
            </div>

            {profile && (
              <div className="flex items-center gap-3 bg-dark-900/60 border border-dark-800 p-3 rounded-2xl">
                <div className="h-9 w-9 bg-primary-500/10 text-primary-500 rounded-xl flex items-center justify-center border border-primary-500/20">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white leading-tight">{profile.companyName}</h4>
                  <span className="text-[9px] text-dark-400">Area: {profile.serviceArea}</span>
                </div>
              </div>
            )}
          </div>

          {/* Profile Setup Screen */}
          {!profile && !loading ? (
            <div className="glass-panel p-8 sm:p-12 rounded-3xl max-w-xl mx-auto border-primary-500/10 shadow-2xl space-y-6">
              <div className="text-center space-y-2">
                <div className="h-12 w-12 bg-primary-500/10 text-primary-500 rounded-2xl flex items-center justify-center mx-auto border border-primary-500/20">
                  <Recycle className="h-6 w-6 animate-pulse-subtle" />
                </div>
                <h2 className="text-2xl font-black font-outfit text-white">Facility Registration</h2>
                <p className="text-xs text-dark-400 font-light max-w-xs mx-auto">
                  Provide your organization details to accept dispatches and report certified carbon weights.
                </p>
              </div>

              <form onSubmit={handleCreateProfile} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="company" className="block text-[9px] font-bold text-dark-400 uppercase tracking-wider pl-1">
                    Certified Company Name
                  </label>
                  <input
                    id="company"
                    type="text"
                    placeholder="EcoRecycle Plant Ltd."
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-950/50 border border-dark-800/80 rounded-xl text-xs text-dark-100 placeholder-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact" className="block text-[9px] font-bold text-dark-400 uppercase tracking-wider pl-1">
                      Phone Contact
                    </label>
                    <div className="relative">
                      <input
                        id="contact"
                        type="text"
                        placeholder="+1-555-0199"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-dark-950/50 border border-dark-800/80 rounded-xl text-xs text-dark-100 placeholder-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      />
                      <Phone className="absolute left-3.5 top-3 h-4 w-4 text-dark-500" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="area" className="block text-[9px] font-bold text-dark-400 uppercase tracking-wider pl-1">
                      Service Area Region
                    </label>
                    <div className="relative">
                      <input
                        id="area"
                        type="text"
                        placeholder="Northeast sector, NY"
                        value={serviceArea}
                        onChange={(e) => setServiceArea(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-dark-950/50 border border-dark-800/80 rounded-xl text-xs text-dark-100 placeholder-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      />
                      <Map className="absolute left-3.5 top-3 h-4 w-4 text-dark-500" />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 px-4 bg-primary-500 hover:bg-primary-600 text-dark-950 font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-primary-500/25"
                >
                  {submitting ? 'Registering Facility...' : 'Complete Registration Setup'}
                </button>
              </form>
            </div>
          ) : (
            <>
              {/* Stats row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                  title="Accepted Runs"
                  value={stats.activeJobs}
                  icon={CheckSquare}
                  description="Awaiting collection routes"
                  color="blue"
                />
                <StatsCard
                  title="Collected En-Route"
                  value={stats.collectedJobs}
                  icon={Truck}
                  description="Loaded in logistics transport"
                  color="yellow"
                />
                <StatsCard
                  title="Total Weight Extracted"
                  value={`${stats.recycledWeight} kg`}
                  icon={Recycle}
                  description="Completed recycling output"
                  color="primary"
                />
                <StatsCard
                  title="Carbon Offsets Verified"
                  value={`${stats.carbonCredit} kg`}
                  icon={Award}
                  description="Certified greenhouse reduction"
                  color="purple"
                />
              </div>

              {/* Jobs section */}
              <div className="space-y-4">
                {/* Tabs */}
                <div className="flex gap-4 border-b border-dark-800/80 pb-3">
                  <button
                    onClick={() => setActiveTab('assigned')}
                    className={`text-sm font-bold pb-2 transition-all border-b-2 ${
                      activeTab === 'assigned'
                        ? 'text-primary-400 border-primary-500'
                        : 'text-dark-400 hover:text-dark-200 border-transparent'
                    }`}
                  >
                    My Assigned Dispatches ({listToRender.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`text-sm font-bold pb-2 transition-all border-b-2 ${
                      activeTab === 'all'
                        ? 'text-primary-400 border-primary-500'
                        : 'text-dark-400 hover:text-dark-200 border-transparent'
                    }`}
                  >
                    Pending System Requests ({pickups.filter(p => !p.recycler && p.status.toUpperCase() === 'PENDING').length})
                  </button>
                </div>

                {/* Grid */}
                {loading ? (
                  <div className="h-48 border border-dark-850 rounded-2xl flex items-center justify-center text-dark-500 animate-pulse">
                    Refreshing active recycler queue...
                  </div>
                ) : listToRender.length === 0 ? (
                  <div className="glass-panel p-12 text-center rounded-3xl border-dashed border-dark-800">
                    <Recycle className="h-10 w-10 text-dark-600 mx-auto mb-4" />
                    <h3 className="text-base font-bold font-outfit text-dark-200 mb-1">No tasks in queue</h3>
                    <p className="text-xs text-dark-400 max-w-xs mx-auto">
                      {activeTab === 'assigned'
                        ? "You do not have any active pickups assigned. Contact system admin to assign pending items."
                        : "There are no pending unassigned requests in ReclaimX at this moment."}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {listToRender.map((pickup) => (
                      <PickupCard
                        key={pickup.id}
                        pickup={pickup}
                        role="RECYCLER"
                        onAccept={handleAccept}
                        onCollect={handleCollect}
                        onRecycle={handleRecycle}
                      />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
