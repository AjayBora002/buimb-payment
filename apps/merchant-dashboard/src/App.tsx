import React, { useState } from 'react';
import { AuthProvider, useAuth } from './lib/auth-context.js';
import { LoginView } from './views/LoginView.js';
import { RegisterView } from './views/RegisterView.js';
import { Sidebar } from './components/Sidebar.js';
import { UserPersona, USER_PERSONAS } from './types/persona.js';
import { Header } from './components/Header.js';
import { ToastProvider } from './components/Toast.js';
import { CommandPalette } from './components/CommandPalette.js';
import { HostedCheckoutModal } from './components/HostedCheckoutModal.js';
import { OverviewView } from './views/OverviewView.js';
import { TransactionsView } from './views/TransactionsView.js';
import { PaymentLinksView } from './views/PaymentLinksView.js';
import { SubscriptionsView } from './views/SubscriptionsView.js';
import { RefundsView } from './views/RefundsView.js';
import { SettlementsView } from './views/SettlementsView.js';
import { LedgerView } from './views/LedgerView.js';
import { DevelopersView } from './views/DevelopersView.js';
import { KycSettingsView } from './views/KycSettingsView.js';
import { InvoicesView } from './views/InvoicesView.js';
import { CustomersView } from './views/CustomersView.js';
import { ReconciliationView } from './views/ReconciliationView.js';
import { PayoutsView } from './views/PayoutsView.js';
import { CompanyOpsView } from './views/CompanyOpsView.js';
import { QrCodesView } from './views/QrCodesView.js';
import { OptimizerView } from './views/OptimizerView.js';

const PLATFORM_STAFF_ROLES = new Set(['PLATFORM_ADMIN', 'OPS_SUPERVISOR']);

function DashboardShell() {
  const { status, user, logout } = useAuth();
  const isPlatformStaff = user?.merchantUsers?.some((mu) =>
    PLATFORM_STAFF_ROLES.has(mu.role.name),
  ) ?? false;

  const [authView, setAuthView] = useState<'login' | 'register'>(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search).get('mode') === 'signup'
        ? 'register'
        : 'login';
    }
    return 'login';
  });
  const [currentTab, setCurrentTab] = useState('overview');
  const [currentPersona, setCurrentPersona] = useState<UserPersona>(USER_PERSONAS[0]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [portalMode, setPortalMode] = useState<'merchant' | 'ops'>('merchant');

  const titles: Record<string, string> = {
    overview: 'Overview',
    transactions: 'Transactions & Payments',
    'qr-codes': 'Smart QR & Merchant Exchange',
    'payment-links': 'Payment Links',
    subscriptions: 'Subscriptions & Mandates',
    optimizer: 'Optimizer (Multi-Gateway Routing)',
    invoices: 'Invoices & GST',
    customers: 'Customers',
    refunds: 'Refunds & Disputes',
    settlements: 'Settlements & Escrow',
    reconciliation: 'Reconciliation',
    ledger: 'Ledger & Audit',
    payouts: 'Payouts',
    developers: 'Developers & API Keys',
    'settings-kyc': 'Business Settings & KYC',
    'company-ops': 'Company Operations',
  };

  const handlePortalSwitch = () => {
    const next = portalMode === 'merchant' ? 'ops' : 'merchant';
    setPortalMode(next);
    if (next === 'ops') {
      setCurrentTab('company-ops');
    } else {
      setCurrentTab('overview');
    }
  };

  if (status === 'checking') {
    return (
      <div className="min-h-screen bg-[#131B17] flex items-center justify-center text-[#8FA396] font-['Public_Sans',sans-serif]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-[#C9A227] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono">Authenticating session…</span>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return authView === 'register' ? (
      <RegisterView onSwitchToLogin={() => setAuthView('login')} />
    ) : (
      <LoginView onSwitchToRegister={() => setAuthView('register')} />
    );
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#131B17] text-[#EDE7D6] flex font-['Public_Sans',sans-serif] overflow-x-hidden antialiased">
        {/* Navigation Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          user={user}
          currentPersona={currentPersona}
          onPersonaChange={setCurrentPersona}
          onLogout={logout}
          collapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          portalMode={portalMode}
        />

        {/* Main Content Viewport */}
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
          <Header
            title={titles[currentTab] || 'Overview'}
            currentPersona={currentPersona}
            user={user}
            onPersonaChange={setCurrentPersona}
            onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
            onOpenCheckoutPreview={() => setIsCheckoutOpen(true)}
            portalMode={portalMode}
            onTogglePortalMode={isPlatformStaff ? handlePortalSwitch : undefined}
          />

          <main className="flex-1 p-8 max-w-[1440px] mx-auto w-full">
            {currentTab === 'overview' && (
              <OverviewView onNavigate={setCurrentTab} merchantName={currentPersona.name.split(' ')[0]} />
            )}
            {currentTab === 'transactions' && <TransactionsView />}
            {currentTab === 'qr-codes' && <QrCodesView />}
            {currentTab === 'payment-links' && (
              <PaymentLinksView onOpenCheckout={() => setIsCheckoutOpen(true)} />
            )}
            {currentTab === 'subscriptions' && <SubscriptionsView />}
            {currentTab === 'optimizer' && <OptimizerView />}
            {currentTab === 'invoices' && <InvoicesView />}
            {currentTab === 'customers' && <CustomersView />}
            {currentTab === 'refunds' && <RefundsView />}
            {currentTab === 'settlements' && <SettlementsView />}
            {currentTab === 'reconciliation' && <ReconciliationView />}
            {currentTab === 'ledger' && <LedgerView />}
            {currentTab === 'payouts' && <PayoutsView />}
            {currentTab === 'developers' && <DevelopersView />}
            {currentTab === 'settings-kyc' && <KycSettingsView />}
            {currentTab === 'company-ops' && (
              isPlatformStaff ? (
                <CompanyOpsView />
              ) : (
                <OverviewView onNavigate={setCurrentTab} merchantName={currentPersona.name.split(' ')[0]} />
              )
            )}
          </main>
        </div>

        {/* Global Keyboard Command Palette */}
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onNavigate={setCurrentTab}
        />

        {/* Hosted Checkout Simulator Modal */}
        <HostedCheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          orderAmount="₹1,299.00"
          orderAmountRaw={1299}
          orderDesc="BuimbPay Demo Order"
        />
      </div>
    </ToastProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <DashboardShell />
    </AuthProvider>
  );
}
