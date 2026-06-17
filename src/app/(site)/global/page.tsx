import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { GlobalPresence } from "@/components/sections/GlobalPresence";
import { ScrollStory } from "@/components/sections/ScrollStory";

export const metadata: Metadata = {
  title: "Global Presence — Brisavo",
  description: "Engineering across continents. Canada × India technology network delivering global delivery with local expertise.",
};

export default function GlobalPage() {
  return (
    <>
      <PageHero
        label="Global Presence"
        title="Engineering Across Continents"
        description="Building technology without borders. Our Canada × India network delivers 24/7 engineering velocity with local expertise."
      />
      <GlobalPresence showHeader={false} />
      <ScrollStory />
    </>
  );
}
