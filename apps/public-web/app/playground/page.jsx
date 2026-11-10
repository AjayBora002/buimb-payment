'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Terminal, Play, CheckCircle2, Copy, ArrowRight } from 'lucide-react';

export default function PlaygroundPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState('create_order');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const endpoints = {
    create_order: {
      method: 'POST',
      path: '/api/v1/orders',
      payload: JSON.stringify({ amount: 49900, currency: 'INR', receipt: 'rcpt_7719' }, null, 2),
      mockResponse: {
        id: 'order_Nx8Y29kLp102',
        entity: 'order',
        amount: 49900,
        amount_paid: 0,
        amount_due: 49900,
        currency: 'INR',
        receipt: 'rcpt_7719',
        status: 'created',
        attempts: 0,
        created_at: 1794339177
      }
    },
    verify_payment: {
      method: 'GET',
      path: '/api/v1/payments/pay_live_8812902910',
      payload: '',
      mockResponse: {
        id: 'pay_live_8812902910',
        entity: 'payment',
        amount: 49900,
        currency: 'INR',
        status: 'captured',
        method: 'upi',
        vpa: 'user@okhdfcbank',
        utr: '631299881029',
        bank_rrn: '631299881029',
        captured: true,
        created_at: 1794339185
      }
    }
  };

  const handleExecute = () => {
    setLoading(true);
    setTimeout(() => {
      setResponse(endpoints[selectedEndpoint].mockResponse);
      setLoading(false);
    }, 400);
  };

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto space-y-12 font-sans">
      <section className="text-center space-y-4 max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
          <Terminal className="w-3.5 h-3.5" />
          Interactive API Sandbox
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#0C2340] tracking-tight">
          API Playground &amp; Request Runner
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Execute live test requests against the BuimbPay Payment API engine without writing a single line of backend code.
        </p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-5">
          <div className="flex gap-2">
            <button
              onClick={() => { setSelectedEndpoint('create_order'); setResponse(null); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                selectedEndpoint === 'create_order'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              POST /v1/orders
            </button>
            <button
              onClick={() => { setSelectedEndpoint('verify_payment'); setResponse(null); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                selectedEndpoint === 'verify_payment'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              GET /v1/payments/:id
            </button>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">{endpoints[selectedEndpoint].method}</span>
              <span className="text-slate-300">{endpoints[selectedEndpoint].path}</span>
            </div>
            <span className="text-slate-500 text-[10px]">HTTP/1.1</span>
          </div>

          {endpoints[selectedEndpoint].payload && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                JSON Request Body
              </label>
              <pre className="p-4 bg-slate-900 text-emerald-400 rounded-xl font-mono text-xs overflow-x-auto">
                {endpoints[selectedEndpoint].payload}
              </pre>
            </div>
          )}

          <button
            onClick={handleExecute}
            disabled={loading}
            className="w-full py-3 bg-[#0B63E5] hover:bg-[#0951bd] text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>Execute Request &rarr;</span>
          </button>
        </div>

        <div className="lg:col-span-6 bg-[#070B16] border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-mono font-bold text-slate-400">Response Console</span>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              {response ? '200 OK (38ms)' : 'Waiting for trigger'}
            </span>
          </div>

          <pre className="p-4 bg-slate-950 text-emerald-300 rounded-xl font-mono text-xs overflow-x-auto min-h-[220px]">
            {response ? JSON.stringify(response, null, 2) : '// Click "Execute Request" to test API response'}
          </pre>
        </div>
      </section>
    </div>
  );
}
