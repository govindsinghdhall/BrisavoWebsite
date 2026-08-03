import type { Metadata } from "next";
import { PricingPageContent } from "@/components/pricing/PricingPageContent";
import { JsonLd } from "@/components/blog/JsonLd";
import { PRICING_FAQS, PRICING_PLANS } from "@/lib/pricing";
import { PRODUCT_NAME, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Real Estate CRM Pricing | Brosavo",
  description:
    "Explore Brosavo pricing plans for Real Estate CRM, Website Builder, Lead Management, WhatsApp Integration, Automation, Analytics, and Property Management. Affordable plans for agents, brokers, and real estate companies.",
  alternates: {
    canonical: `${SITE_URL}/pricing`,
  },
  openGraph: {
    title: "Real Estate CRM Pricing | Brosavo",
    description:
      "Simple pricing for growing real estate businesses. CRM, website builder, WhatsApp, automation, and analytics — starting at ₹999/month.",
    url: `${SITE_URL}/pricing`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate CRM Pricing | Brosavo",
    description:
      "Affordable Real Estate CRM pricing with website builder, lead management, WhatsApp, and automation.",
  },
};

function buildPricingJsonLd() {
  const offers = PRICING_PLANS.filter((plan) => plan.monthlyPrice !== null).map(
    (plan) => ({
      "@type": "Offer",
      name: `${plan.name} Plan`,
      price: String(plan.monthlyPrice),
      priceCurrency: "INR",
      url: `${SITE_URL}/pricing`,
      description: plan.description,
    })
  );

  return [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: PRODUCT_NAME,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers,
      description:
        "AI-powered Real Estate CRM with website builder, lead management, WhatsApp, automation, and analytics.",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: PRICING_FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Pricing",
          item: `${SITE_URL}/pricing`,
        },
      ],
    },
  ];
}

export default function PricingPage() {
  return (
    <>
      <JsonLd data={buildPricingJsonLd()} />
      <PricingPageContent />
    </>
  );
}
