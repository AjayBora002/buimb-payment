import React from 'react';
import { Link2, Zap, KeyRound, ArrowRightLeft } from 'lucide-react';
export const CommonActions = ({ onAction }) => {
    const actions = [
        {
            id: 'create-link',
            title: 'Create Payment Link',
            desc: 'Share a branded hosted payment link via WhatsApp or SMS.',
            icon: Link2,
            color: 'text-blue-600 bg-blue-50',
        },
        {
            id: 'test-integration',
            title: 'Simulate Payment',
            desc: 'Create an instant test payment and inspect the gateway lifecycle.',
            icon: Zap,
            color: 'text-amber-600 bg-amber-50',
        },
        {
            id: 'view-keys',
            title: 'API Keys & Webhooks',
            desc: 'Access your Key ID, Key Secret, and configure endpoint webhooks.',
            icon: KeyRound,
            color: 'text-purple-600 bg-purple-50',
        },
        {
            id: 'check-reconciliation',
            title: 'Settlement Reconciliation',
            desc: 'Review bank UTR deposits and fee deductions.',
            icon: ArrowRightLeft,
            color: 'text-emerald-600 bg-emerald-50',
        },
    ];
    return (<div className="space-y-3">
      <div>
        <h3 className="text-sm font-bold text-slate-900">Quick Actions</h3>
        <p className="text-xs text-slate-500">Fast workflows to collect money and manage developer access</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((act) => {
            const Icon = act.icon;
            return (<button key={act.id} onClick={() => onAction(act.id)} className="group p-4 bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-blue-300 rounded-xl text-left transition-all flex flex-col justify-between h-32 shadow-sm hover:shadow-md cursor-pointer">
              <div className={`w-8 h-8 rounded-lg ${act.color} flex items-center justify-center`}>
                <Icon className="w-4 h-4"/>
              </div>

              <div>
                <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {act.title}
                </div>
                <p className="text-[11px] text-slate-500 leading-tight mt-1 line-clamp-2">
                  {act.desc}
                </p>
              </div>
            </button>);
        })}
      </div>
    </div>);
};
