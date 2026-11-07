# BuimbPay · Sovereign Payment Gateway & Financial Stack

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PCI-DSS: Level 1](https://img.shields.io/badge/PCI--DSS-Level%201-green.svg)](#security)
[![UPI: 2.0 NPCI](https://img.shields.io/badge/UPI-2.0%20NPCI-orange.svg)](#upi-payments)
[![TypeScript: 5.x](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg)](https://www.typescriptlang.org/)
[![Next.js: 15.x](https://img.shields.io/badge/Next.js-15.x-black.svg)](https://nextjs.org/)

**BuimbPay** is an enterprise-grade, RBI Payment Aggregator-compliant full-stack payment gateway and financial operations platform modeled after **Razorpay**. It combines the complete product ecosystem of modern business banking (Payments, RazorpayX, Route, Smart Collect, Optimizer, Magic Checkout) with an autonomous **0% platform fee sovereign UPI rail** powered by real-time bank SMS and email observation engines.

---

## ⚡ Key Highlights

- **4-in-1 Indian UPI Checkout**:
  - 📱 **UPI Mobile Number (1-Tap Collect)**: Enter 10-digit mobile number (`+91 98XXXXXXXX`), auto-resolve linked NPCI account (*"Priya Sharma • HDFC Bank"*), and dispatch collect push request directly to **PhonePe**, **Google Pay**, or **Paytm**.
  - 🔳 **Dynamic Vector UPI QR**: Live-generating SVG QR codes with central UPI badge, multi-app logos, and real-time bank SMS credit verification.
  - ⚡ **1-Tap UPI App Intents**: Native app launch buttons for **Google Pay**, **PhonePe**, **Paytm**, **CRED UPI**, **BHIM**, and **Amazon Pay**.
  - 🆔 **UPI ID / VPA**: Quick handle pills (`@okhdfcbank`, `@oksbi`, `@okaxis`, `@ybl`, `@paytm`, `@ibl`, `@upi`) with instant name resolution.
- **Complete Razorpay Product Parity**:
  - **Payment Gateway**: Cards (Visa, Mastercard, RuPay with RBI tokenisation), NetBanking (all 60+ banks), Wallets, PayLater (Simpl, LazyPay), COD.
  - **Payment Links & Pages**: Instant shareable checkout links and customizable no-code payment storefronts.
  - **Smart Collect**: Automated virtual bank accounts (ICICI/Yes Bank) with NEFT/RTGS/IMPS customer auto-reconciliation.
  - **Route**: Marketplace payment splitting and vendor commission disbursements.
  - **Subscriptions**: Recurring billing engine supporting e-NACH, UPI AutoPay, and card recurring mandates.
  - **RazorpayX Payouts & Payout Links**: 24x7 instant vendor/salary disbursements via IMPS, NEFT, RTGS, and UPI.
  - **Bank & VPA Verification**: Real-time penny-drop bank account and VPA validation.
  - **Corporate Cards**: Expense cards with automated category limits and corporate credit lines.
  - **Magic Checkout**: 1-click checkout with pre-filled addresses and customer phone verification.
  - **Optimizer**: Intelligent transaction routing across multiple payment aggregators.

---

## 🏗️ Architecture & Monorepo Structure

```
buimb-pay/
├── apps/
│   ├── public-web/          # Next.js 15 marketing site, product hubs & customer checkout (/pay/:orderId)
│   ├── merchant-dashboard/  # Vite + React 18 merchant operations dashboard & hosted checkout modal
│   ├── api/                 # NestJS enterprise backend API (Orders, Payments, Route, Verification)
│   ├── checkout-portal/     # Sovereign self-hosted checkout engine with 4-in-1 UPI (Port 7000)
│   ├── control-center/      # Sovereign Gateway real-time operations dashboard (Port 5000)
│   ├── payment-api/         # Standalone zero-latency payment service & webhook router (Port 8090)
│   ├── payment-help/        # Customer self-service payment assistance & dispute desk (Port 6100)
│   ├── merchant-admin/      # Internal operator administration interface (Port 6001)
│   ├── coin-wallet-store/   # Reference e-commerce store with merchant SDK integration (Port 6002)
│   ├── sms-observer/        # Cellular bank SMS notification capture daemon
│   ├── gmail-observer/      # Real-time bank credit email listener daemon
│   └── android-observer-app/# Native Android background service for physical cellular devices
├── packages/
│   ├── payments/            # Dynamic UPI QR engine, bank SMS parser, and email parser
│   ├── database/            # Prisma ORM schema and PostgreSQL/SQLite migrations
│   ├── merchant-sdk/        # Drop-in JavaScript checkout SDK (`buimbpay.js`)
│   ├── observer-sdk/        # Client SDK for cellular and cloud observer daemons
│   ├── core/                # State machines, verification pipeline, and webhook dispatchers
│   ├── common/              # Cryptographic utilities, contracts, and UPI provider specs
│   └── db/                  # SQLite persistence layer and audit log repositories
└── scripts/
    ├── dev.js               # Multi-service dev orchestrator
    └── simulate-bank-sms.mjs# Simulated banking SMS injector for instant test capture
```

---

## 🚀 Quickstart

### Prerequisites
- **Node.js** >= 20.0.0
- **pnpm** >= 9.0.0
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/AjayBora002/buimb-payment.git
cd buimb-payment

# Install dependencies
pnpm install

# Run database migrations
pnpm --filter @buimbpay/database prisma migrate dev
```

### Starting Development Servers

```bash
# Terminal 1: Sovereign Gateway suite and Control Center
node scripts/dev.js

# Terminal 2: Merchant Operations Dashboard (Port 5173)
pnpm --filter @buimbpay/merchant-dashboard dev --port 5173

# Terminal 3: Public Marketing Web & Customer Checkout (Port 3000)
pnpm --filter @buimbpay/public-web dev --port 3000
```

---

## 🌐 Default Ports & Services

| Service | Port | URL | Description |
| :--- | :---: | :--- | :--- |
| **Public Web & Checkout** | `3000` | [http://localhost:3000](http://localhost:3000) | Marketing site, Tax calculators, and `/pay/:orderId` |
| **Merchant Dashboard** | `5173` | [http://localhost:5173](http://localhost:5173) | Full merchant operations, analytics & test modal |
| **Sovereign Checkout Portal** | `7000` | [http://localhost:7000](http://localhost:7000) | Standalone customer checkout engine |
| **Payment API Engine** | `8090` | [http://localhost:8090](http://localhost:8090) | High-speed zero-fee payment ingestion |
| **Control Center** | `5000` | [http://localhost:5000](http://localhost:5000) | Gateway process and worker monitor |
| **Merchant Admin** | `6001` | [http://localhost:6001](http://localhost:6001) | Backoffice admin interface |
| **Payment Help Desk** | `6100` | [http://localhost:6100](http://localhost:6100) | End-user self-service dispute resolution |
| **Demo Merchant Store** | `6002` | [http://localhost:6002](http://localhost:6002) | Reference e-commerce integration |

---

## 💳 Checkout Integration Example

Integrate BuimbPay into any web application using the drop-in standard checkout:

```html
<script src="https://checkout.buimbpay.com/v1/checkout.js"></script>
<script>
  const options = {
    key: "rzp_test_YourApiKeyHere",
    amount: "129900", // Amount in paise (₹1,299.00)
    currency: "INR",
    name: "Acme Technologies",
    description: "Pro Annual SaaS Subscription",
    image: "https://yourdomain.com/logo.png",
    order_id: "order_DBJOWzybf0sJbb",
    prefill: {
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
      contact: "9876543210"
    },
    theme: {
      color: "#0b63e5"
    },
    handler: function (response) {
      alert("Payment ID: " + response.buimbpay_payment_id);
      alert("Bank Reference (UTR): " + response.buimbpay_utr);
    }
  };

  const rzp = new BuimbPay(options);
  rzp.open();
</script>
```

---

## 🔒 Security & Compliance

- **PCI-DSS Level 1** certified data handling architecture.
- **RBI Tokenisation Guidelines** compliant card storage.
- **256-Bit TLS Bank Encryption** on all ingress/egress endpoints.
- Isolated cryptographic master key storage for observer enrollment tokens.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

