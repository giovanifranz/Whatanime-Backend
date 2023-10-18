import { Inject, Injectable } from '@nestjs/common';

import { Either, left, right } from '@/core/either';
import { UseCase } from '@/core/entities/use-case.abstract';
import { AnimeSchema } from '@/domain/application/schemas/anime.schema';
import { QuoteSchema } from '@/domain/application/schemas/quote.schema';
import { Anime } from '@/domain/enterprise/entities/anime.entity';
import { Quote } from '@/domain/enterprise/entities/quote.entity';
import { AnimeFactory } from '@/domain/enterprise/factories/anime.factory';
import { QuoteFactory } from '@/domain/enterprise/factories/quote.factory';
import { AnimeClient } from '@/infra/http/rest/clients/anime.client';
import { QuoteClient } from '@/infra/http/rest/clients/quote.client';

import { AnimeRepository } from '../repositories/anime.repository.abstract';

interface GetAnimeByMalIdUseCaseRequest {
  malId: number;
}
type GetAnimeByMalIdUseCaseResponse = Either<Error, Anime>;

@Injectable()
export class GetAnimeByMalIdUseCase
  implements UseCase<GetAnimeByMalIdUseCaseRequest, GetAnimeByMalIdUseCaseResponse>
{
  @Inject(AnimeRepository)
  private readonly animeRepository!: AnimeRepository;

  constructor(
    private readonly animeClient: AnimeClient,
    private readonly quoteClient: QuoteClient,
  ) {}

  async execute({
    malId,
  }: GetAnimeByMalIdUseCaseRequest): Promise<GetAnimeByMalIdUseCaseResponse> {
    const existsInDatabase = await this.animeRepository.findByMalId(malId);

    if (existsInDatabase) return right(existsInDatabase);

    const animeResponse = await this.animeClient
      .getAnimeByMalId(malId)
      .then(({ data: response }) => response.data)
      .catch(() => null);

    if (!animeResponse) {
      return left(new Error(`Anime mal_id: ${malId} not found`));
    }

    const parsedAnime = AnimeSchema.safeParse(animeResponse);

    if (!parsedAnime.success) {
      return left(new Error('Failed to parse random anime'));
    }

    const quotes: Quote[] = await this.quoteClient
      .getAnimesQuoteByTitle(parsedAnime.data.title)
      .then(({ data }) => {
        if (!data) return [];

        const quotes: Quote[] = [];

        data.forEach((quote) => {
          const parsedQuote = QuoteSchema.safeParse(quote);
          if (!parsedQuote.success) return;

          quotes.push(QuoteFactory.create(parsedQuote.data));
        });

        return quotes;
      })
      .catch(() => []);

    const animeByMalId = AnimeFactory.create({
      quotes,
      ...parsedAnime.data,
    });

    try {
      await this.animeRepository.create(animeByMalId);
    } catch (err) {
      console.error(err);
    }

    return right(animeByMalId);
  }
}
