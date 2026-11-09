'use client';
import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  ArrowRight,
  Sparkles,
  Calendar,
  Clock,
  User,
  Tag,
} from 'lucide-react';

const POSTS = [
  {
    slug: 'scaling-upi-2-to-10k-tps',
    title: 'How BuimbPay Scales UPI 2.0 Rails to 10,000 TPS with Zero-Drop Settlement',
    excerpt: 'An inside look at our event-driven banking gateway architecture, Redis cluster caching, and distributed idempotency keys under peak festive flash sales.',
    author: 'Ajay Bora',
    role: 'Platform Architect',
    date: 'Nov 8, 2026',
    readTime: '6 min read',
    tag: 'Engineering',
    featured: true,
  },
  {
    slug: 'rbi-pa-escrow-regulations-2026',
    title: 'Mastering RBI Section 40 Nodal Escrow Regulations for Marketplaces',
    excerpt: 'Everything startup founders and marketplace CTOs need to know about compliant tripartite funds routing, merchant settlement cycles, and automated audit trails.',
    author: 'Compliance Team',
    role: 'Regulatory Affairs',
    date: 'Nov 5, 2026',
    readTime: '8 min read',
    tag: 'Fintech & Legal',
    featured: false,
  },
  {
    slug: 'ai-smart-routing-cost-reduction',
    title: 'Benchmarking Multi-Acquirer Smart Routing: Cutting Payment Failure by 42%',
    excerpt: 'Real-world data on how dynamic acquiring bank switching protects merchants from sudden downtime spikes across HDFC, ICICI, Axis, and SBI.',
    author: 'ML Infrastructure Team',
    role: 'Data Science',
    date: 'Oct 28, 2026',
    readTime: '5 min read',
    tag: 'Product',
    featured: false,
  },
  {
    slug: 'pci-dss-v4-tokenization-guide',
    title: 'PCI-DSS v4.0 Compliance Checklist: Zero Plaintext Card Storage in Next.js',
    excerpt: 'A practical implementation guide to client-side tokenization, iframed card vaults, and ephemeral cryptograms compliant with RBI tokenization directives.',
    author: 'Security Operations',
    role: 'AppSec',
    date: 'Oct 20, 2026',
    readTime: '7 min read',
    tag: 'Security',
    featured: false,
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0C2340] via-[#0C1938] to-[#0A142C] text-white pt-16 pb-20 px-4 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span>BuimbPay Engineering & Fintech Publication</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            Insights on <span className="text-[#3395FF]">Indian Fintech & Payments</span>
          </h1>

          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            Deep-dives into sovereign banking infrastructure, distributed systems, RBI compliance directives, and high-frequency transaction engineering.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-8 pb-24 relative z-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {POSTS.map((post, idx) => (
            <article
              key={idx}
              className={`bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
                post.featured ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div className="p-7 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-bold uppercase tracking-wider text-[10px]">
                    {post.tag}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                  </div>
                </div>

                <h2 className={`font-black text-slate-900 hover:text-blue-600 transition-colors ${
                  post.featured ? 'text-2xl sm:text-3xl leading-snug' : 'text-xl leading-snug'
                }`}>
                  <Link href="/docs">{post.title}</Link>
                </h2>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="px-7 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[11px]">
                    {post.author[0]}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{post.author}</div>
                    <div className="text-[10px] text-slate-500">{post.role}</div>
                  </div>
                </div>

                <Link
                  href="/docs"
                  className="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

