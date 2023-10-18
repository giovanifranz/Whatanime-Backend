import { z } from 'nestjs-zod/z';

const ImageSchema = z.object({
  image_url: z.union([z.null(), z.string()]).optional(),
  small_image_url: z.union([z.null(), z.string()]).optional(),
  large_image_url: z.union([z.null(), z.string()]).optional(),
});

const TitleSchema = z.object({
  type: z.union([z.null(), z.string()]).optional(),
  title: z.union([z.null(), z.string()]).optional(),
});

const AnimeSchema = z
  .object({
    mal_id: z.number(),
    images: z
      .union([
        z.null(),
        z.object({
          jpg: z.union([z.null(), ImageSchema]).optional(),
          webp: z.union([z.null(), ImageSchema]).optional(),
        }),
      ])
      .optional(),
    title: z.string(),
    titles: z.array(TitleSchema),
    episodes: z.union([z.null(), z.number()]).optional(),
    score: z.union([z.number(), z.null()]).optional(),
    synopsis: z.union([z.null(), z.string()]).optional(),
    year: z.union([z.number(), z.null()]).optional(),
  })
  .transform((data) => ({
    id: data.mal_id,
    image:
      data.images?.webp?.image_url || data.images?.jpg?.image_url || '/placeholder.png',
    title: data.titles[0].title || data.title,
    episodes: data.episodes || null,
    synopsis: data.synopsis || null,
    year: data.year || null,
    score: data.score || null,
  }));

const MultipleAnimesSchema = z.array(AnimeSchema);

const RankingSchema = z
  .object({ mal_id: z.number(), title: z.string() })
  .transform((data) => ({
    id: data.mal_id,
    title: data.title,
  }));

export type Ranking = z.output<typeof RankingSchema>;

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

export type Anime = z.output<typeof AnimeSchema>;

export const AnimeChunksSchema = z.array(
  z.object({
    animes: MultipleAnimesSchema,
  }),
);

export type AnimeChunks = z.infer<typeof AnimeChunksSchema>;

const AnimeByTitleSchema = z.object({
  pagination: z.object({
    has_next_page: z.boolean(),
    current_page: z.number(),
  }),
  data: MultipleAnimesSchema,
  isLoading: z.boolean(),
  error: z.union([z.null(), z.string()]),
});

export type AnimeByTitle = z.infer<typeof AnimeByTitleSchema>;
