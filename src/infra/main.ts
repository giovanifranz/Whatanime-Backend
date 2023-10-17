import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { patchNestJsSwagger } from 'nestjs-zod';

import { EnvironmentService } from './environment/environment.service';
import { AppModule } from './app.module';

const APP_NAME_PREFIX = 'template-backend';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useLogger(app.get(Logger));

  if (process.env.NODE_ENV !== 'production') {
    app.setGlobalPrefix(APP_NAME_PREFIX);
  }

  const options = new DocumentBuilder()
    .setTitle('Template Backend')
    .setVersion('1.0')
    .build();

  patchNestJsSwagger();

  SwaggerModule.setup('/api', app, SwaggerModule.createDocument(app, options));

  const environmentService = app.get<EnvironmentService>(EnvironmentService);
  const port = environmentService.get('PORT');

  await app.listen(port);
}

bootstrap();
