import { Entity } from '@/core/entities/entity.abstract';
import { Optional } from '@/core/types/optional';

import { Slug } from '../value-objects/slug';

export interface QuoteProps {
  id: string;
  title: string;
  slug: Slug;
  character: string;
  text: string;
}

export class Quote extends Entity {
  private _title: string;
  private _slug: Slug;
  private _character: string;
  private _text: string;

  constructor(props: Optional<QuoteProps, 'slug'>) {
    super(props.id);
    this._title = props.title;
    this._slug = Slug.createFromText(props.title);
    this._character = props.character;
    this._text = props.text;
  }

  // Getters
  get title(): string {
    return this._title;
  }

  get slug(): Slug {
    return this._slug;
  }

  get character(): string {
    return this._character;
  }

  get text(): string {
    return this._text;
  }

  // Setters
  set title(title: string) {
    this._title = title;
  }

  set slug(slug: Slug) {
    this._slug = slug;
  }

  set character(character: string) {
    this._character = character;
  }

  set text(text: string) {
    this._text = text;
  }
}
