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
var _a;
import { Controller, Get, Query, Req, UseGuards, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuditService } from './audit.service.js';
import { JwtAuthGuard } from '../iam/guards/jwt-auth.guard.js';
let AuditController = class AuditController {
    auditService;
    constructor(auditService) {
        this.auditService = auditService;
    }
    async list(req, resource, cursor, limit) {
        const merchantId = req.user.merchantId;
        return this.auditService.listEvents(merchantId, {
            resource,
            cursor,
            limit: limit ? Number(limit) : undefined,
        });
    }
};
__decorate([
    Get(),
    ApiOperation({ summary: 'List security and audit events' }),
    __param(0, Req()),
    __param(1, Query('resource')),
    __param(2, Query('cursor')),
    __param(3, Query('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Number]),
    __metadata("design:returntype", Promise)
], AuditController.prototype, "list", null);
AuditController = __decorate([
    ApiTags('Audit'),
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    Controller({ path: 'audit-logs', version: '1' }),
    __metadata("design:paramtypes", [typeof (_a = typeof AuditService !== "undefined" && AuditService) === "function" ? _a : Object])
], AuditController);
export { AuditController };
