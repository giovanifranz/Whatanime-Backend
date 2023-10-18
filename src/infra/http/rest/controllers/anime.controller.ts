import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { GetAnimeByMalIdUseCase } from '@/domain/use-cases/get-anime-by-mal-id.use-case';
import { GetAnimeByTitleUseCase } from '@/domain/use-cases/get-anime-by-title.use-case';
import { GetAnimeRandomUseCase } from '@/domain/use-cases/get-anime-random.use-case';
import { AnimeByTitlePresenter } from '@/infra/presenters/anime-by-title.presenter';
import { SingleAnimePresenter } from '@/infra/presenters/single-anime.presenter';

@ApiTags('Anime')
@Controller('/anime')
export class AnimeController {
  constructor(
    private readonly getAnimeRandomUseCase: GetAnimeRandomUseCase,
    private readonly getAnimeByTitleUseCase: GetAnimeByTitleUseCase,
    private readonly getAnimeByMalIdUseCase: GetAnimeByMalIdUseCase,
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

  /*
  @Get('/top')
  getAnimeTop() {
    return this.jikan.getAnimeTop();
  }*/
}
