"use client";

import Image from "next/image";
import Link from "next/link";
import { SiAppstore, SiGoogleplay } from "react-icons/si";
import { Reveal, ImageReveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
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
    <div className="mt-20 md:mt-32">
      <SectionTitle light="Featured" emphasis="applications" />

      <div className="mt-10 md:mt-14 space-y-20 md:space-y-32">
        {featuredApps.map((app, index) => (
            <article
              key={app.index}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start ${
                index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="lg:sticky lg:top-32 lg:col-span-5">
                <SplitReveal
                  as="h3"
                  preset="chars"
                  stagger={0.03}
                  className="display mb-5 text-[clamp(2.5rem,5vw,4.5rem)] text-white"
                >
                  {app.title}
                </SplitReveal>
                <SplitReveal
                  as="p"
                  delay={0.15}
                  className="max-w-md text-sm leading-relaxed text-white/55 md:text-base"
                >
                  {app.description}
                </SplitReveal>
                {(app.appstore || app.playstore) && (
                  <Reveal delay={0.3} className="mt-6 flex flex-wrap items-center gap-6">
                    {app.appstore && (
                      <Link
                        href={app.appstore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-line text-sm text-white/70 transition-colors duration-500 hover:text-white"
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
                        className="link-line text-sm text-white/70 transition-colors duration-500 hover:text-white"
                        aria-label={`${app.title} on Google Play`}
                      >
                        <SiGoogleplay size={18} />
                        Google Play
                      </Link>
                    )}
                  </Reveal>
                )}
              </div>

              <div className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-4">
                {app.images.map((image, i) => (
                  <ImageReveal
                    key={image.src}
                    delay={i * 0.15}
                    className={`group relative aspect-square rounded-2xl bg-white/5 ${
                      i === 1 ? "lg:mt-16" : ""
                    }`}
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 768px) 50vw, 30vw"
                        className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]"
                      />
                    </div>
                  </ImageReveal>
                ))}
              </div>
            </article>
        ))}
      </div>
    </div>
  );
};

export default FeatureProjects;
