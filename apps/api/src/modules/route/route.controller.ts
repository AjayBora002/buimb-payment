import { Controller, Get, Post, Body, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RouteService } from './route.service.js';
import { JwtAuthGuard } from '../iam/guards/jwt-auth.guard.js';

@ApiTags('Route — Split Marketplace')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller({ path: 'route', version: '1' })
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Post('accounts')
  @ApiOperation({ summary: 'Create a linked vendor account for split transfers' })
  async createAccount(@Req() req: any, @Body() body: any) {
    const merchantId = req.user.merchantId;
    return this.routeService.createLinkedAccount(merchantId, body);
  }

  @Get('accounts')
  @ApiOperation({ summary: 'List all linked accounts' })
  async listAccounts(@Req() req: any) {
    const merchantId = req.user.merchantId;
    return this.routeService.listLinkedAccounts(merchantId);
  }

  @Post('transfers')
  @ApiOperation({ summary: 'Create a split transfer on a captured payment' })
  async createTransfer(@Req() req: any, @Body() body: any) {
    const merchantId = req.user.merchantId;
    return this.routeService.createTransfer(merchantId, body);
  }

  @Get('transfers')
  @ApiOperation({ summary: 'List all split transfers' })
  async listTransfers(@Req() req: any) {
    const merchantId = req.user.merchantId;
    return this.routeService.listTransfers(merchantId);
  }

  @Post('transfers/:id/reversals')
  @ApiOperation({ summary: 'Reverse a split transfer' })
  async reverseTransfer(@Req() req: any, @Param('id') id: string, @Body() body: any) {
    const merchantId = req.user.merchantId;
    return this.routeService.reverseTransfer(merchantId, id, body);
  }
}

