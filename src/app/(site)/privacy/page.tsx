import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { LegalContent } from "@/components/sections/LegalContent";
import { PRIVACY_SECTIONS } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy — BRISΛVO",
  description: "How BRISΛVO collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        label="Legal"
        title="Privacy Policy"
        description="Your privacy matters. This policy explains how we handle your data across our global operations."
      />
      <LegalContent sections={PRIVACY_SECTIONS} lastUpdated="June 11, 2026" />
    </>
  );
}
