import { HttpModule as AxiosModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { GetAnimeByMalIdUseCase } from '@/domain/application/use-cases/get-anime-by-mal-id.use-case';
import { GetAnimeByTitleUseCase } from '@/domain/application/use-cases/get-anime-by-title.use-case';
import { GetAnimeRandomUseCase } from '@/domain/application/use-cases/get-anime-random.use-case';
import { GetAnimesByPopularityUseCase } from '@/domain/application/use-cases/get-animes-by-popularity.use-case';
import { GetTopAnimesAiringUseCase } from '@/domain/application/use-cases/get-top-animes-airing.use-case';

import { AnimeClient } from './rest/clients/anime.client';
import { QuoteClient } from './rest/clients/quote.client';
import { AnimeController } from './rest/controllers/anime.controller';

@Module({
  imports: [
    AxiosModule.register({
      timeout: 30000,
      maxRedirects: 5,
    }),
  ],
  providers: [
    AnimeClient,
    QuoteClient,
    GetAnimeRandomUseCase,
    GetAnimeByTitleUseCase,
    GetAnimeByMalIdUseCase,
    GetTopAnimesAiringUseCase,
    GetAnimesByPopularityUseCase,
  ],
  controllers: [AnimeController],
})
export class HttpModule {}
