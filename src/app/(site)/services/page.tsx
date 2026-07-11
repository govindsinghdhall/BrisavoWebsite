import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Services } from "@/components/sections/Services";

export const metadata: Metadata = {
  title: "Services — BRISΛVO",
  description: "AI, software development, SaaS, enterprise systems, cloud infrastructure, and digital transformation at global scale.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services Universe"
        title="Engineering Excellence At Every Layer"
        description="From AI-native platforms to enterprise infrastructure — we architect, build, and scale technology that powers global businesses."
      />
      <Services showHeader={false} />
    </>
  );
}
