"use client";

import { FadeIn } from "../ui/transition";
import Link from "next/link";
import { TextReveal } from "../ui/typography";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface ImageGridProps {
  imageUrl: string;
  title: string;
  description: string;
  playstore?: string;
  appstore?: string;
}

const lorem: string =
  "lorem ipusm dolor sit amet, consectetur adipisicing elit. Neque excepturi, perferendis delectus porro saepe dolore minima? Inventore alias rerum fuga. Id ab a et quos similique est excepturi doloremque dolorum.";

const imageGridItems: ImageGridProps[] = [
  {
    imageUrl:
      "https://play-lh.googleusercontent.com/fVzvphTK0b1ITSOLAvtUTcV_Ex5MEM6WNZNfsrTV4zIAuVdDth_S4CcOjYnLVeCIdkY=w480-h960-rw",
    title: "Shwe Phone Shein",
    description: "Jewellery App",
    appstore: "",
    playstore: "",
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

const renderComponent = (item: ImageGridProps) => (
  <div className="flex-col items-center justify-center my-5">
    <div className="block gradient-text text-lg md:text-xl py-2">
      {item.title}
    </div>
    <div className="text-gray-500 inline-flex">{item.description}</div>
  </div>
);

export function BlurFadeImages() {
  return (
    <div className="flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 p-5">
        {imageGridItems.map((item, index) => (
          <div className="flex flex-col items-center justify-start">
            <div className="w-full">{renderComponent(item)}</div>
            {/* button */}
            <div className="flex flex-row mb-8 gap-3">
              <Link
                href={item.playstore ?? ""}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-white/50 flex items-center gap-4 group"
              >
                <TextReveal>Playstore</TextReveal>
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>

              <Link
                href={item.appstore ?? ""}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-white/50 flex items-center gap-4 group"
              >
                <TextReveal>Appstore</TextReveal>
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
            <FadeIn key={index}>
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={400}
                height={400}
                className="rounded-lg shadow-lg aspect-square"
              />
            </FadeIn>
          </div>
        ))}
      </div>
    </div>
  );
}
