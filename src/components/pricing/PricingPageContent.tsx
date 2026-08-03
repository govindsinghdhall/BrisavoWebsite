import { PricingHero } from "@/components/pricing/PricingHero";
import { PricingPlans } from "@/components/pricing/PricingPlans";
import { WebsiteAddons } from "@/components/pricing/WebsiteAddons";
import { ComparePlans } from "@/components/pricing/ComparePlans";
import { WhyChoose } from "@/components/pricing/WhyChoose";
import { RoiCalculator } from "@/components/pricing/RoiCalculator";
import { PricingTestimonials } from "@/components/pricing/PricingTestimonials";
import { PricingFaq } from "@/components/pricing/PricingFaq";
import { PricingFinalCta } from "@/components/pricing/PricingFinalCta";

export function PricingPageContent() {
  return (
    <>
      <PricingHero />
      <PricingPlans />
      <WebsiteAddons />
      <ComparePlans />
      <WhyChoose />
      <RoiCalculator />
      <PricingTestimonials />
      <PricingFaq />
      <PricingFinalCta />
    </>
  );
}
