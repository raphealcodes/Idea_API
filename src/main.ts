import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port = process.env.PORT || 8080;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);

  Logger.log(`server running on localhost:${port}`, 'BOOTSTRAP');
}
bootstrap();
