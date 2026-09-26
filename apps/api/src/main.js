"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const app_module_js_1 = require("./app.module.js");
async function bootstrap() {
    // ── Safety guard: refuse to bind to production without explicit flag ──────
    const productionEnabled = process.env.PAYMENT_PRODUCTION_ENABLED === 'true';
    const nodeEnv = process.env.NODE_ENV ?? 'development';
    if (nodeEnv === 'production' && !productionEnabled) {
        console.error('🚫 PAYMENT_PRODUCTION_ENABLED is not set to "true". ' +
            'The API will not start in production mode until all regulatory, ' +
            'banking, security, and compliance approvals are complete.');
        process.exit(1);
    }
    const app = await core_1.NestFactory.create(app_module_js_1.AppModule, new platform_fastify_1.FastifyAdapter({ logger: false }));
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
    app.enableVersioning({ type: common_1.VersioningType.URI });
    // ── Global validation pipe ─────────────────────────────────────────────────
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true, // strip unknown fields
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: false },
    }));
    // ── OpenAPI documentation ─────────────────────────────────────────────────
    if (nodeEnv !== 'production') {
        const config = new swagger_1.DocumentBuilder()
            .setTitle('BuimbPay API')
            .setDescription('Payment infrastructure API — sandbox mode only until production approval')
            .setVersion('1.0')
            .addBearerAuth()
            .addApiKey({ type: 'apiKey', in: 'header', name: 'X-API-Key' }, 'api-key')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('docs', app, document);
    }
    const port = parseInt(process.env.PORT ?? '4000', 10);
    await app.listen(port, '0.0.0.0');
    console.log(`🚀 BuimbPay API running on port ${port}`);
    console.log(`📋 Environment: ${nodeEnv}`);
    console.log(`🔒 Production payments: ${productionEnabled ? '⚠️  ENABLED' : '✅ DISABLED (sandbox only)'}`);
    if (nodeEnv !== 'production') {
        console.log(`📖 API docs: http://localhost:${port}/docs`);
    }
}
bootstrap().catch((err) => {
    console.error('Fatal startup error:', err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map