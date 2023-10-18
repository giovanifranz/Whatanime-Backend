import { Anime } from '@/domain/enterprise/entities/anime.entity';

interface Quote {
  quoteId: string;
  title: string;
  slug: string;
  character: string;
  text: string;
}

export interface AnimeResponse {
  id: string;
  mal_id: number;
  title: string;
  slug: string;
  image: string;
  episodes: number | null;
  synopsis: string | null;
  year: number | null;
  score: number | null;
  quotes: Quote[];
}

type AnimeChunk = {
  animes: AnimeResponse[];
  current_page: number;
};

function listChunk(animes: AnimeResponse[]) {
  const animesChunks: AnimeChunk[] = [];
  let count = 0;

  for (let i = 0; i < animes.length; i += 4) {
    for (let j = 1; j < 4; j += 4) {
      count += 1;
    }

    const newArraySortedAnimes = animes.slice(i, i + 4);

    if (newArraySortedAnimes.length < 4) {
      break;
    }

    animesChunks.push({
      animes: newArraySortedAnimes,
      current_page: count,
    });
  }

  return animesChunks;
}

interface Input {
  animes: Anime[];
  pagination: { has_next_page: boolean; current_page: number };
}
export class AnimeByTitlePresenter {
  static toHTTP({ animes, pagination }: Input) {
    const data: AnimeResponse[] = animes.map((anime) => {
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
    });
    return {
      anime: data[0],
      others_animes: listChunk(data.slice(1)),
      pagination,
    };
  }
}
