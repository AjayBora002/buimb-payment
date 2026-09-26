import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service.js';
import { RiskOutcome, type RiskDecision } from '@prisma/client';

@Injectable()
export class RiskService {
  constructor(private readonly prisma: PrismaService) {}

  async evaluatePayment(
    merchantId: string,
    paymentIntentId: string,
    inputs: {
      amount: number;
      ipAddress?: string;
      email?: string;
      customerCountry?: string;
    },
  ): Promise<RiskDecision> {
    // Basic rules evaluation in sandbox
    let outcome: RiskOutcome = RiskOutcome.ALLOW;
    const reasonCodes: string[] = [];

    // Amount threshold check (e.g. transactions > 200,000 INR flagged for review)
    if (inputs.amount > 20000000) {
      outcome = RiskOutcome.REVIEW;
      reasonCodes.push('HIGH_VALUE_TRANSACTION');
    }

    const decision = await this.prisma.riskDecision.create({
      data: {
        merchantId,
        paymentIntentId,
        outcome,
        score: outcome === RiskOutcome.ALLOW ? 0.05 : 0.75,
        modelVersion: 'rule_engine_v1',
        inputs: inputs as any,
        reasonCodes,
      },
    });

    return decision;
  }

  async listDecisions(
    merchantId: string,
    query: { cursor?: string; limit?: number } = {},
  ) {
    const limit = Math.min(query.limit ?? 20, 100);

    const items = await this.prisma.riskDecision.findMany({
      where: { merchantId },
      take: limit + 1,
      ...(query.cursor ? { cursor: { id: query.cursor }, skip: 1 } : {}),
      orderBy: { createdAt: 'desc' },
    });

    const hasMore = items.length > limit;
    const result = hasMore ? items.slice(0, limit) : items;
    const nextCursor = hasMore ? result[result.length - 1].id : null;

    return { items: result, nextCursor };
  }

  async listRules() {
    return this.prisma.riskRule.findMany({
      where: { isActive: true },
      orderBy: { priority: 'asc' },
    });
  }
}
