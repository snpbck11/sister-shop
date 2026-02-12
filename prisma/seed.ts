import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Начинаем заполнение базы данных...");

  // Очистка существующих данных
  await prisma.productCollection.deleteMany();
  await prisma.productSize.deleteMany();
  await prisma.product.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.category.deleteMany();
  await prisma.productType.deleteMany();

  // Создание типов товаров
  console.log("📦 Создаём типы товаров...");
  const chokerType = await prisma.productType.create({
    data: { name: "Чокер" },
  });

  const braceletType = await prisma.productType.create({
    data: { name: "Браслет" },
  });

  // Создание категорий
  console.log("📁 Создаём категории...");
  const category1 = await prisma.category.create({
    data: {
      slug: "elegance",
      name: "Элегантные",
      description: "Изысканные украшения для особых случаев",
    },
  });

  const category2 = await prisma.category.create({
    data: {
      slug: "casual",
      name: "Повседневные",
      description: "Стильные украшения на каждый день",
    },
  });

  // Создание коллекций
  console.log("✨ Создаём коллекции...");
  const collection1 = await prisma.collection.create({
    data: {
      slug: "vesna",
      name: "Весна 2024",
      description: "Весенняя коллекция свежих и ярких украшений",
      image: "https://placehold.co/600x400/FFB6C1/white?text=Spring+2024",
    },
  });

  const collection2 = await prisma.collection.create({
    data: {
      slug: "classic",
      name: "Классика",
      description: "Вечные украшения, которые никогда не выходят из моды",
      image: "https://placehold.co/600x400/D8BFD8/white?text=Classic",
    },
  });

  // Создание товаров
  console.log("💎 Создаём товары...");

  // Товар 1: Чокер "Розовый рассвет"
  await prisma.product.create({
    data: {
      slug: "pink-dawn-choker",
      title: "Чокер 'Розовый рассвет'",
      description: "Нежный чокер с розовыми бусинами и жемчугом",
      image: "https://placehold.co/800x800/FFB6C1/white?text=Pink+Dawn",
      hoverImage: "https://placehold.co/800x800/FFC0CB/white?text=Pink+Dawn+Hover",
      gallery: [
        "https://placehold.co/800x800/FFB6C1/white?text=Gallery+1",
        "https://placehold.co/800x800/FFC0CB/white?text=Gallery+2",
      ],
      typeId: chokerType.id,
      categoryId: category1.id,
      sizes: {
        create: [
          { name: "S", description: "35-36 см", price: 2500 },
          { name: "M", description: "37-38 см", price: 2500 },
        ],
      },
      collections: {
        create: [
          { collectionId: collection1.id },
          { collectionId: collection2.id },
        ],
      },
    },
  });

  // Товар 2: Браслет "Лунный свет"
  await prisma.product.create({
    data: {
      slug: "moonlight-bracelet",
      title: "Браслет 'Лунный свет'",
      description: "Элегантный браслет с лунными камнями",
      image: "https://placehold.co/800x800/E6E6FA/white?text=Moonlight",
      hoverImage: "https://placehold.co/800x800/D8BFD8/white?text=Moonlight+Hover",
      gallery: [
        "https://placehold.co/800x800/E6E6FA/white?text=Gallery+1",
        "https://placehold.co/800x800/DDA0DD/white?text=Gallery+2",
      ],
      typeId: braceletType.id,
      categoryId: category1.id,
      sizes: {
        create: [
          { name: "S", description: "16-17 см", price: 3000 },
          { name: "M", description: "18-19 см", price: 3000 },
          { name: "L", description: "20-21 см", price: 3200 },
        ],
      },
      collections: {
        create: [{ collectionId: collection2.id }],
      },
    },
  });

  // Товар 3: Чокер "Звездная ночь"
  await prisma.product.create({
    data: {
      slug: "starry-night-choker",
      title: "Чокер 'Звездная ночь'",
      description: "Темный чокер с серебристыми звездами",
      image: "https://placehold.co/800x800/191970/white?text=Starry+Night",
      hoverImage: "https://placehold.co/800x800/000080/white?text=Starry+Night+Hover",
      gallery: [
        "https://placehold.co/800x800/191970/white?text=Gallery+1",
        "https://placehold.co/800x800/4169E1/white?text=Gallery+2",
      ],
      typeId: chokerType.id,
      categoryId: category2.id,
      sizes: {
        create: [
          { name: "S", description: "35-36 см", price: 2800 },
          { name: "M", description: "37-38 см", price: 2800 },
        ],
      },
      collections: {
        create: [{ collectionId: collection1.id }],
      },
    },
  });

  // Товар 4: Браслет "Солнечный луч"
  await prisma.product.create({
    data: {
      slug: "sunbeam-bracelet",
      title: "Браслет 'Солнечный луч'",
      description: "Яркий браслет с золотистыми элементами",
      image: "https://placehold.co/800x800/FFD700/white?text=Sunbeam",
      hoverImage: "https://placehold.co/800x800/FFA500/white?text=Sunbeam+Hover",
      gallery: [
        "https://placehold.co/800x800/FFD700/white?text=Gallery+1",
        "https://placehold.co/800x800/FFAA00/white?text=Gallery+2",
        "https://placehold.co/800x800/FF8C00/white?text=Gallery+3",
      ],
      typeId: braceletType.id,
      categoryId: category2.id,
      sizes: {
        create: [
          { name: "S", description: "16-17 см", price: 2700 },
          { name: "M", description: "18-19 см", price: 2700 },
        ],
      },
      collections: {
        create: [
          { collectionId: collection1.id },
          { collectionId: collection2.id },
        ],
      },
    },
  });

  // Товар 5: Чокер "Морская волна"
  await prisma.product.create({
    data: {
      slug: "sea-wave-choker",
      title: "Чокер 'Морская волна'",
      description: "Освежающий чокер в морских тонах",
      image: "https://placehold.co/800x800/00CED1/white?text=Sea+Wave",
      hoverImage: "https://placehold.co/800x800/20B2AA/white?text=Sea+Wave+Hover",
      gallery: [
        "https://placehold.co/800x800/00CED1/white?text=Gallery+1",
        "https://placehold.co/800x800/48D1CC/white?text=Gallery+2",
      ],
      typeId: chokerType.id,
      categoryId: category1.id,
      sizes: {
        create: [
          { name: "S", description: "35-36 см", price: 2600 },
          { name: "M", description: "37-38 см", price: 2600 },
          { name: "L", description: "39-40 см", price: 2800 },
        ],
      },
      collections: {
        create: [{ collectionId: collection1.id }],
      },
    },
  });

  console.log("База заполнена!");

}

main()
  .catch((e) => {
    console.error("Ошибка при заполнении базы:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
