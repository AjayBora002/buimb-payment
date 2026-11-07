import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  generateQrSvg,
  buildUpiUri,
  buildUpiAppLinks,
  BankSmsParser,
  BankEmailParser,
  extractIntelligentAmount,
} from '../dist/index.js';

describe('BuimbPay QR Engine & UPI Links', () => {
  it('generates valid UPI URI with integer paise conversion', () => {
    const upiUri = buildUpiUri({
      vpa: 'buimbpay@icici',
      payeeName: 'BuimbPay Merchant',
      amountPaise: 149900n, // ₹1,499.00
      transactionNote: 'Order #ORD-101',
      transactionRef: 'TXN101',
    });

    assert.ok(upiUri.startsWith('upi://pay?'));
    assert.ok(upiUri.includes('pa=buimbpay%40icici') || upiUri.includes('pa=buimbpay@icici'));
    assert.ok(upiUri.includes('am=1499.00'));
    assert.ok(upiUri.includes('cu=INR'));
  });

  it('generates deep links for major UPI apps', () => {
    const upiUri = 'upi://pay?pa=merchant@okhdfcbank&pn=Store&am=500.00&cu=INR';
    const links = buildUpiAppLinks(upiUri);

    assert.equal(links.raw, upiUri);
    assert.ok(links.gpay.includes('com.google.android.apps.nbu.paisa.user'));
    assert.ok(links.phonepe.includes('com.phonepe.app'));
    assert.ok(links.paytm.includes('net.one97.paytm'));
    assert.ok(links.cred.includes('be.tramsun.cred'));
  });

  it('generates ISO/IEC 18004 compliant crisp SVG QR code without external network', () => {
    const upiUri = 'upi://pay?pa=merchant@okaxis&pn=BuimbPay&am=250.00&cu=INR';
    const svg = generateQrSvg(upiUri, 280);

    assert.ok(svg.startsWith('<svg'));
    assert.ok(svg.includes('viewBox="0 0 280 280"'));
    assert.ok(svg.includes('<rect'));
    assert.ok(svg.endsWith('</svg>'));
  });
});

describe('BuimbPay Indian Bank SMS Parser', () => {
  it('extracts amounts, UTR, and VPA from HDFC Bank SMS', () => {
    const sms = {
      text: 'Dear Customer, Rs.1499.00 credited to account **1234 on 07-NOV-26 by UPI: payer@okaxis. Ref no: 431298765432. - HDFC Bank',
      sender: 'HDFCBK',
    };
    const parsed = BankSmsParser.parse(sms);

    assert.ok(parsed);
    assert.equal(parsed.amountPaise, 149900n);
    assert.equal(parsed.amountRupees, '1499.00');
    assert.equal(parsed.bankReferenceNumber, '431298765432');
    assert.equal(parsed.senderVpa, 'payer@okaxis');
    assert.equal(parsed.isCredit, true);
  });

  it('extracts ₹ symbol and 12-digit UTR from SBI SMS', () => {
    const sms = {
      text: 'Your A/C ending 4567 credited by ₹500.00 on 07Nov26 transfer from rahul@upi UPI Ref 431200112233',
      sender: 'SBIINB',
    };
    const parsed = BankSmsParser.parse(sms);

    assert.ok(parsed);
    assert.equal(parsed.amountPaise, 50000n);
    assert.equal(parsed.bankReferenceNumber, '431200112233');
    assert.equal(parsed.senderVpa, 'rahul@upi');
  });

  it('correctly rejects debit SMS alerts', () => {
    const sms = {
      text: 'Rs. 250.00 debited from A/C **9876 on 07-NOV-26 for UPI/431298765432/Store. Available balance Rs. 1200.00',
      sender: 'ICICIB',
    };
    const parsed = BankSmsParser.parse(sms);
    assert.equal(parsed, null);
  });
});

describe('BuimbPay Bank Email Parser', () => {
  it('extracts credit alert from bank email', () => {
    const email = {
      subject: 'Payment Received: INR 2,499.00 in your ICICI Bank Account',
      body: 'Dear Merchant, An amount of INR 2499.00 has been credited to your account via UPI. Sender: john@okaxis, UTR: 431299887766.',
    };
    const parsed = BankEmailParser.parse(email);

    assert.ok(parsed);
    assert.equal(parsed.amountPaise, 249900n);
    assert.equal(parsed.bankReferenceNumber, '431299887766');
    assert.equal(parsed.senderVpa, 'john@okaxis');
  });
});

