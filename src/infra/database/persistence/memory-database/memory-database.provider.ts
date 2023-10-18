import { Inject, Type } from '@nestjs/common';

export const createCollectionToken = (name: string) => `MEMORY_DB_${name.toUpperCase()}`;

export const InjectMemoryDBCollection = (type: Type) =>
  Inject(createCollectionToken(type.name));
