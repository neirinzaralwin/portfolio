import Navbar from "@/components/navbar/default-navbar";
import Hero from "@/components/hero/hero";
import Portfolio from "@/components/portfolio/portfolio";
import WorkExperience from "@/components/experience/work-experience";
import { ContactUs } from "@/components/contact-us/contact-us";
import { StatsUI } from "@/components/stats/stats-ui";
import TechStackUI from "@/components/techstack/techstack-ui";
import { AboutMe } from "@/components/about/about-me";
import Publications from "@/components/publications/publications";
import VintShowcase from "@/components/vint/vint-showcase";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Hero />
      <StatsUI />
      <TechStackUI />
      <AboutMe />
      <WorkExperience />
      <Publications />
      <VintShowcase />
      <Portfolio />
      <ContactUs
        email="zaralwinneirin@gmail.com"
        social_handle={[
          {
            _id: "1",
            platform: "LinkedIn",
            url: "https://www.linkedin.com/in/zar-alwin-neirin-6b1b4b1b7/",
            imageUrl:
              "https://image.similarpng.com/very-thumbnail/2020/07/Linkedin-logo-on-transparent-Background-PNG-.png",
          },
          {
            _id: "2",
            platform: "GitHub",
            url: "https://github.com/neirinzaralwin",
            imageUrl: "",
          },
        ]}
        about={{
          phoneNumber: "+66 94 595 9233",
          address: "Bangkok, Thailand",
        }}
      />
    </div>
  );
}
