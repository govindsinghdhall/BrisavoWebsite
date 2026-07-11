import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { TeamContent } from "@/components/sections/TeamContent";

export const metadata: Metadata = {
  title: "Meet the Team — BRISΛVO",
  description: "Meet the engineering, product, and design leaders powering BRISΛVO's global technology delivery.",
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        label="Our Team"
        title="Meet The People Behind BRISΛVO"
        description="Elite engineers, designers, and strategists united by a mission to build world-class technology for businesses worldwide."
      />
      <TeamContent />
    </>
  );
}
