import { request } from "../http/request";

export async function deleteFiles(urls: string[]): Promise<number> {
  if (!urls.length) return 0;

  const res = await request<{ removed: number }>("/api/images/delete", {
    method: "DELETE",
    body: JSON.stringify({ urls }),
  });

  if (!res.success) throw new Error(res.error);
  return res.data.removed;
}

export async function deleteFile(url: string): Promise<number> {
  if (!url) return 0;
  return await deleteFiles([url]);
}

export async function uploadFiles(files: File[], folder: string, slug?: string): Promise<string[]> {
  if (!files.length) return [];

  const formData = new FormData();
  files.forEach((f) => formData.append("files", f));
  formData.append("folder", folder);
  if (slug) formData.append("slug", slug);

  const res = await request<{ publicUrls: string[] }>("/api/images/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.success) throw new Error(res.error);
  return res.data.publicUrls;
}

export async function uploadFile(file: File, folder = "products", slug?: string): Promise<string> {
  const urls = await uploadFiles([file], folder, slug);
  return urls[0] ?? "";
}

export async function updateFile(
  newFile: File,
  oldUrl: string,
  folder: string,
  slug?: string,
): Promise<string> {
  const newUrl = await uploadFile(newFile, folder, slug);

  if (oldUrl) {
    try {
      await deleteFile(oldUrl);
    } catch (e) {
      console.warn("Не удалили старый файл:", e);
    }
  }

  return newUrl;
}

export async function updateFiles(
  newFiles: File[],
  oldUrls: string[],
  folder: string,
  slug?: string,
): Promise<string[]> {
  const newUrls = await uploadFiles(newFiles, folder, slug);

  if (oldUrls?.length) {
    try {
      await deleteFiles(oldUrls);
    } catch (e) {
      console.warn("Не удалили старые файлы:", e);
    }
  }

  return newUrls;
}
