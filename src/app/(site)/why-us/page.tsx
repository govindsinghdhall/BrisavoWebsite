import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { WhyUsContent } from "@/components/sections/WhyUsContent";
import { Credibility } from "@/components/sections/Credibility";

export const metadata: Metadata = {
  title: "Why Us — BROSAVO",
  description: "Why global enterprises choose BROSAVO — global delivery, AI-native engineering, enterprise-grade reliability, and proven scale.",
};

export default function WhyUsPage() {
  return (
    <>
      <PageHero
        label="Why BROSAVO"
        title="Built For Global Technology Leadership"
        description="We combine elite engineering, AI-first thinking, and a Canada-India delivery network to build technology that operates at international scale."
      />
      <WhyUsContent />
      <Credibility showHeader={false} />
    </>
  );
}
