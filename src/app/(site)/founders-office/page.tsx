import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { FoundersContent } from "@/components/sections/FoundersContent";

export const metadata: Metadata = {
  title: "Founders Office — Brisavo",
  description: "Connect with Brisavo leadership for strategic partnerships, enterprise engagements, and executive inquiries.",
};

export default function FoundersOfficePage() {
  return (
    <>
      <PageHero
        label="Founders Office"
        title="Leadership & Vision"
        description="The founders office drives Brisavo's global strategy, technical excellence, and commitment to building technology without borders."
      />
      <FoundersContent />
    </>
  );
}
