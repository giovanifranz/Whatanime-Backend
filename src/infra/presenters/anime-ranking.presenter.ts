import { Slug } from '@/domain/enterprise/value-objects/slug';

interface Anime {
  malId: number;
  title: string;
  slug: Slug;
}

export class RankingPresenter {
  static toHTTP(animes: Anime[], qtd: number) {
    return animes.slice(0, qtd).map((anime) => ({
      title: anime.title,
      mal_id: anime.malId,
      slug: anime.slug.value,
    }));
  }
}
