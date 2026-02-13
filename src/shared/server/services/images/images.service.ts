import { ApiResponse } from "@/shared/api/http/types";
import { DeleteImagesSchema, UploadImagesMetaSchema } from "@/shared/validation";
import { parseOrFail } from "../../lib";
import { removeImagesByUrls, uploadImagesToStorage } from "../../storage/image";

export async function deleteImagesService(
  body: unknown,
): Promise<ApiResponse<{ removed: number }>> {
  const parsed = parseOrFail(DeleteImagesSchema, body);
  if (!parsed.success) return parsed;

  try {
    const { removed } = await removeImagesByUrls(parsed.data.urls);
    return { success: true, data: { removed } };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : "Ошибка удаления изображений",
    };
  }
}

export async function uploadImagesService(
  formData: FormData,
): Promise<ApiResponse<{ publicUrls: string[] }>> {
  const meta = {
    folder: String(formData.get("folder") ?? ""),
    slug: formData.get("slug") ? String(formData.get("slug")) : undefined,
  };

  const metaParsed = parseOrFail(UploadImagesMetaSchema, meta);
  if (!metaParsed.success) return metaParsed;

  const files = formData.getAll("files").filter((v): v is File => v instanceof File);
  if (!files.length) return { success: false, error: "Файлы обязательны" };

  try {
    const publicUrls = await uploadImagesToStorage({
      files,
      folder: metaParsed.data.folder,
      slug: metaParsed.data.slug,
    });

    return { success: true, data: { publicUrls } };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : "Ошибка загрузки изображений",
    };
  }
}
