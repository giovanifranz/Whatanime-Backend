import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { GetAnimeByMalIdUseCase } from '@/domain/application/use-cases/get-anime-by-mal-id.use-case';
import { GetAnimeByTitleUseCase } from '@/domain/application/use-cases/get-anime-by-title.use-case';
import { GetAnimeRandomUseCase } from '@/domain/application/use-cases/get-anime-random.use-case';
import { GetAnimesByPopularityUseCase } from '@/domain/application/use-cases/get-animes-by-popularity.use-case';
import { GetTopAnimesAiringUseCase } from '@/domain/application/use-cases/get-top-animes-airing.use-case';
import { AnimeByTitlePresenter } from '@/infra/presenters/anime-by-title.presenter';
import { RankingPresenter } from '@/infra/presenters/anime-ranking.presenter';
import { SingleAnimePresenter } from '@/infra/presenters/single-anime.presenter';

@ApiTags('Anime')
@Controller('/anime')
export class AnimeController {
  constructor(
    private readonly getAnimeRandomUseCase: GetAnimeRandomUseCase,
    private readonly getAnimeByTitleUseCase: GetAnimeByTitleUseCase,
    private readonly getAnimeByMalIdUseCase: GetAnimeByMalIdUseCase,
    private readonly getAnimesByPopularityUseCase: GetAnimesByPopularityUseCase,
    private readonly getTopAnimesAiringUseCase: GetTopAnimesAiringUseCase,
  ) {}

  @Get('/random')
  async getAnimeRandom() {
    const result = await this.getAnimeRandomUseCase.execute();

    if (result.isLeft()) {
      return new BadRequestException('Anime random failed');
    }

    return SingleAnimePresenter.toHTTP(result.value);
  }

  @Get('/from/title/:title')
  async getAnimeByTitle(@Param('title') title: string) {
    const result = await this.getAnimeByTitleUseCase.execute({ title });

    if (result.isLeft()) {
      return new BadRequestException('Anime by title failed');
    }

    return AnimeByTitlePresenter.toHTTP({
      animes: result.value.data,
      pagination: result.value.pagination,
    });
  }

  @Get('/from/mal_id/:mal_id')
  async getAnimeByMalId(@Param('mal_id') mal_id: number) {
    const result = await this.getAnimeByMalIdUseCase.execute({ malId: mal_id });

    if (result.isLeft()) {
      return new BadRequestException('Anime by mal_id failed');
    }

    return SingleAnimePresenter.toHTTP(result.value);
  }

  @Get('/top/popularity')
  async getAnimesByPopularity() {
    const result = await this.getAnimesByPopularityUseCase.execute();

    if (result.isLeft()) {
      return new BadRequestException('Anime by popularity failed');
    }

    return RankingPresenter.toHTTP(result.value, 10);
  }

  @Get('/top/airing')
  async getTopAnimesAiring() {
    const result = await this.getTopAnimesAiringUseCase.execute();

    if (result.isLeft()) {
      return new BadRequestException('Anime by airing failed');
    }

    return RankingPresenter.toHTTP(result.value, 5);
  }
}
