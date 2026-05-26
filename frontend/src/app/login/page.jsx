'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import Link from 'next/link';
import { Mail, Lock, LogIn, Recycle, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { user, login } = useAuth();
  const router = useRouter();

  // If already logged in, redirect to appropriate portal
  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all credentials.');
      return;
    }

    setError('');
    setSubmitting(true);

    const result = await login(email, password);
    setSubmitting(false);

    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.message || 'Login failed. Please verify credentials.');
    }
  };

  return (
    <div className="flex-grow bg-transparent flex font-sans min-h-[calc(100vh-80px)] overflow-hidden">
      {/* Visual panel (left side on desktop) */}
      <div className="hidden lg:flex lg:w-1/2 bg-white/40 relative items-center justify-center p-12 border-r border-green-100/50">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="space-y-6 max-w-md relative z-10">
          <div className="h-12 w-12 rounded-2xl bg-primary-500/10 border border-primary-500/20 text-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/5">
            <Recycle className="h-6 w-6 animate-spin-slow" />
          </div>
          <h2 className="text-3xl font-black font-outfit text-slate-800 tracking-tight leading-tight">
            Schedule and Track Your Electronics Recycling
          </h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">
            Logging in grants secure access to carbon savings calculations, dynamic recycler assignment systems, and point history catalogs.
          </p>
          <div className="flex items-center gap-3 bg-white border border-green-100/60 p-4 rounded-2xl shadow-sm">
            <div className="text-primary-600 font-bold text-2xl font-outfit">99%</div>
            <p className="text-xs text-slate-500 font-medium">
              Recycling rate processed by our network partners last month.
            </p>
          </div>
        </div>
      </div>

      {/* Auth panel (right side) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-primary-500/5 rounded-full blur-2xl"></div>

        <div className="glass-panel p-8 sm:p-10 rounded-3xl max-w-md w-full border-green-100/50 shadow-2xl relative z-10 bg-white/95">
          <div className="space-y-2 mb-8 text-center sm:text-left">
            <h1 className="text-3xl font-black font-outfit text-slate-800">Welcome Back</h1>
            <p className="text-xs text-slate-400 font-medium">Enter email credentials to open your dashboard.</p>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-2 p-3 bg-red-500/5 border border-red-500/20 rounded-2xl text-xs text-red-500 animate-shake">
              <AlertCircle className="h-4.5 w-4.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="glass-input w-full pl-12 pr-5"
                  required
                />
                <Mail className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="glass-input w-full pl-12 pr-5"
                  required
                />
                <Lock className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 text-white font-bold rounded-full transition-all duration-200 shadow-lg shadow-primary-500/25 mt-4"
            >
              {submitting ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Prompt */}
          <p className="mt-6 text-center text-xs text-slate-500">
            Don't have an account?{' '}
            <Link href="/register" className="font-bold text-primary-600 hover:text-primary-750 transition-colors">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
