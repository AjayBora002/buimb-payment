import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import {
  SettlementsView,
  formatPaiseToInr,
  maskAccountNumber,
} from './SettlementsView.js';
import { apiClient } from '../lib/api-client.js';

// Mock the apiClient module
vi.mock('../lib/api-client.js', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('SettlementsView & Helpers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Formatting Helpers', () => {
    it('correctly converts BigInt/string paise to Indian Rupee representation', () => {
      // 34120000 paise = ₹3,41,200.00
      const formatted = formatPaiseToInr('34120000');
      // Normalize any non-breaking spaces
      const clean = formatted.replace(/\u00a0/g, ' ');
      expect(clean).toContain('3,41,200.00');
      expect(clean).toContain('₹');

      expect(formatPaiseToInr('0')).toBe('₹0.00');
      expect(formatPaiseToInr(null)).toBe('₹0.00');
      expect(formatPaiseToInr(undefined)).toBe('₹0.00');
    });

    it('correctly masks bank account numbers preserving the last 4 digits', () => {
      expect(maskAccountNumber('987654329102')).toBe('•••• •••• 9102');
      expect(maskAccountNumber('1234')).toBe('•••• •••• 1234');
      expect(maskAccountNumber('')).toBe('•••• •••• ••••');
      expect(maskAccountNumber(null)).toBe('•••• •••• ••••');
    });
  });

  describe('SettlementsView Component Integration', () => {
    const mockSettlementsList = {
      items: [
        {
          id: 'set_mock_001',
          merchantId: 'mer_123',
          bankAccountId: 'ba_456',
          status: 'SETTLED',
          grossAmount: '34120000',
          feeAmount: '682400',
          taxAmount: '122832',
          adjustmentAmount: '0',
          refundDeductions: '0',
          netAmount: '33314768',
          currency: 'INR',
          periodStart: '2026-09-20T18:30:00.000Z',
          periodEnd: '2026-09-21T18:30:00.000Z',
          settledAt: '2026-09-22T04:00:00.000Z',
          providerRef: 'UTR-HDFC-99182741',
          notes: 'Regular automated cycle batch',
          createdAt: '2026-09-22T04:00:00.000Z',
          updatedAt: '2026-09-22T04:00:00.000Z',
          bankAccount: {
            accountNumber: '50200018279102',
            bankName: 'HDFC Bank Limited',
            ifscCode: 'HDFC0000128',
          },
        },
      ],
      nextCursor: 'cursor_set_next_abc',
    };

    const mockSettlementDetail = {
      ...mockSettlementsList.items[0],
      items: [
        {
          id: 'sitem_001',
          settlementId: 'set_mock_001',
          paymentIntentId: 'pi_order_7718',
          type: 'PAYMENT',
          amount: '34120000',
          currency: 'INR',
          description: 'Payment capture for order 7718',
          createdAt: '2026-09-21T10:00:00.000Z',
        },
      ],
    };

    it('fetches and renders real settlements list on mount', async () => {
      vi.mocked(apiClient.get).mockResolvedValueOnce(mockSettlementsList);

      render(<SettlementsView />);

      // Should call the endpoint
      expect(apiClient.get).toHaveBeenCalledWith('/v1/settlements');

      // Wait for table row to render with settlement ID
      await waitFor(() => {
        expect(screen.getByText('set_mock_001')).toBeInTheDocument();
      });

      // Verify formatted rupee amount and bank info
      expect(screen.getAllByText('HDFC Bank Limited').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText(/9102/).length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText('SETTLED')).toBeInTheDocument();

      // Verify explicit deferred pagination note
      expect(screen.getByText(/explicitly deferred to v1.1/i)).toBeInTheDocument();
    });

    it('handles API error gracefully by rendering the empty state', async () => {
      vi.mocked(apiClient.get).mockRejectedValueOnce(new Error('Network error or server down'));

      render(<SettlementsView />);

      await waitFor(() => {
        expect(screen.getByTestId('empty-settlements')).toBeInTheDocument();
        expect(screen.getByText('No Settlements Recorded')).toBeInTheDocument();
      });
    });

    it('opens slide-over detail drawer on row click, calls GET /v1/settlements/:id, and closes cleanly', async () => {
      vi.mocked(apiClient.get)
        .mockResolvedValueOnce(mockSettlementsList) // initial list
        .mockResolvedValueOnce(mockSettlementDetail); // detail call

      render(<SettlementsView />);

      await waitFor(() => {
        expect(screen.getByText('set_mock_001')).toBeInTheDocument();
      });

      // Click the settlement row to open detail drawer
      const row = screen.getByTestId('settlement-row-set_mock_001');
      fireEvent.click(row);

      // Verify detail endpoint was called with the settlement ID
      expect(apiClient.get).toHaveBeenCalledWith('/v1/settlements/set_mock_001');

      // Wait for drawer content to render
      await waitFor(() => {
        expect(screen.getByTestId('settlement-detail-drawer')).toBeInTheDocument();
        expect(screen.getByText('UTR-HDFC-99182741')).toBeInTheDocument();
        expect(screen.getByText('Payment capture for order 7718')).toBeInTheDocument();
      });

      // Click close button
      const closeBtn = screen.getByTestId('close-detail-drawer');
      fireEvent.click(closeBtn);

      // Drawer should disappear
      await waitFor(() => {
        expect(screen.queryByTestId('settlement-detail-drawer')).not.toBeInTheDocument();
      });
    });
  });
});
