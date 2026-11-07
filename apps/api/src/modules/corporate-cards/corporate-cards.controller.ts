import { Controller, Get, Post, Body, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CorporateCardsService } from './corporate-cards.service.js';
import { JwtAuthGuard } from '../iam/guards/jwt-auth.guard.js';

@ApiTags('Corporate Cards — Expense Management')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller({ path: 'corporate-cards', version: '1' })
export class CorporateCardsController {
  constructor(private readonly corporateCardsService: CorporateCardsService) {}

  @Post()
  @ApiOperation({ summary: 'Issue a new virtual corporate expense card' })
  async issueCard(@Req() req: any, @Body() body: any) {
    const merchantId = req.user.merchantId;
    return this.corporateCardsService.issueCard(merchantId, body);
  }

  @Get()
  @ApiOperation({ summary: 'List all issued corporate cards' })
  async listCards(@Req() req: any) {
    const merchantId = req.user.merchantId;
    return this.corporateCardsService.listCards(merchantId);
  }

  @Post(':id/toggle')
  @ApiOperation({ summary: 'Freeze or Unfreeze a corporate card' })
  async toggleCard(@Req() req: any, @Param('id') id: string) {
    const merchantId = req.user.merchantId;
    return this.corporateCardsService.toggleCardStatus(merchantId, id);
  }
}

