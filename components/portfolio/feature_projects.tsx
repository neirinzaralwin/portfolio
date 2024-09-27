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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
                <div className="relative w-full h-0 pb-[50%] group">
                    <Image
                        src="https://scontent.fbkk22-3.fna.fbcdn.net/v/t39.30808-6/346955679_1313785589486043_1207697121383871436_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=86c6b0&_nc_ohc=hQIaLwuofQAQ7kNvgEC9wL1&_nc_ht=scontent.fbkk22-3.fna&_nc_gid=Abx8HM9P_3dj-Rpk_cRxuxv&oh=00_AYBfDuBl8aFY1fPrmLkCE6S-SpbvD8E9rFKJBQ12KUA0zA&oe=66FB621D"
                        alt="Food.com.mm"
                        fill
                        className="rounded-lg shadow-lg transition duration-300 group-hover:filter group-hover:grayscale-0 grayscale object-cover"
                    />
                    <a
                        href="https://food.com.mm/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-md underline absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                        food.com.mm
                    </a>
                </div>

                <div className="relative w-full h-0 pb-[50%] group">
                    <Image
                        src="https://www.goldsilvercentral.com.sg/wp-content/uploads/2017/02/GSAP_WebsiteElements-01.png?x10759"
                        alt="Gold Silver Central"
                        fill
                        className="rounded-lg shadow-lg transition duration-300 group-hover:filter group-hover:grayscale-0 grayscale object-cover"
                    />
                    <a
                        href="https://www.goldsilvercentral.com.sg/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-md underline absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                        goldsilvercentral.com.sg
                    </a>
                </div>
            </div>
        </>
    );
};

export default FeatureProjects;
