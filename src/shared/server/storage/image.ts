import { YC_PUBLIC_BASE } from "@/shared/config/storage";
import { s3 } from "@/shared/lib/s3/s3Client";
import { extractKeyFromPublicUrl } from "../lib";

export async function uploadImagesToStorage(params: {
  files: File[];
  folder: string;
  slug: string;
}): Promise<string[]> {
  const { files, folder, slug } = params;

  if (!files?.length) throw new Error("Файлы обязательны");

  const folderPath = slug ? `${folder}/${slug}` : folder;

  const publicUrls: string[] = [];

  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const timestamp = Date.now();
    const extension = file.name.split(".").pop() || "jpg";
    const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
    const uniqueName = `${nameWithoutExt}-${timestamp}.${extension}`;

    const res = await s3.Upload([{ buffer, name: uniqueName }], folderPath);
    if (!res) throw new Error("Ошибка при загрузке в хранилище");

    const one = Array.isArray(res) ? res[0] : res;
    const url = one && typeof one === "object" && "Location" in one ? (one.Location as string) : "";

    if (!url) throw new Error(`Не удалось получить URL для ${file.name}`);
    publicUrls.push(url);
  }

  return publicUrls;
}

export async function removeImagesByUrls(urls: string[]) {
  const keys = urls.map((url) => extractKeyFromPublicUrl(url, YC_PUBLIC_BASE));
  const results = await Promise.all(keys.map((key) => s3.Remove(key)));
  const removed = results.filter(Boolean).length;

  if (removed !== keys.length) {
    throw new Error("Не все файлы удалось удалить");
  }

  return { ok: true, removed };
}
