import { carouselList } from "@/shared/config/carouselProducts";
import { ROUTES } from "@/shared/config/routes";
import { ButtonLink } from "@/shared/ui";
import { CategoriesList } from "@/widgets/CategoriesList";
import { CollectionsList } from "@/widgets/CollectionsList";
import { collectionsList } from "@/widgets/CollectionsList/lib/collectionsList";
import { HeroSection } from "@/widgets/HeroSection";
import { ProductsCarousel } from "@/widgets/ProductsCarousel";

export default function Home() {
  return (
    <section>
      <HeroSection />
      <div className="lg:px-12.5">
        <CategoriesList />
        <h2 className="text-2xl w-full tracking-widest uppercase text-center mb-12">
          Самые популярные
        </h2>
        <div className="w-full no-scrollbar">
          <ProductsCarousel products={carouselList} />
        </div>
        <div className="mt-12 mb-24 px-8 py-4 w-full flex justify-center">
          <ButtonLink href={ROUTES.collections.allDesigns} variant="ghost" text="Посмотреть всё" />
        </div>
        <h2 className="text-2xl w-full tracking-widest uppercase text-center">Выбери свой стиль</h2>
        <CollectionsList collections={collectionsList} />
      </div>
    </section>
  );
}
