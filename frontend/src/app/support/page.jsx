'use client';

import React, { useState } from 'react';
import { Mail, MessageSquare, HelpCircle, Phone, Send, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function SupportHub() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  const faqs = [
    {
      q: "What electronic materials are accepted for pickup?",
      a: "We accept monitors, TVs, laptops, cell phones, home theater systems, appliances (microwaves, AC units), lighting lamps, and standard batteries. Anything with a power cord or battery cell can be scheduled!"
    },
    {
      q: "Is there any cost for scheduling a pickup?",
      a: "No! ReclaimX household and basic commercial pickup schedules are 100% free. The operation costs are funded through materials reclamation inside our partner EPA-certified smelting and sorting plants."
    },
    {
      q: "How does the storage wipe process work?",
      a: "Our partner plants are certified data destroyers. Hard drives, tablets, and phones are stripped, and their magnetic platters/memory layers are completely degaussed or physically shredded in compliance with NIST SP 800-88 rules."
    }
  ];

  return (
    <div className="flex-grow bg-dark-950 text-dark-100 font-sans min-h-[calc(100vh-64px)] relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 border-b border-dark-800 pb-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-500/10 text-primary-500 border border-primary-500/20">
            <HelpCircle className="h-6 w-6 animate-pulse-subtle" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-outfit text-white tracking-tight">Support Hub & Help Center</h1>
          <p className="text-sm text-dark-400 font-light max-w-lg mx-auto">
            Need help scheduling a load or have compliance questions? Send us a request or read through our frequent Q&As.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left panel: Contact Form */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-dark-800/80 shadow-2xl space-y-6">
            <div>
              <h2 className="text-xl font-bold font-outfit text-white tracking-tight flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary-500" />
                Submit a Support Ticket
              </h2>
              <p className="text-xs text-dark-400 font-light mt-1">Our customer experience eco-team will respond within 12 hours.</p>
            </div>

            {success && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/25 rounded-2xl flex items-center gap-3 text-xs text-emerald-400 animate-fade-in">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                <span>Ticket submitted successfully! Check your inbox for confirmation.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-[9px] font-bold text-dark-400 uppercase tracking-wider pl-1">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Adarsh Jha"
                    className="w-full px-4 py-2.5 bg-dark-950/50 border border-dark-800/80 rounded-xl text-xs text-dark-100 placeholder-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                    required
                  />
                </div>
                <div className="space-y-1.5">
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
                      className="w-full pl-10 pr-4 py-2.5 bg-dark-950/50 border border-dark-800/80 rounded-xl text-xs text-dark-100 placeholder-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                      required
                    />
                    <Mail className="absolute left-3.5 top-3 h-4 w-4 text-dark-500" />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="msg" className="block text-[9px] font-bold text-dark-400 uppercase tracking-wider pl-1">
                  Explain your request or issue
                </label>
                <textarea
                  id="msg"
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you clean your space today? Details like address or pickup ID are highly helpful."
                  className="w-full px-4 py-3 bg-dark-950/50 border border-dark-800/80 rounded-2xl text-xs text-dark-100 placeholder-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-850 text-dark-950 font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-primary-500/25"
              >
                {submitting ? (
                  <div className="h-4 w-4 border-2 border-dark-950 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    Submit Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right panel: FAQs */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold font-outfit text-white tracking-tight">Frequently Asked Questions</h2>
              <p className="text-xs text-dark-400 font-light mt-1">Review standard operational procedures.</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="glass-panel p-5 rounded-2xl border-dark-800/80">
                  <h4 className="font-bold font-outfit text-white text-sm flex items-center gap-2 mb-2">
                    <HelpCircle className="h-4.5 w-4.5 text-primary-400 flex-shrink-0" />
                    {faq.q}
                  </h4>
                  <p className="text-xs text-dark-400 leading-relaxed font-light pl-6">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Contacts */}
            <div className="bg-dark-900/30 border border-dark-800/60 p-4 rounded-2xl flex flex-col sm:flex-row justify-between gap-4 text-center sm:text-left">
              <div>
                <h4 className="text-xs font-bold text-white mb-0.5">Urgent Corporate Scheduling</h4>
                <p className="text-[10px] text-dark-500">For quantities exceeding 500kg</p>
              </div>
              <div className="flex gap-4 justify-center text-xs">
                <a href="mailto:support@reclaimx.com" className="inline-flex items-center gap-1.5 text-primary-400 hover:text-primary-300 font-bold transition-colors">
                  <Mail className="h-3.5 w-3.5" />
                  Email Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
