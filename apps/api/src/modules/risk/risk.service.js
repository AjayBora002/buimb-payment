var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service.js';
import { RiskOutcome } from '@prisma/client';
let RiskService = class RiskService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async evaluatePayment(merchantId, paymentIntentId, inputs) {
        // Basic rules evaluation in sandbox
        let outcome = RiskOutcome.ALLOW;
        const reasonCodes = [];
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
                inputs: inputs,
                reasonCodes,
            },
        });
        return decision;
    }
    async listDecisions(merchantId, query = {}) {
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
};
RiskService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof PrismaService !== "undefined" && PrismaService) === "function" ? _a : Object])
], RiskService);
export { RiskService };
