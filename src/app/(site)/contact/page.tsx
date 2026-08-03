import type { Metadata } from "next";
import { Suspense } from "react";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact — BROSAVO",
  description:
    "Get in touch with BROSAVO. Canada: +1 236 818 4654 · India: +91 99991 07733 · hellobrosavo@gmail.com",
};

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="section-padding container-wide text-center text-muted">
          Loading contact form…
        </div>
      }
    >
      <Contact showHeader={false} />
    </Suspense>
  );
}
