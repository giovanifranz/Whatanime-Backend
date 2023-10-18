import { Anime } from '@/domain/enterprise/entities/anime.entity';

export class SingleAnimePresenter {
  static toHTTP(anime: Anime) {
    return {
      id: anime.id,
      mal_id: anime.malId,
      title: anime.title,
      slug: anime.slug.value,
      image: anime.image,
      episodes: anime.episodes,
      synopsis: anime.synopsis,
      year: anime.year,
      score: anime.score,
      quotes: anime.quotes.map((quote) => ({
        quoteId: quote.id,
        title: quote.title,
        slug: quote.slug.value,
        character: quote.character,
        text: quote.text,
      })),
    };
  }
}
