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

  getAnimesByTitle(title: string, page: number = 1) {
    return this.httpService.axiosRef.get<MultipleAnimeResponse>(
      `${this.jikanAPI}/anime?q=${title}&page=${page}`,
    );
  }

  getToAnimesAiring() {
    return this.httpService.axiosRef.get<MultipleAnimeResponse>(
      `${this.jikanAPI}/anime?order_by=score&status=airing&sort=desc`,
    );
  }

  getAnimesByPopularity() {
    return this.httpService.axiosRef.get<MultipleAnimeResponse>(
      `${this.jikanAPI}/anime?order_by=popularity`,
    );
  }

  getAnimeByMalId(mal_id: number) {
    return this.httpService.axiosRef.get<SingleAnimeResponse>(
      `${this.jikanAPI}/anime/${mal_id}`,
    );
  }

  getAnimeRandom() {
    return this.httpService.axiosRef.get<SingleAnimeResponse>(
      `${this.jikanAPI}/random/anime`,
    );
  }
}
