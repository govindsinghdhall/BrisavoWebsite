import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { TechUniverse } from "@/components/sections/TechUniverse";

export const metadata: Metadata = {
  title: "Technology — BRISΛVO",
  description: "A living technology ecosystem — 65+ production-proven technologies powering enterprise solutions worldwide.",
};

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        label="Technology Universe"
        title="A Living Technology Ecosystem"
        description="Technologies orbit and connect dynamically — forming the infrastructure backbone of every solution we engineer."
      />
      <TechUniverse showHeader={false} />
    </>
  );
}
