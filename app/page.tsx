import Navbar from "@/components/navbar/default-navbar";
import Hero from "@/components/hero/hero";
import one from "../public/imgs/1.png";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Hero />
      <Image src={one} alt="one" />
    </div>
  );
}
