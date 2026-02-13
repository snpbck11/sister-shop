import { getCategoryPageBySlugService } from "@/shared/server/services/category/getCategoryPageBySlug.service";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const url = new URL(req.url);

    const cursor = url.searchParams.get("cursor");
    const limitRaw = url.searchParams.get("limit");
    const limitNum = limitRaw ? Number(limitRaw) : undefined;
    const limit = Number.isFinite(limitNum) ? limitNum : undefined;
    const { slug } = await params;

    const result = await getCategoryPageBySlugService({
      slug,
      cursor,
      limit,
    });

    return NextResponse.json(result, { status: result.success ? 200 : 404 });
  } catch (e) {
    console.error("GET /api/categories/[slug] error:", e);
    return NextResponse.json(
      { success: false, error: "Ошибка при получении категории" },
      { status: 500 },
    );
  }
}
