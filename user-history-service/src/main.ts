import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({ origin: configService.get('USER_SERVICE_URL') });
  app.setGlobalPrefix('v1/api');
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(configService.get('PORT') ?? 6000);
}
bootstrap();
