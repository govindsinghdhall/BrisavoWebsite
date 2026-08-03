import { PricingHero } from "@/components/pricing/PricingHero";
import { SocialProof } from "@/components/pricing/SocialProof";
import { PricingPlans } from "@/components/pricing/PricingPlans";
import { TrustBadges } from "@/components/pricing/TrustBadges";
import { WebsiteAddons } from "@/components/pricing/WebsiteAddons";
import { ComparePlans } from "@/components/pricing/ComparePlans";
import { PricingTimeline } from "@/components/pricing/PricingTimeline";
import { WhyChoose } from "@/components/pricing/WhyChoose";
import { RoiCalculator } from "@/components/pricing/RoiCalculator";
import { PaymentMethods } from "@/components/pricing/PaymentMethods";
import { PricingTestimonials } from "@/components/pricing/PricingTestimonials";
import { PricingFaq } from "@/components/pricing/PricingFaq";
import { PricingFinalCta } from "@/components/pricing/PricingFinalCta";

export function PricingPageContent() {
  return (
    <>
      <PricingHero />
      <SocialProof />
      <PricingPlans />
      <TrustBadges />
      <WebsiteAddons />
      <ComparePlans />
      <PricingTimeline />
      <WhyChoose />
      <RoiCalculator />
      <PaymentMethods />
      <PricingTestimonials />
      <PricingFaq />
      <PricingFinalCta />
    </>
  );
}
