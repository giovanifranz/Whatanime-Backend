import { DynamicModule, Module } from '@nestjs/common';

import { SchemaDefinition } from '../schema.definition';

import { createCollectionToken } from './memory-database.provider';

@Module({})
export class MemoryDatabaseModule {
  static forFeature(schema: SchemaDefinition[]): DynamicModule {
    return {
      module: MemoryDatabaseModule,
      providers: schema.map(({ type }) => ({
        provide: createCollectionToken(type.name),
        useValue: [],
      })),
      exports: schema.map(({ type }) => createCollectionToken(type.name)),
    };
  }
}
