import { Anime } from '@/domain/enterprise/entities/anime.entity';
import { AnimeFactory } from '@/domain/enterprise/factories/anime.factory';
import { Slug } from '@/domain/enterprise/value-objects/slug';

import { AnimeDocument } from '../repositories/mongo/anime-document.schema';

export class MongoAnimeMapper {
  static toDomain(raw: AnimeDocument): Anime {
    return AnimeFactory.create({
      id: raw.id,
      episodes: raw.episodes,
      image: raw.image,
      malId: raw.mal_id,
      title: raw.title,
      score: raw.score,
      slug: Slug.create(raw.slug),
      synopsis: raw.synopsis,
      year: raw.year,
      quotes: [],
    });
  }
}
