export type SettlementStatus = 'PENDING' | 'PROCESSING' | 'SETTLED' | 'FAILED';

export interface SettlementBankAccount {
  accountNumber: string;
  bankName: string;
  ifscCode: string;
}

export interface SettlementItem {
  id: string;
  settlementId: string;
  paymentIntentId: string | null;
  type: 'PAYMENT' | 'REFUND' | 'DISPUTE' | 'FEE' | 'TAX' | 'ADJUSTMENT';
  amount: string; // BigInt serialized as string paise
  currency: string;
  description: string | null;
  createdAt: string;
}

export interface Settlement {
  id: string;
  merchantId: string;
  bankAccountId: string;
  status: SettlementStatus;
  grossAmount: string; // BigInt serialized as string paise
  feeAmount: string;
  taxAmount: string;
  adjustmentAmount: string;
  refundDeductions: string;
  netAmount: string;
  currency: string;
  periodStart: string;
  periodEnd: string;
  settledAt: string | null;
  providerRef: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  bankAccount?: SettlementBankAccount;
  items?: SettlementItem[];
}

export interface SettlementListResponse {
  items: Settlement[];
  nextCursor: string | null;
}
