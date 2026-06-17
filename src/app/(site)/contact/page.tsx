import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact — Brisavo",
  description: "Get in touch with Brisavo. Canada: +1 236 818 4654 · India: +91 99991 07733 · hello@brisavo.com",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact Command Center"
        title="Let's Build Something Extraordinary"
        description="Ready to transform your technology? Our global team is standing by across Canada and India."
      />
      <Contact showHeader={false} />
    </>
  );
}
