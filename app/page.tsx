import Navbar from "@/components/navbar/default-navbar";
import Hero from "@/components/hero/hero";
import Portfolio from "@/components/portfolio/portfolio";
import Experience from "@/components/experience/experience";
import Timeline from "@/lib/interfaces/timeline";

const expList: Timeline[] = [
  {
    company_name: "Gold Silver Central",
    summary: "Summary",
    sequence: 1,
    startDate: "2023-03-01",
    endDate: "2024-08-31",
    jobTitle: "Mobile & Web Developer",
    jobLocation: "Singapore",
    bulletPoints: ["Point 1", "Point 2"],
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
    bulletPoints: ["Point 1", "Point 2"],
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
    bulletPoints: ["Point 1", "Point 2"],
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
    </div>
  );
}
