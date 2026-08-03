import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { TeamContent } from "@/components/sections/TeamContent";

export const metadata: Metadata = {
  title: "Meet the Team — BROSAVO",
  description: "Meet the engineering, product, and design leaders powering BROSAVO's global technology delivery.",
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        label="Our Team"
        title="Meet The People Behind BROSAVO"
        description="Elite engineers, designers, and strategists united by a mission to build world-class technology for businesses worldwide."
      />
      <TeamContent />
    </>
  );
}
