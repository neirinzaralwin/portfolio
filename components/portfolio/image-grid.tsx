"use client";

import { FadeIn } from "../ui/transition";
import Link from "next/link";
import { SiAppstore, SiGoogleplay } from "react-icons/si";
import Image from "next/image";

interface ImageGridProps {
  imageUrl: string;
  title: string;
  description: string;
  playstore?: string;
  appstore?: string;
}

interface BlurFadeImagesProps {
  blackAndWhite?: boolean;
}

const imageGridItems: ImageGridProps[] = [
  {
    imageUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource126/v4/3e/1e/c3/3e1ec3c2-6a17-3c11-c68c-522a25a35e61/5a74b6f2-e4e7-4b70-a7e9-19755361dfec_Apple_iPhone_11_Pro_Max_Screenshot_1.png/460x0w.webp",
    title: "Wisdom Tree",
    description: "Digital bookstore and library app",
    appstore: "https://apps.apple.com/th/app/wisdom-tree-library/id6464262162",
    playstore:
      "https://play.google.com/store/apps/details?id=com.hapeyecoltd.wisdomtree",
  },
  {
    imageUrl: "/assets/joyful_poster.png",
    title: "Joyful LMS",
    description: "Learning platform built for children",
    appstore: "https://apps.apple.com/th/app/joyfullms/id6480043967",
  },
  {
    imageUrl: "/assets/gogo_travel_poster.png",
    title: "Go Go Travel",
    description: "Travel planning and discovery for Myanmar",
    appstore: "https://apps.apple.com/th/app/go-go-travel/id6473775786",
  },
];

function StoreLinks({ item }: { item: ImageGridProps }) {
  return (
    <div className="flex gap-3">
      {item.appstore && (
        <Link
          href={item.appstore}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/70 hover:text-white transition-colors"
          onClick={(e) => e.stopPropagation()}
          aria-label={`${item.title} on App Store`}
        >
          <SiAppstore size={20} />
        </Link>
      )}
      {item.playstore && (
        <Link
          href={item.playstore}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/70 hover:text-white transition-colors"
          onClick={(e) => e.stopPropagation()}
          aria-label={`${item.title} on Google Play`}
        >
          <SiGoogleplay size={20} />
        </Link>
      )}
    </div>
  );
}

const ProjectCard = ({
  item,
  blackAndWhite,
}: {
  item: ImageGridProps;
  blackAndWhite: boolean;
}) => (
  <article className="group">
    <div className="overflow-hidden rounded-xl relative aspect-square bg-white/5">
      <Image
        src={item.imageUrl}
        alt={item.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={`object-cover transition-transform duration-500 ease-out md:group-hover:scale-105 ${
          blackAndWhite ? "grayscale" : ""
        }`}
      />

      {/* Desktop hover overlay only */}
      <div className="pointer-events-none absolute inset-0 hidden md:flex items-end bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5">
        <div className="pointer-events-auto w-full space-y-2">
          <h3 className="text-lg font-semibold text-white">{item.title}</h3>
          <p className="text-sm text-white/70">{item.description}</p>
          <StoreLinks item={item} />
        </div>
      </div>
    </div>

    {/* Mobile / tablet: text below image */}
    <div className="mt-4 md:hidden space-y-2">
      <h3 className="text-lg font-semibold text-white/80">{item.title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
      <StoreLinks item={item} />
    </div>
  </article>
);

export function BlurFadeImages({ blackAndWhite = false }: BlurFadeImagesProps) {
  return (
    <div className="w-full py-6 md:py-8 mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6 md:gap-8 mx-auto">
        {imageGridItems.map((item, index) => (
          <FadeIn
            key={item.title}
            transition={{ duration: 0.35, delay: index * 0.05 }}
          >
            <ProjectCard item={item} blackAndWhite={blackAndWhite} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
