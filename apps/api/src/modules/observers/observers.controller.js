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
var _a, _b, _c, _d;
import { Controller, Post, Get, Body, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ObserversService, IngestSmsDto, IngestGmailDto, PairDeviceDto, } from './observers.service.js';
let ObserversController = class ObserversController {
    observersService;
    constructor(observersService) {
        this.observersService = observersService;
    }
    /**
     * Ingest bank SMS alert from Android APK or cellular SMS observer.
     */
    async ingestSms(dto) {
        return this.observersService.ingestSms(dto);
    }
    /**
     * Ingest bank email alert from Gmail observer.
     */
    async ingestGmail(dto) {
        return this.observersService.ingestGmail(dto);
    }
    /**
     * Pair Android Observer APK via QR code scan or API call.
     */
    async pairDevice(dto) {
        return this.observersService.pairDevice(dto);
    }
    /**
     * List connected observer devices.
     */
    async getDevices(merchantId) {
        return this.observersService.getDevices(merchantId);
    }
    /**
     * Get live feed of recent bank observations.
     */
    async getLiveFeed(limit) {
        return this.observersService.getLiveFeed(limit ? Number(limit) : 30);
    }
};
__decorate([
    Post('sms'),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Ingest Bank SMS alert for payment matching' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof IngestSmsDto !== "undefined" && IngestSmsDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], ObserversController.prototype, "ingestSms", null);
__decorate([
    Post('gmail'),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Ingest Bank Email alert for payment matching' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof IngestGmailDto !== "undefined" && IngestGmailDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], ObserversController.prototype, "ingestGmail", null);
__decorate([
    Post('pair'),
    HttpCode(HttpStatus.CREATED),
    ApiOperation({ summary: 'Pair Android Observer Device' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof PairDeviceDto !== "undefined" && PairDeviceDto) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], ObserversController.prototype, "pairDevice", null);
__decorate([
    Get('devices'),
    ApiOperation({ summary: 'List connected observer devices' }),
    __param(0, Query('merchantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ObserversController.prototype, "getDevices", null);
__decorate([
    Get('live-feed'),
    ApiOperation({ summary: 'Get live incoming bank observations feed' }),
    __param(0, Query('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ObserversController.prototype, "getLiveFeed", null);
ObserversController = __decorate([
    ApiTags('Observers'),
    Controller('api/v1/observers'),
    __metadata("design:paramtypes", [typeof (_a = typeof ObserversService !== "undefined" && ObserversService) === "function" ? _a : Object])
], ObserversController);
export { ObserversController };
