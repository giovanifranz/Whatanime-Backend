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

interface GetTopAnimesAiringUseCaseRequest {}
type GetTopAnimesAiringUseCaseResponse = Either<Error, Title[]>;

@Injectable()
export class GetTopAnimesAiringUseCase
  implements UseCase<GetTopAnimesAiringUseCaseRequest, GetTopAnimesAiringUseCaseResponse>
{
  constructor(private readonly animeClient: AnimeClient) {}

  async execute(): Promise<GetTopAnimesAiringUseCaseResponse> {
    const rankingResponse: Title[] = await this.animeClient
      .getToAnimesAiring()
      .then(({ data: response }) =>
        response.data.map(({ mal_id, title }) => ({
          malId: mal_id,
          title,
          slug: Slug.createFromText(title),
        })),
      )
      .catch(() => []);

    if (rankingResponse.length < 1) {
      return left(new Error('Animes top airing not found'));
    }

    return right(rankingResponse);
  }
}
