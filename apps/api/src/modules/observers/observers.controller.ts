import { Controller, Post, Get, Body, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  ObserversService,
  IngestSmsDto,
  IngestGmailDto,
  PairDeviceDto,
} from './observers.service.js';

@ApiTags('Observers')
@Controller('api/v1/observers')
export class ObserversController {
  constructor(private readonly observersService: ObserversService) {}

  /**
   * Ingest bank SMS alert from Android APK or cellular SMS observer.
   */
  @Post('sms')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Ingest Bank SMS alert for payment matching' })
  async ingestSms(@Body() dto: IngestSmsDto) {
    return this.observersService.ingestSms(dto);
  }

  /**
   * Ingest bank email alert from Gmail observer.
   */
  @Post('gmail')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Ingest Bank Email alert for payment matching' })
  async ingestGmail(@Body() dto: IngestGmailDto) {
    return this.observersService.ingestGmail(dto);
  }

  /**
   * Pair Android Observer APK via QR code scan or API call.
   */
  @Post('pair')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Pair Android Observer Device' })
  async pairDevice(@Body() dto: PairDeviceDto) {
    return this.observersService.pairDevice(dto);
  }

  /**
   * List connected observer devices.
   */
  @Get('devices')
  @ApiOperation({ summary: 'List connected observer devices' })
  async getDevices(@Query('merchantId') merchantId?: string) {
    return this.observersService.getDevices(merchantId);
  }

  /**
   * Get live feed of recent bank observations.
   */
  @Get('live-feed')
  @ApiOperation({ summary: 'Get live incoming bank observations feed' })
  async getLiveFeed(@Query('limit') limit?: number) {
    return this.observersService.getLiveFeed(limit ? Number(limit) : 30);
  }
}

