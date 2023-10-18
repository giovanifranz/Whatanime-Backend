import { randomUUID } from 'crypto';

import { Optional } from '@/core/types/optional';

import { Quote, QuoteProps } from '../entities/quote.entity';

export class QuoteFactory {
  static create(props: Optional<QuoteProps, 'id' | 'slug'>): Quote {
    return new Quote({ id: props.id || randomUUID(), ...props });
  }
}
