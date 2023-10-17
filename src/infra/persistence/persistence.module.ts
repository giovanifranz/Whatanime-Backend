import { DynamicModule, FactoryProvider, Global, Module, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { MemoryDatabaseModule } from './memory-database/memory-database.module';
import { MongoDatabaseModule } from './mongo-database/mongo-database.module';
import { SchemaDefinition } from './schema.definition';

export enum PERSISTENCE {
  MONGO = 'MONGO',
  MEMORY = 'MEMORY',
}

export type PersistenceType = PERSISTENCE;
const PERSISTENCE_TYPE = 'PERSISTENCE_TYPE';

@Global()
@Module({})
export class PersistenceModule {
  static forRoot(persistenceType: PersistenceType) {
    if (persistenceType === PERSISTENCE.MONGO)
      return {
        module: PersistenceModule,
        imports: [MongoDatabaseModule],
        providers: [
          {
            provide: PERSISTENCE_TYPE,
            useValue: PERSISTENCE.MONGO,
          },
        ],
        exports: [PERSISTENCE_TYPE],
      };

    return {
      module: PersistenceModule,
      imports: [MemoryDatabaseModule],
      providers: [
        {
          provide: PERSISTENCE_TYPE,
          useValue: PERSISTENCE.MEMORY,
        },
      ],
      exports: [PERSISTENCE_TYPE],
    };
  }

  static forFeature(
    persistenceType: PersistenceType,
    schemas: SchemaDefinition[],
  ): DynamicModule {
    if (persistenceType === PERSISTENCE.MONGO) {
      return MongooseModule.forFeature(
        schemas.map((schemaDefinition) => ({
          name: schemaDefinition.type.name,
          schema: schemaDefinition.schema,
        })),
      );
    }

    return MemoryDatabaseModule.forFeature(schemas);
  }

  static repository(type: any, database: { MONGO: Type; MEMORY: Type }): FactoryProvider {
    return {
      provide: type,
      inject: [PERSISTENCE_TYPE, ModuleRef],
      useFactory: (persistenceType: PersistenceType, moduleRef: ModuleRef) => {
        return moduleRef.create(database[persistenceType]);
      },
    };
  }
}
