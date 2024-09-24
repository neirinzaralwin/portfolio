import { FadeIn } from "../ui/transition";
import Iphone15Pro from "../ui/devices/iphone-15pro-ui";
import Link from "next/link";
import { TextReveal } from "../ui/typography";
import { ArrowRight } from "lucide-react";

interface ImageGridProps {
  imageUrl: string;
  title: string;
  description: string;
}

const lorem: string =
  "lorem ipusm dolor sit amet, consectetur adipisicing elit. Neque excepturi, perferendis delectus porro saepe dolore minima? Inventore alias rerum fuga. Id ab a et quos similique est excepturi doloremque dolorum.";

const imageGridItems: ImageGridProps[] = [
  {
    imageUrl: "https://picsum.photos/seed/1/800/600",
    title: "Image 1",
    description: "Description for image 1" + lorem,
  },
  {
    imageUrl: "https://picsum.photos/seed/2/600/800",
    title: "Image 2",
    description: "Description for image 2",
  },
  {
    imageUrl: "https://picsum.photos/seed/3/800/600",
    title: "Image 3",
    description: "Description for image 3",
  },
];

const renderComponent = (item: ImageGridProps) => (
  <div className="flex-col items-center justify-center my-5">
    <div className="block gradient-text text-xl py-2">{item.title}</div>
    <div className="text-gray-500 inline-flex">{item.description}</div>
  </div>
);

export function BlurFadeImages() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 p-5 mb-[500px]">
      {imageGridItems.map((item, index) => (
        <div className="flex flex-col items-center justify-start">
          <div className="h-[300px] w-full">{renderComponent(item)}</div>
          {/* button */}
          <div className="flex flex-row mb-8 gap-3">
            <Link
              href={"#contact"}
              className="px-4 py-2 rounded-full border border-white/50 flex items-center gap-4 group"
            >
              <p>Playstore</p>
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>

            <Link
              href={"#contact"}
              className="px-4 py-2 rounded-full border border-white/50 flex items-center gap-4 group"
            >
              <p>Appstore</p>
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
          <FadeIn key={index}>
            <Iphone15Pro src={item.imageUrl} className="w-[300px] h-full" />
          </FadeIn>
        </div>
      ))}
    </div>
  );
}
