import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const writing = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/writing" }),
    schema: z.object({
        title: z.string(),
        date: z.coerce.date(),
        excerpt: z.string().optional(),
        tags: z.array(z.string()).default([]),
    }),
});

const music = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/music" }),
    schema: z.object({
        title: z.string(),
        date: z.coerce.date(),
        embedUrl: z.string().url(),
        platform: z.enum(["soundcloud", "bandcamp"]).optional(),
        alternatePlatformUrl: z.string().url().optional(),
        rating: z.number().min(1).max(5).optional(),
        tags: z.array(z.string()).default([]),
    }),
});

const books = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/books" }),
    schema: z.object({
        bookTitle: z.string(),
        author: z.string(),
        date: z.coerce.date(),
        cover: z.string().optional(),
        coverAlt: z.string().optional(),
        status: z.enum(["reading", "finished", "abandoned"]).optional(),
        rating: z.number().min(1).max(5).optional(),
        tags: z.array(z.string()).default([]),
    }),
});

const film = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/film" }),
    schema: z.object({
        mediaTitle: z.string(),
        director: z.string().optional(),
        year: z.number().optional(),
        date: z.coerce.date(),
        mediaType: z.enum(["film", "series", "short", "documentary"]).optional(),
        rating: z.number().min(1).max(5).optional(),
        tags: z.array(z.string()).default([]),
    }),
});

export const collections = {
    writing,
    music,
    books,
    film,
};
