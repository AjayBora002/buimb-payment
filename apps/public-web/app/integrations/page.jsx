'use client';
import React from 'react';
import Link from 'next/link';
import { Blocks, ArrowRight, ShieldCheck, CheckCircle2, Code } from 'lucide-react';

export default function IntegrationsPage() {
  const plugins = [
    { name: 'Shopify App', category: 'E-Commerce', desc: '1-click checkout app with automatic UPI QR modal injection.', status: 'Official' },
    { name: 'WooCommerce / WordPress', category: 'E-Commerce', desc: 'Native plugin supporting custom webhooks and dynamic INR checkout.', status: 'v2.4 Live' },
    { name: 'Magento 2 / Adobe Commerce', category: 'Enterprise', desc: 'High-throughput enterprise module with multi-store support.', status: 'Verified' },
    { name: 'PrestaShop', category: 'E-Commerce', desc: 'Instant gateway integration for European and Indian storefronts.', status: 'Official' },
    { name: 'Node.js & Next.js SDK', category: 'Developers', desc: '@buimbpay/sdk npm library with full TypeScript definitions.', status: 'Latest' },
    { name: 'Python SDK', category: 'Developers', desc: 'pip install buimbpay for Django, FastAPI, and Flask.', status: 'Latest' },
    { name: 'PHP & Laravel Package', category: 'Developers', desc: 'Composer package with built-in webhook signature verification.', status: 'Latest' },
    { name: 'Flutter & React Native', category: 'Mobile', desc: 'Drop-in mobile SDK with UPI Intent app auto-detection.', status: 'Cross-Platform' },
  ];

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto space-y-16 font-sans">
      <section className="text-center space-y-5 max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
          <Blocks className="w-3.5 h-3.5" />
          50+ Pre-Built Integrations
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-[#0C2340] tracking-tight">
          Connect BuimbPay Anywhere
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Plug into your favorite e-commerce platform, mobile app, or billing system with official open-source plugins and libraries.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plugins.map((p, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{p.category}</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{p.status}</span>
              </div>
              <h3 className="text-base font-bold text-[#0C2340] mt-2">{p.name}</h3>
              <p className="text-slate-600 text-xs mt-1 leading-relaxed">{p.desc}</p>
            </div>
            <Link href="/api-reference" className="text-[#0B63E5] text-xs font-bold hover:underline flex items-center gap-1">
              <span>View Docs &amp; Install</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}
