import React, { useState } from 'react';
import { Sparkles, TrendingUp, ShieldAlert, ShieldCheck, Tag, Zap, Clock, } from 'lucide-react';
import { useToast } from '../components/Toast.jsx';
export const MagicCheckoutView = () => {
    const { showToast } = useToast();
    const [magicEnabled, setMagicEnabled] = useState(true);
    // RTO Predictor State
    const [testPin, setTestPin] = useState('110001');
    const [testPhone, setTestPhone] = useState('+91 98765 43210');
    const [testAmount, setTestAmount] = useState('2,499.00');
    const [testMethod, setTestMethod] = useState('COD');
    const [rtoResult, setRtoResult] = useState(null);
    const [isEvaluating, setIsEvaluating] = useState(false);
    // Coupons
    const [coupons, setCoupons] = useState([
        { code: 'BINGE50', discountPct: 10, maxDiscount: '₹50.00', minCart: '₹299.00', active: true },
        { code: 'FLAT100', discountPct: 15, maxDiscount: '₹100.00', minCart: '₹499.00', active: true },
        { code: 'SUPER200', discountPct: 20, maxDiscount: '₹200.00', minCart: '₹999.00', active: true },
    ]);
    const handlePredictRto = (e) => {
        e.preventDefault();
        setIsEvaluating(true);
        setRtoResult(null);
        setTimeout(() => {
            const isHighRisk = testMethod === 'COD' && (testPin.startsWith('11') || testPin.startsWith('70'));
            const score = isHighRisk ? 68 : 22;
            const res = {
                score,
                tier: isHighRisk ? 'HIGH' : 'LOW',
                action: isHighRisk ? 'RESTRICT_COD' : 'ALLOW_COD',
                recommendation: isHighRisk
                    ? 'Elevated Return-to-Origin probability. Automatically prompt buyer with ₹50 UPI discount incentive to convert to prepaid.'
                    : 'Low RTO risk. Customer has 100% successful order completion history across Magic network.',
                discountIncentive: isHighRisk ? '₹50.00' : '₹0.00',
            };
            setIsEvaluating(false);
            setRtoResult(res);
            showToast(`RTO Risk evaluated: ${res.tier} RISK (${score}/100)`, isHighRisk ? 'info' : 'success');
        }, 800);
    };
    return (<div className="space-y-6 select-none animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-sm">
              <Sparkles className="w-5 h-5"/>
            </div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Buimb-Pay Magic Checkout</h2>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200 uppercase">
              1-Click Checkout & RTO AI
            </span>
          </div>
          <p className="text-xs text-slate-500 max-w-xl">
            Auto-fill delivery addresses for 80M+ Indian online shoppers, reduce Return-to-Origin (RTO) returns on Cash on Delivery orders, and convert COD to online UPI payments.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-600">Magic Checkout:</span>
          <button onClick={() => {
            setMagicEnabled(!magicEnabled);
            showToast(`Magic Checkout ${!magicEnabled ? 'enabled' : 'disabled'}`, 'info');
        }} className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${magicEnabled ? 'bg-[#0b63e5]' : 'bg-slate-300'}`}>
            <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${magicEnabled ? 'left-7' : 'left-1'}`}/>
          </button>
        </div>
      </div>

      {/* Conversion Lift Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Checkout Conversion Lift</span>
            <TrendingUp className="w-4 h-4 text-emerald-600"/>
          </div>
          <div className="text-2xl font-black text-emerald-600 tabular-nums">+32.4%</div>
          <div className="text-[11px] text-slate-400">Pre-filled address for 80M+ customers</div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>RTO Return Reduction</span>
            <ShieldCheck className="w-4 h-4 text-blue-600"/>
          </div>
          <div className="text-2xl font-black text-blue-600 tabular-nums">-48.1%</div>
          <div className="text-[11px] text-slate-400">AI blocks risky fake postal orders</div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Avg Checkout Time</span>
            <Clock className="w-4 h-4 text-purple-600"/>
          </div>
          <div className="text-2xl font-black text-purple-700 tabular-nums">14 Seconds</div>
          <div className="text-[11px] text-slate-400">Down from 95 seconds traditional</div>
        </div>
      </div>

      {/* Main Grid: RTO AI Simulator & Coupons Manager */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: RTO AI Evaluation Console */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-500"/>
            <h3 className="text-sm font-bold text-slate-900">RTO AI Risk Scoring Engine</h3>
          </div>
          <p className="text-xs text-slate-500">
            Test how Buimb-Pay Magic evaluates delivery pin codes and buyer behavior before confirming Cash on Delivery.
          </p>

          <form onSubmit={handlePredictRto} className="space-y-3.5 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Buyer Mobile Phone</label>
                <input type="text" value={testPhone} onChange={(e) => setTestPhone(e.target.value)} className="w-full h-9 px-3 rounded-lg border border-slate-300 font-mono text-slate-800"/>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Destination PIN Code</label>
                <input type="text" value={testPin} onChange={(e) => setTestPin(e.target.value)} className="w-full h-9 px-3 rounded-lg border border-slate-300 font-mono text-slate-800"/>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Order Value (INR)</label>
                <input type="text" value={testAmount} onChange={(e) => setTestAmount(e.target.value)} className="w-full h-9 px-3 rounded-lg border border-slate-300 font-mono text-slate-800"/>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Payment Method</label>
                <select value={testMethod} onChange={(e) => setTestMethod(e.target.value)} className="w-full h-9 px-3 rounded-lg border border-slate-300 bg-white text-slate-800">
                  <option value="COD">Cash on Delivery (COD)</option>
                  <option value="ONLINE">Online UPI / Card</option>
                </select>
              </div>
            </div>

            <button type="submit" disabled={isEvaluating} className="w-full py-2.5 rounded-xl bg-[#0b63e5] hover:bg-[#0957cb] text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2">
              <Zap className="w-4 h-4"/>
              <span>Evaluate Order RTO Risk</span>
            </button>
          </form>

          {/* Result Output */}
          {rtoResult && (<div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-bold text-slate-800">RTO Risk Prediction</span>
                <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${rtoResult.tier === 'HIGH'
                ? 'bg-rose-100 text-rose-800'
                : 'bg-emerald-100 text-emerald-800'}`}>
                  {rtoResult.tier} RISK ({rtoResult.score}/100)
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">{rtoResult.recommendation}</p>
              {rtoResult.tier === 'HIGH' && (<div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-between">
                  <span>Prepaid Incentive Configured:</span>
                  <span className="font-bold">{rtoResult.discountIncentive} discount on UPI</span>
                </div>)}
            </div>)}
        </div>

        {/* Right: Magic Coupons & Promotions */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-blue-600"/>
              <h3 className="text-sm font-bold text-slate-900">Active Coupons & Promotions</h3>
            </div>
          </div>

          <div className="space-y-3">
            {coupons.map((c) => (<div key={c.code} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-blue-600 px-2 py-0.5 rounded bg-blue-100/70 border border-blue-200">
                      {c.code}
                    </span>
                    <span className="font-bold text-slate-800">{c.discountPct}% Discount</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Max: {c.maxDiscount} • Min Cart: {c.minCart}
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                  ACTIVE
                </span>
              </div>))}
          </div>

          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400">
            Coupons are automatically validated during standard checkout and Magic 1-click checkout flows.
          </div>
        </div>
      </div>
    </div>);
};
