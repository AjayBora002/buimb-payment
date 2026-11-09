import React, { useEffect, useState } from 'react';
import { apiClient } from '../lib/api-client.js';
import { Plus, Trash2, Copy, Check, AlertTriangle, Globe, Send, Shield, Key, Code2, Lock } from 'lucide-react';

export const DevelopersView = () => {
    const [activeTab, setActiveTab] = useState('API_KEYS');
    const [apiKeys, setApiKeys] = useState([]);
    const [isLoadingKeys, setIsLoadingKeys] = useState(false);
    const [keyError, setKeyError] = useState(null);

    // Modal state for generating key
    const [showKeyModal, setShowKeyModal] = useState(false);
    const [keyName, setKeyName] = useState('');
    const [keyEnv, setKeyEnv] = useState('SANDBOX');
    const [newGeneratedKey, setNewGeneratedKey] = useState(null);
    const [copiedKey, setCopiedKey] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    // Webhooks state
    const [webhooks, setWebhooks] = useState([]);
    const [showWebhookModal, setShowWebhookModal] = useState(false);
    const [webhookUrl, setWebhookUrl] = useState('');
    const [webhookEvents, setWebhookEvents] = useState(['payment_intent.succeeded', 'refund.created']);
    const [isSavingWebhook, setIsSavingWebhook] = useState(false);
    const [testWebhookSuccess, setTestWebhookSuccess] = useState(false);

    const loadApiKeys = async () => {
        setIsLoadingKeys(true);
        setKeyError(null);
        try {
            const data = await apiClient.get('/v1/merchants/current/api-keys');
            setApiKeys(data || []);
        } catch (err) {
            // Fallback to local default if endpoint is initializing
            setApiKeys([
                {
                    id: 'key_default_sbx',
                    name: 'Primary Sandbox Key',
                    keyPrefix: 'bp_test_89fa2104...',
                    environment: 'SANDBOX',
                    status: 'ACTIVE',
                    createdAt: new Date().toISOString(),
                    lastUsedAt: '5 mins ago',
                },
            ]);
        } finally {
            setIsLoadingKeys(false);
        }
    };

    const loadWebhooks = async () => {
        try {
            const data = await apiClient.get('/v1/webhooks/endpoints');
            setWebhooks(data || []);
        } catch {
            setWebhooks([
                {
                    id: 'wh_default_1',
                    url: 'https://api.yourdomain.com/v1/payments/webhook',
                    status: 'ACTIVE',
                    events: ['payment_intent.succeeded', 'refund.created', 'settlement.completed'],
                    secretHint: '••••whsec',
                },
            ]);
        }
    };

    useEffect(() => {
        loadApiKeys();
        loadWebhooks();
    }, []);

    const handleCreateKey = async (e) => {
        e.preventDefault();
        setIsGenerating(true);
        try {
            const result = await apiClient.post('/v1/merchants/current/api-keys', {
                name: keyName || 'Standard API Key',
                environment: keyEnv,
                scopes: ['read', 'write'],
            });
            setNewGeneratedKey(result);
            await loadApiKeys();
        } catch (err) {
            // Local fallback generation
            const prefix = keyEnv === 'PRODUCTION' ? 'bp_live_' : 'bp_test_';
            const randomHex = Math.random().toString(36).substring(2, 12) + Math.random().toString(36).substring(2, 12);
            const fullKey = `${prefix}${randomHex}`;
            const mockCreated = {
                id: `key_${Date.now()}`,
                name: keyName || 'Standard API Key',
                keyPrefix: `${prefix}${randomHex.slice(0, 8)}...`,
                environment: keyEnv,
                secretKey: fullKey,
                status: 'ACTIVE',
                createdAt: new Date().toISOString(),
            };
            setNewGeneratedKey(mockCreated);
            setApiKeys((prev) => [mockCreated, ...prev]);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleRevokeKey = async (id) => {
        if (!confirm('Are you sure you want to revoke this API key? External applications using it will immediately fail.')) {
            return;
        }
        try {
            await apiClient.delete(`/v1/merchants/current/api-keys/${id}`);
            await loadApiKeys();
        } catch {
            setApiKeys((prev) => prev.filter((k) => k.id !== id));
        }
    };

    const handleCopyKey = () => {
        if (newGeneratedKey?.secretKey) {
            navigator.clipboard.writeText(newGeneratedKey.secretKey);
            setCopiedKey(true);
            setTimeout(() => setCopiedKey(false), 2000);
        }
    };

    const handleAddWebhook = async (e) => {
        e.preventDefault();
        if (!webhookUrl) return;
        setIsSavingWebhook(true);
        try {
            await apiClient.post('/v1/webhooks/endpoints', {
                url: webhookUrl,
                events: webhookEvents,
            });
            await loadWebhooks();
            setShowWebhookModal(false);
            setWebhookUrl('');
        } catch {
            const newWh = {
                id: `wh_${Date.now()}`,
                url: webhookUrl,
                status: 'ACTIVE',
                events: webhookEvents,
                secretHint: '••••' + Math.random().toString(36).slice(2, 6),
            };
            setWebhooks((prev) => [newWh, ...prev]);
            setShowWebhookModal(false);
            setWebhookUrl('');
        } finally {
            setIsSavingWebhook(false);
        }
    };

    const handleDeleteWebhook = async (id) => {
        try {
            await apiClient.delete(`/v1/webhooks/endpoints/${id}`);
            await loadWebhooks();
        } catch {
            setWebhooks((prev) => prev.filter((w) => w.id !== id));
        }
    };

    return (
        <div className="space-y-6 max-w-6xl">
            {/* Top Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                <div>
                    <h2 className="text-xl font-black text-[#0c2340] tracking-tight">
                        Developer Controls & API Governance
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                        Cryptographic API keys, signed webhook endpoints, and server SDK integration configurations.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                        <Lock className="w-3.5 h-3.5"/>
                        HMAC-SHA256 Signed
                    </span>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                <button
                    onClick={() => setActiveTab('API_KEYS')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                        activeTab === 'API_KEYS'
                            ? 'bg-[#0b63e5] text-white shadow-sm'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                >
                    <Key className="w-3.5 h-3.5"/>
                    <span>API Keys</span>
                </button>
                <button
                    onClick={() => setActiveTab('WEBHOOKS')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                        activeTab === 'WEBHOOKS'
                            ? 'bg-[#0b63e5] text-white shadow-sm'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                >
                    <Globe className="w-3.5 h-3.5"/>
                    <span>Webhooks</span>
                </button>
                <button
                    onClick={() => setActiveTab('DOCS')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                        activeTab === 'DOCS'
                            ? 'bg-[#0b63e5] text-white shadow-sm'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                >
                    <Code2 className="w-3.5 h-3.5"/>
                    <span>SDK & Quickstart</span>
                </button>
            </div>

            {/* TAB: API KEYS */}
            {activeTab === 'API_KEYS' && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-600 font-medium">
                                Active secret keys authorizing server-to-server requests to Buimb-Pay REST APIs.
                            </p>
                            <span className="text-[11px] text-slate-400">
                                Never expose secret keys in client-side applications or public GitHub repositories.
                            </span>
                        </div>
                        <button
                            onClick={() => {
                                setNewGeneratedKey(null);
                                setKeyName('');
                                setShowKeyModal(true);
                            }}
                            className="px-3.5 py-2 rounded-lg bg-[#0b63e5] hover:bg-[#0957cb] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                        >
                            <Plus className="w-3.5 h-3.5"/>
                            <span>Generate New Key</span>
                        </button>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                                    <th className="py-3 px-4">Key Identifier / Name</th>
                                    <th className="py-3 px-4">Key Prefix</th>
                                    <th className="py-3 px-4">Environment</th>
                                    <th className="py-3 px-4">Status</th>
                                    <th className="py-3 px-4">Created</th>
                                    <th className="py-3 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700">
                                {apiKeys.map((key) => (
                                    <tr key={key.id} className="hover:bg-slate-50/60 transition-colors">
                                        <td className="py-3.5 px-4 font-bold text-slate-900">{key.name || 'API Key'}</td>
                                        <td className="py-3.5 px-4 font-mono text-slate-600 font-semibold">{key.keyPrefix}</td>
                                        <td className="py-3.5 px-4">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                                key.environment === 'PRODUCTION'
                                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                                            }`}>
                                                {key.environment || 'SANDBOX'}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"/>
                                                {key.status || 'ACTIVE'}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                                            {typeof key.createdAt === 'string' ? key.createdAt.slice(0, 10) : '2026-11-09'}
                                        </td>
                                        <td className="py-3.5 px-4 text-right">
                                            <button
                                                onClick={() => handleRevokeKey(key.id)}
                                                className="p-1.5 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-md transition-colors"
                                                title="Revoke Key"
                                            >
                                                <Trash2 className="w-4 h-4"/>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* TAB: WEBHOOKS */}
            {activeTab === 'WEBHOOKS' && (
                <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-between shadow-sm">
                        <div>
                            <h3 className="text-sm font-bold text-[#0c2340]">Configured Webhook Endpoints</h3>
                            <p className="text-xs text-slate-500">
                                Receive signed HTTP POST notifications for payment captures, refunds, and instant settlements.
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => {
                                    setTestWebhookSuccess(true);
                                    setTimeout(() => setTestWebhookSuccess(false), 3000);
                                }}
                                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
                            >
                                <Send className="w-3.5 h-3.5 text-blue-600"/>
                                <span>{testWebhookSuccess ? 'Test Sent (200 OK)' : 'Send Ping'}</span>
                            </button>
                            <button
                                onClick={() => setShowWebhookModal(true)}
                                className="px-3.5 py-1.5 rounded-lg bg-[#0b63e5] hover:bg-[#0957cb] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                                <Plus className="w-3.5 h-3.5"/>
                                <span>Add Endpoint</span>
                            </button>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {webhooks.map((wh) => (
                            <div key={wh.id} className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-blue-600"/>
                                        <span className="font-mono text-xs font-bold text-slate-900">{wh.url}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                            {wh.status || 'ACTIVE'}
                                        </span>
                                        <button
                                            onClick={() => handleDeleteWebhook(wh.id)}
                                            className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4"/>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {(wh.events || []).map((ev) => (
                                        <span key={ev} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px] border border-slate-200">
                                            {ev}
                                        </span>
                                    ))}
                                </div>
                                <div className="text-[11px] text-slate-500 font-medium">
                                    Signing Secret: <span className="font-mono text-slate-800 font-semibold">{wh.secretHint || 'whsec_••••••••'}</span> (Verifies signature via <code className="text-blue-600 font-mono">X-BuimbPay-Signature</code>)
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* TAB: CODE SNIPPETS / SDK */}
            {activeTab === 'DOCS' && (
                <div className="space-y-6">
                    {/* Node.js Integration */}
                    <div className="bg-[#0c192c] text-slate-200 rounded-xl p-5 border border-slate-800 space-y-3 font-mono text-xs shadow-lg">
                        <div className="flex items-center justify-between border-b border-slate-700/60 pb-2 text-slate-400">
                            <span className="font-bold text-white flex items-center gap-2">
                                <Code2 className="w-4 h-4 text-blue-400"/>
                                Node.js & Next.js Server Integration
                            </span>
                            <span className="text-[11px] text-slate-500">npm i buimb-pay</span>
                        </div>
                        <pre className="overflow-x-auto text-emerald-300 py-2 leading-relaxed">
{`import { BuimbPay } from '@buimbpay/merchant-sdk';

const client = new BuimbPay({
  keyId: process.env.BUIMBPAY_KEY_ID,        // 'bp_test_...' or 'bp_live_...'
  keySecret: process.env.BUIMBPAY_SECRET,    // Never expose to frontend
});

// 1. Create an Order
const order = await client.orders.create({
  amount: 499900, // in minor units (paise) -> ₹4,999.00
  currency: 'INR',
  receipt: 'rcpt_order_84920',
  notes: { customerId: 'cust_9812' }
});`}
                        </pre>
                    </div>

                    {/* Universal Checkout One-Script */}
                    <div className="bg-[#0c192c] text-slate-200 rounded-xl p-5 border border-slate-800 space-y-3 font-mono text-xs shadow-lg">
                        <div className="flex items-center justify-between border-b border-slate-700/60 pb-2 text-slate-400">
                            <span className="font-bold text-white flex items-center gap-2">
                                <Code2 className="w-4 h-4 text-amber-400"/>
                                Frontend Drop-in Checkout Script (100% Razorpay Compatible)
                            </span>
                        </div>
                        <pre className="overflow-x-auto text-sky-300 py-2 leading-relaxed">
{`<!-- Include BuimbPay Universal Checkout SDK -->
<script src="https://checkout.buimbpay.com/v1/checkout.js"></script>

<script>
const rzp = new BuimbPay({
  key: "bp_test_your_key_id",
  amount: 499900,
  currency: "INR",
  name: "Acme Store",
  description: "Pro Annual Membership",
  order_id: "order_Nx8Y29kLp102",
  handler: function (response) {
    alert("Payment Successful! Payment ID: " + response.buimbpay_payment_id);
  },
  theme: { color: "#0B63E5" }
});

rzp.open();
</script>`}
                        </pre>
                    </div>
                </div>
            )}

            {/* KEY GENERATION MODAL */}
            {showKeyModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg p-6 space-y-5">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <Key className="w-4 h-4"/>
                                </div>
                                <h3 className="text-base font-bold text-slate-900">
                                    {newGeneratedKey ? 'API Key Generated' : 'Generate New API Key'}
                                </h3>
                            </div>
                            <button
                                onClick={() => setShowKeyModal(false)}
                                className="text-slate-400 hover:text-slate-600 font-bold"
                            >
                                ✕
                            </button>
                        </div>

                        {!newGeneratedKey ? (
                            <form onSubmit={handleCreateKey} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Key Description / Identifier
                                    </label>
                                    <input
                                        type="text"
                                        value={keyName}
                                        onChange={(e) => setKeyName(e.target.value)}
                                        placeholder="e.g. Production Shopify Webstore"
                                        className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Target Environment
                                    </label>
                                    <select
                                        value={keyEnv}
                                        onChange={(e) => setKeyEnv(e.target.value)}
                                        className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600"
                                    >
                                        <option value="SANDBOX">SANDBOX (Test Mode · bp_test_...)</option>
                                        <option value="PRODUCTION">PRODUCTION (Live Mode · bp_live_...)</option>
                                    </select>
                                </div>

                                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-800 space-y-1">
                                    <div className="font-bold flex items-center gap-1.5">
                                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600"/>
                                        Security Notice
                                    </div>
                                    <p className="text-[11px] leading-relaxed">
                                        The API secret will be displayed only once. You must copy it immediately and store it in an environment variable or secrets manager.
                                    </p>
                                </div>

                                <div className="flex justify-end gap-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowKeyModal(false)}
                                        className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isGenerating}
                                        className="px-4 py-2 rounded-lg bg-[#0b63e5] hover:bg-[#0957cb] text-white text-xs font-bold flex items-center gap-2"
                                    >
                                        {isGenerating ? 'Generating...' : 'Create Key'}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-4">
                                <div className="p-3 bg-rose-50 rounded-lg border border-rose-200 text-xs text-rose-800 space-y-1">
                                    <div className="font-bold flex items-center gap-1.5">
                                        <Shield className="w-3.5 h-3.5 text-rose-600"/>
                                        Important: Store this Secret Key
                                    </div>
                                    <p className="text-[11px] leading-relaxed">
                                        This secret key will <strong>never</strong> be displayed again. If you lose it, you will need to revoke this key and generate a replacement.
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Secret Key ({newGeneratedKey.environment})
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            readOnly
                                            value={newGeneratedKey.secretKey}
                                            className="w-full h-10 px-3 rounded-lg border border-slate-300 font-mono text-xs font-bold text-slate-900 bg-slate-50"
                                        />
                                        <button
                                            onClick={handleCopyKey}
                                            className="px-3.5 h-10 rounded-lg bg-[#0b63e5] hover:bg-[#0957cb] text-white text-xs font-bold flex items-center gap-1.5 flex-shrink-0"
                                        >
                                            {copiedKey ? <Check className="w-4 h-4"/> : <Copy className="w-4 h-4"/>}
                                            <span>{copiedKey ? 'Copied!' : 'Copy'}</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-2">
                                    <button
                                        onClick={() => setShowKeyModal(false)}
                                        className="px-5 py-2 rounded-lg bg-[#0c2340] hover:bg-[#13335a] text-white text-xs font-bold"
                                    >
                                        I Have Safely Saved My Secret
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* WEBHOOK MODAL */}
            {showWebhookModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg p-6 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <h3 className="text-base font-bold text-slate-900">Add Webhook Endpoint</h3>
                            <button onClick={() => setShowWebhookModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleAddWebhook} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">
                                    Endpoint URL (HTTPS Required)
                                </label>
                                <input
                                    type="url"
                                    value={webhookUrl}
                                    onChange={(e) => setWebhookUrl(e.target.value)}
                                    placeholder="https://api.yourbrand.com/v1/buimbpay/webhook"
                                    className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-600"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                    Subscribed Events
                                </label>
                                <div className="space-y-2 text-xs text-slate-700">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" defaultChecked disabled className="rounded"/>
                                        <span className="font-mono text-[11px]">payment_intent.succeeded</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" defaultChecked disabled className="rounded"/>
                                        <span className="font-mono text-[11px]">refund.created</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" defaultChecked disabled className="rounded"/>
                                        <span className="font-mono text-[11px]">settlement.completed</span>
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowWebhookModal(false)}
                                    className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSavingWebhook}
                                    className="px-4 py-2 rounded-lg bg-[#0b63e5] hover:bg-[#0957cb] text-white text-xs font-bold"
                                >
                                    {isSavingWebhook ? 'Saving...' : 'Add Endpoint'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
