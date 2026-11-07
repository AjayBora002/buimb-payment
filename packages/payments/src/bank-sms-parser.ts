/**
 * BuimbPay Intelligent Bank SMS Parser for Indian Banks & UPI Alerts
 *
 * Supports alerts from SBI, HDFC, ICICI, Axis, Kotak, PNB, Bank of Baroda,
 * Paytm Bank, PhonePe, GPay, CRED, etc.
 * Extracts amounts, UTR / RRN references, sender VPA, and discards pure debits.
 */

export interface ParsedBankSms {
  amountPaise: bigint;
  amountRupees: string;
  bankReferenceNumber?: string;
  senderVpa?: string;
  observedAt: Date;
  rawText: string;
  isCredit: boolean;
}

/**
 * Intelligent amount extractor for Indian UPI & Bank SMS.
 */
export function extractIntelligentAmount(text: string): { amountStr: string; amountPaise: bigint } | null {
  if (!text || typeof text !== 'string') return null;

  const toPaise = (val: string): bigint => {
    const num = parseFloat(val.replace(/,/g, ''));
    if (isNaN(num)) throw new Error('Invalid number');
    return BigInt(Math.round(num * 100));
  };

  // 1. Currency prefix: Rs. 200, INR 500, ₹50, Rs 1,499.00
  const prefixMatch = text.match(/(?:(?:rs\.?|inr)\b|₹)[\s:=-]*([\d,]+(?:\.\d{1,2})?)/i);
  if (prefixMatch && prefixMatch[1]) {
    const clean = prefixMatch[1].replace(/,/g, '');
    try {
      return { amountStr: clean, amountPaise: toPaise(clean) };
    } catch {}
  }

  // 2. Currency suffix: 499 Rs, 499.00 INR, 20.00 Rs
  const suffixMatch = text.match(/(?:^|[^\w.])([\d,]+(?:\.\d{1,2})?)[\s:=-]*(?:(?:rs\.?|inr)\b|₹)/i);
  if (suffixMatch && suffixMatch[1]) {
    const clean = suffixMatch[1].replace(/,/g, '');
    try {
      return { amountStr: clean, amountPaise: toPaise(clean) };
    } catch {}
  }

  // 3. Number adjacent to credit keywords: "credited 20.00", "received 20.00"
  const creditProximityMatch = text.match(
    /(?:credited|received|deposit|payment|paid|transferred|upi|cr)[\s\w:]*?([\d,]+(?:\.\d{1,2})?)|([\d,]+(?:\.\d{1,2})?)[\s\w:]*?(?:credited|received|deposit|payment|paid|transferred|upi|cr)/i,
  );
  if (creditProximityMatch) {
    const rawVal = creditProximityMatch[1] || creditProximityMatch[2];
    if (rawVal) {
      const clean = rawVal.replace(/,/g, '');
      if (/^\d+(\.\d{1,2})?$/.test(clean) && Number(clean) < 10000000 && Number(clean) > 0) {
        try {
          return { amountStr: clean, amountPaise: toPaise(clean) };
        } catch {}
      }
    }
  }

  // 4. Standalone decimal currency number (e.g. 20.00, 150.50, 449.00)
  const standaloneDecimal = text.match(/\b(\d{1,6}\.\d{2})\b/);
  if (standaloneDecimal && standaloneDecimal[1]) {
    const clean = standaloneDecimal[1];
    try {
      return { amountStr: clean, amountPaise: toPaise(clean) };
    } catch {}
  }

  return null;
}

export class BankSmsParser {
  /**
   * Parses incoming SMS message text.
   */
  static parse(sms: {
    text: string;
    sender?: string;
    timestamp?: Date | number | string;
  }): ParsedBankSms | null {
    const MAX_SCAN_CHARS = 4096;
    const text = (sms.text || '').trim().slice(0, MAX_SCAN_CHARS);
    if (!text) return null;

    // Check if SMS represents an incoming credit
    const creditKeywords = /(credited|received|deposit|payment received|payment|upi\/cr|transferred)/i;
    if (!creditKeywords.test(text)) {
      return null;
    }

    // Ignore pure debits
    if (
      /(debited|withdrawn|sent rs|paid rs)/i.test(text) &&
      !/(credited|received|deposit)/i.test(text)
    ) {
      return null;
    }

    // 1. Extract Amount
    const extractedAmount = extractIntelligentAmount(text);
    if (!extractedAmount) {
      return null;
    }

    // 2. Extract Bank Reference / UTR / RRN (12 digits standard for UPI)
    let bankRef: string | undefined;
    const utrPatterns = [
      /(?:upi\s*ref(?:erence)?\s*(?:no\.?|num)?|utr(?:\s*no\.?)?|rrn(?:\s*no\.?)?|txn\s*(?:id|ref)?|ref\s*no\.?)[\s:=-]+([a-zA-Z0-9]{6,25})/i,
      /(?:ref\s*no\.?)?[\s:#=-]+([a-zA-Z0-9]{8,22})/i,
      /\b([0-9]{12})\b/,
    ];

    for (const pat of utrPatterns) {
      const match = text.match(pat);
      if (match && match[1]) {
        bankRef = match[1].trim();
        break;
      }
    }

    // 3. Extract Sender VPA if present
    let senderVpa: string | undefined;
    const vpaMatch = text.match(/(?:from|by|vpa|sender)[\s:]+(?:upi[\s:]+)?([a-zA-Z0-9.\-_]{2,64}@[a-zA-Z0-9.\-_]{2,32})/i) ||
      text.match(/\b([a-zA-Z0-9.\-_]{2,64}@[a-zA-Z0-9.\-_]{2,32})\b/);
    if (vpaMatch && vpaMatch[1]) {
      senderVpa = vpaMatch[1].trim().replace(/[.,;]+$/, '');
    }

    // 4. Resolve Timestamp
    let observedAt = new Date();
    if (sms.timestamp) {
      const parsed = new Date(sms.timestamp);
      if (!isNaN(parsed.getTime())) {
        observedAt = parsed;
      }
    }

    return {
      amountPaise: extractedAmount.amountPaise,
      amountRupees: extractedAmount.amountStr,
      bankReferenceNumber: bankRef,
      senderVpa,
      observedAt,
      rawText: text,
      isCredit: true,
    };
  }
}
