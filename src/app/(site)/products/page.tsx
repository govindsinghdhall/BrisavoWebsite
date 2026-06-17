import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Products } from "@/components/sections/Products";

export const metadata: Metadata = {
  title: "Products — Brisavo",
  description: "Enterprise platforms including Brisavo CRM, Property Management, Lead Management, WhatsApp Automation, and AI Assistant.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        label="Products"
        title="Billion-Dollar Software Platforms"
        description="Production-ready products engineered for scale — powering operations for enterprises worldwide."
      />
      <Products showHeader={false} />
    </>
  );
}
