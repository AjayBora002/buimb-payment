var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
let MagicCheckoutService = class MagicCheckoutService {
    /**
     * RTO (Return to Origin) AI Fraud Detection
     * Evaluates address pincode, customer phone history, cart value, and payment method.
     */
    async predictRtoRisk(data) {
        const highRiskPrefixes = ['11', '70', '80']; // sample tier-3 pin risk simulation
        const cleanPin = (data.pincode || '').trim();
        const isHighRiskPincode = highRiskPrefixes.some((p) => cleanPin.startsWith(p));
        const isHighOrderValue = Number(data.orderAmountPaise) > 500000; // > ₹5,000
        let score = 25; // baseline low risk
        if (isHighRiskPincode)
            score += 35;
        if (isHighOrderValue)
            score += 20;
        if (data.paymentMethod === 'COD')
            score += 15;
        const riskTier = score >= 65 ? 'HIGH' : score >= 40 ? 'MEDIUM' : 'LOW';
        const recommendCod = riskTier === 'LOW';
        return {
            riskScore: score, // 0 to 100
            riskTier,
            recommendation: recommendCod
                ? 'ALLOW_COD'
                : 'DISABLE_COD_REQUIRE_PREPAID',
            message: recommendCod
                ? 'Low RTO probability. Safe to offer Cash on Delivery.'
                : 'Elevated RTO probability. Offer UPI or Card with 5% discount incentive to convert to prepaid.',
            prepaidIncentiveDiscountPaise: recommendCod ? 0 : 5000, // ₹50 off for paying online
        };
    }
    /**
     * Coupons & Promotions Engine
     */
    async validateCoupon(code, cartAmountPaise) {
        const coupons = {
            BINGE50: { discountPct: 10, maxDiscountPaise: 5000, minCartPaise: 29900 },
            FLAT100: { discountPct: 15, maxDiscountPaise: 10000, minCartPaise: 49900 },
            SUPER200: { discountPct: 20, maxDiscountPaise: 20000, minCartPaise: 99900 },
        };
        const upper = (code || '').toUpperCase().trim();
        const rule = coupons[upper];
        if (!rule) {
            return { valid: false, message: 'Invalid or expired coupon code' };
        }
        if (cartAmountPaise < rule.minCartPaise) {
            return {
                valid: false,
                message: `Cart minimum amount must be ₹${(rule.minCartPaise / 100).toFixed(2)} to apply ${upper}`,
            };
        }
        const calculatedDiscount = Math.round((cartAmountPaise * rule.discountPct) / 100);
        const finalDiscountPaise = Math.min(calculatedDiscount, rule.maxDiscountPaise);
        return {
            valid: true,
            code: upper,
            discountPaise: finalDiscountPaise,
            discountRupees: (finalDiscountPaise / 100).toFixed(2),
            finalAmountPaise: cartAmountPaise - finalDiscountPaise,
            message: `Coupon ${upper} applied! Saved ₹${(finalDiscountPaise / 100).toFixed(2)}`,
        };
    }
};
MagicCheckoutService = __decorate([
    Injectable()
], MagicCheckoutService);
export { MagicCheckoutService };
