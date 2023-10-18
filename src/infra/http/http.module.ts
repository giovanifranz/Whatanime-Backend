import { HttpModule as AxiosModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { AnimeClient } from './rest/clients/anime.client';
import { QuoteClient } from './rest/clients/quote.client';
import { AnimeController } from './rest/controllers/anime.controller';

@Module({
  imports: [
    AxiosModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [AnimeClient, QuoteClient],
  controllers: [AnimeController],
})
export class HttpModule {}
