import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { SchemaDefinition } from '../../persistence/schema.definition';

@Schema({
  collection: 'anime_document',
})
export class AnimeDocument {
  @Prop({ type: String, required: true, unique: true })
  id!: string;

  @Prop({ type: Number, required: true, unique: true })
  mal_id!: number;

  @Prop({ type: String, required: true })
  image!: string;

  @Prop({ type: String, required: true })
  title!: string;

  @Prop({ type: String, required: true })
  slug!: string;

  @Prop({ type: Number, required: false })
  episodes?: number;

  @Prop({ type: String, required: false })
  synopsis?: string;

  @Prop({ type: Number, required: false })
  year?: number;

  @Prop({ type: Number, required: false })
  score?: number;
}

export const MongoAnimeSchema = SchemaFactory.createForClass(AnimeDocument);

export const MongoAnimeSchemaDefinition = new SchemaDefinition(
  AnimeDocument,
  MongoAnimeSchema,
);
