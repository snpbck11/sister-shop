export interface ICarouselItem {
  slug: string;
  image: string;
  hoverImage: string;
  title: string;
  price: number;
}

export const carouselList: ICarouselItem[] = [
  {
    slug: "gothic-cross-choker",
    image: "/chokers.png",
    hoverImage: "/best.jpg",
    title: "Готический чокер с крестом",
    price: 1500,
  },
  {
    slug: "minimalist-choker",
    image: "/best.jpg",
    hoverImage: "/array.jpg",
    title: "Минималистичный чокер",
    price: 1200,
  },
  {
    slug: "leather-spiked-bracelet",
    image: "/braslets.jpg",
    hoverImage: "/best.jpg",
    title: "Кожаный браслет с шипами",
    price: 800,
  },
  {
    slug: "victorian-choker",
    image: "/array.jpg",
    hoverImage: "/photo_2026-01-15_06-33-45.jpg",
    title: "Викторианский чокер",
    price: 2500,
  },
  {
    slug: "couple-chokers",
    image: "/parnie.png",
    hoverImage: "/array.jpg",
    title: "Парные чокеры",
    price: 3000,
  },
];
