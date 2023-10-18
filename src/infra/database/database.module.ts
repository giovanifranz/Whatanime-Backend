import { Module } from '@nestjs/common';

import { AnimeRepository } from '@/domain/application/repositories/anime.repository.abstract';

import { getPersistence } from '../environment/utils';

import { PersistenceModule } from './persistence/persistence.module';
import { InMemoryAnimeRepository } from './repositories/in-memory/in-memory-anime.repository';
import { MongoAnimeSchemaDefinition } from './repositories/mongo/anime-document.schema';
import { MongoAnimeRepository } from './repositories/mongo/mongo-anime.repository';

@Module({
  imports: [
    PersistenceModule.forRoot(getPersistence()),
    PersistenceModule.forFeature(getPersistence(), [MongoAnimeSchemaDefinition]),
  ],
  providers: [
    PersistenceModule.repository(AnimeRepository, {
      MONGO: MongoAnimeRepository,
      MEMORY: InMemoryAnimeRepository,
    }),
  ],
  exports: [PersistenceModule],
})
export class DatabaseModule {}
