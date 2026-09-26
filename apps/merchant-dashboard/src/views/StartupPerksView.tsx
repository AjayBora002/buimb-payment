import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Gift,
  ExternalLink,
  Shield,
  Zap,
  Building,
  Award,
  ChevronRight,
  TrendingUp,
  Percent,
} from 'lucide-react';

export const StartupPerksView: React.FC = () => {
  const [currentTier, setCurrentTier] = useState<'angel' | 'vc'>('vc');
  const [gmvUsed, setGmvUsed] = useState(480000);
  const totalGmvQuota = currentTier === 'vc' ? 3000000 : 300000;

  const partnerPerks = [
    {
      partner: 'Amazon Web Services (AWS)',
      benefit: '$5,000 in AWS Activate Cloud Credits',
      category: 'Cloud & Infrastructure',
      status: 'Claimed',
    },
    {
      partner: 'Notion for Startups',
      benefit: 'Up to 6 months free of Notion Plus with AI',
      category: 'Productivity',
      status: 'Claim Available',
    },
    {
      partner: 'Mixpanel Analytics',
      benefit: '$50,000 in product analytics credits',
      category: 'Product & Analytics',
      status: 'Claim Available',
    },
    {
      partner: 'Segment CDP',
      benefit: '$25,000 credits for 1 year',
      category: 'Data & Growth',
      status: 'Claimed',
    },
    {
      partner: 'Cleartax for Business',
      benefit: 'Free GST filing & TDS compliance software for 1 year',
      category: 'Tax & Compliance',
      status: 'Claim Available',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner (Flat deep-teal, no gradients) */}
      <div className="bg-[#1D2E28] border border-[#EDE7D6]/[0.08] rounded-none p-8 relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-[2px] font-mono text-xs font-bold border border-[#C9A227] text-[#C9A227] bg-[#C9A227]/5 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
            BuimbPay for Startups Program
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#EDE7D6] tracking-tight">
            ₹1Cr* Free Benefits for Funded Startups
          </h1>
          <div className="w-8 h-0.5 bg-[#C9A227] mt-2 mb-3" />
          <p className="text-xs sm:text-sm text-[#8FA396] leading-relaxed">
            Scale your product with zero payment gateway platform fees, complimentary Magic Checkout, zero-balance current account, and ₹50L+ in top SaaS credits.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setCurrentTier('angel')}
              className={`px-4 py-2 rounded-[4px] text-xs font-semibold transition-colors ${
                currentTier === 'angel'
                  ? 'bg-[#C9A227] text-[#131B17]'
                  : 'bg-[#131B17] text-[#8FA396] hover:text-[#EDE7D6] border border-[#EDE7D6]/[0.12]'
              }`}
            >
              Angel Funded Tier
            </button>
            <button
              onClick={() => setCurrentTier('vc')}
              className={`px-4 py-2 rounded-[4px] text-xs font-semibold transition-colors ${
                currentTier === 'vc'
                  ? 'bg-[#C9A227] text-[#131B17]'
                  : 'bg-[#131B17] text-[#8FA396] hover:text-[#EDE7D6] border border-[#EDE7D6]/[0.12]'
              }`}
            >
              VC Funded Tier (Active)
            </button>
          </div>
        </div>
      </div>

      {/* Free GMV Quota Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-[#1D2E28] border border-[#EDE7D6]/[0.08] rounded-none p-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xs text-[#8FA396]">0% Platform Fee Processing Quota</span>
              <h3 className="text-xl font-bold font-mono text-[#EDE7D6] mt-1">
                ₹{gmvUsed.toLocaleString('en-IN')} / ₹{totalGmvQuota.toLocaleString('en-IN')}
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-[2px] font-mono text-xs font-bold border border-[#4E8B6F] text-[#4E8B6F] bg-[#4E8B6F]/5">
              0% Fee Active
            </span>
          </div>

          <div className="w-full h-2 rounded-none bg-[#131B17] overflow-hidden mb-2">
            <div
              className="h-full bg-[#C9A227] rounded-none"
              style={{ width: `${(gmvUsed / totalGmvQuota) * 100}%` }}
            />
          </div>

          <div className="flex justify-between text-xs text-[#8FA396] font-mono">
            <span>16% Consumed</span>
            <span>₹{(totalGmvQuota - gmvUsed).toLocaleString('en-IN')} Remaining (Valid 180 Days)</span>
          </div>
        </div>

        <div className="lg:col-span-6 bg-[#1D2E28] border border-[#EDE7D6]/[0.08] rounded-none p-6 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-[#EDE7D6]">Exclusive Founder Perks Included</span>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="p-3 rounded-none bg-[#131B17] border border-[#EDE7D6]/[0.08]">
                <span className="text-xs text-[#C9A227] font-semibold block">Magic Checkout</span>
                <span className="text-xs text-[#8FA396]">Free for 6 Months</span>
              </div>
              <div className="p-3 rounded-none bg-[#131B17] border border-[#EDE7D6]/[0.08]">
                <span className="text-xs text-[#4E8B6F] font-semibold block">Priority 24x7</span>
                <span className="text-xs text-[#8FA396]">Dedicated Slack Channel</span>
              </div>
              <div className="p-3 rounded-none bg-[#131B17] border border-[#EDE7D6]/[0.08]">
                <span className="text-xs text-[#C9A227] font-semibold block">International</span>
                <span className="text-xs text-[#8FA396] font-mono">₹20L Free Global GMV</span>
              </div>
              <div className="p-3 rounded-none bg-[#131B17] border border-[#EDE7D6]/[0.08]">
                <span className="text-xs text-[#EDE7D6] font-semibold block">Rize Founder Mixers</span>
                <span className="text-xs text-[#8FA396]">VIP Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partner SaaS Benefits Directory */}
      <div className="bg-[#1D2E28] border border-[#EDE7D6]/[0.08] rounded-none p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-[#EDE7D6]">Curated SaaS Discounts & Partner Credits</h3>
            <p className="text-xs text-[#8FA396]">Direct vouchers and redeem codes unlocked for your startup tier</p>
          </div>
          <span className="text-xs font-mono font-bold text-[#C9A227]">₹50,00,000+ Total Value</span>
        </div>

        <div className="divide-y divide-[#EDE7D6]/[0.08]">
          {partnerPerks.map((p) => (
            <div key={p.partner} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-[2px] bg-[#131B17] border border-[#EDE7D6]/[0.12] flex items-center justify-center text-[#C9A227] font-bold font-mono text-xs">
                  {p.partner.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#EDE7D6]">{p.partner}</h4>
                  <p className="text-xs text-[#8FA396]">{p.benefit}</p>
                  <span className="text-[10px] text-[#8FA396]/70 font-mono">{p.category}</span>
                </div>
              </div>

              <div>
                {p.status === 'Claimed' ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[2px] font-mono text-xs font-bold border border-[#4E8B6F] text-[#4E8B6F] bg-[#4E8B6F]/5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Claimed
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => alert(`Claim voucher generated for ${p.partner}!`)}
                    className="px-4 py-1.5 rounded-[4px] text-xs font-semibold bg-[#C9A227] hover:bg-[#d8b030] text-[#131B17] transition-colors"
                  >
                    Claim Code
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
