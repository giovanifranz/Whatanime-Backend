/* eslint-disable */
export default async () => {
    const t = {
        ["./domain/value-objects/slug"]: await import("./domain/value-objects/slug"),
        ["./domain/entities/quote.entity"]: await import("./domain/entities/quote.entity")
    };
    return { "@nestjs/swagger": { "models": [[import("./domain/entities/anime.entity"), { "Anime": { _malId: { required: true, type: () => Number }, _image: { required: true, type: () => String }, _title: { required: true, type: () => String }, _slug: { required: true, type: () => t["./domain/value-objects/slug"].Slug }, _episodes: { required: true, type: () => Number, nullable: true }, _synopsis: { required: true, type: () => String, nullable: true }, _year: { required: true, type: () => Number, nullable: true }, _score: { required: true, type: () => Number, nullable: true }, _quotes: { required: true, type: () => [t["./domain/entities/quote.entity"].Quote] } } }], [import("./domain/entities/quote.entity"), { "Quote": { _title: { required: true, type: () => String }, _slug: { required: true, type: () => t["./domain/value-objects/slug"].Slug }, _character: { required: true, type: () => String }, _quote: { required: true, type: () => String } } }]], "controllers": [[import("./infra/http/rest/controllers/anime.controller"), { "AnimeController": { "animeRandom": { type: Object }, "getAnimeRandom": { type: Object }, "getAnimeByTitle": { type: Object } } }]] } };
};