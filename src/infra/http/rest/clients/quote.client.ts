import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { QuoteResponse } from '@/domain/schemas/quote.schema';

@Injectable()
export class QuoteClient {
  private animeChan = 'https://animechan.vercel.app/api';

  constructor(private readonly httpService: HttpService) {}

  getRandomAnimeQuote() {
    return this.httpService.get<QuoteResponse>(`${this.animeChan}/random`);
  }

  getAnimesQuoteByTitle(title: string) {
    return this.httpService.get<QuoteResponse[]>(
      `${this.animeChan}/quotes/anime?title=${title}`,
    );
  }
}
