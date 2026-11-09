import React, { useState } from 'react';
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Plus,
  Sliders,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Filter,
  Zap,
  Lock,
  Smartphone,
  CreditCard,
  Globe,
  Trash2,
  X,
  RefreshCw,
  Eye,
  Info
} from 'lucide-react';
import { useToast } from '../components/Toast.jsx';

export const FraudPreventionView = () => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('rules');
  const [isShieldActive, setIsShieldActive] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [showAddRuleModal, setShowAddRuleModal] = useState(false);
  const [showAddBlocklistModal, setShowAddBlocklistModal] = useState(false);
  const [showAddAllowlistModal, setShowAddAllowlistModal] = useState(false);

  // New Rule Form State
  const [newRuleName, setNewRuleName] = useState('');
  const [newRuleDescription, setNewRuleDescription] = useState('');
  const [newRuleThreshold, setNewRuleThreshold] = useState('5');
  const [newRuleWindow, setNewRuleWindow] = useState('10 min');
  const [newRuleAction, setNewRuleAction] = useState('BLOCK');

  // New Blocklist Form State
  const [newBlockType, setNewBlockType] = useState('VPA');
  const [newBlockValue, setNewBlockValue] = useState('');
  const [newBlockReason, setNewBlockReason] = useState('Frequent chargeback dispute history');

  // New Allowlist Form State
  const [newAllowType, setNewAllowType] = useState('VPA');
  const [newAllowValue, setNewAllowValue] = useState('');
  const [newAllowNote, setNewAllowNote] = useState('Enterprise VIP wholesale partner');

  // Rules Data
  const [rules, setRules] = useState([
    {
      id: 'rule_vel_01',
      name: 'High-Velocity Card / VPA Abuse',
      description: 'Block multiple payment attempts exceeding 4 transactions in 10 minutes from identical Card BIN or UPI VPA.',
      threshold: '4 txns',
      window: '10 min',
      action: 'BLOCK',
      active: true,
      category: 'VELOCITY',
      triggeredCount: 42,
    },
    {
      id: 'rule_vel_02',
      name: 'New IP / Device High-Value Spike',
      description: 'Flag transactions above ₹25,000 originating from a first-time browser fingerprint or IP address.',
      threshold: '₹25,000.00',
      window: 'Per order',
      action: 'FLAG',
      active: true,
      category: 'ORDER_VALUE',
      triggeredCount: 18,
    },
    {
      id: 'rule_vel_03',
      name: 'State Geo-Location Mismatch',
      description: 'Enforce 3DS2 Step-up OTP if customer IP state differs from delivery shipping state.',
      threshold: 'State mismatch',
      window: 'Real-time',
      action: '3DS_CHALLENGE',
      active: true,
      category: 'GEOLOCATION',
      triggeredCount: 57,
    },
    {
      id: 'rule_vel_04',
      name: 'Burner Phone & Disposable Email Blocker',
      description: 'Auto-reject orders utilizing disposable email domains (e.g. temp-mail) or virtual VOIP mobile ranges.',
      threshold: 'Risk score > 75',
      window: 'Instant',
      action: 'BLOCK',
      active: true,
      category: 'SYNTHETIC_IDENTITY',
      triggeredCount: 19,
    },
    {
      id: 'rule_vel_05',
      name: 'International Card BIN Surcharge & 3DS2',
      description: 'Mandate strict EMV 3DS2 challenge on all cards issued outside India to neutralize cross-border chargebacks.',
      threshold: 'Non-INR BIN',
      window: 'Per txn',
      action: '3DS_CHALLENGE',
      active: true,
      category: 'CROSS_BORDER',
      triggeredCount: 6,
    },
  ]);

  // Blocklist Data
  const [blocklist, setBlocklist] = useState([
    { id: 'blk_01', type: 'VPA', value: 'scammer.fraud99@ybl', reason: 'Repeated friendly fraud chargeback claims', addedAt: '2026-09-18', blockedAttempts: 14 },
    { id: 'blk_02', type: 'PHONE', value: '+91 99999 00012', reason: 'Automated card testing bot cluster', addedAt: '2026-09-19', blockedAttempts: 31 },
    { id: 'blk_03', type: 'IP', value: '185.220.101.5', reason: 'Known Tor exit node proxy used in dictionary attacks', addedAt: '2026-09-20', blockedAttempts: 8 },
    { id: 'blk_04', type: 'CARD_BIN', value: '411111 (First 6)', reason: 'High chargeback velocity test card series', addedAt: '2026-09-21', blockedAttempts: 12 },
  ]);

  // Allowlist Data
  const [allowlist, setAllowlist] = useState([
    { id: 'alw_01', type: 'VPA', value: 'finance@infosys.com', note: 'Enterprise corporate SaaS client', addedAt: '2026-09-10' },
    { id: 'alw_02', type: 'PHONE', value: '+91 98450 12345', note: 'VIP High-net-worth recurring buyer', addedAt: '2026-09-14' },
    { id: 'alw_03', type: 'IP', value: '14.140.105.20', note: 'Headquarters corporate static IP gateway', addedAt: '2026-09-15' },
  ]);

  // Real-time Risk Audit Logs
  const [riskLogs] = useState([
    {
      id: 'risk_evt_991',
      time: '14:22:08',
      entity: '+91 99999 00012 (Phone)',
      amount: '₹4,500.00',
      riskScore: 92,
      riskLevel: 'CRITICAL',
      ruleTriggered: 'Burner Phone & Disposable Email Blocker',
      action: 'BLOCKED',
    },
    {
      id: 'risk_evt_992',
      time: '13:45:19',
      entity: 'vikram.joshi@example.com',
      amount: '₹34,000.00',
      riskScore: 68,
      riskLevel: 'HIGH',
      ruleTriggered: 'New IP / Device High-Value Spike',
      action: 'FLAGGED_REVIEW',
    },
    {
      id: 'risk_evt_993',
      time: '12:10:44',
      entity: '4242 •••• •••• 9012 (Card)',
      amount: '₹12,499.00',
      riskScore: 54,
      riskLevel: 'MEDIUM',
      ruleTriggered: 'State Geo-Location Mismatch',
      action: '3DS_CHALLENGED',
    },
    {
      id: 'risk_evt_994',
      time: '11:05:32',
      entity: 'priya.sharma@okhdfcbank',
      amount: '₹1,299.00',
      riskScore: 8,
      riskLevel: 'SAFE',
      ruleTriggered: 'None (Clean Behavioral Profile)',
      action: 'APPROVED',
    },
  ]);

  const toggleRule = (id) => {
    setRules(prev => prev.map(r => {
      if (r.id === id) {
        const next = !r.active;
        showToast(`Rule "${r.name}" has been ${next ? 'activated' : 'deactivated'}.`, next ? 'success' : 'info');
        return { ...r, active: next };
      }
      return r;
    }));
  };

  const handleAddRule = (e) => {
    e.preventDefault();
    if (!newRuleName.trim()) return;

    const created = {
      id: `rule_cust_${Math.random().toString(36).substring(2, 8)}`,
      name: newRuleName,
      description: newRuleDescription || `Custom threshold rule evaluated within ${newRuleWindow}`,
      threshold: newRuleThreshold,
      window: newRuleWindow,
      action: newRuleAction,
      active: true,
      category: 'CUSTOM',
      triggeredCount: 0,
    };

    setRules([created, ...rules]);
    setShowAddRuleModal(false);
    setNewRuleName('');
    setNewRuleDescription('');
    showToast(`Created custom fraud prevention rule "${created.name}".`, 'success');
  };

  const handleAddBlocklist = (e) => {
    e.preventDefault();
    if (!newBlockValue.trim()) return;

    const item = {
      id: `blk_${Math.random().toString(36).substring(2, 8)}`,
      type: newBlockType,
      value: newBlockValue,
      reason: newBlockReason,
      addedAt: new Date().toISOString().split('T')[0],
      blockedAttempts: 0,
    };

    setBlocklist([item, ...blocklist]);
    setShowAddBlocklistModal(false);
    setNewBlockValue('');
    showToast(`Added ${item.value} to blacklist.`, 'success');
  };

  const handleRemoveBlocklist = (id, val) => {
    setBlocklist(prev => prev.filter(b => b.id !== id));
    showToast(`Removed ${val} from blacklist.`, 'info');
  };

  const handleAddAllowlist = (e) => {
    e.preventDefault();
    if (!newAllowValue.trim()) return;

    const item = {
      id: `alw_${Math.random().toString(36).substring(2, 8)}`,
      type: newAllowType,
      value: newAllowValue,
      note: newAllowNote,
      addedAt: new Date().toISOString().split('T')[0],
    };

    setAllowlist([item, ...allowlist]);
    setShowAddAllowlistModal(false);
    setNewAllowValue('');
    showToast(`Added ${item.value} to whitelist.`, 'success');
  };

  const handleRemoveAllowlist = (id, val) => {
    setAllowlist(prev => prev.filter(a => a.id !== id));
    showToast(`Removed ${val} from whitelist.`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Header Shield Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
                <Shield className="w-5 h-5" />
              </span>
              <div>
                <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                  Fraud Prevention & Risk Shield
                </h1>
                <p className="text-xs text-slate-500 font-medium">
                  AI-Powered Anti-Fraud Engine · Velocity Throttling · Chargeback Shield
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-600">
              Master Shield Protection:
            </span>
            <button
              onClick={() => {
                const next = !isShieldActive;
                setIsShieldActive(next);
                showToast(`Fraud Prevention AI Shield ${next ? 'ACTIVATED' : 'PAUSED'}.`, next ? 'success' : 'error');
              }}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                isShieldActive ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isShieldActive ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500">Transactions Screened</span>
            <div className="text-2xl font-black text-slate-900 tabular-nums">48,291</div>
            <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> 99.8% Genuine Pass
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500">Suspicious Attacks Blocked</span>
            <div className="text-2xl font-black text-rose-600 tabular-nums">142</div>
            <div className="text-[11px] text-slate-500">
              ₹18.45L fraud averted
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500">Chargeback Ratio</span>
            <div className="text-2xl font-black text-emerald-600 tabular-nums">0.04%</div>
            <div className="text-[11px] text-slate-500">
              VISA threshold: &lt; 0.90%
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500">Active Velocity Rules</span>
            <div className="text-2xl font-black text-blue-600 tabular-nums">
              {rules.filter(r => r.active).length} / {rules.length}
            </div>
            <div className="text-[11px] text-slate-500">
              Real-time heuristic evaluation
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-1 overflow-x-auto">
          {[
            { id: 'rules', label: 'Velocity Rules', icon: Sliders, count: rules.length },
            { id: 'blocklist', label: 'Blacklist (Blocked)', icon: XCircle, count: blocklist.length },
            { id: 'allowlist', label: 'Whitelist (Allowed)', icon: CheckCircle2, count: allowlist.length },
            { id: 'logs', label: 'Real-time Risk Log', icon: Clock, count: riskLogs.length },
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  active
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                  active ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Action Button depending on Tab */}
        <div>
          {activeTab === 'rules' && (
            <button
              onClick={() => setShowAddRuleModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0b63e5] hover:bg-[#094eb8] text-white transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom Rule</span>
            </button>
          )}

          {activeTab === 'blocklist' && (
            <button
              onClick={() => setShowAddBlocklistModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add to Blacklist</span>
            </button>
          )}

          {activeTab === 'allowlist' && (
            <button
              onClick={() => setShowAddAllowlistModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add to Whitelist</span>
            </button>
          )}
        </div>
      </div>

      {/* Tab 1: Rules & Velocity Engine */}
      {activeTab === 'rules' && (
        <div className="space-y-3">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className={`p-4 rounded-xl border transition-all ${
                rule.active
                  ? 'bg-white border-slate-200 shadow-2xs'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900">{rule.name}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      rule.action === 'BLOCK'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : rule.action === 'FLAG'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                      Action: {rule.action}
                    </span>
                    {rule.triggeredCount > 0 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-100 text-slate-600">
                        {rule.triggeredCount}× triggered
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">{rule.description}</p>
                  <div className="flex items-center gap-4 text-[11px] font-mono text-slate-500 pt-1">
                    <span>Threshold: <strong className="text-slate-800">{rule.threshold}</strong></span>
                    <span>Window: <strong className="text-slate-800">{rule.window}</strong></span>
                    <span>Category: <span className="text-blue-600 font-semibold">{rule.category}</span></span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-500">
                    {rule.active ? 'Active' : 'Disabled'}
                  </span>
                  <button
                    onClick={() => toggleRule(rule.id)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${
                      rule.active ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                        rule.active ? 'translate-x-4.5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Blacklist (Blocked Entities) */}
      {activeTab === 'blocklist' && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">Blacklisted VPAs, Phone Numbers & IPs</span>
            <span className="text-[11px] text-slate-500">Auto-blocked at pre-order phase</span>
          </div>
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-4">Entity Type</th>
                <th className="py-3 px-4">Identifier / Value</th>
                <th className="py-3 px-4">Reason for Block</th>
                <th className="py-3 px-4">Date Added</th>
                <th className="py-3 px-4 text-center">Blocks Prevented</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {blocklist.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 font-bold text-rose-600">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-rose-50 border border-rose-200">
                      {item.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-800">
                    {item.value}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {item.reason}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">
                    {item.addedAt}
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-slate-800">
                    {item.blockedAttempts}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleRemoveBlocklist(item.id, item.value)}
                      className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Unblock"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: Whitelist (Allowed VIPs) */}
      {activeTab === 'allowlist' && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">Whitelisted Trusted Entities</span>
            <span className="text-[11px] text-slate-500">Exempt from velocity limits</span>
          </div>
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-4">Entity Type</th>
                <th className="py-3 px-4">Identifier / Value</th>
                <th className="py-3 px-4">Verification Note</th>
                <th className="py-3 px-4">Date Added</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {allowlist.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-600">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-50 border border-emerald-200">
                      {item.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-800">
                    {item.value}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {item.note}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">
                    {item.addedAt}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleRemoveAllowlist(item.id, item.value)}
                      className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Remove from Whitelist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 4: Live Real-time Risk Logs */}
      {activeTab === 'logs' && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-800">Live AI Scoring Feed</span>
            </div>
            <span className="text-[11px] text-slate-500">Auto-refreshed every 2 seconds</span>
          </div>

          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Entity Evaluated</th>
                <th className="py-3 px-4">Order Value</th>
                <th className="py-3 px-4">Risk Score</th>
                <th className="py-3 px-4">Rule Matched</th>
                <th className="py-3 px-4 text-right">Automated Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {riskLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">{log.time}</td>
                  <td className="py-3 px-4 font-medium text-slate-800">{log.entity}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-900">{log.amount}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className={`font-mono font-bold ${
                        log.riskScore > 70 ? 'text-rose-600' : log.riskScore > 40 ? 'text-amber-600' : 'text-emerald-600'
                      }`}>
                        {log.riskScore}/100
                      </span>
                      <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase ${
                        log.riskScore > 70 ? 'bg-rose-100 text-rose-800' : log.riskScore > 40 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {log.riskLevel}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{log.ruleTriggered}</td>
                  <td className="py-3 px-4 text-right">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                      log.action === 'BLOCKED'
                        ? 'bg-rose-100 text-rose-800 border border-rose-200'
                        : log.action === 'FLAGGED_REVIEW'
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : log.action === '3DS_CHALLENGED'
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}>
                      {log.action}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Rule Modal */}
      {showAddRuleModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">Create Custom Velocity Rule</h3>
              <button
                onClick={() => setShowAddRuleModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddRule} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Rule Name</label>
                <input
                  type="text"
                  placeholder="e.g., Midnight Transaction Velocity Cap"
                  value={newRuleName}
                  onChange={(e) => setNewRuleName(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Description</label>
                <input
                  type="text"
                  placeholder="Details on what trigger condition to evaluate..."
                  value={newRuleDescription}
                  onChange={(e) => setNewRuleDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Threshold</label>
                  <input
                    type="text"
                    placeholder="e.g. 5 attempts"
                    value={newRuleThreshold}
                    onChange={(e) => setNewRuleThreshold(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Time Window</label>
                  <input
                    type="text"
                    placeholder="e.g. 10 min"
                    value={newRuleWindow}
                    onChange={(e) => setNewRuleWindow(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Trigger Action</label>
                <select
                  value={newRuleAction}
                  onChange={(e) => setNewRuleAction(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="BLOCK">BLOCK (Instantly decline transaction)</option>
                  <option value="FLAG">FLAG (Hold for manual merchant review)</option>
                  <option value="3DS_CHALLENGE">3DS_CHALLENGE (Enforce OTP SMS)</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddRuleModal(false)}
                  className="flex-1 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-[#0b63e5] hover:bg-[#094eb8] font-bold text-white cursor-pointer"
                >
                  Save Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Blocklist Modal */}
      {showAddBlocklistModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">Add to Fraud Blacklist</h3>
              <button
                onClick={() => setShowAddBlocklistModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddBlocklist} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Entity Type</label>
                <select
                  value={newBlockType}
                  onChange={(e) => setNewBlockType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="VPA">UPI VPA (e.g. user@bank)</option>
                  <option value="PHONE">Mobile Phone Number</option>
                  <option value="IP">IP Address</option>
                  <option value="CARD_BIN">Card BIN (First 6 digits)</option>
                  <option value="EMAIL_DOMAIN">Email Domain</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Identifier Value</label>
                <input
                  type="text"
                  placeholder="e.g., suspicious.user@okhdfcbank"
                  value={newBlockValue}
                  onChange={(e) => setNewBlockValue(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Reason for Blacklisting</label>
                <input
                  type="text"
                  value={newBlockReason}
                  onChange={(e) => setNewBlockReason(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddBlocklistModal(false)}
                  className="flex-1 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 font-bold text-white cursor-pointer"
                >
                  Blacklist Entity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Allowlist Modal */}
      {showAddAllowlistModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">Add to Trusted Whitelist</h3>
              <button
                onClick={() => setShowAddAllowlistModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddAllowlist} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Entity Type</label>
                <select
                  value={newAllowType}
                  onChange={(e) => setNewAllowType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="VPA">UPI VPA</option>
                  <option value="PHONE">Mobile Phone</option>
                  <option value="IP">Static Corporate IP</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Identifier Value</label>
                <input
                  type="text"
                  placeholder="e.g., corporate.billing@tcs.com"
                  value={newAllowValue}
                  onChange={(e) => setNewAllowValue(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Verification Note</label>
                <input
                  type="text"
                  value={newAllowNote}
                  onChange={(e) => setNewAllowNote(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddAllowlistModal(false)}
                  className="flex-1 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 font-bold text-white cursor-pointer"
                >
                  Whitelist Entity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

