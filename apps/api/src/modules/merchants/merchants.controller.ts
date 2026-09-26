import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { MerchantsService } from './merchants.service.js';
import { JwtAuthGuard } from '../iam/guards/jwt-auth.guard.js';
import { Environment } from '@prisma/client';

@ApiTags('Merchants')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller({ path: 'merchants', version: '1' })
export class MerchantsController {
  constructor(private readonly merchantsService: MerchantsService) {}

  @Get('current')
  @ApiOperation({ summary: 'Get current authenticated merchant' })
  async getCurrent(@Req() req: any) {
    const merchantId = req.user.merchantId;
    return this.merchantsService.getMerchant(merchantId);
  }

  @Put('current')
  @ApiOperation({ summary: 'Update merchant settings' })
  async updateCurrent(@Req() req: any, @Body() body: any) {
    const merchantId = req.user.merchantId;
    return this.merchantsService.updateMerchant(merchantId, body);
  }

  @Post('current/kyc')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Submit KYC information' })
  async submitKyc(@Req() req: any, @Body() body: any) {
    const merchantId = req.user.merchantId;
    return this.merchantsService.submitKyc(merchantId, body);
  }

  @Get('current/bank-accounts')
  @ApiOperation({ summary: 'List settlement bank accounts' })
  async getBankAccounts(@Req() req: any) {
    const merchantId = req.user.merchantId;
    return this.merchantsService.getBankAccounts(merchantId);
  }

  @Post('current/bank-accounts')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add settlement bank account' })
  async addBankAccount(@Req() req: any, @Body() body: any) {
    const merchantId = req.user.merchantId;
    return this.merchantsService.addBankAccount(merchantId, body);
  }

  @Get('current/api-keys')
  @ApiOperation({ summary: 'List merchant API keys' })
  async listApiKeys(@Req() req: any) {
    const merchantId = req.user.merchantId;
    return this.merchantsService.listApiKeys(merchantId);
  }

  @Post('current/api-keys')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new API key' })
  async createApiKey(
    @Req() req: any,
    @Body() body: { name: string; environment?: Environment; scopes?: string[] },
  ) {
    const merchantId = req.user.merchantId;
    const userId = req.user.sub;
    return this.merchantsService.createApiKey(merchantId, userId, {
      name: body.name,
      environment: body.environment ?? Environment.SANDBOX,
      scopes: body.scopes,
    });
  }

  @Delete('current/api-keys/:keyId')
  @ApiOperation({ summary: 'Revoke an API key' })
  async revokeApiKey(@Req() req: any, @Param('keyId') keyId: string) {
    const merchantId = req.user.merchantId;
    const userId = req.user.sub;
    return this.merchantsService.revokeApiKey(merchantId, keyId, userId);
  }
}
