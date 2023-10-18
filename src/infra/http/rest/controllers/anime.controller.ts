import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { GetAnimeByTitleUseCase } from '@/domain/use-cases/get-anime-by-title.use-case';
import { GetAnimeRandomUseCase } from '@/domain/use-cases/get-anime-random.use-case';

@ApiTags('Anime')
@Controller('/anime')
export class AnimeController {
  constructor(
    private readonly getAnimeRandomUseCase: GetAnimeRandomUseCase,
    private readonly getAnimeByTitleUseCase: GetAnimeByTitleUseCase,
  ) {}

  @Get('/random')
  async getAnimeRandom() {
    const result = await this.getAnimeRandomUseCase.execute();

    if (result.isLeft()) {
      return new BadRequestException('AnimeRandom failed');
    }

    return result.value;
  }

  @Get('/from/title/:title')
  async getAnimeByTitle(@Param('title') title: string) {
    const result = await this.getAnimeByTitleUseCase.execute({ title });

    if (result.isLeft()) {
      return new BadRequestException('AnimeRandom failed');
    }

    return result.value;
  }

  /* @Get('/from/mal_id/:mal_id')
  getAnimeByIdOnJikan(@Param('mal_id') mal_id: number) {
    return this.getAnimeById.execute(Number(mal_id)); // TODO VALIDAR SE ESTA ENTRANDO SEMPRE NUMERO
  }



  @Get('/top')
  getAnimeTop() {
    return this.jikan.getAnimeTop();
  }*/
}
