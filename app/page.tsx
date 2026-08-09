import Navbar from "@/components/navbar/default-navbar";
import Hero from "@/components/hero/hero";
import Portfolio from "@/components/portfolio/portfolio";
import Experience from "@/components/experience/experience";
import WorkExperience from "@/components/experience/work-experience";
import Timeline from "@/lib/interfaces/timeline";
import { ContactUs } from "@/components/contact-us/contact-us";
import { StatsUI } from "@/components/stats/stats-ui";
import TechStackUI from "@/components/techstack/techstack-ui";
import { AboutMe } from "@/components/about/about-me";
import Publications from "@/components/publications/publications";
import VintShowcase from "@/components/vint/vint-showcase";

const expList: Timeline[] = [
  {
    company_name: "Flying Rocket Co., Ltd.",
    summary:
      "Built consumer marketplace and hospitality products end-to-end — auctions, payments, and real-time hotel operations.",
    sequence: 1,
    startDate: "Dec 2024",
    endDate: "Feb 2026",
    jobTitle: "Senior Mobile & Full-Stack Developer",
    jobLocation: "Bangkok, Thailand",
    bulletPoints: [
      "Lady First marketplace: shipped auction and product browsing for pre-loved fashion and accessories.",
      "Clean Wardrobe service: built end-to-end clothing care workflows with status tracking and updates.",
      "Boutique shop module: implemented storefront, inventory, and checkout flows.",
      "Hotel PMS: delivered real-time check-in/check-out with live room and guest status.",
      "Channel manager sync: integrated APIs to keep availability and reservations consistent across channels.",
      "SCB Thai QR payments: implemented payment confirmation and real-time reconciliation.",
    ],
    forEducation: false,
    enabled: true,
    _id: "1",
  },
  {
    company_name: "GoldSilver Central",
    summary:
      "Led mobile and backend work on a Singapore bullion trading platform — wallets, exchanges, and market insights.",
    sequence: 2,
    startDate: "2022",
    endDate: "2024",
    jobTitle: "Senior Mobile & Backend Developer",
    jobLocation: "Singapore",
    bulletPoints: [
      "Designed and shipped a blockchain-based gold-saving wallet for secure asset management.",
      "Built currency exchange flows between tokens for faster, clearer transactions.",
      "Implemented multi-wallet support with distinct profiles and transaction histories.",
      "Integrated real-time stock visualization charts for market insights.",
      "Added in-app chat for user communication and support.",
      "Applied TensorFlow for image classification within the product.",
    ],
    forEducation: false,
    enabled: true,
    _id: "2",
  },
  {
    company_name: "App.com.mm",
    summary:
      "Shipped consumer apps across e-commerce, education, food, and travel for the Myanmar market.",
    sequence: 3,
    startDate: "2021",
    endDate: "2022",
    jobTitle: "Senior Mobile Developer",
    jobLocation: "Myanmar",
    bulletPoints: [
      "Led development of an e-commerce platform focused on clear browsing and checkout.",
      "Designed an interactive PC builder to streamline custom hardware purchases.",
      "Built a Dhamma talks app for community listening and learning.",
      "Created local food store apps to help small vendors sell online.",
      "Developed a travel app with itineraries and recommendations for Myanmar.",
      "Designed and implemented a learning management system for online education.",
      "Helped scale the engineering team from 5 to 100 people over two years.",
    ],
    forEducation: false,
    enabled: true,
    _id: "3",
  },
  {
    company_name: "Tech Plus Solution",
    summary:
      "Built early-career mobile products for retail, POS, and consumer apps.",
    sequence: 4,
    startDate: "2020",
    endDate: "2021",
    jobTitle: "Junior Mobile Developer",
    jobLocation: "Myanmar",
    bulletPoints: [
      "Built a lightweight mobile POS system for small-business checkout.",
      "Migrated a Fortune app to native platforms for better performance.",
      "Delivered an e-commerce and retail app with color-based stock management.",
    ],
    forEducation: false,
    enabled: true,
    _id: "4",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Hero />
      <StatsUI />
      <TechStackUI />
      <AboutMe />
      <Experience timeline={expList} />
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
