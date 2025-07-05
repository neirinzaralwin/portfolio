"use client";

import { FadeIn } from "../ui/transition";
import Link from "next/link";
import { SiAppstore, SiGoogleplay } from "react-icons/si";
import Image from "next/image";
import { useCursorVariants } from "@/utils/context";

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
    description: "Bookstore app",
    appstore: "https://apps.apple.com/th/app/wisdom-tree-library/id6464262162",
    playstore:
      "https://play.google.com/store/apps/details?id=com.hapeyecoltd.wisdomtree",
  },
  {
    imageUrl: "https://joyful.lmsmm.com/images/logo.png",
    title: "Joyful LMS",
    description: "LMS application for kids",
    appstore: "https://apps.apple.com/th/app/joyfullms/id6480043967",
  },
  {
    imageUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple112/v4/8b/34/04/8b34043f-6807-d125-5c2b-5482598d0b81/AppIcon-0-0-1x_U007emarketing-0-7-0-0-85-220.png/460x0w.webp",
    title: "Go Go Travel",
    description: "Travel app for Myanmar",
    appstore: "https://apps.apple.com/th/app/go-go-travel/id6473775786",
  },
];

const renderComponent = (
  item: ImageGridProps,
  index: number,
  blackAndWhite: boolean
) => (
  <div
    className={`relative group cursor-pointer transition-transform duration-300 ease-out hover:scale-105 ${
      index % 2 === 0 ? "mt-0" : "mt-8"
    }`}
  >
    <div className="overflow-hidden rounded-lg shadow-lg relative aspect-square">
      <Image
        src={item.imageUrl}
        alt={item.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={`object-cover rounded-lg transition-all duration-500 ease-out ${
          blackAndWhite ? "grayscale" : ""
        }`}
      />

      {/* Glassy hover overlay with title and links */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 backdrop-blur-sm transition-all duration-500 ease-out flex flex-col justify-center items-center text-white p-4 will-change-transform">
        <div className="text-center bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <div className="text-xl font-bold mb-2 text-white drop-shadow-lg">
            {item.title}
          </div>
          <div className="text-gray-200 text-sm mb-4 drop-shadow-md">
            {item.description}
          </div>
          <div className="flex justify-center gap-3">
            {item.appstore && (
              <Link
                href={item.appstore}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded transition-all duration-300 ease-out border border-white/30 hover:border-white/50 hover:scale-105"
                onClick={(e) => e.stopPropagation()}
              >
                <SiAppstore size={20} />
              </Link>
            )}
            {item.playstore && (
              <Link
                href={item.playstore}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded transition-all duration-300 ease-out border border-white/30 hover:border-white/50 hover:scale-105"
                onClick={(e) => e.stopPropagation()}
              >
                <SiGoogleplay size={20} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export function BlurFadeImages({ blackAndWhite = false }: BlurFadeImagesProps) {
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {imageGridItems.map((item, index) => (
          <FadeIn
            key={index}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {renderComponent(item, index, blackAndWhite)}
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
