import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AnimeRepository } from '@/domain/application/repositories/anime.repository.abstract';
import { Anime } from '@/domain/enterprise/entities/anime.entity';

import { MongoAnimeMapper } from '../../mappers/mongo-anime.mapper';

import { AnimeDocument } from './anime-document.schema';

@Injectable()
export class MongoAnimeRepository extends AnimeRepository {
  @InjectModel(AnimeDocument.name)
  private readonly model!: Model<AnimeDocument>;

  async create(anime: Anime): Promise<void> {
    this.model.create(anime);
  }
  async createMany(animes: Anime[]): Promise<void> {
    this.model.insertMany(animes);
  }

  async findByMalId(malId: number): Promise<Anime | null> {
    return this.model
      .findOne({ mal_id: malId })
      .then((anime) => {
        if (!anime) return null;

        return MongoAnimeMapper.toDomain(anime);
      })
      .catch(() => null);
  }

  async findOneAndUpdate(id: string, data: Partial<Anime>): Promise<Anime | null> {
    return this.model
      .findOneAndUpdate({ id }, data, { new: true })
      .then((anime) => {
        if (!anime) return null;

        return MongoAnimeMapper.toDomain(anime);
      })
      .catch(() => null);
  }
}
