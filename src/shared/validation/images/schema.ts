import { z } from "zod";

export const DeleteImagesSchema = z.object({
  urls: z.array(z.string().min(1, "Url не должен быть пустой")).min(1, "Нужен хотя бы один url"),
});

export const UploadImagesMetaSchema = z.object({
  folder: z.preprocess((v) => (typeof v === "string" ? v : undefined), z.string().min(1)),
  slug: z.preprocess((v) => (typeof v === "string" && v.trim() ? v : undefined), z.string().min(1)),
});

export type TDeleteImagesInput = z.infer<typeof DeleteImagesSchema>;
export type TUploadImagesMeta = z.infer<typeof UploadImagesMetaSchema>;
