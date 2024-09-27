import Navbar from "@/components/navbar/default-navbar";
import Hero from "@/components/hero/hero";
import Portfolio from "@/components/portfolio/portfolio";
import Experience from "@/components/experience/experience";
import Timeline from "@/lib/interfaces/timeline";
import { ContactUs } from "@/components/contact-us/contact-us";
import ColleageReviews from "@/components/reviews/colleage-reviews";

const expList: Timeline[] = [
  {
    company_name: "Gold Silver Central",
    summary: "Summary",
    sequence: 1,
    startDate: "2023-03-01",
    endDate: "2024-08-31",
    jobTitle: "Mobile & Web Developer",
    jobLocation: "Singapore",
    bulletPoints: [
      "Gold-Saving Wallet Development: Led the design and implementation of a blockchain-based gold-saving wallet, enhancing secure asset management.",
      "Currency Exchange Facilitation: Developed features for seamless currency exchange between various tokens, improving user experience and transaction efficiency.",
      "Multi-User Wallet Management: Implemented functionalities supporting multiple user wallets, allowing for diverse user profiles and transaction histories.",
      "Stock Visualization Integration: Integrated advanced stock visualization charts to provide users with real-time market insights and analytics.",
      "Chat Functionality: Developed a chat feature for enhanced user communication and support within the application.",
      "TensorFlow Implementation: Utilized TensorFlow for image classification tasks, demonstrating expertise in machine learning and AI technologies.",
    ],
    forEducation: false,
    enabled: true,
    _id: "1",
  },

  {
    company_name: "App.com.mm",
    summary: "Summary",
    sequence: 1,
    startDate: "2021-11-01",
    endDate: "2023-02-28",
    jobTitle: "Senior Mobile Developer",
    jobLocation: "Myanmar",
    bulletPoints: [
      "E-Commerce Platform Development: Led the creation of a user-friendly e-commerce platform, enhancing online shopping experiences for customers.",
      "Customizable PC Building System: Designed an interactive system for users to build and customize PCs, streamlining the purchasing process.",
      "Dhamma Talks Application: Developed an application dedicated to sharing Dhamma talks, fostering community engagement and learning.",
      "Local Food Product Store Applications: Created applications to promote and sell local food products, supporting small businesses and local agriculture.",
      "Travel App Development: Spearheaded the development of a comprehensive travel app, offering users personalized travel itineraries and recommendations.",
      "Learning Management System: Designed and implemented a learning management system to facilitate online education and training.",
      "Team Growth Leadership: Contributed to scaling the team from 5 to 100 employees within 2 years, enhancing operational capabilities and fostering a collaborative work environment.",
    ],
    forEducation: false,
    enabled: true,
    _id: "2",
  },

  {
    company_name: "Tech plus solution",
    summary: "Summary",
    sequence: 1,
    startDate: "2021-03-01",
    endDate: "2023-10-31",
    jobTitle: "Junior Mobile Developer",
    jobLocation: "Myanmar",
    bulletPoints: [
      "Lightweight POS System: Led the creation of a lightweight mobile-based Point of Sale system, providing efficiency and flexibility for businesses.",
      "Fortune App Renovation: Oversaw the renovation of a Fortune app, transitioning it to native platforms for enhanced performance.",
      "E-Commerce and Retail App: Crafted an intuitive e-commerce and retail app, devising a sophisticated product stock management algorithm based on color for seamless inventory control.",
      "Innovative Solutions: Showcased the ability to deliver innovative solutions tailored to diverse user needs through various projects.",
    ],
    forEducation: false,
    enabled: true,
    _id: "3",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Hero />
      <Experience timeline={expList} />
      <Portfolio />
      <ColleageReviews />
      <ContactUs
        email="zaralwinneirin@gmail.com"
        social_handle={[
          {
            _id: "1",
            platform: "linkedin",
            url: "https://www.linkedin.com/in/zar-alwin-neirin-6b1b4b1b7/",
            imageUrl:
              "https://image.similarpng.com/very-thumbnail/2020/07/Linkedin-logo-on-transparent-Background-PNG-.png",
          },
        ]}
        about={{
          phoneNumber: "+66945959233",
          address: "Bangkok, Thailand",
        }}
      />
    </div>
  );
}
