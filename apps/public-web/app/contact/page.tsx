'use client';
import React from 'react';
import { Mail, Building, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Contact Engineering & Partnerships
        </h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Have questions about custom integrations, volume pricing, or our compliance roadmap? Reach out to our technical team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <form className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1 font-medium">Your Name</label>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-medium">Work Email</label>
            <input
              type="email"
              placeholder="you@company.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-medium">Estimated Monthly Volume</label>
            <select className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-blue-500">
              <option>Under ₹10 Lakhs</option>
              <option>₹10 Lakhs - ₹50 Lakhs</option>
              <option>₹50 Lakhs - ₹2 Crores</option>
              <option>₹2 Crores +</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-medium">Message</label>
            <textarea
              rows={4}
              placeholder="Tell us about your business model and payment requirements..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="button"
            onClick={() => alert('Thank you! Our technical team will reach out within 24 hours.')}
            className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center justify-center gap-2 shadow-sm"
          >
            Send Inquiry
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Contact Info Cards */}
        <div className="space-y-4 text-xs">
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <Building className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Registered Office</h3>
                <p className="text-slate-400">Buimb Technologies Private Limited</p>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Bandra Kurla Complex (BKC), Mumbai, Maharashtra 400051, India
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Direct Contacts</h3>
                <p className="text-slate-400">Engineering & Security Team</p>
              </div>
            </div>
            <div className="space-y-1 text-slate-300">
              <div>Technical Support: <span className="font-mono text-blue-400">dev@buimbpay.com</span></div>
              <div>Security Inquiries: <span className="font-mono text-blue-400">security@buimbpay.com</span></div>
              <div>Compliance Desk: <span className="font-mono text-blue-400">compliance@buimbpay.com</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
