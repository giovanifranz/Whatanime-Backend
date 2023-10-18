import { Injectable } from '@nestjs/common';

import { AnimeRepository } from '@/domain/application/repositories/anime.repository.abstract';
import { Anime } from '@/domain/enterprise/entities/anime.entity';

import { InjectMemoryDBCollection } from '../../persistence/memory-database/memory-database.provider';

@Injectable()
export class InMemoryAnimeRepository implements AnimeRepository {
  @InjectMemoryDBCollection(Anime)
  private readonly animeDatabase: Anime[] = [];

  async create(anime: Anime): Promise<void> {
    this.animeDatabase.push(anime);
  }

  async createMany(animes: Anime[]): Promise<void> {
    this.animeDatabase.push(...animes);
  }

  async findByMalId(malId: number): Promise<Anime | null> {
    const foundAnime = this.animeDatabase.find((anime) => anime.malId === malId);
    if (!foundAnime) return null;

    return foundAnime;
  }

  async findOneAndUpdate(id: string, data: Partial<Anime>): Promise<Anime | null> {
    const animeIndex = this.animeDatabase.findIndex((workflow) => workflow.id === id);

    if (animeIndex !== -1) {
      const updatedWorkflow = {
        ...this.animeDatabase[animeIndex],
        ...data,
      } as Anime;

      this.animeDatabase[animeIndex] = updatedWorkflow;
      return updatedWorkflow;
    }
    return null;
  }
}
