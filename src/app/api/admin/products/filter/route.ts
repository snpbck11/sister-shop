import { IAdminProductsFilters, TAdminProductsSort } from "@/entities/product";
import { requireSessionApi } from "@/shared/auth/requireSessionApi";
import { getAdminProductsPageService } from "@/shared/server/services/product";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { response } = await requireSessionApi();
  if (response) return response;

  try {
    const url = new URL(req.url);

    const page = Number(url.searchParams.get("page") ?? "1");
    const limit = Number(url.searchParams.get("limit") ?? "20");
    const sort: TAdminProductsSort =
      (url.searchParams.get("sort") as TAdminProductsSort) ?? "createdAt_desc";

    const q = url.searchParams.get("q") ?? undefined;
    const categoryId = url.searchParams.get("categoryId")
      ? Number(url.searchParams.get("categoryId"))
      : undefined;
    const typeId = url.searchParams.get("typeId")
      ? Number(url.searchParams.get("typeId"))
      : undefined;
    const collectionId = url.searchParams.get("collectionId")
      ? Number(url.searchParams.get("collectionId"))
      : undefined;

    const minPrice = url.searchParams.get("minPrice")
      ? Number(url.searchParams.get("minPrice"))
      : undefined;
    const maxPrice = url.searchParams.get("maxPrice")
      ? Number(url.searchParams.get("maxPrice"))
      : undefined;

    const createdFrom = url.searchParams.get("createdFrom")
      ? new Date(url.searchParams.get("createdFrom")!)
      : undefined;
    const createdTo = url.searchParams.get("createdTo")
      ? new Date(url.searchParams.get("createdTo")!)
      : undefined;

    const filters: IAdminProductsFilters = {
      q,
      categoryId,
      typeId,
      collectionId,
      minPrice,
      maxPrice,
      createdFrom,
      createdTo,
    };

    const result = await getAdminProductsPageService({ page, limit, sort, filters });

    return NextResponse.json(result, { status: 200 });
  } catch (e) {
    console.error("GET /api/admin/products/filter error:", e);
    return NextResponse.json(
      { success: false, error: "Ошибка при получении товаров" },
      { status: 500 },
    );
  }
}
