import Navbar from "@/components/navbar/default-navbar";
import Hero from "@/components/hero/hero";
import Portfolio from "@/components/portfolio/portfolio";
import WorkExperience from "@/components/experience/work-experience";
import { ContactUs } from "@/components/contact-us/contact-us";
import { StatsUI } from "@/components/stats/stats-ui";
import TechStackUI from "@/components/techstack/techstack-ui";
import { AboutMe } from "@/components/about/about-me";
import Publications from "@/components/publications/publications";
import UttaraShowcase from "@/components/uttara/uttara-showcase";
import Process from "@/components/process/process";
import Layers from "@/components/layers/layers";
import { MeetingPoint } from "@/components/footer/meeting-point";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Navbar />
      <Hero />
      <AboutMe />
      <StatsUI />
      <TechStackUI />
      <WorkExperience />
      <Process />
      <Layers />
      {/* "Worked with" is hidden until real quotes are in lib/testimonials.ts.
          To bring it back: import Testimonials from
          "@/components/testimonials/testimonials" and render <Testimonials /> here. */}
      <Publications />
      <UttaraShowcase />
      <Portfolio />
      <MeetingPoint />
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
    </main>
  );
}
