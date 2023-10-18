import { Entity } from '@/core/entities/entity.abstract';
import { Optional } from '@/core/types/optional';

import { Slug } from '../value-objects/slug';

import { Quote } from './quote.entity';

export interface AnimeProps {
  id: string;
  malId: number;
  image: string;
  title: string;
  slug: Slug;
  episodes?: number | null;
  synopsis?: string | null;
  year?: number | null;
  score?: number | null;
  quotes: Quote[];
}

export class Anime extends Entity {
  private _malId: number;
  private _image: string;
  private _title: string;
  private _slug: Slug;
  private _episodes: number | null;
  private _synopsis: string | null;
  private _year: number | null;
  private _score: number | null;
  private _quotes: Quote[];

  constructor(props: Optional<AnimeProps, 'slug'>) {
    super(props.id);
    this._malId = props.malId;
    this._image = props.image;
    this._title = props.title;
    this._slug = Slug.createFromText(props.title);
    this._episodes = props.episodes || null;
    this._synopsis = props.synopsis
      ? props.synopsis.replace('\n\n[Written by MAL Rewrite]', '')
      : null;
    this._year = props.year || null;
    this._score = props.score || null;
    this._quotes = props.quotes || null;
  }

  // Getters
  get malId(): number {
    return this._malId;
  }

  get image(): string {
    return this._image;
  }

  get title(): string {
    return this._title;
  }

  get slug(): Slug {
    return this._slug;
  }

  get episodes(): number | null {
    return this._episodes;
  }

  get synopsis(): string | null {
    return this._synopsis;
  }

  get year(): number | null {
    return this._year;
  }

  get score(): number | null {
    return this._score;
  }

  get quotes(): Quote[] {
    return this._quotes;
  }

  // Setters
  set malId(malId: number) {
    this._malId = malId;
  }

  set image(image: string) {
    this._image = image;
  }

  set title(title: string) {
    this._title = title;
  }

  set episodes(episodes: number | null) {
    this._episodes = episodes;
  }

  set synopsis(synopsis: string | null) {
    this._synopsis = synopsis;
  }

  set year(year: number | null) {
    this._year = year;
  }

  set score(score: number | null) {
    this._score = score;
  }
}
