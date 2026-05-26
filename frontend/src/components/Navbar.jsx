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
  CheckSquare,
  Sun,
  Moon
} from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);
  
  const [theme, setTheme] = useState('light');

  // Load theme preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('reclaimx_theme') || 'light';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('reclaimx_theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

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
    <header className="sticky top-0 z-40 w-full px-4 sm:px-6 lg:px-8 py-3 bg-transparent">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 bg-white/90 backdrop-blur-lg rounded-full border border-green-100/40 shadow-xl shadow-green-950/4">
        {/* Brand Logo */}
        <div className="flex items-center select-none">
          <Link href="/" className="flex items-center group">
            <img 
              src="/reclaimX.png" 
              alt="ReclaimX Logo" 
              className="h-11 w-auto object-contain transition-all duration-300 transform group-hover:scale-[1.02]"
              style={{ filter: 'drop-shadow(1px 1px 0px rgba(30, 41, 59, 0.85)) drop-shadow(-1px 1px 0px rgba(30, 41, 59, 0.85)) drop-shadow(1px -1px 0px rgba(30, 41, 59, 0.85)) drop-shadow(-1px -1px 0px rgba(30, 41, 59, 0.85))' }}
            />
          </Link>
        </div>

        {/* Middle Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-50/50 border border-slate-100 p-1 rounded-full shadow-inner shadow-slate-200/40">
          <Link
            href="/"
            className="text-xs font-bold px-4 py-2 hover:bg-white hover:shadow-sm text-slate-600 hover:text-primary-650 rounded-full transition-all duration-200"
          >
            Home
          </Link>
          {user ? (
            <>
              {user.role === 'USER' && (
                <>
                  <Link
                    href="/dashboard"
                    className="text-xs font-bold px-4 py-2 hover:bg-white hover:shadow-sm text-slate-600 hover:text-primary-650 rounded-full transition-all duration-200"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/pickup/create"
                    className="text-xs font-bold px-4 py-2 hover:bg-white hover:shadow-sm text-slate-600 hover:text-primary-650 rounded-full transition-all duration-200"
                  >
                    Request Pickup
                  </Link>
                  <Link
                    href="/pickup"
                    className="text-xs font-bold px-4 py-2 hover:bg-white hover:shadow-sm text-slate-600 hover:text-primary-650 rounded-full transition-all duration-200"
                  >
                    History
                  </Link>
                </>
              )}
              {user.role === 'RECYCLER' && (
                <Link
                  href="/recycler"
                  className="text-xs font-bold px-4 py-2 hover:bg-white hover:shadow-sm text-slate-600 hover:text-primary-650 rounded-full transition-all duration-200"
                >
                  Recycler Hub
                </Link>
              )}
              {user.role === 'ADMIN' && (
                <Link
                  href="/admin"
                  className="text-xs font-bold px-4 py-2 hover:bg-white hover:shadow-sm text-slate-600 hover:text-primary-650 rounded-full transition-all duration-200"
                >
                  Admin Console
                </Link>
              )}
              <Link
                href="/analytics"
                className="text-xs font-bold px-4 py-2 hover:bg-white hover:shadow-sm text-slate-600 hover:text-primary-650 rounded-full transition-all duration-200"
              >
                Eco-Impact
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/analytics"
                className="text-xs font-bold px-4 py-2 hover:bg-white hover:shadow-sm text-slate-600 hover:text-primary-650 rounded-full transition-all duration-200"
              >
                Sustainability
              </Link>
              <Link
                href="/support"
                className="text-xs font-bold px-4 py-2 hover:bg-white hover:shadow-sm text-slate-600 hover:text-primary-650 rounded-full transition-all duration-200"
              >
                Support Hub
              </Link>
            </>
          )}
        </nav>

        {/* Action Items */}
        <div className="flex items-center gap-4">
          {/* Theme Switcher Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-850 transition-all duration-200 shadow-sm"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5 text-amber-500" />
            )}
          </button>

          {user ? (
            <>
              {/* Notification Center */}
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`relative p-2 rounded-full transition-all duration-200 border ${
                    showNotifications 
                      ? 'bg-slate-100 border-slate-200 text-slate-800' 
                      : 'text-slate-500 hover:text-slate-800 bg-transparent border-transparent hover:bg-slate-100 hover:border-slate-200'
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
                  <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-3xl glass-panel border-green-100/50 shadow-2xl p-4 space-y-3 animate-fade-in z-50">
                    <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold font-outfit text-slate-800">Notifications</span>
                        {unreadCount > 0 && (
                          <span className="px-1.5 py-0.5 text-[10px] font-bold bg-primary-500/10 text-primary-600 rounded-md border border-primary-500/20">
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                      
                      {unreadCount > 0 && (
                        <button 
                          onClick={markAllRead}
                          className="text-[10px] font-bold text-primary-600 hover:text-primary-750 transition-colors inline-flex items-center gap-1"
                        >
                          <Check className="h-3 w-3" />
                          Mark all read
                        </button>
                      )}
                    </div>

                    <div className="max-h-64 overflow-y-auto space-y-2.5 pr-1 select-none">
                      {notifications.length === 0 ? (
                        <div className="py-8 text-center text-xs text-slate-400">
                          No notifications logged.
                        </div>
                      ) : (
                        notifications.map((notif) => (
                          <div 
                            key={notif.id}
                            onClick={() => toggleRead(notif.id)}
                            className={`flex gap-3 p-3 rounded-2xl border transition-all cursor-pointer ${
                              notif.read 
                                ? 'bg-slate-50/50 border-slate-100 hover:bg-slate-50 text-slate-500' 
                                : 'bg-primary-500/5 border-primary-500/10 hover:bg-primary-500/10 text-slate-700'
                            }`}
                          >
                            <span className="flex-shrink-0 mt-0.5">
                              {getNotificationIcon(notif.type)}
                            </span>
                            <div className="space-y-1 flex-1">
                              <p className="text-xs leading-relaxed font-light">{notif.text}</p>
                              <span className="text-[9px] text-slate-400 font-bold tracking-wide uppercase block">{notif.time}</span>
                            </div>
                            {!notif.read && (
                              <span className="h-1.5 w-1.5 rounded-full bg-primary-500 flex-shrink-0 mt-2 self-start animate-pulse"></span>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User Account Info */}
              <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
                <div className="hidden md:flex flex-col text-right">
                  <span className="text-sm font-semibold text-slate-700 font-sans">{user.name}</span>
                  <span className="text-[10px] font-bold tracking-wider text-primary-500 uppercase">{user.role}</span>
                </div>
                
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 border border-slate-200 text-primary-500">
                  <User className="h-4.5 w-4.5" />
                </div>

                <button
                  onClick={logout}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 hover:bg-red-500/10 border border-slate-200 hover:border-red-500/30 text-slate-500 hover:text-red-500 transition-all duration-200"
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
                className="text-sm font-semibold text-slate-600 hover:text-slate-800 px-4 py-2 hover:bg-slate-100 rounded-full transition-all duration-200"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="text-sm font-bold bg-secondary-500 hover:bg-secondary-600 text-white px-5 py-2.5 rounded-full transition-all duration-200 shadow-md shadow-secondary-500/20"
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
