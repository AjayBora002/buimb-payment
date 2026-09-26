import React, { useState } from 'react';
import { Key, Plus, Trash2, Copy, Check, AlertTriangle, Terminal, Globe, Send } from 'lucide-react';

export const DevelopersView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'API_KEYS' | 'WEBHOOKS' | 'DOCS'>('API_KEYS');
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [newKeyGenerated, setNewKeyGenerated] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);

  const [apiKeys, setApiKeys] = useState([
    {
      id: 'key_1',
      name: 'Default Sandbox Key',
      prefix: 'bp_test_89fa2104...',
      env: 'SANDBOX',
      created: '2026-09-18',
      lastUsed: '12 mins ago',
    },
    {
      id: 'key_2',
      name: 'Backend Microservice',
      prefix: 'bp_test_412c988b...',
      env: 'SANDBOX',
      created: '2026-09-15',
      lastUsed: '2 days ago',
    },
  ]);

  const [webhooks, setWebhooks] = useState([
    {
      id: 'wh_1',
      url: 'https://api.mybrand.com/v1/payments/webhook',
      secretHint: '••••7a9f',
      events: ['payment_intent.succeeded', 'refund.created', 'settlement.completed'],
      status: 'ACTIVE',
    },
  ]);

  const handleGenerateKey = (name: string) => {
    const rawSecret = `bp_test_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    setNewKeyGenerated(rawSecret);
    setApiKeys([
      {
        id: `key_${Date.now()}`,
        name: name || 'API Key',
        prefix: `${rawSecret.slice(0, 16)}...`,
        env: 'SANDBOX',
        created: new Date().toISOString().slice(0, 10),
        lastUsed: 'Never',
      },
      ...apiKeys,
    ]);
  };

  const handleCopyKey = () => {
    if (newKeyGenerated) {
      navigator.clipboard.writeText(newKeyGenerated);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-[#EDE7D6] tracking-tight">Developer Center</h2>
        <div className="w-8 h-0.5 bg-[#C9A227] mt-1" />
        <p className="text-xs text-[#8FA396] mt-1.5">API keys, webhook endpoints, and integration tools</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#EDE7D6]/[0.08] pb-2">
        <button
          onClick={() => setActiveTab('API_KEYS')}
          className={`px-3 py-1.5 rounded-[4px] text-xs font-semibold transition-colors ${
            activeTab === 'API_KEYS'
              ? 'bg-[#C9A227] text-[#131B17]'
              : 'text-[#8FA396] hover:text-[#EDE7D6]'
          }`}
        >
          API Keys
        </button>
        <button
          onClick={() => setActiveTab('WEBHOOKS')}
          className={`px-3 py-1.5 rounded-[4px] text-xs font-semibold transition-colors ${
            activeTab === 'WEBHOOKS'
              ? 'bg-[#C9A227] text-[#131B17]'
              : 'text-[#8FA396] hover:text-[#EDE7D6]'
          }`}
        >
          Webhooks
        </button>
        <button
          onClick={() => setActiveTab('DOCS')}
          className={`px-3 py-1.5 rounded-[4px] text-xs font-semibold transition-colors ${
            activeTab === 'DOCS'
              ? 'bg-[#C9A227] text-[#131B17]'
              : 'text-[#8FA396] hover:text-[#EDE7D6]'
          }`}
        >
          Code Snippets
        </button>
      </div>

      {/* API Keys Tab */}
      {activeTab === 'API_KEYS' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#8FA396]">
              API keys allow external servers to authenticate with BuimbPay REST APIs.
            </p>
            <button
              onClick={() => {
                setNewKeyGenerated(null);
                setShowKeyModal(true);
              }}
              className="px-4 py-2 rounded-[4px] bg-[#C9A227] hover:bg-[#d8b030] text-[#131B17] text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Generate API Key
            </button>
          </div>

          <div className="rounded-none bg-[#1D2E28] border border-[#EDE7D6]/[0.08] overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#EDE7D6]/[0.08] bg-[#131B17]/60 text-[#8FA396] font-medium">
                  <th className="py-3.5 px-4">Name</th>
                  <th className="py-3.5 px-4">Key Prefix</th>
                  <th className="py-3.5 px-4">Environment</th>
                  <th className="py-3.5 px-4">Created</th>
                  <th className="py-3.5 px-4">Last Used</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDE7D6]/[0.08]">
                {apiKeys.map((key) => (
                  <tr key={key.id} className="hover:bg-[#EDE7D6]/[0.02]">
                    <td className="py-3.5 px-4 text-[#EDE7D6] font-medium">{key.name}</td>
                    <td className="py-3.5 px-4 font-mono text-[#8FA396]">{key.prefix}</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-bold border border-[#C98A2E] text-[#C98A2E] bg-[#C98A2E]/5">
                        {key.env}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#8FA396] font-mono">{key.created}</td>
                    <td className="py-3.5 px-4 text-[#8FA396] font-mono">{key.lastUsed}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setApiKeys(apiKeys.filter((k) => k.id !== key.id))}
                        className="text-[#B0503F] hover:text-[#d46a56] p-1 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Webhooks Tab */}
      {activeTab === 'WEBHOOKS' && (
        <div className="space-y-4">
          <div className="p-4 rounded-none bg-[#1D2E28] border border-[#EDE7D6]/[0.08] flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-[#EDE7D6]">Configured Webhook Endpoints</h3>
              <p className="text-xs text-[#8FA396]">Receive real-time signed HTTP POST payloads for transaction events</p>
            </div>
            <button
              onClick={() => alert('Webhook simulated payload sent!')}
              className="px-3.5 py-1.5 rounded-[4px] bg-[#131B17] hover:bg-[#EDE7D6]/[0.05] border border-[#EDE7D6]/[0.12] text-[#EDE7D6] text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-[#C9A227]" />
              Send Test Webhook
            </button>
          </div>

          <div className="space-y-3">
            {webhooks.map((wh) => (
              <div
                key={wh.id}
                className="p-4 rounded-none bg-[#1D2E28] border border-[#EDE7D6]/[0.08] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#C9A227]" />
                    <span className="font-mono text-xs font-semibold text-[#EDE7D6]">{wh.url}</span>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-bold border border-[#4E8B6F] text-[#4E8B6F] bg-[#4E8B6F]/5">
                    {wh.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {wh.events.map((ev) => (
                    <span
                      key={ev}
                      className="px-2 py-0.5 rounded-[2px] bg-[#131B17] border border-[#EDE7D6]/[0.08] font-mono text-[10px] text-[#EDE7D6]"
                    >
                      {ev}
                    </span>
                  ))}
                </div>
                <div className="text-[11px] text-[#8FA396]">
                  Signing Secret Hint: <span className="font-mono text-[#EDE7D6]">{wh.secretHint}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Code Snippets */}
      {activeTab === 'DOCS' && (
        <div className="space-y-4">
          <div className="rounded-none bg-[#131B17] border border-[#EDE7D6]/[0.08] p-4 space-y-3">
            <div className="flex items-center justify-between text-xs text-[#8FA396] border-b border-[#EDE7D6]/[0.08] pb-2">
              <span className="font-mono text-[#EDE7D6]">Create Order & Payment Intent (cURL)</span>
            </div>
            <pre className="text-xs font-mono text-[#EDE7D6] overflow-x-auto p-2">
{`curl -X POST http://localhost:4000/v1/orders \\
  -H "Authorization: Bearer bp_test_your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 500000,
    "currency": "INR",
    "description": "Order #89212"
  }'`}
            </pre>
          </div>

          <div className="rounded-none bg-[#131B17] border border-[#EDE7D6]/[0.08] p-4 space-y-3">
            <div className="flex items-center justify-between text-xs text-[#8FA396] border-b border-[#EDE7D6]/[0.08] pb-2">
              <span className="font-mono text-[#EDE7D6]">Confirm Payment Intent (Node.js)</span>
            </div>
            <pre className="text-xs font-mono text-[#4E8B6F] overflow-x-auto p-2">
{`const res = await fetch("http://localhost:4000/v1/payment-intents/pi_123/confirm", {
  method: "POST",
  headers: {
    "Authorization": "Bearer bp_test_your_api_key",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    paymentMethodType: "UPI",
    simulateOutcome: "success"
  })
});
const data = await res.json();`}
            </pre>
          </div>
        </div>
      )}

      {/* Generate API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 bg-[#131B17]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1D2E28] border border-[#EDE7D6]/[0.12] rounded-none w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div>
              <h3 className="text-base font-bold text-[#EDE7D6]">Generate Sandbox API Key</h3>
              <div className="w-8 h-0.5 bg-[#C9A227] mt-1" />
            </div>

            {!newKeyGenerated ? (
              <div className="space-y-3 text-xs">
                <p className="text-[#8FA396]">
                  This key will have read/write access to test transactions, orders, and payment links.
                </p>
                <div>
                  <label className="block text-[#8FA396] mb-1 font-medium">Key Name</label>
                  <input
                    id="new-key-name-input"
                    type="text"
                    placeholder="e.g. Staging Server"
                    className="w-full bg-[#131B17] border border-[#EDE7D6]/[0.12] rounded-[4px] px-3 py-2 text-[#EDE7D6] placeholder:text-[#8FA396]/50 focus:outline-none focus:border-[#C9A227]"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2 border-t border-[#EDE7D6]/[0.08]">
                  <button
                    onClick={() => setShowKeyModal(false)}
                    className="px-3 py-2 rounded-[4px] bg-[#131B17] text-[#8FA396] hover:text-[#EDE7D6] font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const input = document.getElementById('new-key-name-input') as HTMLInputElement;
                      handleGenerateKey(input?.value || 'API Key');
                    }}
                    className="px-4 py-2 rounded-[4px] bg-[#C9A227] hover:bg-[#d8b030] text-[#131B17] font-semibold transition-colors"
                  >
                    Generate
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="p-3 bg-[#C98A2E]/10 border border-[#C98A2E]/30 rounded-none text-[#C98A2E] flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#C98A2E] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Save this secret key now.</span>
                    <p className="text-[11px] text-[#C98A2E]/80 mt-0.5">
                      It will never be shown again. If you lose it, you will need to revoke and generate a new key.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-none bg-[#131B17] border border-[#EDE7D6]/[0.12] font-mono text-[#EDE7D6] break-all flex items-center justify-between gap-2">
                  <span>{newKeyGenerated}</span>
                  <button
                    onClick={handleCopyKey}
                    className="p-1.5 bg-[#1D2E28] hover:bg-[#EDE7D6]/[0.05] text-[#EDE7D6] rounded-[2px] flex-shrink-0"
                  >
                    {copiedKey ? <Check className="w-4 h-4 text-[#4E8B6F]" /> : <Copy className="w-4 h-4 text-[#8FA396]" />}
                  </button>
                </div>

                <div className="flex justify-end pt-2 border-t border-[#EDE7D6]/[0.08]">
                  <button
                    onClick={() => {
                      setShowKeyModal(false);
                      setNewKeyGenerated(null);
                    }}
                    className="px-4 py-2 rounded-[4px] bg-[#C9A227] hover:bg-[#d8b030] text-[#131B17] font-semibold transition-colors"
                  >
                    I Have Saved My Key
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
