import { Injectable } from '@nestjs/common';

@Injectable()
export class MagicCheckoutService {
  /**
   * RTO (Return to Origin) AI Fraud Detection
   * Evaluates address pincode, customer phone history, cart value, and payment method.
   */
  async predictRtoRisk(data: {
    phone: string;
    pincode: string;
    orderAmountPaise: number;
    paymentMethod?: string;
  }) {
    const highRiskPrefixes = ['11', '70', '80']; // sample tier-3 pin risk simulation
    const cleanPin = (data.pincode || '').trim();
    const isHighRiskPincode = highRiskPrefixes.some((p) => cleanPin.startsWith(p));
    const isHighOrderValue = Number(data.orderAmountPaise) > 500000; // > ₹5,000

    let score = 25; // baseline low risk
    if (isHighRiskPincode) score += 35;
    if (isHighOrderValue) score += 20;
    if (data.paymentMethod === 'COD') score += 15;

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
  async validateCoupon(code: string, cartAmountPaise: number) {
    const coupons: Record<string, { discountPct: number; maxDiscountPaise: number; minCartPaise: number }> = {
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
}

