import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import {
  MultipleAnimeResponse,
  SingleAnimeResponse,
} from '@/domain/schemas/anime.schema';

@Injectable()
export class AnimeClient {
  private jikanAPI = 'https://api.jikan.moe/v4';

  constructor(private readonly httpService: HttpService) {}

  getAnimesByTitleOnJikan(title: string) {
    return this.httpService.get<MultipleAnimeResponse>(
      `${this.jikanAPI}/anime?q=${title}&order_by=score&&sort=desc`,
    );
  }

  getAnimeTop() {
    return this.httpService.get<MultipleAnimeResponse>(`${this.jikanAPI}/top/anime`);
  }

  getAnimeByIdOnJikan(mal_id: number) {
    return this.httpService.get<SingleAnimeResponse>(`${this.jikanAPI}/anime/${mal_id}`);
  }

  getAnimeRandom() {
    return this.httpService.get<SingleAnimeResponse>(`${this.jikanAPI}/random/anime`);
  }
}
