"use client";

import Image from "next/image";
import Link from "next/link";
import { SiAppstore, SiGoogleplay } from "react-icons/si";
import { FadeIn } from "@/components/ui/transition";
import { SectionTitle } from "@/components/ui/section-title";

type FeaturedApp = {
  index: string;
  title: string;
  description: string;
  appstore?: string;
  playstore?: string;
  images: { src: string; alt: string }[];
};

const featuredApps: FeaturedApp[] = [
  {
    index: "01",
    title: "Lady First",
    description:
      "A women-focused marketplace for buying and selling pre-loved fashion, bags, and beauty items. I worked on mood-based browsing, live bidding, and the trust-centered community experience — available on the App Store and Google Play.",
    playstore:
      "https://play.google.com/store/apps/details?id=com.obipumanee.ladyfirst&hl=en",
    images: [
      {
        src: "/assets/ladyfirst_poster1.png",
        alt: "Lady First app home screen",
      },
      {
        src: "/assets/ladyfirst_poster2.png",
        alt: "Lady First app browse screen",
      },
    ],
  },
  {
    index: "02",
    title: "Food.com.mm",
    description:
      "A food ordering platform for Myanmar that connects restaurants and vendors with customers. I contributed to browsing, ordering, and delivery flows so users can find meals and complete orders with less friction.",
    appstore: "https://apps.apple.com/us/app/food-com-mm/id6446515746",
    images: [
      {
        src: "/assets/food.com.mm.poster.jpg",
        alt: "Food.com.mm app screen",
      },
      {
        src: "/assets/food.com.mm.poster1.jpg",
        alt: "Food.com.mm promotional poster",
      },
    ],
  },
  {
    index: "03",
    title: "GoldSilver Central",
    description:
      "A Singapore bullion trading app for gold, silver, and platinum at real-time prices. I built mobile wallet, exchange, and market insight features that help users manage and trade physical precious metals with clarity.",
    appstore: "https://apps.apple.com/us/app/gsc-live/id6446312892",
    playstore:
      "https://play.google.com/store/apps/details?id=com.gsclive.app&hl=en",
    images: [
      {
        src: "/assets/gscmobile.jpg",
        alt: "GoldSilver Central mobile app",
      },
      {
        src: "/assets/gscposter.jpg",
        alt: "GoldSilver Central promotional poster",
      },
    ],
  },
];

const FeatureProjects = () => {
  return (
    <div className="mt-12 md:mt-16">
      <SectionTitle light="Featured" emphasis="Applications" />

      <div className="mt-10 md:mt-14 space-y-16 md:space-y-24">
        {featuredApps.map((app, index) => (
          <FadeIn key={app.index}>
            <article
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start ${
                index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="lg:col-span-5">
                <p className="text-xs tracking-[0.2em] text-gray-500 mb-3">
                  {app.index}
                </p>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white/80 mb-4">
                  {app.title}
                </h3>
                <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-md">
                  {app.description}
                </p>
                {(app.appstore || app.playstore) && (
                  <div className="mt-5 flex flex-wrap items-center gap-4">
                    {app.appstore && (
                      <Link
                        href={app.appstore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                        aria-label={`${app.title} on App Store`}
                      >
                        <SiAppstore size={18} />
                        App Store
                      </Link>
                    )}
                    {app.playstore && (
                      <Link
                        href={app.playstore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                        aria-label={`${app.title} on Google Play`}
                      >
                        <SiGoogleplay size={18} />
                        Google Play
                      </Link>
                    )}
                  </div>
                )}
              </div>

              <div className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-4">
                {app.images.map((image) => (
                  <div
                    key={image.src}
                    className="relative aspect-square overflow-hidden rounded-xl bg-white/5"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 30vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </div>
  );
};

export default FeatureProjects;
