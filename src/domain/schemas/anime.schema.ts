import { z } from 'nestjs-zod/z';

const ImageSchema = z.object({
  image_url: z.string(),
});

const TitleSchema = z.object({
  type: z.string(),
  title: z.string(),
});

export const AnimeSchema = z
  .object({
    mal_id: z.number(),
    images: z.object({
      jpg: ImageSchema,
      webp: z.union([z.null(), ImageSchema]).optional(),
    }),
    title: z.string(),
    titles: z.union([z.null(), z.array(TitleSchema)]).optional(),
    episodes: z.union([z.null(), z.number()]).optional(),
    score: z.union([z.number(), z.null()]).optional(),
    synopsis: z.union([z.null(), z.string()]).optional(),
    year: z.union([z.number(), z.null()]).optional(),
  })
  .transform((data) => ({
    episodes: data.episodes || null,
    image: data.images.webp?.image_url || data.images.jpg.image_url,
    malId: data.mal_id,
    score: data.score || null,
    title: data.titles ? data.titles[0].title : data.title,
    synopsis: data.synopsis || null,
    year: data.year || null,
  }));

const MultipleAnimesSchema = z.array(AnimeSchema);

export type SingleAnimeResponse = {
  data: z.input<typeof AnimeSchema>;
};

const ItemsSchema = z.object({
  count: z.number(),
  total: z.number(),
  per_page: z.number(),
});

const PaginationSchema = z.object({
  last_visible_page: z.number(),
  has_next_page: z.boolean(),
  current_page: z.number(),
  items: ItemsSchema,
});

type PaginationResponse = z.input<typeof PaginationSchema>;

export type MultipleAnimeResponse = {
  data: z.input<typeof MultipleAnimesSchema>;
  pagination: PaginationResponse;
};
