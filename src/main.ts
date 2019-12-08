import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const PORT = process.env.PORT || 3000;
const SWAGGER_PROTOCOL =
  process.env.SWAGGER_PROTOCOL === 'https' ? 'https' : 'http';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('API orders')
    .setDescription('API Documentation')
    .setSchemes(SWAGGER_PROTOCOL)
    .setVersion('1.0.0')
    .addBearerAuth()
    .addTag('api-orders-nestjs')
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    include: [AppModule],
    deepScanRoutes: true,
  });
  SwaggerModule.setup('swagger', app, document);

  await app.listen(PORT);
}
bootstrap();
