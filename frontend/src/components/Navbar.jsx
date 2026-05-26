'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  Recycle, 
  LogOut, 
  User, 
  Bell, 
  Check, 
  AlertCircle, 
  Sparkles, 
  Info, 
  CheckSquare 
} from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);

  // Load custom role-based notifications
  useEffect(() => {
    if (user) {
      const role = user.role;
      if (role === 'ADMIN') {
        setNotifications([
          { id: 1, text: "System Alert: 2 pending dispatches are currently unassigned.", time: "5m ago", read: false, type: "alert" },
          { id: 2, text: "New certified recycling facility registered on the ReclaimX network.", time: "1h ago", read: true, type: "info" }
        ]);
      } else if (role === 'RECYCLER') {
        setNotifications([
          { id: 1, text: "Logistics Queue: New pending pickup requests in your service area.", time: "10m ago", read: false, type: "queue" },
          { id: 2, text: "Facility Certification Profile successfully verified.", time: "3h ago", read: true, type: "info" }
        ]);
      } else {
        setNotifications([
          { id: 1, text: "Welcome to ReclaimX! Select 'Request Pickup' to schedule a dispatch.", time: "2m ago", read: false, type: "welcome" },
          { id: 2, text: "EcoPoint Reward: You earned +120 points for your screen recycling!", time: "1d ago", read: true, type: "points" }
        ]);
      }
    }
  }, [user]);

  // Click outside listener to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const toggleRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n));
  };

  // Resolve notification icon
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'alert': return <AlertCircle className="h-4 w-4 text-red-400" />;
      case 'queue': return <CheckSquare className="h-4 w-4 text-teal-400" />;
      case 'points': return <Sparkles className="h-4 w-4 text-purple-400" />;
      case 'welcome': return <Recycle className="h-4 w-4 text-primary-400 animate-spin-slow" />;
      case 'info':
      default:
        return <Info className="h-4 w-4 text-blue-400" />;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-dark-800/80 bg-dark-950/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center select-none">
          <Link href="/" className="flex items-center group">
            <img 
              src="/reclaimX.png" 
              alt="ReclaimX Logo" 
              className="h-11 w-auto object-contain transition-all duration-300 transform group-hover:scale-[1.02]"
            />
          </Link>
        </div>

        {/* Action Items */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {/* Notification Center */}
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`relative p-2 rounded-xl transition-all duration-200 border ${
                    showNotifications 
                      ? 'bg-dark-900 border-dark-700 text-dark-100' 
                      : 'text-dark-400 hover:text-dark-100 bg-transparent border-transparent hover:bg-dark-900 hover:border-dark-800'
                  }`}
                  title="System Notifications"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-primary-500 animate-pulse glow-primary"></span>
                  )}
                </button>

                {/* Dropdown Box */}
                {showNotifications && (
                  <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl glass-panel border-dark-800 shadow-2xl p-4 space-y-3 animate-fade-in z-50">
                    <div className="flex justify-between items-center pb-2.5 border-b border-dark-800/60">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold font-outfit text-white">Notifications</span>
                        {unreadCount > 0 && (
                          <span className="px-1.5 py-0.5 text-[10px] font-bold bg-primary-500/10 text-primary-400 rounded-md border border-primary-500/20">
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                      
                      {unreadCount > 0 && (
                        <button 
                          onClick={markAllRead}
                          className="text-[10px] font-bold text-primary-400 hover:text-primary-350 transition-colors inline-flex items-center gap-1"
                        >
                          <Check className="h-3 w-3" />
                          Mark all read
                        </button>
                      )}
                    </div>

                    <div className="max-h-64 overflow-y-auto space-y-2.5 pr-1 select-none">
                      {notifications.length === 0 ? (
                        <div className="py-8 text-center text-xs text-dark-500">
                          No notifications logged.
                        </div>
                      ) : (
                        notifications.map((notif) => (
                          <div 
                            key={notif.id}
                            onClick={() => toggleRead(notif.id)}
                            className={`flex gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                              notif.read 
                                ? 'bg-dark-900/20 border-dark-850 hover:bg-dark-900/40 text-dark-400' 
                                : 'bg-primary-500/5 border-primary-500/10 hover:bg-primary-500/10 text-dark-200'
                            }`}
                          >
                            <span className="flex-shrink-0 mt-0.5">
                              {getNotificationIcon(notif.type)}
                            </span>
                            <div className="space-y-1 flex-1">
                              <p className="text-xs leading-relaxed font-light">{notif.text}</p>
                              <span className="text-[9px] text-dark-500 font-bold tracking-wide uppercase block">{notif.time}</span>
                            </div>
                            {!notif.read && (
                              <span className="h-1.5 w-1.5 rounded-full bg-primary-400 flex-shrink-0 mt-2 self-start animate-pulse"></span>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User Account Info */}
              <div className="flex items-center gap-3 pl-2 border-l border-dark-800">
                <div className="hidden md:flex flex-col text-right">
                  <span className="text-sm font-medium text-dark-100 font-sans">{user.name}</span>
                  <span className="text-[10px] font-semibold tracking-wider text-primary-500 uppercase">{user.role}</span>
                </div>
                
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-dark-900 border border-dark-800 text-primary-500">
                  <User className="h-4.5 w-4.5" />
                </div>

                <button
                  onClick={logout}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-dark-900 hover:bg-red-500/10 border border-dark-800 hover:border-red-500/30 text-dark-400 hover:text-red-400 transition-all duration-200"
                  title="Logout"
                >
                  <LogOut className="h-4.5 w-4.5" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-dark-300 hover:text-dark-100 px-4 py-2 hover:bg-dark-900 rounded-xl transition-all duration-200"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="text-sm font-bold bg-primary-500 hover:bg-primary-600 text-dark-950 px-4 py-2 rounded-xl transition-all duration-200 shadow-md hover:shadow-primary-500/10"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
