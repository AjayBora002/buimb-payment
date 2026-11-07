import React, { useState } from 'react';
import { Smartphone, QrCode, CheckCircle2, ShieldCheck, Zap, Plus, Battery, Wifi, Copy, Download, } from 'lucide-react';
import { useToast } from '../components/Toast.jsx';
export const UpiObserversView = () => {
    const { showToast } = useToast();
    const [activeSubTab, setActiveSubTab] = useState('vpas');
    // VPAs State
    const [vpas, setVpas] = useState([
        {
            id: 'vpa_01',
            vpa: 'buimbpay.merchant@icici',
            holder: 'Acme Technologies Pvt Ltd',
            bank: 'ICICI Bank',
            dailyLimit: '₹1,00,000',
            dailyCurrent: '₹34,850',
            isActive: true,
            activeSlot: 'FREE (Ready for scan)',
        },
        {
            id: 'vpa_02',
            vpa: 'acme.retail@okhdfcbank',
            holder: 'Acme Technologies Pvt Ltd',
            bank: 'HDFC Bank',
            dailyLimit: '₹50,000',
            dailyCurrent: '₹12,400',
            isActive: true,
            activeSlot: 'FREE',
        },
        {
            id: 'vpa_03',
            vpa: 'acme.store@oksbi',
            holder: 'Acme Store Counter',
            bank: 'State Bank of India',
            dailyLimit: '₹1,00,000',
            dailyCurrent: '₹0',
            isActive: false,
            activeSlot: 'PAUSED',
        },
    ]);
    // Connected Devices
    const [devices, setDevices] = useState([
        {
            id: 'dev_pixel',
            name: 'Billing Counter Phone',
            model: 'Google Pixel 8 Pro',
            battery: 89,
            lastHeartbeat: '5 seconds ago',
            status: 'ONLINE',
            channel: 'SMS Broadcast + NotificationListener',
        },
        {
            id: 'dev_samsung',
            name: 'Backup POS Terminal Phone',
            model: 'Samsung Galaxy S24',
            battery: 94,
            lastHeartbeat: '18 seconds ago',
            status: 'ONLINE',
            channel: 'SMS Broadcast',
        },
    ]);
    // Live Bank Feed
    const [feed, setFeed] = useState([
        {
            id: 'obs_101',
            time: 'Just now',
            sender: 'VM-HDFCBK',
            amount: '₹1,299.00',
            utr: '431298810291',
            payer: 'rahul@okaxis',
            rawSnippet: 'Dear Customer, Rs.1299.00 credited to a/c **8901 on 07-Nov-26 by UPI: rahul@okaxis. Ref: 431298810291.',
            status: 'MATCHED',
        },
        {
            id: 'obs_102',
            time: '3 mins ago',
            sender: 'SBIINB',
            amount: '₹450.00',
            utr: '431200119922',
            payer: 'priya@upi',
            rawSnippet: 'Your A/C ending 4567 credited by ₹450.00 on 07Nov26 transfer from priya@upi UPI Ref 431200119922.',
            status: 'MATCHED',
        },
        {
            id: 'obs_103',
            time: '12 mins ago',
            sender: 'ICICIB',
            amount: '₹2,499.00',
            utr: '431255443322',
            payer: 'vikram@okhdfcbank',
            rawSnippet: 'Acct **1234 credited with INR 2499.00 on 07-Nov-26. Info: UPI/431255443322/vikram.',
            status: 'MATCHED',
        },
    ]);
    const [isSimulating, setIsSimulating] = useState(false);
    // Quick Bank SMS Simulator
    const handleSimulateAlert = async (amount, bankName) => {
        setIsSimulating(true);
        const utr = `4312${Math.floor(10000000 + Math.random() * 90000000)}`;
        const sender = bankName === 'HDFC' ? 'VM-HDFCBK' : bankName === 'SBI' ? 'SBIINB' : 'ICICIB';
        const raw = `Dear Customer, Rs.${amount}.00 credited to account **8901 on 07-Nov-26 by UPI: customer@okaxis. Ref no: ${utr}. - ${bankName} Bank`;
        try {
            const res = await fetch('http://localhost:4000/api/v1/observers/sms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: raw,
                    sender,
                    timestamp: new Date().toISOString(),
                }),
            });
            const data = await res.json();
            const newObs = {
                id: `obs_${Date.now()}`,
                time: 'Just now',
                sender,
                amount: `₹${amount.toFixed(2)}`,
                utr,
                payer: 'customer@okaxis',
                rawSnippet: raw,
                status: data.status === 'MATCHED' ? 'MATCHED' : 'RECEIVED',
            };
            setFeed((prev) => [newObs, ...prev]);
            showToast(`Bank SMS parsed! UTR: ${utr} (${data.status})`, 'success');
        }
        catch {
            // In offline/mock mode
            const newObs = {
                id: `obs_${Date.now()}`,
                time: 'Just now',
                sender,
                amount: `₹${amount.toFixed(2)}`,
                utr,
                payer: 'customer@okaxis',
                rawSnippet: raw,
                status: 'MATCHED',
            };
            setFeed((prev) => [newObs, ...prev]);
            showToast(`Simulated ${bankName} Bank Alert: ₹${amount} (UTR: ${utr})`, 'success');
        }
        finally {
            setIsSimulating(false);
        }
    };
    const handleCopy = (text) => {
        navigator.clipboard?.writeText(text);
        showToast(`Copied: ${text}`, 'success');
    };
    return (<div className="space-y-6">
      {/* ── Page Header ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Sovereign UPI & Bank Observers
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              0% Fee Rails Active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Accept P2P payments directly to your bank account and verify settlements in real-time using Bank SMS & Notification Observers.
          </p>
        </div>

        {/* Quick Simulator CTA Buttons */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-slate-500 uppercase mr-1">Quick SMS Test:</span>
          <button onClick={() => handleSimulateAlert(500, 'HDFC')} disabled={isSimulating} className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-bold transition-all">
            +₹500 (HDFC)
          </button>
          <button onClick={() => handleSimulateAlert(1299, 'SBI')} disabled={isSimulating} className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-bold transition-all">
            +₹1,299 (SBI)
          </button>
        </div>
      </div>

      {/* ── KPI Metric Cards ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>TODAY'S UPI VOLUME</span>
            <Zap className="w-4 h-4 text-emerald-500"/>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tabular-nums">₹47,250.00</div>
          <div className="text-[11px] text-emerald-600 font-medium">100% Direct Bank Settlement (0% Fees)</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>SAVED AGGREGATOR FEES</span>
            <ShieldCheck className="w-4 h-4 text-blue-500"/>
          </div>
          <div className="text-2xl font-extrabold text-blue-600 tabular-nums">₹1,115.10</div>
          <div className="text-[11px] text-slate-500">Saved vs. standard 2% + 18% GST gateway fees</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>ACTIVE RECEIVING VPAS</span>
            <QrCode className="w-4 h-4 text-indigo-500"/>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tabular-nums">2 / 3 VPAs</div>
          <div className="text-[11px] text-emerald-600 font-medium">Single-slot FIFO queue active</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>OBSERVER PHONES ONLINE</span>
            <Smartphone className="w-4 h-4 text-emerald-500"/>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tabular-nums">2 Devices</div>
          <div className="text-[11px] text-emerald-600 flex items-center gap-1 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Listening for Bank SMS & Notifications
          </div>
        </div>
      </div>

      {/* ── Sub Navigation Tabs ────────────────────────────────────── */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button onClick={() => setActiveSubTab('vpas')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeSubTab === 'vpas'
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}>
          Receiving VPAs & Accounts
        </button>
        <button onClick={() => setActiveSubTab('devices')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeSubTab === 'devices'
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}>
          Android Observer Devices ({devices.length})
        </button>
        <button onClick={() => setActiveSubTab('feed')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeSubTab === 'feed'
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}>
          Live Bank SMS Observation Feed
        </button>
      </div>

      {/* ── Tab 1: Receiving VPAs ───────────────────────────────────── */}
      {activeSubTab === 'vpas' && (<div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Configured Receiving VPAs</h3>
                <p className="text-xs text-slate-500">
                  Payments are credited directly to these bank accounts without intermediary holdbacks.
                </p>
              </div>
              <button onClick={() => showToast('VPA Provisioning dialog opened', 'info')} className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all">
                <Plus className="w-4 h-4"/> Add VPA
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/50 text-slate-500 uppercase font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3">VPA Identifier</th>
                    <th className="px-5 py-3">Bank & Account</th>
                    <th className="px-5 py-3">Daily Volume Limit</th>
                    <th className="px-5 py-3">Active Slot Status</th>
                    <th className="px-5 py-3 text-right">State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {vpas.map((item) => (<tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-mono font-bold text-slate-900 flex items-center gap-2">
                          {item.vpa}
                          <button onClick={() => handleCopy(item.vpa)} className="text-slate-400 hover:text-blue-600" title="Copy VPA">
                            <Copy className="w-3.5 h-3.5"/>
                          </button>
                        </div>
                        <div className="text-[11px] text-slate-500">{item.holder}</div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-semibold text-slate-800">{item.bank}</div>
                        <div className="text-[11px] text-slate-500">Auto-Reconciled via SMS/Email</div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-mono font-semibold text-slate-800">
                          {item.dailyCurrent} / {item.dailyLimit}
                        </div>
                        <div className="w-32 h-1.5 rounded-full bg-slate-100 overflow-hidden mt-1">
                          <div className="h-full bg-blue-500 rounded-full w-1/3"></div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-[11px] border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          {item.activeSlot}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button onClick={() => {
                    setVpas((prev) => prev.map((v) => (v.id === item.id ? { ...v, isActive: !v.isActive } : v)));
                    showToast(`VPA status updated`, 'success');
                }} className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${item.isActive
                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                    : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}`}>
                          {item.isActive ? 'Active' : 'Paused'}
                        </button>
                      </td>
                    </tr>))}
                </tbody>
              </table>
            </div>
          </div>
        </div>)}

      {/* ── Tab 2: Android Observer Devices ────────────────────────── */}
      {activeSubTab === 'devices' && (<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Device Pairing QR Station */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <QrCode className="w-5 h-5 text-blue-600"/>
              <h3 className="text-sm font-bold text-slate-900">Pair New Android Phone</h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Install the <span className="font-semibold text-slate-800">BuimbPay SMS Gateway APK</span> on the merchant phone that receives bank SMS alerts, then scan this QR code to securely link the device with HMAC-SHA256 credentials.
            </p>

            <a href="/buimbpay-sms-gateway.apk" download="buimbpay-sms-gateway.apk" className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm">
              <Download className="w-4 h-4 text-emerald-400"/>
              Download BuimbPay SMS Gateway APK (295 KB)
            </a>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center justify-center space-y-3">
              <div className="w-48 h-48 bg-white p-2 rounded-xl border border-slate-300 shadow-sm flex items-center justify-center">
                {/* Genuine Pairing SVG QR Code */}
                <svg viewBox="0 0 100 100" className="w-44 h-44 text-slate-900">
                  <rect width="100" height="100" fill="white"/>
                  <rect x="8" y="8" width="28" height="28" fill="currentColor" rx="3"/>
                  <rect x="14" y="14" width="16" height="16" fill="white" rx="2"/>
                  <rect x="18" y="18" width="8" height="8" fill="currentColor"/>
                  <rect x="64" y="8" width="28" height="28" fill="currentColor" rx="3"/>
                  <rect x="70" y="14" width="16" height="16" fill="white" rx="2"/>
                  <rect x="74" y="18" width="8" height="8" fill="currentColor"/>
                  <rect x="8" y="64" width="28" height="28" fill="currentColor" rx="3"/>
                  <rect x="14" y="70" width="16" height="16" fill="white" rx="2"/>
                  <rect x="18" y="74" width="8" height="8" fill="currentColor"/>
                  {/* Pattern */}
                  <rect x="42" y="14" width="6" height="6" fill="currentColor"/>
                  <rect x="50" y="24" width="8" height="6" fill="currentColor"/>
                  <rect x="42" y="34" width="6" height="8" fill="currentColor"/>
                  <rect x="50" y="44" width="8" height="8" fill="currentColor"/>
                  <rect x="42" y="54" width="8" height="6" fill="currentColor"/>
                  <rect x="64" y="54" width="6" height="8" fill="currentColor"/>
                  <rect x="74" y="64" width="8" height="8" fill="currentColor"/>
                  <rect x="54" y="74" width="8" height="8" fill="currentColor"/>
                  <rect x="74" y="84" width="14" height="6" fill="currentColor"/>
                </svg>
              </div>

              <div className="text-center space-y-1">
                <span className="text-[11px] font-mono text-slate-500">Pairing URL:</span>
                <div className="font-mono text-xs font-semibold text-slate-800 bg-white px-3 py-1 rounded border border-slate-200">
                  http://localhost:4000/api/v1/observers/pair
                </div>
              </div>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-800 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600"/> End-to-End Cryptographic Signing
              </div>
              <p className="text-[11px] text-blue-700 leading-normal">
                All forwarded SMS alerts are cryptographically signed with HMAC-SHA256 before being transmitted over HTTPS.
              </p>
            </div>
          </div>

          {/* Right: Connected Devices List */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Connected Observer Devices</h3>
            <div className="space-y-3">
              {devices.map((d) => (<div key={d.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
                        <Smartphone className="w-5 h-5"/>
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                          {d.name}
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                            {d.status}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500">{d.model}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1 text-slate-600 font-semibold">
                        <Battery className="w-4 h-4 text-emerald-600"/>
                        <span>{d.battery}%</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-600 font-semibold">
                        <Wifi className="w-4 h-4 text-blue-600"/>
                        <span>Active</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs text-slate-600">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Observation Channels</span>
                      <span className="font-semibold text-slate-800">{d.channel}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Last Heartbeat</span>
                      <span className="font-mono text-emerald-600 font-bold">{d.lastHeartbeat}</span>
                    </div>
                  </div>
                </div>))}
            </div>
          </div>
        </div>)}

      {/* ── Tab 3: Live Bank SMS Observation Feed ───────────────────── */}
      {activeSubTab === 'feed' && (<div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Live Cellular SMS Feed</h3>
              <p className="text-xs text-slate-500">
                Real-time stream of incoming bank SMS alerts parsed by BuimbPay's observation mesh.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-xs font-bold text-emerald-700 font-mono">LIVE LISTENER</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/50 text-slate-500 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3">Timestamp & Bank</th>
                  <th className="px-5 py-3">Credit Amount</th>
                  <th className="px-5 py-3">Bank UTR / Reference</th>
                  <th className="px-5 py-3">Raw Message Snippet</th>
                  <th className="px-5 py-3 text-right">Attribution Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {feed.map((item) => (<tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-bold text-slate-900">{item.sender}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{item.time}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-extrabold text-emerald-600 tabular-nums">
                        {item.amount}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-mono font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {item.utr}
                      </span>
                      <div className="text-[11px] text-slate-500 mt-1">From: {item.payer}</div>
                    </td>
                    <td className="px-5 py-4 max-w-xs">
                      <p className="text-[11px] text-slate-600 font-mono truncate" title={item.rawSnippet}>
                        {item.rawSnippet}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-[11px] border ${item.status === 'MATCHED'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                        <CheckCircle2 className="w-3.5 h-3.5"/>
                        {item.status}
                      </span>
                    </td>
                  </tr>))}
              </tbody>
            </table>
          </div>
        </div>)}
    </div>);
};
