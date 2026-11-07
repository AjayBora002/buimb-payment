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
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service.js';
let VerificationService = class VerificationService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    /**
     * Penny Drop Bank Account Verification
     * Simulates a ₹1.00 credit to verify account holder name, IFSC validity, and active status.
     */
    async verifyBankAccount(merchantId, data) {
        if (!data.accountNumber || !data.ifsc) {
            throw new BadRequestException('Account number and IFSC code are required');
        }
        const ifscUpper = data.ifsc.toUpperCase().trim();
        const ifscInfo = this.resolveIfsc(ifscUpper);
        const simulatedUtr = `4312${Math.floor(10000000 + Math.random() * 90000000)}`;
        // Realistic simulated registered name lookup
        const simulatedName = data.beneficiaryName
            ? data.beneficiaryName.toUpperCase().trim()
            : 'PRIYA SHARMA';
        const record = await this.prisma.bankVerification.create({
            data: {
                merchantId,
                verificationType: 'PENNY_DROP',
                accountNumber: data.accountNumber.trim(),
                ifsc: ifscUpper,
                bankName: ifscInfo.bank,
                registeredName: simulatedName,
                status: 'COMPLETED',
                utr: simulatedUtr,
                confidenceScore: 0.98,
            },
        });
        return {
            id: record.id,
            verified: true,
            status: 'VALID',
            registeredName: simulatedName,
            accountNumber: data.accountNumber,
            ifsc: ifscUpper,
            bank: ifscInfo.bank,
            branch: ifscInfo.branch,
            city: ifscInfo.city,
            state: ifscInfo.state,
            utr: simulatedUtr,
            confidenceScore: '98%',
            createdAt: record.createdAt,
        };
    }
    /**
     * UPI ID / VPA Verification
     */
    async verifyVpa(merchantId, vpa) {
        if (!vpa || !vpa.includes('@')) {
            throw new BadRequestException('Valid UPI VPA (handle@bank) is required');
        }
        const cleanVpa = vpa.toLowerCase().trim();
        const handle = cleanVpa.split('@')[0];
        const registeredName = handle.replace(/[^a-zA-Z]/g, ' ').toUpperCase().trim() || 'PRIYA SHARMA';
        const record = await this.prisma.bankVerification.create({
            data: {
                merchantId,
                verificationType: 'UPI_VPA',
                vpa: cleanVpa,
                registeredName,
                status: 'COMPLETED',
                confidenceScore: 1.0,
            },
        });
        return {
            id: record.id,
            vpa: cleanVpa,
            valid: true,
            registeredName,
            status: 'VERIFIED',
            psp: cleanVpa.split('@')[1],
            createdAt: record.createdAt,
        };
    }
    /**
     * IFSC Details Lookup
     */
    resolveIfsc(code) {
        const clean = (code || '').toUpperCase().trim();
        const bankMap = {
            HDFC: { bank: 'HDFC Bank', branch: 'Koramangala 4th Block', city: 'Bengaluru', state: 'Karnataka' },
            ICIC: { bank: 'ICICI Bank', branch: 'Bandra Kurla Complex', city: 'Mumbai', state: 'Maharashtra' },
            SBIN: { bank: 'State Bank of India', branch: 'Connaught Place', city: 'New Delhi', state: 'Delhi' },
            UTIB: { bank: 'Axis Bank', branch: 'MG Road', city: 'Bengaluru', state: 'Karnataka' },
            KKBK: { bank: 'Kotak Mahindra Bank', branch: 'Nariman Point', city: 'Mumbai', state: 'Maharashtra' },
            PUNB: { bank: 'Punjab National Bank', branch: 'Sector 18', city: 'Noida', state: 'Uttar Pradesh' },
        };
        const prefix = clean.substring(0, 4);
        const matched = bankMap[prefix] || {
            bank: 'Scheduled Commercial Bank',
            branch: 'Main City Branch',
            city: 'Mumbai',
            state: 'Maharashtra',
        };
        return {
            ifsc: clean,
            bank: matched.bank,
            branch: matched.branch,
            city: matched.city,
            state: matched.state,
            rtgs: true,
            neft: true,
            imps: true,
            upi: true,
        };
    }
    async listVerifications(merchantId) {
        return this.prisma.bankVerification.findMany({
            where: { merchantId },
            orderBy: { createdAt: 'desc' },
            take: 50,
        });
    }
};
VerificationService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof PrismaService !== "undefined" && PrismaService) === "function" ? _a : Object])
], VerificationService);
export { VerificationService };
