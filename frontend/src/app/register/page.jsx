'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import Link from 'next/link';
import { User, Mail, Lock, UserPlus, Recycle, AlertCircle, CheckCircle } from 'lucide-react';
import { ROLES } from '../../utils/constants';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(ROLES.USER);
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const { user, register } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !role) {
      setError('Please fill in all registration fields.');
      return;
    }

    setError('');
    setSuccess('');
    setSubmitting(true);

    const result = await register(name, email, password, role);
    setSubmitting(false);

    if (result.success) {
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } else {
      setError(result.message || 'Registration failed. Try a different email.');
    }
  };

  return (
    <div className="flex-grow bg-dark-950 flex font-sans min-h-[calc(100vh-64px)] overflow-hidden">
      {/* Visual panel (left side) */}
      <div className="hidden lg:flex lg:w-1/2 bg-dark-900/40 relative items-center justify-center p-12 border-r border-dark-800/80">
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="space-y-6 max-w-md relative z-10">
          <div className="h-12 w-12 rounded-2xl bg-primary-500/10 border border-primary-500/20 text-primary-500 flex items-center justify-center shadow-lg shadow-primary-500/5">
            <Recycle className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-black font-outfit text-white tracking-tight leading-tight">
            Join the Next Generation E-Waste Network
          </h2>
          <p className="text-sm text-dark-400 font-light leading-relaxed">
            Create an account to track your carbon lifecycle, download environmental compliance certificates, and request immediate collections.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs text-dark-300">
              <span className="text-primary-400 text-base">✔</span>
              <span>100% Free household scheduling</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-dark-300">
              <span className="text-primary-400 text-base">✔</span>
              <span>Fully integrated local recycler list</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-dark-300">
              <span className="text-primary-400 text-base">✔</span>
              <span>Live calculations based on EPA standards</span>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Form (right side) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="absolute top-10 right-10 w-48 h-48 bg-primary-500/5 rounded-full blur-2xl"></div>

        <div className="glass-panel p-8 sm:p-10 rounded-3xl max-w-md w-full border-dark-800/80 shadow-2xl relative z-10">
          <div className="space-y-2 mb-6 text-center sm:text-left">
            <h1 className="text-3xl font-black font-outfit text-white">Create Account</h1>
            <p className="text-xs text-dark-400 font-light">Join us to start scheduling e-waste disposals.</p>
          </div>

          {error && (
            <div className="mb-4 flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/25 rounded-2xl text-xs text-red-400 animate-shake">
              <AlertCircle className="h-4.5 w-4.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/25 rounded-2xl text-xs text-emerald-400">
              <CheckCircle className="h-4.5 w-4.5 flex-shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Field */}
            <div className="space-y-1">
              <label htmlFor="name" className="block text-[9px] font-bold text-dark-400 uppercase tracking-wider pl-1">
                Full Name / Organization
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-2.5 bg-dark-950/50 border border-dark-800/80 rounded-xl text-xs text-dark-100 placeholder-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200"
                  required
                />
                <User className="absolute left-3.5 top-3 h-4.5 w-4.5 text-dark-500" />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label htmlFor="email" className="block text-[9px] font-bold text-dark-400 uppercase tracking-wider pl-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-2.5 bg-dark-950/50 border border-dark-800/80 rounded-xl text-xs text-dark-100 placeholder-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200"
                  required
                />
                <Mail className="absolute left-3.5 top-3 h-4.5 w-4.5 text-dark-500" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label htmlFor="password" className="block text-[9px] font-bold text-dark-400 uppercase tracking-wider pl-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-2.5 bg-dark-950/50 border border-dark-800/80 rounded-xl text-xs text-dark-100 placeholder-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200"
                  required
                />
                <Lock className="absolute left-3.5 top-3 h-4.5 w-4.5 text-dark-500" />
              </div>
            </div>

            {/* Role Field */}
            <div className="space-y-1.5">
              <label className="block text-[9px] font-bold text-dark-400 uppercase tracking-wider pl-1">
                Choose Account Role
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRole(ROLES.USER)}
                  className={`py-2 px-1 text-[10px] font-bold rounded-xl border text-center transition-all ${
                    role === ROLES.USER
                      ? 'bg-primary-500/10 text-primary-400 border-primary-500'
                      : 'bg-dark-950/50 text-dark-400 border-dark-800 hover:border-dark-700'
                  }`}
                >
                  Citizen
                </button>
                <button
                  type="button"
                  onClick={() => setRole(ROLES.RECYCLER)}
                  className={`py-2 px-1 text-[10px] font-bold rounded-xl border text-center transition-all ${
                    role === ROLES.RECYCLER
                      ? 'bg-teal-500/10 text-teal-400 border-teal-500'
                      : 'bg-dark-950/50 text-dark-400 border-dark-800 hover:border-dark-700'
                  }`}
                >
                  Recycler
                </button>
                <button
                  type="button"
                  onClick={() => setRole(ROLES.ADMIN)}
                  className={`py-2 px-1 text-[10px] font-bold rounded-xl border text-center transition-all ${
                    role === ROLES.ADMIN
                      ? 'bg-purple-500/10 text-purple-400 border-purple-500'
                      : 'bg-dark-950/50 text-dark-400 border-dark-800 hover:border-dark-700'
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-850 text-dark-950 font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-primary-500/25 mt-2"
            >
              {submitting ? (
                <div className="h-4 w-4 border-2 border-dark-950 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  Sign Up
                </>
              )}
            </button>
          </form>

          {/* Prompt */}
          <p className="mt-6 text-center text-xs text-dark-400">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-primary-400 hover:text-primary-300 transition-colors">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
