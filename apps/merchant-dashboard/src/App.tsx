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
import { OrdersView } from './views/OrdersView.js';
import { PaymentLinksView } from './views/PaymentLinksView.js';
import { PaymentPagesView } from './views/PaymentPagesView.js';
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
import { SmartCollectView } from './views/SmartCollectView.js';
import { DisputesView } from './views/DisputesView.js';
import { ReportsView } from './views/ReportsView.js';
import { UpiObserversView } from './views/UpiObserversView.js';
import { RouteView } from './views/RouteView.js';
import { BankVerificationView } from './views/BankVerificationView.js';
import { PayoutLinksView } from './views/PayoutLinksView.js';
import { CorporateCardsView } from './views/CorporateCardsView.js';
import { MagicCheckoutView } from './views/MagicCheckoutView.js';
import { ToolsView } from './views/ToolsView.js';

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
    transactions: 'Payments & Transactions',
    orders: 'Orders',
    refunds: 'Refunds',
    'payment-links': 'Payment Links',
    'payment-pages': 'Payment Pages (Storefronts)',
    route: 'Route (Marketplace Split Payments)',
    'magic-checkout': 'Magic Checkout & AI RTO Intelligence',
    'upi-observers': 'Sovereign UPI & Bank Observers (0% Fees)',
    'qr-codes': 'Smart QR & Soundbox',
    invoices: 'Invoices & GST Billing',
    subscriptions: 'Subscriptions & e-Mandates',
    'smart-collect': 'Smart Collect (Virtual Accounts)',
    optimizer: 'Optimizer (Multi-Gateway Routing)',
    customers: 'Customer Directory',
    payouts: 'Payouts (BuimbPayX)',
    'payout-links': 'Payout Links (Self-Serve Vendor Payouts)',
    verification: 'Bank & VPA Verification (Penny Drop ₹1)',
    'corporate-cards': 'Corporate Cards (BuimbPayX Smart Cards)',
    'account-statement': 'Account Statement & Ledger',
    ledger: 'Ledger & Audit',
    disputes: 'Disputes & Chargebacks',
    settlements: 'Settlements & Instant On-Demand T+0',
    tools: 'Business Compliance & Tax Calculators (GST/TDS)',
    reports: 'Reports Center',
    developers: 'API Keys & Webhooks',
    'settings-kyc': 'Business Profile & KYC',
    reconciliation: 'Reconciliation',
    'company-ops': 'Company Operations',
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'create-link':
        setCurrentTab('payment-links');
        break;
      case 'create-invoice':
        setCurrentTab('invoices');
        break;
      case 'instant-payout':
        setCurrentTab('payouts');
        break;
      case 'create-qr':
        setCurrentTab('qr-codes');
        break;
      case 'issue-refund':
        setCurrentTab('refunds');
        break;
      default:
        break;
    }
  };

  if (status === 'checking') {
    return (
      <div className="min-h-screen bg-[#0C1938] flex items-center justify-center text-slate-300 font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-slate-400">Loading BuimbPay Dashboard…</span>
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
      <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex font-sans overflow-x-hidden antialiased">
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
            onTogglePortalMode={isPlatformStaff ? () => setPortalMode(portalMode === 'merchant' ? 'ops' : 'merchant') : undefined}
            onQuickAction={handleQuickAction}
          />

          <main className="flex-1 p-6 md:p-8 max-w-[1440px] mx-auto w-full">
            {currentTab === 'overview' && (
              <OverviewView onNavigate={setCurrentTab} merchantName={user?.firstName || 'Ajay'} />
            )}
            {currentTab === 'transactions' && <TransactionsView />}
            {currentTab === 'orders' && <OrdersView />}
            {currentTab === 'refunds' && <RefundsView />}
            {currentTab === 'payment-links' && (
              <PaymentLinksView onOpenCheckout={() => setIsCheckoutOpen(true)} />
            )}
            {currentTab === 'payment-pages' && <PaymentPagesView />}
            {currentTab === 'route' && <RouteView />}
            {currentTab === 'magic-checkout' && <MagicCheckoutView />}
            {currentTab === 'upi-observers' && <UpiObserversView />}
            {currentTab === 'qr-codes' && <QrCodesView />}
            {currentTab === 'invoices' && <InvoicesView />}
            {currentTab === 'subscriptions' && <SubscriptionsView />}
            {currentTab === 'smart-collect' && <SmartCollectView />}
            {currentTab === 'optimizer' && <OptimizerView />}
            {currentTab === 'customers' && <CustomersView />}
            {currentTab === 'payouts' && <PayoutsView />}
            {currentTab === 'payout-links' && <PayoutLinksView />}
            {currentTab === 'verification' && <BankVerificationView />}
            {currentTab === 'corporate-cards' && <CorporateCardsView />}
            {currentTab === 'account-statement' && <LedgerView />}
            {currentTab === 'ledger' && <LedgerView />}
            {currentTab === 'disputes' && <DisputesView />}
            {currentTab === 'settlements' && <SettlementsView />}
            {currentTab === 'tools' && <ToolsView />}
            {currentTab === 'reports' && <ReportsView />}
            {currentTab === 'reconciliation' && <ReconciliationView />}
            {currentTab === 'developers' && <DevelopersView />}
            {currentTab === 'settings-kyc' && <KycSettingsView />}
            {currentTab === 'company-ops' && <CompanyOpsView />}
          </main>
        </div>

        {/* Global Keyboard Command Palette */}
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onNavigate={setCurrentTab}
          onAction={handleQuickAction}
        />

        {/* Hosted Checkout Simulator Modal */}
        <HostedCheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          orderAmount="₹1,299.00"
          orderAmountRaw={1299}
          orderDesc="BuimbPay Standard Checkout Demo"
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
