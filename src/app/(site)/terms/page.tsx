import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { LegalContent } from "@/components/sections/LegalContent";
import { TERMS_SECTIONS } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions — Brisavo",
  description: "Terms and Conditions governing the use of Brisavo's website and services.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        label="Legal"
        title="Terms & Conditions"
        description="Please read these terms carefully before using our website or engaging our services."
      />
      <LegalContent sections={TERMS_SECTIONS} lastUpdated="June 11, 2026" />
    </>
  );
}
