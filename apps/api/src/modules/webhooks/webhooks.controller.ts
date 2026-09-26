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
import { WebhooksService } from './webhooks.service.js';
import { JwtAuthGuard } from '../iam/guards/jwt-auth.guard.js';

@ApiTags('Webhooks')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller({ path: 'webhooks', version: '1' })
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Post('endpoints')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create webhook endpoint' })
  async createEndpoint(@Req() req: any, @Body() body: any) {
    const merchantId = req.user.merchantId;
    return this.webhooksService.createEndpoint(merchantId, body);
  }

  @Get('endpoints')
  @ApiOperation({ summary: 'List webhook endpoints' })
  async listEndpoints(@Req() req: any) {
    const merchantId = req.user.merchantId;
    return this.webhooksService.listEndpoints(merchantId);
  }

  @Delete('endpoints/:id')
  @ApiOperation({ summary: 'Delete webhook endpoint' })
  async deleteEndpoint(@Req() req: any, @Param('id') id: string) {
    const merchantId = req.user.merchantId;
    return this.webhooksService.deleteEndpoint(merchantId, id);
  }

  @Get('deliveries')
  @ApiOperation({ summary: 'List webhook delivery attempts and logs' })
  async listDeliveries(
    @Req() req: any,
    @Query('endpointId') endpointId?: string,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: number,
  ) {
    const merchantId = req.user.merchantId;
    return this.webhooksService.listDeliveries(merchantId, {
      endpointId,
      cursor,
      limit: limit ? Number(limit) : undefined,
    });
  }
}
