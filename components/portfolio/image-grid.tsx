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
    <div className="flex gap-3 mt-4">
      {item.appstore && (
        <Link
          href={item.appstore}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/50 hover:text-white transition-colors"
          aria-label={`${item.title} on App Store`}
        >
          <SiAppstore size={18} />
        </Link>
      )}
      {item.playstore && (
        <Link
          href={item.playstore}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/50 hover:text-white transition-colors"
          aria-label={`${item.title} on Google Play`}
        >
          <SiGoogleplay size={18} />
        </Link>
      )}
    </div>
  );
}

function ProjectMeta({
  item,
  index,
}: {
  item: ImageGridProps;
  index: number;
}) {
  return (
    <FadeIn transition={{ duration: 0.35, delay: index * 0.04 }}>
      <article className="flex flex-col max-w-[16rem]">
        <span className="text-xs text-gray-500 tabular-nums mb-3">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="text-sm sm:text-base font-semibold uppercase tracking-wide text-white/85">
          {item.title}
        </h3>
        <p className="mt-2 text-sm text-gray-500 leading-relaxed">
          {item.description}
        </p>
        <StoreLinks item={item} />
      </article>
    </FadeIn>
  );
}

function ProjectImage({
  item,
  index,
  blackAndWhite,
}: {
  item: ImageGridProps;
  index: number;
  blackAndWhite: boolean;
}) {
  const href = item.appstore ?? item.playstore;

  const image = (
    <div className="relative aspect-square w-full overflow-hidden bg-white/5">
      <Image
        src={item.imageUrl}
        alt={item.title}
        fill
        sizes="(max-width: 768px) 70vw, 22vw"
        className={`object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] ${
          blackAndWhite ? "grayscale" : ""
        }`}
      />
    </div>
  );

  return (
    <FadeIn
      transition={{ duration: 0.35, delay: 0.08 + index * 0.05 }}
      className="min-w-[70%] snap-center sm:min-w-0 sm:w-full"
    >
      {href ? (
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
          aria-label={`Open ${item.title}`}
        >
          {image}
        </Link>
      ) : (
        <div className="group">{image}</div>
      )}
    </FadeIn>
  );
}

export function BlurFadeImages({ blackAndWhite = false }: BlurFadeImagesProps) {
  return (
    <div className="w-full py-4 md:py-8 mx-auto">
      {/* Top: numbered project blurbs — broken grid on desktop */}
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(4rem,1.5fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-x-8">
        {imageGridItems.map((item, index) => (
          <div
            key={item.title}
            className={
              index === 0
                ? "lg:col-start-1"
                : index === 1
                  ? "lg:col-start-3"
                  : "lg:col-start-4"
            }
          >
            <ProjectMeta item={item} index={index} />
          </div>
        ))}
      </div>

      {/* Bottom: editorial headline + tight image triptych */}
      <div className="mt-16 md:mt-24 lg:mt-28 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8 lg:items-start">
        <FadeIn className="lg:col-span-4">
          <h3 className="max-w-sm text-xl sm:text-2xl md:text-3xl font-medium leading-[1.2] tracking-tight text-white/80 text-balance">
            Apps people open every day— for learning, travel, and reading.
          </h3>
        </FadeIn>

        <div className="lg:col-span-8">
          {/* Mobile: horizontal snap carousel; desktop: tight 3-up row */}
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible sm:grid sm:grid-cols-3 sm:gap-3 md:gap-4 scrollbar-none">
            {imageGridItems.map((item, index) => (
              <ProjectImage
                key={item.title}
                item={item}
                index={index}
                blackAndWhite={blackAndWhite}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
