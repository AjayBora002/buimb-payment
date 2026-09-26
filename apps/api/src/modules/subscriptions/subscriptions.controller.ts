import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SubscriptionsService } from './subscriptions.service.js';
import { JwtAuthGuard } from '../iam/guards/jwt-auth.guard.js';

@ApiTags('Subscriptions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller({ path: 'subscriptions', version: '1' })
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post('plans')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a subscription plan' })
  async createPlan(@Req() req: any, @Body() body: any) {
    const merchantId = req.user.merchantId;
    return this.subscriptionsService.createPlan(merchantId, body);
  }

  @Get('plans')
  @ApiOperation({ summary: 'List subscription plans' })
  async listPlans(@Req() req: any) {
    const merchantId = req.user.merchantId;
    return this.subscriptionsService.listPlans(merchantId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a subscription' })
  async createSubscription(@Req() req: any, @Body() body: any) {
    const merchantId = req.user.merchantId;
    return this.subscriptionsService.createSubscription(merchantId, body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get subscription by ID' })
  async findOne(@Req() req: any, @Param('id') id: string) {
    const merchantId = req.user.merchantId;
    return this.subscriptionsService.getSubscription(merchantId, id);
  }

  @Get()
  @ApiOperation({ summary: 'List subscriptions' })
  async findAll(
    @Req() req: any,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: number,
  ) {
    const merchantId = req.user.merchantId;
    return this.subscriptionsService.listSubscriptions(merchantId, {
      cursor,
      limit: limit ? Number(limit) : undefined,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Cancel a subscription' })
  async cancel(
    @Req() req: any,
    @Param('id') id: string,
    @Body() body: { reason?: string },
  ) {
    const merchantId = req.user.merchantId;
    return this.subscriptionsService.cancelSubscription(merchantId, id, body?.reason);
  }
}
