import { ButtonLink } from "@/shared/ui";
import Image from "next/image";
import Link from "next/link";

interface ICollectionCardProps {
  href: string;
  imageSrc: string;
  title: string;
}

export function CollectionCard({ href, imageSrc, title }: ICollectionCardProps) {
  return (
    <div className="relative overflow-hidden group">
      <Link href={href}>
        <Image
          src={imageSrc}
          alt={title}
          width={500}
          height={600}
          className="object-cover aspect-2/3 group-hover:scale-110 duration-4000 transition-transform"
        />
      </Link>
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
        <ButtonLink href={href} text={title} />
      </div>
    </div>
  );
}
