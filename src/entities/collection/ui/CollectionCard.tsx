import { ROUTES } from "@/shared/config/routes";
import { cn } from "@/shared/lib/cn";
import { ButtonLink } from "@/shared/ui";
import Image from "next/image";
import Link from "next/link";

interface ICollectionCardProps {
  slug: string;
  imageSrc: string;
  title: string;
}

export function CollectionCard({ slug, imageSrc, title }: ICollectionCardProps) {
  const href = `${ROUTES.collections.main}/${slug}`;

  return (
    <div className="relative overflow-hidden group">
      <Link href={href} className="block">
        <Image
          src={imageSrc}
          alt={title}
          width={500}
          height={600}
          className={cn(
            "object-cover aspect-2/3",
            "group-hover:scale-110 duration-4000 transition-transform",
            "will-change-transform backface-hidden transform-[translateZ(0)]",
          )}
        />
      </Link>
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
        <ButtonLink href={href} text={title} />
      </div>
    </div>
  );
}
