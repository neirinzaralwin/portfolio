import { FadeIn } from "../ui/transition";
import Image from "next/image";

const FeatureProjects = () => {
  return (
    <>
      <FadeIn>
        <div className="flex flex-row text-start mt-16">
          <div className="pr-2 text-2xl md:text-4xl font-extralight text-gray-500">
            Best
          </div>
          <h1 className="text-2xl md:text-4xl text-white/70 mb-5 gradient-text">
            Applications
          </h1>
        </div>
      </FadeIn>
      <div className="flex flex-wrap justify-center mt-8">
        <div className="w-full lg:w-1/3 p-2 mb-4">
          <h2 className="text-gray-500 text-xl md:text-2xl font-semibold mb-5">
            Food.com.mm
          </h2>
          <div className="text-gray-500 w-full md:w-4/5 text-md md:text-md">
            <FadeIn>
              Food.com.mm is a food platform operated by Hap Eye Co., Ltd and is
              available on App.com.mm. We always strive to provide a better
              experience for Myanmar consumers by bringing together various
              restaurants and food vendors on our platform. To make ordering
              food easier, Food.com.mm provides a seamless service where
              customers can browse available food options, place orders, and
              enjoy a smooth delivery experience.
            </FadeIn>
          </div>
        </div>
        <Image
          src={"/assets/food.com.mm.poster.jpg"}
          alt="Project 1"
          width={600}
          height={450}
          className="rounded-xl object-cover w-full md:w-1/2 lg:w-1/3 p-2"
        />
        <Image
          src={"/assets/food.com.mm.poster1.jpg"}
          alt="Project 1"
          width={600}
          height={450}
          className="rounded-xls object-cover w-full md:w-1/2 lg:w-1/3 p-2"
        />
      </div>

      <div className="flex flex-wrap justify-center mt-8">
        <div className="w-full lg:w-1/3 p-2 mb-4">
          <h2 className="text-gray-500 text-xl md:text-2xl font-semibold mb-5">
            goldsilvercentral.com.sg
          </h2>
          <div className="text-gray-500 w-full md:w-4/5 text-md md:text-md">
            <FadeIn>
              GoldSilver Central Pte Ltd (UEN: 201107187N), a Singapore
              registered company since 2011 specialises in physical bullion
              trading in gold, silver and platinum at real-time pricing,
              industry bullion supply, bullion buying and selling, collateral
              loan and secured storage under GoldSilver Central’s Bullion
              Storage Program at the Le Freeport.
            </FadeIn>
          </div>
        </div>
        <Image
          src={"/assets/gscmobile.jpg"}
          alt="Project 1"
          width={600}
          height={450}
          className="rounded-xl object-cover w-full md:w-1/2 lg:w-1/3 p-2"
        />
        <Image
          src={"/assets/gscposter.jpg"}
          alt="Project 1"
          width={600}
          height={450}
          className="rounded-xls object-cover w-full md:w-1/2 lg:w-1/3 p-2"
        />
      </div>
    </>
  );
};

export default FeatureProjects;
