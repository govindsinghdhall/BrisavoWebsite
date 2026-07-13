import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { FeaturedProduct } from "@/components/sections/FeaturedProduct";
import { HomeOverview } from "@/components/sections/HomeOverview";
import { Testimonials } from "@/components/sections/Testimonials";
import { Credibility } from "@/components/sections/Credibility";

export const metadata: Metadata = {
  title: "BRISΛVO",
  description:
    "Home of BRISΛVO Real Estate CRM — multi-tenant property management software with contacts, bookings, site visits, and WhatsApp marketing. Global technology company in Canada and India.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProduct />
      <HomeOverview />
      <Credibility showHeader={false} compact />
      <Testimonials />
    </>
  );
}
