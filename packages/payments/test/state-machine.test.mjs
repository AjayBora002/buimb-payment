import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  assertValidTransition,
  InvalidStateTransitionError,
  isTerminalState,
  canRefund,
  canCapture,
} from '../dist/state-machine.js';
import { PaymentIntentStatus } from '@prisma/client';

describe('Payment State Machine', () => {
  test('valid transition from CREATED to PROCESSING', () => {
    assert.doesNotThrow(() => {
      assertValidTransition(PaymentIntentStatus.CREATED, PaymentIntentStatus.PROCESSING);
    });
  });

  test('valid transition from PROCESSING to AUTHORISED', () => {
    assert.doesNotThrow(() => {
      assertValidTransition(PaymentIntentStatus.PROCESSING, PaymentIntentStatus.AUTHORISED);
    });
  });

  test('valid transition from AUTHORISED to CAPTURED', () => {
    assert.doesNotThrow(() => {
      assertValidTransition(PaymentIntentStatus.AUTHORISED, PaymentIntentStatus.CAPTURED);
    });
  });

  test('throws InvalidStateTransitionError on invalid transition from CREATED directly to CAPTURED', () => {
    assert.throws(
      () => {
        assertValidTransition(PaymentIntentStatus.CREATED, PaymentIntentStatus.CAPTURED);
      },
      (err) => err instanceof InvalidStateTransitionError
    );
  });

  test('throws on transition from terminal state FAILED', () => {
    assert.throws(
      () => {
        assertValidTransition(PaymentIntentStatus.FAILED, PaymentIntentStatus.PROCESSING);
      },
      (err) => err instanceof InvalidStateTransitionError
    );
  });

  test('isTerminalState identifies terminal states correctly', () => {
    assert.equal(isTerminalState(PaymentIntentStatus.FAILED), true);
    assert.equal(isTerminalState(PaymentIntentStatus.CANCELLED), true);
    assert.equal(isTerminalState(PaymentIntentStatus.EXPIRED), true);
    assert.equal(isTerminalState(PaymentIntentStatus.REFUNDED), true);
    assert.equal(isTerminalState(PaymentIntentStatus.PROCESSING), false);
    assert.equal(isTerminalState(PaymentIntentStatus.CAPTURED), false);
  });

  test('canRefund returns true only for refundable statuses', () => {
    assert.equal(canRefund(PaymentIntentStatus.CAPTURED), true);
    assert.equal(canRefund(PaymentIntentStatus.PARTIALLY_REFUNDED), true);
    assert.equal(canRefund(PaymentIntentStatus.SETTLED), true);
    assert.equal(canRefund(PaymentIntentStatus.PROCESSING), false);
    assert.equal(canRefund(PaymentIntentStatus.FAILED), false);
  });

  test('canCapture returns true only for capturable statuses', () => {
    assert.equal(canCapture(PaymentIntentStatus.AUTHORISED), true);
    assert.equal(canCapture(PaymentIntentStatus.CAPTURE_PENDING), true);
    assert.equal(canCapture(PaymentIntentStatus.CREATED), false);
  });
});
