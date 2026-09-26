import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { IamService } from './iam.service.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class IamController {
  constructor(private readonly iamService: IamService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new merchant user' })
  async register(
    @Body()
    body: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      phone?: string;
      organisationName?: string;
    },
  ) {
    return this.iamService.register(body);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login to merchant account' })
  async login(
    @Body() body: { email: string; password: string },
    @Req() req: any,
  ) {
    const ipAddress = req.ip || req.headers['x-forwarded-for'];
    const userAgent = req.headers['user-agent'];
    return this.iamService.login(body.email, body.password, {
      ipAddress: typeof ipAddress === 'string' ? ipAddress : undefined,
      userAgent: typeof userAgent === 'string' ? userAgent : undefined,
    });
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token' })
  async refresh(@Body() body: { refreshToken: string }) {
    return this.iamService.refreshToken(body.refreshToken);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  async getProfile(@Req() req: any) {
    return this.iamService.getProfile(req.user.sub);
  }
}
