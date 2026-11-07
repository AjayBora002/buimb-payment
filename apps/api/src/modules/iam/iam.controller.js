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
import { Controller, Post, Get, Body, Req, HttpCode, HttpStatus, UseGuards, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { IamService } from './iam.service.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
let IamController = class IamController {
    iamService;
    constructor(iamService) {
        this.iamService = iamService;
    }
    async register(body) {
        return this.iamService.register(body);
    }
    async login(body, req) {
        const ipAddress = req.ip || req.headers['x-forwarded-for'];
        const userAgent = req.headers['user-agent'];
        return this.iamService.login(body.email, body.password, {
            ipAddress: typeof ipAddress === 'string' ? ipAddress : undefined,
            userAgent: typeof userAgent === 'string' ? userAgent : undefined,
        });
    }
    async refresh(body) {
        return this.iamService.refreshToken(body.refreshToken);
    }
    async getProfile(req) {
        return this.iamService.getProfile(req.user.sub);
    }
};
__decorate([
    Post('register'),
    HttpCode(HttpStatus.CREATED),
    ApiOperation({ summary: 'Register a new merchant user' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IamController.prototype, "register", null);
__decorate([
    Post('login'),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Login to merchant account' }),
    __param(0, Body()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IamController.prototype, "login", null);
__decorate([
    Post('refresh'),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Refresh access token' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IamController.prototype, "refresh", null);
__decorate([
    Get('me'),
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Get current user profile' }),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IamController.prototype, "getProfile", null);
IamController = __decorate([
    ApiTags('Auth'),
    Controller({ path: 'auth', version: '1' }),
    __metadata("design:paramtypes", [typeof (_a = typeof IamService !== "undefined" && IamService) === "function" ? _a : Object])
], IamController);
export { IamController };
