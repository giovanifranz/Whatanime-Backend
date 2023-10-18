import { Controller, Get } from '@nestjs/common';
import { map } from 'rxjs';

import { AnimeClient } from '../clients/anime.client';

@Controller('/anime')
export class AnimeController {
  constructor(private anime: AnimeClient) {}

  @Get('/random')
  animeRandom() {
    return this.anime.getAnimeRandom().pipe(map((response) => response.data));
  }

  /* @Get('/from/mal_id/:mal_id')
  getAnimeByIdOnJikan(@Param('mal_id') mal_id: number) {
    return this.getAnimeById.execute(Number(mal_id)); // TODO VALIDAR SE ESTA ENTRANDO SEMPRE NUMERO
  }

  @Get('/from/title/:title')
  getAnimesByTitleOnJikan(@Param('title') title: string) {
    return this.getAnimeByTitle.execute(title);
  }

  @Get('/top')
  getAnimeTop() {
    return this.jikan.getAnimeTop();
  }*/
}
