// Load environment variables from .env if present
try {
  (process as any).loadEnvFile?.('.env');
} catch {}
try {
  (process as any).loadEnvFile?.('../../.env');
} catch {}

import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module.js';

// Root BigInt serialization shim for Fastify/JSON.stringify
// Prevents "TypeError: Do not know how to serialize a BigInt" on monetary fields
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

async function bootstrap() {
  // ── Safety guard: refuse to bind to production without explicit flag ──────
  const productionEnabled = process.env.PAYMENT_PRODUCTION_ENABLED === 'true';
  const nodeEnv = process.env.NODE_ENV ?? 'development';

  if (nodeEnv === 'production' && !productionEnabled) {
    console.error(
      '🚫 PAYMENT_PRODUCTION_ENABLED is not set to "true". ' +
        'The API will not start in production mode until all regulatory, ' +
        'banking, security, and compliance approvals are complete.',
    );
    process.exit(1);
  }

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: false }),
  );

  // ── Security headers ───────────────────────────────────────────────────────
  const fastifyInstance = app.getHttpAdapter().getInstance();
  await fastifyInstance.register(import('@fastify/helmet'), {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
  });

  // ── CORS — restrictive by default ─────────────────────────────────────────
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') ?? ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  // ── API versioning ────────────────────────────────────────────────────────
  app.enableVersioning({ type: VersioningType.URI });

  // ── Global validation pipe ─────────────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,           // strip unknown fields
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: false },
    }),
  );

  // ── OpenAPI documentation ─────────────────────────────────────────────────
  if (nodeEnv !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('BuimbPay API')
      .setDescription(
        'Payment infrastructure API — sandbox mode only until production approval',
      )
      .setVersion('1.0')
      .addBearerAuth()
      .addApiKey({ type: 'apiKey', in: 'header', name: 'X-API-Key' }, 'api-key')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  const port = parseInt(process.env.PORT ?? '4000', 10);
  await app.listen(port, '0.0.0.0');

  console.log(`🚀 BuimbPay API running on port ${port}`);
  console.log(`📋 Environment: ${nodeEnv}`);
  console.log(
    `🔒 Production payments: ${productionEnabled ? '⚠️  ENABLED' : '✅ DISABLED (sandbox only)'}`,
  );
  if (nodeEnv !== 'production') {
    console.log(`📖 API docs: http://localhost:${port}/docs`);
  }
}

bootstrap().catch((err) => {
  console.error('Fatal startup error:', err);
  process.exit(1);
});
