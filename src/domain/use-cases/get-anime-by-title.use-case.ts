import { Injectable } from '@nestjs/common';

import { Either, left, right } from '@/core/either';
import { UseCase } from '@/core/entities/use-case.abstract';
import { AnimeClient } from '@/infra/http/rest/clients/anime.client';
import { QuoteClient } from '@/infra/http/rest/clients/quote.client';

import { Anime } from '../entities/anime.entity';
import { Quote } from '../entities/quote.entity';
import { AnimeFactory } from '../factories/anime.factory';
import { QuoteFactory } from '../factories/quote.factory';
import { AnimeSchema } from '../schemas/anime.schema';
import { QuoteSchema } from '../schemas/quote.schema';

interface GetAnimeByTitleUseCaseRequest {
  title: string;
}
type GetAnimeByTitleUseCaseResponse = Either<Error, Anime[]>;

@Injectable()
export class GetAnimeByTitleUseCase
  implements UseCase<GetAnimeByTitleUseCaseRequest, GetAnimeByTitleUseCaseResponse>
{
  constructor(
    private readonly animeClient: AnimeClient,
    private readonly quoteClient: QuoteClient,
  ) {}

  async execute({
    title,
  }: GetAnimeByTitleUseCaseRequest): Promise<GetAnimeByTitleUseCaseResponse> {
    const [resolvedAnime, resolvedQuote] = await Promise.allSettled([
      this.animeClient.getAnimesByTitleOnJikan(title),
      this.quoteClient.getAnimesQuoteByTitle(title),
    ]);

    if (resolvedAnime.status === 'rejected') {
      return left(new Error('Anime by title not found'));
    }

    const quotes: Quote[] = [];

    if (resolvedQuote.status === 'fulfilled') {
      resolvedQuote.value.data.forEach((quote) => {
        const parsedQuote = QuoteSchema.safeParse(quote);
        if (!parsedQuote.success) return;

        quotes.push(QuoteFactory.create(parsedQuote.data));
      });
    }

    const animes: Anime[] = [];

    resolvedAnime.value.data.data.forEach((anime) => {
      const parsedAnime = AnimeSchema.safeParse(anime);
      if (!parsedAnime.success) return;

      animes.push(
        AnimeFactory.create({
          quotes,
          ...parsedAnime.data,
        }),
      );
    });

    return right(animes);
  }
}
