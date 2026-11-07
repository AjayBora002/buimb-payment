var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
import { Controller, Get, Post, Body, Param, Res, HttpCode, HttpStatus, Query, } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CheckoutService, CreateCheckoutSessionDto } from './checkout.service.js';
let CheckoutController = class CheckoutController {
    checkoutService;
    constructor(checkoutService) {
        this.checkoutService = checkoutService;
    }
    /**
     * Serves the Universal One-Script Integration SDK: buimbpay.js
     * Drop-in Razorpay compatible script.
     */
    async getCheckoutSdk(res) {
        const script = `/**
 * BuimbPay Universal One-Script Checkout SDK
 * Drop-in Razorpay & Sovereign UPI Compatible SDK
 */
(function(global) {
  'use strict';
  if (global.__BUIMBPAY_SDK_INITIALIZED__) return;
  global.__BUIMBPAY_SDK_INITIALIZED__ = true;

  function BuimbPay(options) {
    this.options = Object.assign({
      key: '',
      amount: 0,
      currency: 'INR',
      name: 'BuimbPay Merchant',
      description: 'Order Payment',
      order_id: '',
      customer: {},
      theme: { color: '#0B63E5' },
      handler: null,
      onClose: null,
    }, options);

    this.isOpen = false;
    this.modal = null;
    this.iframe = null;
    this._handleMessage = this._handleMessage.bind(this);
  }

  BuimbPay.prototype.open = async function() {
    if (this.isOpen) return;

    // Create checkout session via API
    const origin = window.location.origin;
    const apiUrl = this.options.apiUrl || origin;

    let sessionId = this.options.sessionId;
    if (!sessionId) {
      try {
        const resp = await fetch(apiUrl + '/api/v1/checkout/sessions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: this.options.amount,
            currency: this.options.currency,
            orderId: this.options.order_id || this.options.orderId,
            description: this.options.description,
            customerName: this.options.customer?.name,
            customerPhone: this.options.customer?.contact || this.options.customer?.phone,
            customerEmail: this.options.customer?.email,
          })
        });
        const data = await resp.json();
        sessionId = data.id;
      } catch (err) {
        console.error('[BuimbPay] Failed to initialize checkout session:', err);
        alert('Could not initialize payment session. Please check your internet connection.');
        return;
      }
    }

    const checkoutUrl = apiUrl + '/checkout/' + sessionId;

    // Build Backdrop & Modal Iframe
    const backdrop = document.createElement('div');
    backdrop.style.cssText = 'position:fixed;inset:0;background:rgba(11,21,38,0.75);backdrop-filter:blur(6px);z-index:9999999;display:flex;align-items:center;justify-content:center;padding:16px;animation:buimbpayFadeIn 0.2s ease-out;';

    const container = document.createElement('div');
    container.style.cssText = 'width:100%;max-width:440px;height:680px;max-height:92vh;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 25px 65px rgba(0,0,0,0.5);display:flex;flex-direction:column;position:relative;animation:buimbpaySlideUp 0.25s cubic-bezier(0.16,1,0.3,1);';

    const iframe = document.createElement('iframe');
    iframe.src = checkoutUrl;
    iframe.style.cssText = 'width:100%;height:100%;border:none;flex:1;';
    iframe.setAttribute('allow', 'payment');

    container.appendChild(iframe);
    backdrop.appendChild(container);
    document.body.appendChild(backdrop);

    this.isOpen = true;
    this.modal = backdrop;
    this.iframe = iframe;

    window.addEventListener('message', this._handleMessage);
  };

  BuimbPay.prototype.close = function() {
    if (!this.isOpen) return;
    if (this.modal && this.modal.parentNode) {
      this.modal.parentNode.removeChild(this.modal);
    }
    window.removeEventListener('message', this._handleMessage);
    this.isOpen = false;
    this.modal = null;
    this.iframe = null;
    if (typeof this.options.onClose === 'function') {
      this.options.onClose();
    }
  };

  BuimbPay.prototype._handleMessage = function(e) {
    if (!e.data || typeof e.data !== 'object') return;
    if (e.data.type === 'BUIMBPAY_SUCCESS') {
      if (typeof this.options.handler === 'function') {
        this.options.handler({
          buimbpay_payment_id: e.data.paymentId || e.data.utr,
          buimbpay_order_id: this.options.order_id,
          buimbpay_signature: 'sig_' + Math.random().toString(36).substring(2, 12),
          utr: e.data.utr,
          amount: e.data.amount,
        });
      }
      setTimeout(() => this.close(), 1800);
    } else if (e.data.type === 'BUIMBPAY_CLOSE') {
      this.close();
    }
  };

  // Add keyframe animations
  const style = document.createElement('style');
  style.textContent = '@keyframes buimbpayFadeIn{from{opacity:0;}to{opacity:1;}}@keyframes buimbpaySlideUp{from{opacity:0;transform:translateY(24px) scale(0.97);}to{opacity:1;transform:translateY(0) scale(1);}}';
  document.head.appendChild(style);

  // Auto-bind to [data-buimbpay-pay] buttons
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('[data-buimbpay-pay]').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const amount = btn.getAttribute('data-amount') || 100;
        const name = btn.getAttribute('data-name') || document.title;
        const desc = btn.getAttribute('data-description') || 'Payment';
        new BuimbPay({ amount: Number(amount), name: name, description: desc }).open();
      });
    });
  });

  // Global Exports
  global.BuimbPay = BuimbPay;
  global.Razorpay = BuimbPay; // 100% Razorpay drop-in compatibility!
})(window);`;
        res.header('Content-Type', 'application/javascript; charset=utf-8');
        res.header('Cache-Control', 'public, max-age=300');
        return res.send(script);
    }
    /**
     * Serves the Standalone Responsive Checkout Portal HTML
     */
    async renderCheckoutPortal(id, res) {
        const session = await this.checkoutService.getSession(id);
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>${session.payeeName} · Buimb-Pay Checkout</title>
  <style>
    :root {
      --primary: #0B63E5;
      --primary-dark: #0957CB;
      --navy: #0B1526;
      --bg: #F8FAFC;
      --card: #FFFFFF;
      --text: #0F172A;
      --muted: #64748B;
      --border: #E2E8F0;
      --green: #10B981;
      --green-bg: #ECFDF5;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; -webkit-tap-highlight-color: transparent; }
    body { background-color: var(--bg); color: var(--text); min-height: 100vh; display: flex; align-items: center; justify-content: center; font-size: 14px; }
    .checkout-card { width: 100%; max-width: 440px; min-height: 600px; background: #fff; display: flex; flex-direction: column; position: relative; box-shadow: 0 20px 40px rgba(0,0,0,0.08); border-radius: 16px; overflow: hidden; }
    
    /* Header */
    .header { background: linear-gradient(135deg, #0B63E5 0%, #0957CB 100%); color: #fff; padding: 22px 20px; position: relative; }
    .brand-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
    .brand-title { font-size: 15px; font-weight: 700; display: flex; align-items: center; gap: 8px; letter-spacing: -0.2px; }
    .close-btn { background: rgba(255,255,255,0.15); border: none; color: #fff; width: 28px; height: 28px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 16px; }
    .amount-box { display: flex; align-items: baseline; justify-content: space-between; }
    .amount-val { font-size: 30px; font-weight: 800; letter-spacing: -0.5px; }
    .order-desc { font-size: 12px; opacity: 0.85; margin-top: 4px; }

    /* Main Body */
    .body-content { padding: 20px; flex: 1; display: flex; flex-direction: column; align-items: center; }

    /* Timers & Status Banner */
    .timer-pill { display: inline-flex; align-items: center; gap: 6px; background: #EFF6FF; color: #1E40AF; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-bottom: 16px; border: 1px solid #DBEAFE; }
    .timer-pill.processing { background: #FEF3C7; color: #92400E; border-color: #FDE68A; }

    /* QR Code Display */
    .qr-container { width: 240px; height: 240px; border: 2px solid var(--border); border-radius: 12px; padding: 12px; background: #fff; display: flex; align-items: center; justify-content: center; position: relative; box-shadow: 0 4px 12px rgba(0,0,0,0.04); }
    .qr-container svg { width: 100%; height: 100%; }

    .vpa-badge { margin-top: 14px; font-size: 12px; color: var(--muted); background: #F1F5F9; padding: 6px 14px; border-radius: 6px; display: flex; align-items: center; gap: 6px; font-family: monospace; }
    .copy-btn { border: none; background: transparent; color: var(--primary); font-weight: 600; cursor: pointer; font-size: 12px; }

    /* Mobile App Buttons */
    .mobile-apps { width: 100%; margin-top: 20px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
    .app-btn { display: flex; flex-direction: column; align-items: center; gap: 6px; text-decoration: none; color: var(--text); padding: 10px 4px; border-radius: 10px; border: 1px solid var(--border); transition: all 0.15s; }
    .app-btn:hover { border-color: var(--primary); background: #F8FAFC; }
    .app-icon { width: 34px; height: 34px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: bold; color: white; font-size: 12px; }
    .icon-gpay { background: #4285F4; }
    .icon-phonepe { background: #5F259F; }
    .icon-paytm { background: #00BAF2; }
    .icon-cred { background: #18181B; }
    .app-label { font-size: 11px; font-weight: 500; }

    /* Action Buttons */
    .check-btn { width: 100%; margin-top: 20px; background: var(--primary); color: #fff; border: none; padding: 14px; border-radius: 10px; font-size: 15px; font-weight: 700; cursor: pointer; transition: background 0.15s; display: flex; align-items: center; justify-content: center; gap: 8px; }
    .check-btn:hover { background: var(--primary-dark); }
    .check-btn.loading { background: #94A3B8; cursor: wait; }

    /* Success Screen */
    .success-view { display: none; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px 20px; flex: 1; }
    .success-icon { width: 68px; height: 68px; background: var(--green-bg); color: var(--green); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 34px; margin-bottom: 20px; animation: popIn 0.3s cubic-bezier(0.175,0.885,0.32,1.275); }
    @keyframes popIn { 0%{transform:scale(0.5);opacity:0;} 100%{transform:scale(1);opacity:1;} }

    /* Dev Simulation Floating Bar */
    .dev-bar { margin-top: auto; width: 100%; border-top: 1px dashed #CBD5E1; padding: 12px 16px; background: #F8FAFC; display: flex; align-items: center; justify-content: space-between; font-size: 12px; color: var(--muted); }
    .sim-btn { background: #0F172A; color: #fff; border: none; padding: 6px 12px; border-radius: 6px; font-size: 11px; font-weight: 600; cursor: pointer; }

    /* Footer */
    .footer { text-align: center; padding: 12px; font-size: 11px; color: #94A3B8; background: #fff; border-top: 1px solid #F1F5F9; }
  </style>
</head>
<body>
  <div class="checkout-card" id="card">
    <!-- Header -->
    <div class="header">
      <div class="brand-row">
        <div class="brand-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          ${session.payeeName}
        </div>
        <button class="close-btn" onclick="closeModal()">✕</button>
      </div>
      <div class="amount-box">
        <div>
          <div class="amount-val">₹${session.amountRupees}</div>
          <div class="order-desc">Instant 0% Fee Direct-to-Bank UPI</div>
        </div>
      </div>
    </div>

    <!-- Active Payment View -->
    <div class="body-content" id="paymentView">
      <div class="timer-pill" id="timerPill">
        <span>⏱</span>
        <span id="timerText">Valid for 04:59</span>
      </div>

      <div class="qr-container" id="qrBox">
        ${session.qrSvg}
      </div>

      <div class="vpa-badge">
        <span>${session.vpa}</span>
        <button class="copy-btn" onclick="copyVpa('${session.vpa}')">COPY</button>
      </div>

      <!-- Mobile 1-Tap Deep Link Buttons -->
      <div class="mobile-apps">
        <a href="${session.appLinks?.gpay || session.upiUri}" class="app-btn">
          <div class="app-icon icon-gpay">G</div>
          <span class="app-label">GPay</span>
        </a>
        <a href="${session.appLinks?.phonepe || session.upiUri}" class="app-btn">
          <div class="app-icon icon-phonepe">Pe</div>
          <span class="app-label">PhonePe</span>
        </a>
        <a href="${session.appLinks?.paytm || session.upiUri}" class="app-btn">
          <div class="app-icon icon-paytm">Py</div>
          <span class="app-label">Paytm</span>
        </a>
        <a href="${session.appLinks?.cred || session.upiUri}" class="app-btn">
          <div class="app-icon icon-cred">CR</div>
          <span class="app-label">CRED</span>
        </a>
      </div>

      <button class="check-btn" id="checkBtn" onclick="triggerCheck()">
        I HAVE PAID — VERIFY PAYMENT
      </button>

      <!-- Developer Test Mode Bar -->
      <div class="dev-bar">
        <span>⚡ Test Mode Active</span>
        <button class="sim-btn" onclick="simulateSuccess()">Simulate Bank Credit</button>
      </div>
    </div>

    <!-- Success View -->
    <div class="success-view" id="successView">
      <div class="success-icon">✓</div>
      <h2 style="font-size:20px; font-weight:800; color:#0F172A; margin-bottom:6px;">Payment Successful!</h2>
      <p style="color:#64748B; font-size:13px; margin-bottom:20px;">Direct settlement to merchant bank account completed.</p>
      <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:10px; padding:14px; width:100%; text-align:left; font-size:13px;">
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <span style="color:#64748B;">Amount Paid:</span>
          <span style="font-weight:700;">₹${session.amountRupees}</span>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <span style="color:#64748B;">Bank UTR / Ref:</span>
          <span style="font-family:monospace; font-weight:600;" id="successUtr">${session.utr || 'UTR-LIVE'}</span>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <span style="color:#64748B;">Status:</span>
          <span style="color:#10B981; font-weight:700;">CAPTURED</span>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      Secured by Buimb-Pay · 256-Bit Bank Encryption
    </div>
  </div>

  <script>
    const sessionId = "${session.id}";
    let isChecking = false;
    let paymentSeconds = ${session.remainingPaymentSeconds || 300};
    let verificationSeconds = 30;

    // Timer countdown
    setInterval(() => {
      if (isChecking) {
        if (verificationSeconds > 0) {
          verificationSeconds--;
          const s = verificationSeconds.toString().padStart(2, '0');
          document.getElementById('timerText').innerText = "Checking Bank Credit... " + s + "s";
          document.getElementById('timerPill').className = "timer-pill processing";
        }
      } else {
        if (paymentSeconds > 0) {
          paymentSeconds--;
          const m = Math.floor(paymentSeconds / 60).toString().padStart(2, '0');
          const s = (paymentSeconds % 60).toString().padStart(2, '0');
          document.getElementById('timerText').innerText = "Valid for " + m + ":" + s;
        }
      }
    }, 1000);

    // Live Polling
    const poller = setInterval(async () => {
      try {
        const res = await fetch('/api/v1/checkout/sessions/' + sessionId);
        const data = await res.json();
        if (data.status === 'SUCCESS') {
          clearInterval(poller);
          showSuccess(data);
        } else if (data.status === 'PROCESSING') {
          isChecking = true;
          document.getElementById('checkBtn').innerText = "VERIFYING INCOMING BANK ALERT...";
          document.getElementById('checkBtn').className = "check-btn loading";
        }
      } catch (e) {}
    }, 1500);

    async function triggerCheck() {
      isChecking = true;
      verificationSeconds = 30;
      document.getElementById('checkBtn').innerText = "VERIFYING INCOMING BANK ALERT...";
      document.getElementById('checkBtn').className = "check-btn loading";
      try {
        await fetch('/api/v1/checkout/sessions/' + sessionId + '/check', { method: 'POST' });
      } catch (e) {}
    }

    async function simulateSuccess() {
      try {
        const res = await fetch('/api/v1/checkout/sessions/' + sessionId + '/simulate-payment', { method: 'POST' });
        const data = await res.json();
        showSuccess(data);
      } catch (e) {}
    }

    function showSuccess(data) {
      document.getElementById('paymentView').style.display = 'none';
      document.getElementById('successView').style.display = 'flex';
      if (data.utr) document.getElementById('successUtr').innerText = data.utr;

      // Emit postMessage to parent iframe
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({
          type: 'BUIMBPAY_SUCCESS',
          paymentId: data.id,
          utr: data.utr,
          amount: data.amount,
        }, '*');
      }
    }

    function closeModal() {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: 'BUIMBPAY_CLOSE' }, '*');
      }
    }

    function copyVpa(vpa) {
      navigator.clipboard?.writeText(vpa);
      alert('VPA copied to clipboard: ' + vpa);
    }
  </script>
</body>
</html>`;
        res.header('Content-Type', 'text/html; charset=utf-8');
        return res.send(html);
    }
    /**
     * REST: Create Checkout Session
     */
    async createSession(dto) {
        return this.checkoutService.createSession(dto);
    }
    /**
     * REST: Get Checkout Session status (polling)
     */
    async getSession(id) {
        return this.checkoutService.getSession(id);
    }
    /**
     * REST: Trigger 30-second verification window
     */
    async triggerCheck(id) {
        return this.checkoutService.triggerVerification(id);
    }
    /**
     * REST: Developer Test Mode: Simulate payment success
     */
    async simulatePayment(id, outcome = 'success') {
        return this.checkoutService.simulatePayment(id, outcome);
    }
    /**
     * REST: Cancel checkout session
     */
    async cancelSession(id) {
        return this.checkoutService.cancelSession(id);
    }
};
__decorate([
    Get('checkout/buimbpay.js'),
    ApiOperation({ summary: 'Universal One-Script Integration SDK' }),
    __param(0, Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CheckoutController.prototype, "getCheckoutSdk", null);
__decorate([
    Get('checkout/:id'),
    ApiOperation({ summary: 'Customer Checkout Portal UI' }),
    __param(0, Param('id')),
    __param(1, Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CheckoutController.prototype, "renderCheckoutPortal", null);
__decorate([
    Post('api/v1/checkout/sessions'),
    HttpCode(HttpStatus.CREATED),
    ApiOperation({ summary: 'Create Sovereign UPI Checkout Session' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof CreateCheckoutSessionDto !== "undefined" && CreateCheckoutSessionDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], CheckoutController.prototype, "createSession", null);
__decorate([
    Get('api/v1/checkout/sessions/:id'),
    ApiOperation({ summary: 'Get Checkout Session status' }),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CheckoutController.prototype, "getSession", null);
__decorate([
    Post('api/v1/checkout/sessions/:id/check'),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Trigger 30-second verification window' }),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CheckoutController.prototype, "triggerCheck", null);
__decorate([
    Post('api/v1/checkout/sessions/:id/simulate-payment'),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Simulate instant payment for test mode' }),
    __param(0, Param('id')),
    __param(1, Query('outcome')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CheckoutController.prototype, "simulatePayment", null);
__decorate([
    Post('api/v1/checkout/sessions/:id/cancel'),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Cancel checkout session' }),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CheckoutController.prototype, "cancelSession", null);
CheckoutController = __decorate([
    ApiTags('Checkout'),
    Controller(),
    __metadata("design:paramtypes", [typeof (_a = typeof CheckoutService !== "undefined" && CheckoutService) === "function" ? _a : Object])
], CheckoutController);
export { CheckoutController };
