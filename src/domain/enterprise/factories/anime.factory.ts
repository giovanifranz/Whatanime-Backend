import { randomUUID } from 'crypto';

import { Optional } from '@/core/types/optional';

import { Anime, AnimeProps } from '../entities/anime.entity';

export class AnimeFactory {
  static create(props: Optional<AnimeProps, 'id' | 'slug'>): Anime {
    return new Anime({ id: props.id || randomUUID(), ...props });
  }
}
