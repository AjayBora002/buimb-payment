import React from 'react';
import { Link2, Zap, KeyRound, ArrowRightLeft } from 'lucide-react';

interface CommonActionsProps {
  onAction: (actionKey: string) => void;
}

export const CommonActions: React.FC<CommonActionsProps> = ({ onAction }) => {
  const actions = [
    {
      id: 'create-link',
      title: 'Create payment link',
      desc: 'Share a hosted payment page with your customer.',
      icon: Link2,
    },
    {
      id: 'test-integration',
      title: 'Test an integration',
      desc: 'Create a sandbox payment and inspect the event.',
      icon: Zap,
    },
    {
      id: 'view-keys',
      title: 'View API keys',
      desc: 'Manage test keys, live keys, and permissions.',
      icon: KeyRound,
    },
    {
      id: 'check-reconciliation',
      title: 'Check reconciliation',
      desc: 'Review unmatched or delayed transactions.',
      icon: ArrowRightLeft,
    },
  ];

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-bold text-[#EDE7D6]">Common Actions</h3>
        <div className="w-8 h-0.5 bg-[#C9A227] mt-1" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              onClick={() => onAction(act.id)}
              className="group p-4 bg-[#1D2E28] hover:bg-[#243831] border border-[rgba(237,231,214,0.08)] hover:border-[#C9A227]/40 text-left transition-colors flex flex-col justify-between h-32 focus-visible:ring-2 focus-visible:ring-[#C9A227]"
            >
              <div className="w-8 h-8 rounded-[4px] bg-[#131B17] border border-[rgba(237,231,214,0.1)] flex items-center justify-center text-[#C9A227]">
                <Icon className="w-4 h-4" />
              </div>

              <div>
                <div className="text-xs font-semibold text-[#EDE7D6] group-hover:text-[#C9A227] transition-colors">
                  {act.title}
                </div>
                <p className="text-[11px] text-[#8FA396] leading-tight mt-1 line-clamp-2">
                  {act.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
