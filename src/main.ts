import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { registerEnumType } from '@nestjs/graphql';
import { AppModule } from './app.module';
import { Status } from './enum/status.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // validation
  app.useGlobalPipes(new ValidationPipe());

  // register enum for graphql
  registerEnumType(Status, {
    name: 'Status',
    description: 'Pass status',
  });

  await app.listen(3000);
}
bootstrap();
