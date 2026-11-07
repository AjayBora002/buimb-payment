import React, { useState } from 'react';
import {
  CreditCard,
  Plus,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  TrendingUp,
  ShieldCheck,
  Zap,
  Sliders,
  DollarSign,
  PieChart,
} from 'lucide-react';
import { useToast } from '../components/Toast.js';

interface CardItem {
  id: string;
  cardholderName: string;
  cardNumberMasked: string;
  expiry: string;
  cvv: string;
  network: 'VISA' | 'MASTERCARD' | 'RUPAY';
  status: 'ACTIVE' | 'FROZEN';
  spendingLimit: string;
  spentAmount: string;
  cardType: 'VIRTUAL' | 'PHYSICAL';
}

export const CorporateCardsView: React.FC = () => {
  const { showToast } = useToast();
  const [showCvv, setShowCvv] = useState(false);
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);

  const [newHolder, setNewHolder] = useState('Rahul Verma');
  const [newLimit, setNewLimit] = useState('75,000');
  const [newNetwork, setNewNetwork] = useState<'VISA' | 'MASTERCARD'>('VISA');

  const [cards, setCards] = useState<CardItem[]>([
    {
      id: 'card_corp_01',
      cardholderName: 'Priya Sharma',
      cardNumberMasked: '4242 •••• •••• 8912',
      expiry: '12/28',
      cvv: '888',
      network: 'VISA',
      status: 'ACTIVE',
      spendingLimit: '₹50,000.00',
      spentAmount: '₹14,250.00',
      cardType: 'VIRTUAL',
    },
    {
      id: 'card_corp_02',
      cardholderName: 'Amit Saxena',
      cardNumberMasked: '5241 •••• •••• 4410',
      expiry: '09/27',
      cvv: '419',
      network: 'MASTERCARD',
      status: 'ACTIVE',
      spendingLimit: '₹1,00,000.00',
      spentAmount: '₹62,800.00',
      cardType: 'PHYSICAL',
    },
  ]);

  const [selectedCard, setSelectedCard] = useState<CardItem>(cards[0]);

  const handleToggleFreeze = (id: string) => {
    setCards((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const next = c.status === 'ACTIVE' ? 'FROZEN' : 'ACTIVE';
          showToast(`Card ${c.cardNumberMasked} is now ${next}`, 'info');
          return { ...c, status: next };
        }
        return c;
      }),
    );
    if (selectedCard.id === id) {
      setSelectedCard((prev) => ({
        ...prev,
        status: prev.status === 'ACTIVE' ? 'FROZEN' : 'ACTIVE',
      }));
    }
  };

  const handleIssueCard = (e: React.FormEvent) => {
    e.preventDefault();
    const last4 = Math.floor(1000 + Math.random() * 9000).toString();
    const created: CardItem = {
      id: `card_corp_${Math.random().toString(36).substring(2, 8)}`,
      cardholderName: newHolder,
      cardNumberMasked: `4242 •••• •••• ${last4}`,
      expiry: '10/29',
      cvv: Math.floor(100 + Math.random() * 900).toString(),
      network: newNetwork,
      status: 'ACTIVE',
      spendingLimit: `₹${newLimit}.00`,
      spentAmount: '₹0.00',
      cardType: 'VIRTUAL',
    };
    setCards([created, ...cards]);
    setSelectedCard(created);
    setIsIssueModalOpen(false);
    showToast(`Corporate Card issued to ${newHolder}!`, 'success');
  };

  return (
    <div className="space-y-6 select-none animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-50 text-[#0b63e5] border border-blue-200">
              <CreditCard className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Buimb-PayX Corporate Cards</h2>
            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200 uppercase">
              Smart Expense Management
            </span>
          </div>
          <p className="text-xs text-slate-500 max-w-xl">
            Issue virtual and physical corporate credit cards to employees with programmable spending limits, instant lock/unlock controls, and automated receipt matching.
          </p>
        </div>

        <button
          onClick={() => setIsIssueModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#0b63e5] hover:bg-[#0957cb] text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Issue Corporate Card</span>
        </button>
      </div>

      {/* Main Grid: Card Viewer + Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Virtual Card Graphic & Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative w-full aspect-[1.586] rounded-2xl p-6 text-white overflow-hidden shadow-2xl flex flex-col justify-between bg-gradient-to-tr from-slate-950 via-[#0c2340] to-blue-900 border border-white/10">
            {/* Hologram pattern */}
            <div className="absolute -right-16 -top-16 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top row */}
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center font-bold text-xs">B</div>
                <span className="font-black text-sm tracking-tight">Buimb-PayX <span className="text-[10px] font-normal opacity-80">Corporate</span></span>
              </div>
              <span className="px-2 py-0.5 rounded bg-white/20 text-[10px] font-bold tracking-wider uppercase backdrop-blur-md">
                {selectedCard.cardType}
              </span>
            </div>

            {/* EMV Chip */}
            <div className="w-10 h-8 rounded-md bg-gradient-to-tr from-amber-300 to-amber-500 flex items-center justify-center shadow-inner my-2">
              <div className="w-6 h-5 border border-amber-800/40 rounded-xs" />
            </div>

            {/* Card Number */}
            <div className="space-y-1 relative z-10">
              <div className="font-mono text-lg sm:text-xl font-bold tracking-widest text-slate-100">
                {selectedCard.cardNumberMasked}
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex items-end justify-between relative z-10 pt-2">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Cardholder</span>
                <span className="font-bold text-xs tracking-wider uppercase text-white">{selectedCard.cardholderName}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Expires</span>
                <span className="font-mono text-xs font-bold text-white">{selectedCard.expiry}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 block">CVV</span>
                <span className="font-mono text-xs font-bold text-white">
                  {showCvv ? selectedCard.cvv : '•••'}
                </span>
              </div>
              <div className="text-right">
                <span className="font-black italic text-base tracking-tighter text-white">VISA</span>
              </div>
            </div>
          </div>

          {/* Quick Controls */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center justify-between text-xs">
            <button
              onClick={() => setShowCvv(!showCvv)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold flex items-center gap-1.5 cursor-pointer"
            >
              {showCvv ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showCvv ? 'Hide CVV' : 'Reveal CVV'}</span>
            </button>

            <button
              onClick={() => handleToggleFreeze(selectedCard.id)}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                selectedCard.status === 'ACTIVE'
                  ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              {selectedCard.status === 'ACTIVE' ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
              <span>{selectedCard.status === 'ACTIVE' ? 'Freeze Card' : 'Unfreeze Card'}</span>
            </button>
          </div>
        </div>

        {/* Right: Card Spend Summary & Issued Cards List */}
        <div className="lg:col-span-7 space-y-6">
          {/* Spend Progress */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Monthly Spending Limit</h3>
                <p className="text-xs text-slate-500">Resets automatically on 1st of every calendar month</p>
              </div>
              <span className="font-black text-slate-900 text-sm tabular-nums">
                {selectedCard.spentAmount} / {selectedCard.spendingLimit}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full w-[28%]" />
            </div>

            {/* Category breakdown */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[11px] text-slate-400 block">Cloud Hosting</span>
                <span className="font-bold text-slate-800">₹8,450.00</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[11px] text-slate-400 block">SaaS Subscriptions</span>
                <span className="font-bold text-slate-800">₹4,200.00</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[11px] text-slate-400 block">Travel & Transport</span>
                <span className="font-bold text-slate-800">₹1,600.00</span>
              </div>
            </div>
          </div>

          {/* Cards Directory */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-900">All Issued Corporate Cards</h3>
            </div>
            <div className="divide-y divide-slate-100 text-xs">
              {cards.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCard(c)}
                  className={`p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors ${
                    selectedCard.id === c.id ? 'bg-blue-50/50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
                      {c.network[0]}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{c.cardholderName}</div>
                      <div className="font-mono text-slate-400 text-[11px]">{c.cardNumberMasked}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        c.status === 'ACTIVE'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {c.status}
                    </span>
                    <div className="font-bold text-slate-800 text-[11px] mt-0.5">{c.spendingLimit}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Issue Corporate Card */}
      {isIssueModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Issue Corporate Card</h3>
              <button onClick={() => setIsIssueModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                ✕
              </button>
            </div>

            <form onSubmit={handleIssueCard} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Employee / Cardholder Name</label>
                <input
                  type="text"
                  value={newHolder}
                  onChange={(e) => setNewHolder(e.target.value)}
                  placeholder="e.g. Rahul Verma"
                  required
                  className="w-full h-10 px-3.5 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Monthly Spending Limit (INR)</label>
                <input
                  type="text"
                  value={newLimit}
                  onChange={(e) => setNewLimit(e.target.value)}
                  placeholder="75,000"
                  required
                  className="w-full h-10 px-3.5 rounded-lg border border-slate-300 font-mono text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Card Network</label>
                <select
                  value={newNetwork}
                  onChange={(e: any) => setNewNetwork(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-lg border border-slate-300 bg-white text-slate-800"
                >
                  <option value="VISA">VISA Platinum Business</option>
                  <option value="MASTERCARD">Mastercard World Elite</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#0b63e5] hover:bg-[#0957cb] text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer mt-2"
              >
                Issue Virtual Card Instantly &rarr;
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

