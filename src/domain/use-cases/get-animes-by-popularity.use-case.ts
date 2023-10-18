import { Injectable } from '@nestjs/common';

import { Either, left, right } from '@/core/either';
import { UseCase } from '@/core/entities/use-case.abstract';
import { AnimeClient } from '@/infra/http/rest/clients/anime.client';

import { Slug } from '../value-objects/slug';

type Title = {
  malId: number;
  title: string;
  slug: Slug;
};

interface GetAnimesByPopularityUseCaseRequest {}
type GetAnimesByPopularityUseCaseResponse = Either<Error, Title[]>;

@Injectable()
export class GetAnimesByPopularityUseCase
  implements
    UseCase<GetAnimesByPopularityUseCaseRequest, GetAnimesByPopularityUseCaseResponse>
{
  constructor(private readonly animeClient: AnimeClient) {}

  async execute(): Promise<GetAnimesByPopularityUseCaseResponse> {
    const rankingResponse: Title[] = await this.animeClient
      .getAnimesByPopularity()
      .then(({ data: response }) =>
        response.data.map(({ mal_id, title }) => ({
          malId: mal_id,
          title,
          slug: Slug.createFromText(title),
        })),
      )
      .catch(() => []);

    if (rankingResponse.length < 1) {
      return left(new Error('Animes by popularity not found'));
    }

    return right(rankingResponse);
  }
}
