import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { WhyUsContent } from "@/components/sections/WhyUsContent";
import { Credibility } from "@/components/sections/Credibility";

export const metadata: Metadata = {
  title: "Why Us — BRISΛVO",
  description: "Why global enterprises choose BRISΛVO — global delivery, AI-native engineering, enterprise-grade reliability, and proven scale.",
};

export default function WhyUsPage() {
  return (
    <>
      <PageHero
        label="Why BRISΛVO"
        title="Built For Global Technology Leadership"
        description="We combine elite engineering, AI-first thinking, and a Canada-India delivery network to build technology that operates at international scale."
      />
      <WhyUsContent />
      <Credibility showHeader={false} />
    </>
  );
}
