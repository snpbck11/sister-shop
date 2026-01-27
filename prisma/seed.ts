import { upsertCollection } from "@/entities/collection/model/service";
import { createProduct } from "../src/shared/lib/products";

// Данные коллекций с названиями и описаниями на русском
const seedCollections = [
  { slug: "all-designs", name: "Все товары", description: "Украшения, которые меняют образ." },
  {
    slug: "chokers",
    name: "Чокеры",
    description: "Акцент, который говорит за тебя. Украшения, созданные, чтобы усилить твой стиль.",
  },
  {
    slug: "bracers",
    name: "Браслеты",
    description: "Изысканные браслеты ручной работы",
  },
  {
    slug: "gothic",
    name: "Готика",
    description: "Темные аксессуары в готическом стиле",
  },
  {
    slug: "minimalist",
    name: "Минимализм",
    description: "Лаконичные украшения для повседневного ношения",
  },
  {
    slug: "punk",
    name: "Панк",
    description: "Дерзкие украшения в панк-стиле",
  },
  {
    slug: "victorian",
    name: "Викторианский стиль",
    description: "Элегантные украшения, вдохновленные викторианской эпохой",
  },
  {
    slug: "vintage",
    name: "Винтаж",
    description: "Винтажные аксессуары с налетом старины",
  },
  {
    slug: "couple",
    name: "Парные украшения",
    description: "Комплекты украшений для влюбленных",
  },
];

// Тестовые данные с существующими изображениями
// Каждый товар может быть в нескольких коллекциях
const seedProducts = [
  {
    slug: "gothic-cross-choker",
    title: "Готический чокер с крестом",
    description: "Элегантный готический чокер из черной кожи с серебряным крестом",
    price: 1500,
    image: "/chokers.png",
    hoverImage: "/best.jpg",
    gallery: ["/chokers.png", "/best.jpg", "/chokers.png", "/best.jpg", "/chokers.png"],
    collections: ["chokers", "gothic"],
  },
  {
    slug: "minimalist-choker",
    title: "Минималистичный чокер",
    description: "Простой и стильный минималистичный чокер из черного вельвета",
    price: 1200,
    image: "/best.jpg",
    hoverImage: "/array.jpg",
    gallery: ["/best.jpg", "/array.jpg", "/best.jpg", "/array.jpg", "/best.jpg"],
    collections: ["chokers", "minimalist"],
  },
  {
    slug: "leather-spiked-bracelet",
    title: "Кожаный браслет с шипами",
    description: "Брутальный кожаный браслет с металлическими шипами",
    price: 800,
    image: "/braslets.jpg",
    hoverImage: "/best.jpg",
    gallery: ["/braslets.jpg", "/best.jpg", "/braslets.jpg", "/best.jpg", "/braslets.jpg"],
    collections: ["bracers", "punk"],
  },
  {
    slug: "victorian-choker",
    title: "Викторианский чокер",
    description: "Изысканный чокер в викторианском стиле",
    price: 2500,
    image: "/array.jpg",
    hoverImage: "/photo_2026-01-15_06-33-45.jpg",
    gallery: [
      "/array.jpg",
      "/photo_2026-01-15_06-33-45.jpg",
      "/array.jpg",
      "/photo_2026-01-15_06-33-45.jpg",
      "/array.jpg",
    ],
    collections: ["chokers", "victorian", "vintage"],
  },
  {
    slug: "couple-chokers",
    title: "Парные чокеры",
    description: "Стильные парные чокеры для влюбленных",
    price: 3000,
    image: "/parnie.png",
    hoverImage: "/array.jpg",
    gallery: ["/parnie.png", "/array.jpg", "/parnie.png", "/array.jpg", "/parnie.png"],
    collections: ["chokers", "couple"],
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  // Сначала создаем коллекции с названиями и описаниями
  console.log("\n📁 Creating collections...");
  for (const collection of seedCollections) {
    const created = await upsertCollection(collection);
    console.log(`✅ Created collection: ${created.name} (${created.slug})`);
  }

  // Затем создаем товары
  console.log("\n📦 Creating products...");
  for (const product of seedProducts) {
    const created = await createProduct(product);
    console.log(`✅ Created product: ${created.title} (ID: ${created.id})`);
  }

  console.log("\n🎉 Database seeded successfully!");
}

main().catch((e) => {
  console.error("❌ Error seeding database:", e);
  process.exit(1);
});
