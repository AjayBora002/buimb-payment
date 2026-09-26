import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { OrdersService } from './orders.service.js';
import { ApiKeyGuard } from '../iam/guards/api-key.guard.js';
import type { CreateOrderInput } from '@buimbpay/validation';

@ApiTags('Orders')
@ApiBearerAuth()
@ApiSecurity('x-api-key')
@UseGuards(ApiKeyGuard)
@Controller({ path: 'orders', version: '1' })
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new order' })
  async create(@Req() req: any, @Body() body: CreateOrderInput) {
    const merchantId: string = req.merchantId;
    return this.ordersService.createOrder(merchantId, body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve an order by ID' })
  async findOne(@Req() req: any, @Param('id') id: string) {
    const merchantId: string = req.merchantId;
    return this.ordersService.findOrder(merchantId, id);
  }

  @Get()
  @ApiOperation({ summary: 'List orders' })
  async findAll(
    @Req() req: any,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: number,
  ) {
    const merchantId: string = req.merchantId;
    return this.ordersService.findOrders(merchantId, {
      cursor,
      limit: limit ? Number(limit) : undefined,
    });
  }
}
