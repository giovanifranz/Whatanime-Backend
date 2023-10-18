import { Anime } from '@/domain/enterprise/entities/anime.entity';

export abstract class AnimeRepository {
  abstract create(anime: Anime): Promise<void>;
  abstract createMany(animes: Anime[]): Promise<void>;
  abstract findByMalId(malId: number): Promise<Anime | null>;
  abstract findOneAndUpdate(id: string, data: Partial<Anime>): Promise<Anime | null>;
}
