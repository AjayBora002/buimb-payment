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
import { Controller, Get, Module, Req } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { SettlementsService } from '../modules/settlements/settlements.service.js';
import { SettlementStatus } from '@prisma/client';
// Ensure the BigInt serialization shim is registered
if (!BigInt.prototype.toJSON) {
    BigInt.prototype.toJSON = function () {
        return this.toString();
    };
}
describe('BigInt JSON Serialization Regression Suite', () => {
    describe('Unit: BigInt.prototype.toJSON behavior', () => {
        it('throws TypeError: Do not know how to serialize a BigInt when shim is missing', () => {
            const savedToJSON = BigInt.prototype.toJSON;
            try {
                delete BigInt.prototype.toJSON;
                expect(() => JSON.stringify({ amount: 100n })).toThrow(TypeError);
                expect(() => JSON.stringify({ amount: 100n })).toThrow(/Do not know how to serialize a BigInt/);
            }
            finally {
                BigInt.prototype.toJSON = savedToJSON;
            }
        });
        it('serializes BigInt to lossless numeric string when shim is active', () => {
            expect(JSON.stringify({ amount: 100n })).toBe('{"amount":"100"}');
            expect(JSON.stringify({ grossAmount: 34120000n, netAmount: 33314768n })).toBe('{"grossAmount":"34120000","netAmount":"33314768"}');
        });
    });
    describe('Integration: Fastify HTTP pipeline with real Settlement records', () => {
        let app;
        let fastify;
        const mockMerchantId = 'merch_test_1111-2222-3333-4444';
        const mockSettlement = {
            id: 'set_8192a01-test-uuid',
            merchantId: mockMerchantId,
            bankAccountId: 'bank_test_123',
            status: SettlementStatus.SETTLED,
            grossAmount: 34120000n, // ₹3,41,200.00 in paise
            feeAmount: 682400n, // ₹6,824.00 in paise
            taxAmount: 122832n, // ₹1,228.32 in paise
            adjustmentAmount: 0n,
            refundDeductions: 0n,
            netAmount: 33314768n, // ₹3,33,147.68 in paise
            currency: 'INR',
            periodStart: new Date('2026-09-21T00:00:00.000Z'),
            periodEnd: new Date('2026-09-21T23:59:59.000Z'),
            settledAt: new Date('2026-09-22T04:00:00.000Z'),
            providerRef: 'payout_hdfc_ref_9999',
            notes: 'Automated settlement batch',
            createdAt: new Date('2026-09-22T00:00:00.000Z'),
            updatedAt: new Date('2026-09-22T04:00:00.000Z'),
            bankAccount: {
                accountNumber: '9102',
                bankName: 'HDFC Bank',
                ifscCode: 'HDFC0000128',
            },
        };
        class MockPrismaService {
            settlement = {
                findMany: jest.fn().mockResolvedValue([mockSettlement]),
                findFirst: jest.fn().mockResolvedValue({
                    ...mockSettlement,
                    items: [
                        {
                            id: 'item_1',
                            settlementId: mockSettlement.id,
                            paymentIntentId: 'pi_1',
                            type: 'PAYMENT',
                            amount: 34120000n,
                            currency: 'INR',
                            description: 'Payment item 1',
                            createdAt: new Date(),
                        },
                    ],
                }),
            };
        }
        const mockPrisma = new MockPrismaService();
        const settlementsServiceInstance = new SettlementsService(mockPrisma);
        let TestSettlementsController = class TestSettlementsController {
            async findAll(req) {
                return settlementsServiceInstance.listSettlements(mockMerchantId);
            }
        };
        __decorate([
            Get(),
            __param(0, Req()),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", Promise)
        ], TestSettlementsController.prototype, "findAll", null);
        TestSettlementsController = __decorate([
            Controller('v1/settlements')
        ], TestSettlementsController);
        let TestModule = class TestModule {
        };
        TestModule = __decorate([
            Module({
                controllers: [TestSettlementsController],
            })
        ], TestModule);
        beforeAll(async () => {
            app = await NestFactory.create(TestModule, new FastifyAdapter({ logger: false }));
            fastify = app.getHttpAdapter().getInstance();
            await app.init();
            await fastify.ready();
        });
        afterAll(async () => {
            await app.close();
        });
        it('fails with HTTP 500 when BigInt.prototype.toJSON is missing in Fastify pipeline', async () => {
            const savedToJSON = BigInt.prototype.toJSON;
            try {
                delete BigInt.prototype.toJSON;
                const res = await fastify.inject({
                    method: 'GET',
                    url: '/v1/settlements',
                });
                // Fastify catches the unhandled TypeError in JSON.stringify and returns 500
                expect(res.statusCode).toBe(500);
                const body = JSON.parse(res.body);
                expect(body.statusCode).toBe(500);
                expect(body.message).toBe('Internal server error');
            }
            finally {
                BigInt.prototype.toJSON = savedToJSON;
            }
        });
        it('succeeds with HTTP 200 and stringified BigInt amounts when shim is active', async () => {
            const res = await fastify.inject({
                method: 'GET',
                url: '/v1/settlements',
            });
            expect(res.statusCode).toBe(200);
            const data = JSON.parse(res.body);
            expect(data).toHaveProperty('items');
            expect(data.items).toHaveLength(1);
            const item = data.items[0];
            // Assert all BigInt fields are serialised to exact numeric strings without precision loss
            expect(item.id).toBe('set_8192a01-test-uuid');
            expect(item.grossAmount).toBe('34120000');
            expect(typeof item.grossAmount).toBe('string');
            expect(item.feeAmount).toBe('682400');
            expect(typeof item.feeAmount).toBe('string');
            expect(item.taxAmount).toBe('122832');
            expect(typeof item.taxAmount).toBe('string');
            expect(item.netAmount).toBe('33314768');
            expect(typeof item.netAmount).toBe('string');
            expect(item.adjustmentAmount).toBe('0');
            expect(item.refundDeductions).toBe('0');
            expect(item.bankAccount.bankName).toBe('HDFC Bank');
        });
    });
});
