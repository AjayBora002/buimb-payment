import { Controller, Get, Post, Body, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { VerificationService } from './verification.service.js';
import { JwtAuthGuard } from '../iam/guards/jwt-auth.guard.js';

@ApiTags('Verification — Penny Drop & VPA')
@Controller({ path: 'verification', version: '1' })
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('bank-account')
  @ApiOperation({ summary: 'Penny Drop Bank Account Verification' })
  async verifyBankAccount(@Req() req: any, @Body() body: any) {
    const merchantId = req.user.merchantId;
    return this.verificationService.verifyBankAccount(merchantId, body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('vpa')
  @ApiOperation({ summary: 'UPI ID / VPA Verification' })
  async verifyVpa(@Req() req: any, @Body() body: { vpa: string }) {
    const merchantId = req.user.merchantId;
    return this.verificationService.verifyVpa(merchantId, body.vpa);
  }

  @Get('ifsc/:code')
  @ApiOperation({ summary: 'Lookup bank and branch info by IFSC code' })
  async resolveIfsc(@Param('code') code: string) {
    return this.verificationService.resolveIfsc(code);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('history')
  @ApiOperation({ summary: 'List verification audit history' })
  async listVerifications(@Req() req: any) {
    const merchantId = req.user.merchantId;
    return this.verificationService.listVerifications(merchantId);
  }
}

