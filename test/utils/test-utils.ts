import { HttpModule } from '@nestjs/axios';
import { HttpException } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import merge from 'deepmerge';
import { LoggerModule } from 'nestjs-pino';
import { Observable, throwError } from 'rxjs';

import { EnvironmentModule } from '@/infra/environment/environment.module';
import { PERSISTENCE, PersistenceModule } from '@/infra/persistence/persistence.module';

export function mockSuccess<M>(mock: M): Observable<M> {
  return new Observable((subscribe) => {
    subscribe.next(mock);
    subscribe.complete();
  });
}

export const mockError = (...args: [Error] | any) => {
  const isNotError = typeof args[0] === 'string';
  return throwError(() => (isNotError ? new HttpException(args[0], args[1]) : args[0]));
};

export function createTestingModule(metadata: ModuleMetadata) {
  const moduleRef = Test.createTestingModule(
    merge(
      {
        imports: [
          HttpModule,
          EnvironmentModule,
          PersistenceModule.forRoot(PERSISTENCE.MEMORY),
          LoggerModule.forRoot({ pinoHttp: { level: 'silent' } }),
          ConfigModule.forRoot({
            cache: true,
            isGlobal: true,
            ignoreEnvFile: true,
          }),
        ],
      } as ModuleMetadata,
      metadata,
    ),
  );

  return moduleRef;
}
