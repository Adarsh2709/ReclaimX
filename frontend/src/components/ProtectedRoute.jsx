'use client';

import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center text-dark-100">
        <div className="relative flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500 glow-primary"></div>
          <div className="absolute h-10 w-10 bg-primary-500/10 rounded-full blur-md animate-pulse"></div>
        </div>
        <p className="mt-4 text-dark-400 font-sans tracking-wide animate-pulse">Securing session...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center text-dark-100 px-4">
        <div className="glass-panel p-8 rounded-3xl max-w-md w-full text-center border-red-500/20 shadow-red-500/5">
          <div className="inline-flex p-4 bg-red-500/10 text-red-400 rounded-2xl mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold font-outfit mb-2 text-dark-50">Access Restricted</h2>
          <p className="text-dark-400 text-sm mb-6">
            Your current account role ({user.role}) is unauthorized to access this zone. Required: {allowedRoles.join(', ')}.
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full py-3 px-4 bg-primary-500 hover:bg-primary-600 text-dark-950 font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-primary-500/20"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return children;
}
