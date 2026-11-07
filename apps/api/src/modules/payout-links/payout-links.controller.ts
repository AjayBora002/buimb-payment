import { Controller, Get, Post, Body, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PayoutLinksService } from './payout-links.service.js';
import { JwtAuthGuard } from '../iam/guards/jwt-auth.guard.js';

@ApiTags('Payout Links — Self-serve vendor payouts')
@Controller({ path: 'payout-links', version: '1' })
export class PayoutLinksController {
  constructor(private readonly payoutLinksService: PayoutLinksService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new self-serve payout link' })
  async create(@Req() req: any, @Body() body: any) {
    const merchantId = req.user.merchantId;
    return this.payoutLinksService.createPayoutLink(merchantId, body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'List all issued payout links' })
  async list(@Req() req: any) {
    const merchantId = req.user.merchantId;
    return this.payoutLinksService.listPayoutLinks(merchantId);
  }

  // Public Endpoints for Recipient to View and Claim Funds
  @Get('public/:shortUrl')
  @ApiOperation({ summary: 'Public details of a payout link' })
  async getPublic(@Param('shortUrl') shortUrl: string) {
    return this.payoutLinksService.getPublicPayoutLink(shortUrl);
  }

  @Post('public/:shortUrl/claim')
  @ApiOperation({ summary: 'Recipient claims funds via UPI or Bank Account' })
  async claim(@Param('shortUrl') shortUrl: string, @Body() body: any) {
    return this.payoutLinksService.claimPayoutLink(shortUrl, body);
  }
}

