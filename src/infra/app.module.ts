import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino';
import { ZodValidationPipe } from 'nestjs-zod';

import { DatabaseModule } from './database/database.module';
import { envSchema } from './environment/utils';
import { HttpModule } from './http/http.module';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      ignoreEnvFile: true,
      validate: (env) => envSchema.parse(env),
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport:
          process.env.NODE_ENV !== 'production' ? { target: 'pino-pretty' } : undefined,
      },
    }),
    HttpModule,
    DatabaseModule,
  ],
})
export class AppModule {}
