'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../../../components/ProtectedRoute';
import Sidebar from '../../../components/Sidebar';
import pickupService from '../../../services/pickupService';
import { MATERIAL_TYPES, ROLES } from '../../../utils/constants';
import { calculateCarbonSavings } from '../../../utils/helpers';
import { Calendar, MapPin, Weight, PlusCircle, Sparkles, MessageSquare } from 'lucide-react';

export default function CreatePickupPage() {
  const router = useRouter();
  
  const [itemType, setItemType] = useState('SCREENS');
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState(5);
  const [pickupAddress, setPickupAddress] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [co2Saved, setCo2Saved] = useState(0);

  // Dynamically calculate CO2 offset on inputs change
  useEffect(() => {
    const savings = calculateCarbonSavings(itemType, weight);
    setCo2Saved(savings);
  }, [itemType, weight]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!itemType || !weight || !pickupAddress || !pickupDate) {
      setError('Please fill in all scheduling fields.');
      return;
    }

    setError('');
    setSuccess('');
    setSubmitting(true);

    try {
      const data = {
        itemType,
        description,
        weight: parseFloat(weight),
        pickupAddress,
        pickupDate // LocalDate parses 'YYYY-MM-DD' automatically
      };
      
      await pickupService.createPickup(data);
      setSuccess('Pickup request successfully registered! Returning to dashboard...');
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data || 'Failed to register pickup request. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ProtectedRoute allowedRoles={[ROLES.USER]}>
      <div className="flex flex-col md:flex-row flex-grow bg-transparent font-sans min-h-[calc(100vh-80px)]">
        <Sidebar />
        
        <div className="flex-1 p-6 md:p-8 space-y-6 max-w-4xl mx-auto w-full">
          {/* Header */}
          <div className="border-b border-green-100/50 pb-6">
            <h1 className="text-3xl font-black font-outfit text-slate-800 tracking-tight flex items-center gap-3">
              <PlusCircle className="h-7 w-7 text-primary-500" />
              Request E-Waste Dispatch
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-1">
              Provide electronic descriptions, weights, and locations. A certified local recycling facility will claim your dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-5">
              {error && (
                <div className="p-4 bg-red-500/5 border border-red-500/20 text-red-500 text-xs rounded-2xl animate-shake">
                  {error}
                </div>
              )}
              {success && (
                <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 text-emerald-600 text-xs rounded-2xl">
                  {success}
                </div>
              )}

              {/* Material Type Selection */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">
                  1. Select E-Waste Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {MATERIAL_TYPES.map((mat) => (
                    <button
                      key={mat.id}
                      type="button"
                      onClick={() => setItemType(mat.id)}
                      className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between h-28 group ${
                        itemType === mat.id
                          ? 'bg-primary-500/10 text-primary-600 border-primary-500 shadow-md shadow-primary-500/5'
                          : 'bg-white text-slate-500 border-slate-200 hover:border-slate-350 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-xl">
                        {mat.id === 'SCREENS' && '📺'}
                        {mat.id === 'IT_HARDWARE' && '💻'}
                        {mat.id === 'SMALL_ELECTRONICS' && '🔌'}
                        {mat.id === 'LARGE_APPLIANCES' && '❄'}
                        {mat.id === 'BATTERIES' && '🔋'}
                        {mat.id === 'LIGHTING' && '💡'}
                      </span>
                      <div>
                        <h4 className="text-xs font-bold leading-tight text-slate-800 mb-0.5">{mat.name}</h4>
                        <p className="text-[9px] text-slate-400 group-hover:text-slate-500">{mat.co2Factor}x CO2 ratio</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight Slider */}
              <div className="space-y-2">
                <div className="flex justify-between pl-1">
                  <label htmlFor="weight" className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    2. Estimated Total Weight
                  </label>
                  <span className="text-xs font-bold text-primary-600 font-outfit">{weight} kg</span>
                </div>
                <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center gap-4">
                  <Weight className="h-5 w-5 text-slate-400" />
                  <input
                    id="weight"
                    type="range"
                    min="1"
                    max="100"
                    value={weight}
                    onChange={(e) => setWeight(parseInt(e.target.value))}
                    className="flex-1 accent-primary-500 bg-slate-100 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Description Input */}
              <div className="space-y-2">
                <label htmlFor="description" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">
                  3. List Electronic Items (Optional)
                </label>
                <div className="relative">
                  <textarea
                    id="description"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g. 1 broken LED monitor, 2 outdated cellphones with batteries..."
                    className="glass-input w-full pl-12 pr-5 py-3"
                  />
                  <MessageSquare className="absolute left-4 top-3.5 h-4.5 w-4.5 text-slate-400" />
                </div>
              </div>

              {/* Date & Address Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Date Picker */}
                <div className="space-y-2">
                  <label htmlFor="date" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">
                    4. Preferred Date
                  </label>
                  <div className="relative">
                    <input
                      id="date"
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="glass-input w-full pl-12 pr-5"
                      required
                    />
                    <Calendar className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                  </div>
                </div>

                {/* Address Picker */}
                <div className="space-y-2">
                  <label htmlFor="address" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">
                    5. Pickup Address
                  </label>
                  <div className="relative">
                    <input
                      id="address"
                      type="text"
                      value={pickupAddress}
                      onChange={(e) => setPickupAddress(e.target.value)}
                      placeholder="Street address, City, ZIP code"
                      className="glass-input w-full pl-12 pr-5"
                      required
                    />
                    <MapPin className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 text-white font-bold rounded-full transition-all duration-200 shadow-lg shadow-primary-500/25 mt-4"
              >
                {submitting ? (
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Schedule Immediate Dispatch'
                )}
              </button>
            </form>

            {/* Impact Estimator (Right panel) */}
            <div className="glass-panel p-6 rounded-3xl border-green-100 shadow-xl bg-white/95 flex flex-col justify-between gap-6 lg:sticky lg:top-24">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary-600 font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="h-4.5 w-4.5 text-yellow-500 animate-pulse" />
                  Impact Estimation
                </div>
                <h3 className="text-xl font-bold font-outfit text-slate-800 leading-tight">Your Carbon Offset</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                  Recycling electronic elements prevents metals and toxic acids from seeping into landfills while saving valuable raw mining energy.
                </p>
              </div>

              <div className="border-t border-b border-slate-100 py-6 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Estimated CO2 Saved</span>
                <span className="text-5xl font-black font-outfit text-primary-600 mt-2 block animate-pulse-subtle">
                  {co2Saved} kg
                </span>
                <span className="text-[10px] text-slate-500 mt-2 block italic font-semibold">
                  Equivalent to planting {(co2Saved * 0.04).toFixed(1)} trees!
                </span>
              </div>

              <div className="text-[10px] text-slate-500 leading-relaxed bg-slate-50/50 p-3 rounded-2xl border border-slate-100">
                <strong>Certified Compliance:</strong> A formal EPA compliance receipt is made available upon the completion of recycling by your assigned center.
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
