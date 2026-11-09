import React, { useState } from 'react';
import { AuthProvider, useAuth } from './lib/auth-context.jsx';
import { LoginView } from './views/LoginView.jsx';
import { RegisterView } from './views/RegisterView.jsx';
import { Sidebar } from './components/Sidebar.jsx';
import { USER_PERSONAS } from './types/persona.js';
import { Header } from './components/Header.jsx';
import { ToastProvider } from './components/Toast.jsx';
import { CommandPalette } from './components/CommandPalette.jsx';
import { HostedCheckoutModal } from './components/HostedCheckoutModal.jsx';
import { OverviewView } from './views/OverviewView.jsx';
import { TransactionsView } from './views/TransactionsView.jsx';
import { OrdersView } from './views/OrdersView.jsx';
import { PaymentLinksView } from './views/PaymentLinksView.jsx';
import { PaymentPagesView } from './views/PaymentPagesView.jsx';
import { SubscriptionsView } from './views/SubscriptionsView.jsx';
import { RefundsView } from './views/RefundsView.jsx';
import { SettlementsView } from './views/SettlementsView.jsx';
import { LedgerView } from './views/LedgerView.jsx';
import { DevelopersView } from './views/DevelopersView.jsx';
import { KycSettingsView } from './views/KycSettingsView.jsx';
import { InvoicesView } from './views/InvoicesView.jsx';
import { CustomersView } from './views/CustomersView.jsx';
import { ReconciliationView } from './views/ReconciliationView.jsx';
import { PayoutsView } from './views/PayoutsView.jsx';
import { CompanyOpsView } from './views/CompanyOpsView.jsx';
import { QrCodesView } from './views/QrCodesView.jsx';
import { OptimizerView } from './views/OptimizerView.jsx';
import { SmartCollectView } from './views/SmartCollectView.jsx';
import { DisputesView } from './views/DisputesView.jsx';
import { ReportsView } from './views/ReportsView.jsx';
import { UpiObserversView } from './views/UpiObserversView.jsx';
import { RouteView } from './views/RouteView.jsx';
import { BankVerificationView } from './views/BankVerificationView.jsx';
import { PayoutLinksView } from './views/PayoutLinksView.jsx';
import { CorporateCardsView } from './views/CorporateCardsView.jsx';
import { MagicCheckoutView } from './views/MagicCheckoutView.jsx';
import { ToolsView } from './views/ToolsView.jsx';
const PLATFORM_STAFF_ROLES = new Set(['PLATFORM_ADMIN', 'OPS_SUPERVISOR']);
function DashboardShell() {
    const { status, user, logout } = useAuth();
    const isPlatformStaff = user?.merchantUsers?.some((mu) => PLATFORM_STAFF_ROLES.has(mu.role.name)) ?? false;
    const [authView, setAuthView] = useState(() => {
        if (typeof window !== 'undefined') {
            return new URLSearchParams(window.location.search).get('mode') === 'signup'
                ? 'register'
                : 'login';
        }
        return 'login';
    });
    const [currentTab, setCurrentTab] = useState('overview');
    const [isTestMode, setIsTestMode] = useState(true);
    const [currentPersona, setCurrentPersona] = useState(USER_PERSONAS[0]);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [portalMode, setPortalMode] = useState('merchant');
    const titles = {
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
    const handleQuickAction = (action) => {
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
        return (<div className="min-h-screen bg-[#0C1938] flex items-center justify-center text-slate-300 font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"/>
          <span className="text-xs font-mono text-slate-400">Loading BuimbPay Dashboard…</span>
        </div>
      </div>);
    }
    if (status === 'unauthenticated') {
        return authView === 'register' ? (<RegisterView onSwitchToLogin={() => setAuthView('login')}/>) : (<LoginView onSwitchToRegister={() => setAuthView('register')}/>);
    }
    return (<ToastProvider>
      <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex font-sans overflow-x-hidden antialiased">
        {/* Navigation Sidebar */}
        <Sidebar currentTab={currentTab} onTabChange={setCurrentTab} user={user} currentPersona={currentPersona} onPersonaChange={setCurrentPersona} onLogout={logout} collapsed={isSidebarCollapsed} onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} portalMode={portalMode}/>

        {/* Main Content Viewport */}
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
          <Header title={titles[currentTab] || 'Overview'} currentPersona={currentPersona} user={user} onPersonaChange={setCurrentPersona} onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} onOpenCheckoutPreview={() => setIsCheckoutOpen(true)} portalMode={portalMode} onTogglePortalMode={isPlatformStaff ? () => setPortalMode(portalMode === 'merchant' ? 'ops' : 'merchant') : undefined} onQuickAction={handleQuickAction} isTestMode={isTestMode} onToggleTestMode={setIsTestMode}/>

          {/* Environment Status Ribbon (Razorpay Style) */}
          {isTestMode ? (
            <div className="bg-amber-500/10 border-b border-amber-500/20 px-8 py-2 flex items-center justify-between text-xs text-amber-900 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span><strong>TEST MODE ACTIVE:</strong> You are currently simulating transactions on sandbox rails. No actual funds will be debited or credited.</span>
              </div>
              <button onClick={() => setIsTestMode(false)} className="underline hover:text-amber-950 font-bold text-[11px] cursor-pointer">
                Switch to Live Mode &rarr;
              </button>
            </div>
          ) : (
            <div className="bg-emerald-500/10 border-b border-emerald-500/20 px-8 py-2 flex items-center justify-between text-xs text-emerald-900 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span><strong>LIVE MODE ACTIVE:</strong> Connected to live banking rails, NPCI UPI 2.0 network, and RBI Section 40 Nodal Escrow settlement.</span>
              </div>
              <button onClick={() => setIsTestMode(true)} className="underline hover:text-emerald-950 font-bold text-[11px] cursor-pointer">
                Switch to Test Mode &rarr;
              </button>
            </div>
          )}

          <main className="flex-1 p-6 md:p-8 max-w-[1440px] mx-auto w-full">
            {currentTab === 'overview' && (<OverviewView onNavigate={setCurrentTab} merchantName={user?.firstName || 'Ajay'}/>)}
            {currentTab === 'transactions' && <TransactionsView />}
            {currentTab === 'orders' && <OrdersView />}
            {currentTab === 'refunds' && <RefundsView />}
            {currentTab === 'payment-links' && (<PaymentLinksView onOpenCheckout={() => setIsCheckoutOpen(true)}/>)}
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
        <CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setIsCommandPaletteOpen(false)} onNavigate={setCurrentTab} onAction={handleQuickAction}/>

        {/* Hosted Checkout Simulator Modal */}
        <HostedCheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} orderAmount="₹1,299.00" orderAmountRaw={1299} orderDesc="BuimbPay Standard Checkout Demo"/>
      </div>
    </ToastProvider>);
}
export default function App() {
    return (<AuthProvider>
      <DashboardShell />
    </AuthProvider>);
}
