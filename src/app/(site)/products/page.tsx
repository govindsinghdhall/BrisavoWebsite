import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Products } from "@/components/sections/Products";

export const metadata: Metadata = {
  title: "Products — BRISΛVO",
  description:
    "Flagship Real Estate Property Management CRM with contacts, leads, bookings, site visits, roles, reporting, and WhatsApp marketing — plus supporting enterprise platforms.",
};

export default function ProductsPage() {
  return (
    <>
      {/* <PageHero
        label="Products"
        title="Real Estate CRM at the center"
        description="Our flagship multi-tenant Real Estate Property Management Software CRM — with complementary platforms for leads, messaging, and AI."
      /> */}
      <Products showHeader={false} />
    </>
  );
}
