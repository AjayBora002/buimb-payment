import React, { useState } from 'react';
import { GitFork, CheckCircle2, TrendingUp, Sliders, Play, Pause, Plus, Building, Zap, } from 'lucide-react';
export const OptimizerView = () => {
    const [optimizerActive, setOptimizerActive] = useState(true);
    const [gateways, setGateways] = useState([
        {
            id: 'gw_native',
            name: 'BuimbPay Direct Switch (ICICI Core)',
            sharePercent: 60,
            successRate: 98.4,
            latencyMs: 310,
            status: 'HEALTHY',
            active: true,
        },
        {
            id: 'gw_hdfc',
            name: 'HDFC FSS SmartGateway',
            sharePercent: 25,
            successRate: 97.2,
            latencyMs: 440,
            status: 'HEALTHY',
            active: true,
        },
        {
            id: 'gw_axis',
            name: 'Axis Bank Aggregator Pipe',
            sharePercent: 15,
            successRate: 95.8,
            latencyMs: 512,
            status: 'HEALTHY',
            active: true,
        },
    ]);
    const [rules, setRules] = useState([
        {
            id: 'rule_1',
            title: 'High-Value UPI Routing (> ₹25,000)',
            condition: 'Method == UPI && Amount > 25000',
            targetGateway: 'BuimbPay Direct Switch',
            priority: 1,
            enabled: true,
        },
        {
            id: 'rule_2',
            title: 'International Visa & Mastercard Priority',
            condition: 'Card.IsInternational == true',
            targetGateway: 'HDFC FSS SmartGateway',
            priority: 2,
            enabled: true,
        },
        {
            id: 'rule_3',
            title: 'Auto-Fallback on Downtime (>3 consecutive 5xx)',
            condition: 'PrimaryGateway.ErrorRate > 5%',
            targetGateway: 'Cascade to Next Available Node',
            priority: 3,
            enabled: true,
        },
    ]);
    return (<div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#0f172a]/[0.08] pb-5">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold tracking-tight text-[#0f172a] flex items-center gap-2">
              <GitFork className="w-5 h-5 text-[#0b63e5]"/>
              Optimizer (Multi-Gateway Smart Routing)
            </h1>
            <span className="px-2.5 py-0.5 rounded-[2px] font-mono text-xs font-bold border border-[#0b63e5] text-[#0b63e5] bg-[#0b63e5]/5 flex items-center gap-1">
              <Zap className="w-3 h-3"/> AI Dynamic Balancing
            </span>
          </div>
          <div className="w-8 h-0.5 bg-[#0b63e5] mt-1"/>
          <p className="text-xs text-[#64748b] mt-1.5">
            Manage multiple payment gateways, maximize transaction success rates, and eliminate single-point downtime via smart cascaded routing.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setOptimizerActive(!optimizerActive)} className={`px-3 py-1.5 rounded-[4px] text-xs font-mono font-bold flex items-center gap-2 transition-colors border ${optimizerActive
            ? 'border-[#4E8B6F] text-[#4E8B6F] bg-[#4E8B6F]/5'
            : 'border-[#C98A2E] text-[#C98A2E] bg-[#C98A2E]/5'}`}>
            {optimizerActive ? <Play className="w-3.5 h-3.5"/> : <Pause className="w-3.5 h-3.5"/>}
            {optimizerActive ? 'Smart Routing Active' : 'Routing Paused'}
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[white] border border-[#0f172a]/[0.08] rounded-none p-5">
          <div className="flex items-center justify-between text-[#64748b] text-xs">
            <span>Overall Success Rate</span>
            <TrendingUp className="w-4 h-4 text-[#4E8B6F]"/>
          </div>
          <p className="text-2xl font-bold font-mono text-[#0f172a] mt-2">98.1%</p>
          <span className="text-[11px] text-[#4E8B6F] font-mono">+3.4% vs Single Gateway</span>
        </div>

        <div className="bg-[white] border border-[#0f172a]/[0.08] rounded-none p-5">
          <div className="flex items-center justify-between text-[#64748b] text-xs">
            <span>Average Authorization Latency</span>
            <Zap className="w-4 h-4 text-[#0b63e5]"/>
          </div>
          <p className="text-2xl font-bold font-mono text-[#0f172a] mt-2">362 ms</p>
          <span className="text-[11px] text-[#64748b] font-mono">99.8% under 600ms</span>
        </div>

        <div className="bg-[white] border border-[#0f172a]/[0.08] rounded-none p-5">
          <div className="flex items-center justify-between text-[#64748b] text-xs">
            <span>Downtime Saved (This Month)</span>
            <CheckCircle2 className="w-4 h-4 text-[#4E8B6F]"/>
          </div>
          <p className="text-2xl font-bold font-mono text-[#0f172a] mt-2">₹18.4 Lakh</p>
          <span className="text-[11px] text-[#64748b]">Auto-routed around 2 bank spikes</span>
        </div>

        <div className="bg-[white] border border-[#0f172a]/[0.08] rounded-none p-5">
          <div className="flex items-center justify-between text-[#64748b] text-xs">
            <span>Active Acquirers</span>
            <Building className="w-4 h-4 text-[#0b63e5]"/>
          </div>
          <p className="text-2xl font-bold font-mono text-[#0f172a] mt-2">3 Connected</p>
          <span className="text-[11px] text-[#4E8B6F] font-mono">All health checks passing</span>
        </div>
      </div>

      {/* Gateway Traffic Distribution Table */}
      <div className="bg-[white] border border-[#0f172a]/[0.08] rounded-none p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-[#0f172a]">Connected Gateways & Split Ratio</h3>
            <p className="text-xs text-[#64748b]">Traffic is automatically adjusted dynamically based on live health checks</p>
          </div>
          <button type="button" className="px-3 py-1.5 rounded-[4px] bg-[#f8fafc] hover:bg-[#0f172a]/[0.05] border border-[#0f172a]/[0.12] text-xs font-semibold text-[#0f172a] flex items-center gap-1.5 transition-colors">
            <Plus className="w-3.5 h-3.5 text-[#0b63e5]"/>
            Connect New Acquirer
          </button>
        </div>

        <div className="space-y-3">
          {gateways.map((gw) => (<div key={gw.id} className="p-4 rounded-none bg-[#f8fafc] border border-[#0f172a]/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-[2px] bg-[white] border border-[#0f172a]/[0.12] flex items-center justify-center text-[#0b63e5] font-bold font-mono text-xs">
                  {gw.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#0f172a]">{gw.name}</h4>
                  <div className="flex items-center gap-3 text-xs text-[#64748b] mt-0.5 font-mono">
                    <span>Latency: <strong className="text-[#0f172a]">{gw.latencyMs}ms</strong></span>
                    <span>•</span>
                    <span>Success Rate: <strong className="text-[#4E8B6F]">{gw.successRate}%</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-32">
                  <div className="flex justify-between text-xs mb-1 font-mono">
                    <span className="text-[#64748b]">Share</span>
                    <span className="font-bold text-[#0f172a]">{gw.sharePercent}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-none bg-[white] overflow-hidden">
                    <div className="h-full bg-[#0b63e5] rounded-none" style={{ width: `${gw.sharePercent}%` }}/>
                  </div>
                </div>

                <span className="inline-flex items-center px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-bold border border-[#4E8B6F] text-[#4E8B6F] bg-[#4E8B6F]/5">
                  {gw.status}
                </span>
              </div>
            </div>))}
        </div>
      </div>

      {/* Smart Routing Rules */}
      <div className="bg-[white] border border-[#0f172a]/[0.08] rounded-none p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-[#0f172a]">Custom Routing Rules</h3>
            <p className="text-xs text-[#64748b]">Define rules to route transactions based on card BIN, ticket size, or method</p>
          </div>
          <button type="button" className="px-3 py-1.5 rounded-[4px] bg-[#0b63e5] hover:bg-[#d8b030] text-xs font-semibold text-[#f8fafc] flex items-center gap-1.5 transition-colors">
            <Sliders className="w-3.5 h-3.5"/>
            Add Rule
          </button>
        </div>

        <div className="divide-y divide-[#0f172a]/[0.08]">
          {rules.map((rule) => (<div key={rule.id} className="py-3.5 flex items-center justify-between gap-4">
              <div>
                <span className="text-sm font-semibold text-[#0f172a] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-[2px] bg-[#f8fafc] border border-[#0f172a]/[0.12] text-[10px] font-mono flex items-center justify-center text-[#64748b]">
                    #{rule.priority}
                  </span>
                  {rule.title}
                </span>
                <p className="text-xs font-mono text-[#0b63e5] mt-1 pl-7">
                  IF {rule.condition} → ROUTE TO {rule.targetGateway}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-bold border border-[#4E8B6F] text-[#4E8B6F] bg-[#4E8B6F]/5">
                  Active
                </span>
              </div>
            </div>))}
        </div>
      </div>
    </div>);
};
