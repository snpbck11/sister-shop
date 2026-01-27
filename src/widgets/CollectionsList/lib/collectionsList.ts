import { ROUTES } from "@/shared/config/routes";

export const collectionsList: { title: string; imageSrc: string; href: string }[] = [
  { title: "Все украшения", imageSrc: "/array.jpg", href: ROUTES.collections.allDesigns },
  { title: "Самые востребованные", imageSrc: "/best.jpg", href: ROUTES.collections.allDesigns },
  { title: "Парные украшения", imageSrc: "/braslets.jpg", href: ROUTES.collections.allDesigns },
  { title: "Из нового", imageSrc: "/chokers.png", href: ROUTES.collections.allDesigns },
];
