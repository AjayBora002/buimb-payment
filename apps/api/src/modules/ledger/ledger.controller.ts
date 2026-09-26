import {
  Controller,
  Get,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LedgerService } from './ledger.service.js';
import { JwtAuthGuard } from '../iam/guards/jwt-auth.guard.js';

@ApiTags('Ledger')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller({ path: 'ledger', version: '1' })
export class LedgerController {
  constructor(private readonly ledgerService: LedgerService) {}

  @Get('accounts')
  @ApiOperation({ summary: 'List ledger accounts' })
  async listAccounts(@Req() req: any) {
    const merchantId = req.user.merchantId;
    return this.ledgerService.listAccounts(merchantId);
  }

  @Get('transactions')
  @ApiOperation({ summary: 'List immutable ledger transactions' })
  async listTransactions(
    @Query('paymentIntentId') paymentIntentId?: string,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: number,
  ) {
    return this.ledgerService.listTransactions({
      paymentIntentId,
      cursor,
      limit: limit ? Number(limit) : undefined,
    });
  }
}
