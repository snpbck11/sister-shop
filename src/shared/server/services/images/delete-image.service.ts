import { ApiResponse } from "@/shared/api/http/types";
import { DeleteImagesSchema } from "@/shared/validation";
import { parseOrFail } from "../../lib";
import { removeImagesByUrls } from "../../storage/image";

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
