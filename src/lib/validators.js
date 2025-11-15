import { z } from "zod";
import sanitizeHtml from "sanitize-html";

const MAX_CONTENT_LENGTH = 50_000; // adjust as needed
const MAX_TITLE_LENGTH = 300;
const MAX_URL_LENGTH = 2000;
const MAX_TAGS = 50;
const MAX_CATEGORIES = 50;

export const MediaZ = z.object({
  type: z.enum(["image", "youtube", "video", "document"]),
  url: z.string().url().max(MAX_URL_LENGTH),
  title: z.string().max(200).optional(),
});

export const EntryInputZ = z.object({
  date: z.preprocess((v) => {
    // accepts "YYYY-MM-DD" or Date strings
    if (typeof v === "string" || v instanceof String) {
      const d = new Date(v);
      if (!isNaN(d.getTime())) return d;
    }
    if (v instanceof Date) return v;
    return undefined;
  }, z.date()),
  title: z
    .string()
    .max(MAX_TITLE_LENGTH)
    .optional()
    .or(z.literal(""))
    .transform((s) =>
      sanitizeHtml(String(s || ""), { allowedTags: [], allowedAttributes: {} })
    ),
  content: z
    .string()
    .max(MAX_CONTENT_LENGTH)
    .optional()
    .or(z.literal(""))
    .transform((s) =>
      sanitizeHtml(String(s || ""), {
        allowedTags: [
          "b",
          "i",
          "em",
          "strong",
          "a",
          "p",
          "ul",
          "ol",
          "li",
          "br",
        ],
        allowedAttributes: { a: ["href", "rel", "target"] },
        allowedSchemes: ["http", "https", "mailto"],
      })
    ),
  categories: z
    .array(z.string().max(100))
    .max(MAX_CATEGORIES)
    .optional()
    .default([]),
  tags: z.array(z.string().max(100)).max(MAX_TAGS).optional().default([]),
  media: z.array(MediaZ).optional().default([]),
  externalLinks: z
    .array(z.string().url().max(MAX_URL_LENGTH))
    .optional()
    .default([]),
});

export function validateEntryInput(payload) {
  const result = EntryInputZ.safeParse(payload);
  if (!result.success) {
    return { success: false, errors: result.error.flatten() };
  }
  return { success: true, data: result.data };
}
