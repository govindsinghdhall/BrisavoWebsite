import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { HomeOverview } from "@/components/sections/HomeOverview";
import { Testimonials } from "@/components/sections/Testimonials";
import { Credibility } from "@/components/sections/Credibility";

export const metadata: Metadata = {
  title: "Brisavo — Global Technology Company | AI, Software & Enterprise Systems",
  description:
    "Building the future of digital infrastructure. Global technology company with offices in Canada and India, engineering AI, software, and enterprise systems worldwide.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeOverview />
      <Credibility showHeader={false} compact />
      <Testimonials />
    </>
  );
}
