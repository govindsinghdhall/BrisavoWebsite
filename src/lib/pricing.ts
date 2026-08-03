import type { CurrencyCode } from "@/lib/currency";
import { formatPrice } from "@/lib/currency";

export type BillingPeriod = "monthly" | "yearly";

export interface PricingFeatureItem {
  feature: string;
  benefit: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  description: string;
  monthlyPrice: number | null;
  originalPrice: number | null;
  launchPrice: number | null;
  discount: number | null;
  ctaLabel: string;
  ctaHref: string;
  popular?: boolean;
  featureIntro?: string;
  features: PricingFeatureItem[];
  /** Flat feature labels for legacy compare / JSON-LD helpers */
  featureLabels: string[];
}

export interface WebsiteAddon {
  id: string;
  name: string;
  priceLabel: string;
  priceInr?: number | null;
  priceNote?: string;
  features: string[];
  highlighted?: boolean;
  ctaLabel: string;
  ctaHref: string;
}

export interface CompareRow {
  feature: string;
  starter: string | boolean;
  professional: string | boolean;
  enterprise: string | boolean;
}

export const YEARLY_DISCOUNT = 0.2;

export function formatInr(amount: number): string {
  return formatPrice(amount, "INR");
}

export function getPlanPrice(
  monthlyPrice: number | null,
  period: BillingPeriod,
  currency: CurrencyCode = "INR"
): { display: string; suffix: string; amount: number | null } {
  if (monthlyPrice === null) {
    return { display: "Custom", suffix: "", amount: null };
  }

  const amount =
    period === "yearly"
      ? Math.round(monthlyPrice * (1 - YEARLY_DISCOUNT))
      : monthlyPrice;

  return {
    display: formatPrice(amount, currency),
    suffix: "/ month",
    amount,
  };
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Everything you need to start selling",
    description:
      "Perfect for individual agents getting started with professional real estate tools.",
    monthlyPrice: 999,
    originalPrice: 1499,
    launchPrice: 999,
    discount: 33,
    ctaLabel: "Start Free 14-Day Trial",
    ctaHref: "/contact?plan=starter",
    popular: false,
    featureIntro: "Essential tools to launch your real estate business",
    features: [
      {
        feature: "Professional Website",
        benefit:
          "Get a stunning, mobile-optimized website with property listings and lead capture forms",
        included: true,
      },
      {
        feature: "Smart CRM",
        benefit: "Track every lead, property, and deal in one unified pipeline",
        included: true,
      },
      {
        feature: "Lead Management",
        benefit:
          "Capture, track, and convert unlimited leads from multiple channels",
        included: true,
      },
      {
        feature: "WhatsApp Notifications",
        benefit: "Instant notifications to never miss a lead inquiry",
        included: true,
      },
      {
        feature: "Email Support",
        benefit: "Get help when you need it with dedicated email support",
        included: true,
      },
    ],
    featureLabels: [
      "1 User",
      "CRM",
      "Lead Management",
      "Property Inventory",
      "Website Builder",
      "Lead Forms",
      "Landing Pages",
      "Email Support",
      "WhatsApp Notifications",
      "Mobile Friendly",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    tagline: "Scale your real estate business",
    description:
      "Built for growing brokerages and teams who want to dominate their market.",
    monthlyPrice: 2499,
    originalPrice: 3499,
    launchPrice: 2499,
    discount: 28,
    ctaLabel: "Start Free 14-Day Trial",
    ctaHref: "/contact?plan=professional",
    popular: true,
    featureIntro: "Everything in Starter, plus powerful growth tools",
    features: [
      {
        feature: "Advanced Website Suite",
        benefit:
          "Blog, SEO tools, property portal integration, and Google Maps to attract more buyers",
        included: true,
      },
      {
        feature: "Team Collaboration",
        benefit:
          "5 users with role permissions and task management for seamless teamwork",
        included: true,
      },
      {
        feature: "WhatsApp API Integration",
        benefit: "Automated messaging and engagement at scale",
        included: true,
      },
      {
        feature: "Marketing Automation",
        benefit:
          "Email campaigns, follow-up reminders, and automated workflows",
        included: true,
      },
      {
        feature: "Advanced Analytics",
        benefit: "Data-driven insights to optimize your sales process",
        included: true,
      },
      {
        feature: "Call Tracking",
        benefit: "Know which marketing channels are generating calls",
        included: true,
      },
      {
        feature: "Priority Support",
        benefit: "Get answers faster with priority support channel",
        included: true,
      },
    ],
    featureLabels: [
      "Unlimited Leads",
      "5 Users",
      "Automation",
      "WhatsApp API",
      "Call Tracking",
      "Email Campaigns",
      "Property Portal Integration",
      "Sales Pipeline",
      "Follow-up Reminders",
      "Task Management",
      "Analytics Dashboard",
      "Role Permissions",
      "Website with Blog",
      "SEO Tools",
      "Google Maps Integration",
      "Meta Pixel",
      "Google Analytics",
      "CRM Reports",
      "Priority Support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Unlimited power for large organizations",
    description:
      "For multi-branch agencies and developers building at scale.",
    monthlyPrice: null,
    originalPrice: null,
    launchPrice: null,
    discount: null,
    ctaLabel: "Book Live Demo",
    ctaHref: "/contact?plan=enterprise",
    popular: false,
    featureIntro: "Everything in Professional, plus enterprise capabilities",
    features: [
      {
        feature: "Unlimited Everything",
        benefit:
          "Unlimited users, websites, and branches with enterprise-grade infrastructure",
        included: true,
      },
      {
        feature: "Custom Integrations",
        benefit:
          "Connect with your existing tools via API access and custom workflows",
        included: true,
      },
      {
        feature: "White Label Solutions",
        benefit:
          "Brand the platform as your own with complete customization",
        included: true,
      },
      {
        feature: "Dedicated Account Manager",
        benefit:
          "Strategic guidance and priority support from your personal account manager",
        included: true,
      },
      {
        feature: "Advanced Security",
        benefit:
          "SSO, advanced permissions, and enterprise-grade data protection",
        included: true,
      },
      {
        feature: "Data Migration",
        benefit:
          "Seamless migration from your existing CRM with zero data loss",
        included: true,
      },
    ],
    featureLabels: [
      "Unlimited Users",
      "Unlimited Websites",
      "Multiple Branches",
      "Custom Integrations",
      "API Access",
      "Dedicated Account Manager",
      "SSO",
      "Advanced Permissions",
      "White Label",
      "Priority Infrastructure",
      "Custom Workflows",
      "Data Migration",
      "Training",
      "Dedicated Support",
      "Custom SLAs",
    ],
  },
];

export const WEBSITE_ADDONS: WebsiteAddon[] = [
  {
    id: "professional-website",
    name: "Professional Website",
    priceLabel: "Starting from ₹15,000",
    priceInr: 15000,
    features: [
      "Custom Design",
      "SEO",
      "Blog",
      "Property Pages",
      "Forms",
      "Speed Optimization",
      "SSL",
      "Admin Panel",
    ],
    ctaLabel: "Get Started",
    ctaHref: "/contact?addon=professional-website",
  },
  {
    id: "premium-website",
    name: "Premium Website",
    priceLabel: "Starting from ₹35,000",
    priceInr: 35000,
    highlighted: true,
    features: [
      "Everything above",
      "Luxury UI",
      "Animations",
      "Interactive Maps",
      "Advanced SEO",
      "Lead Automation",
      "CRM Integration",
      "Analytics",
      "Premium Support",
    ],
    ctaLabel: "Upgrade Experience",
    ctaHref: "/contact?addon=premium-website",
  },
  {
    id: "custom-enterprise-website",
    name: "Custom Enterprise Website",
    priceLabel: "Custom Quote",
    priceInr: null,
    features: [
      "Unlimited Pages",
      "Advanced Integrations",
      "High Performance",
      "Multi-language",
      "International SEO",
      "Dedicated Development",
    ],
    ctaLabel: "Request Quote",
    ctaHref: "/contact?addon=enterprise-website",
  },
];

export const COMPARE_ROWS: CompareRow[] = [
  { feature: "CRM", starter: true, professional: true, enterprise: true },
  { feature: "Website", starter: "Builder", professional: "Website + Blog", enterprise: "Unlimited" },
  { feature: "Lead Management", starter: true, professional: true, enterprise: true },
  { feature: "Property Management", starter: true, professional: true, enterprise: true },
  { feature: "WhatsApp", starter: "Notifications", professional: "WhatsApp API", enterprise: "Advanced" },
  { feature: "Call Tracking", starter: false, professional: true, enterprise: true },
  { feature: "Email Marketing", starter: false, professional: true, enterprise: true },
  { feature: "Automation", starter: false, professional: true, enterprise: "Custom Workflows" },
  { feature: "API Access", starter: false, professional: false, enterprise: true },
  { feature: "Reports", starter: "Basic", professional: "CRM Reports", enterprise: "Advanced" },
  { feature: "SEO", starter: "Essentials", professional: "SEO Tools", enterprise: "Enterprise SEO" },
  { feature: "Blog", starter: false, professional: true, enterprise: true },
  { feature: "Analytics", starter: "Basic", professional: "Dashboard", enterprise: "Advanced" },
  { feature: "Multi Branch", starter: false, professional: false, enterprise: true },
  { feature: "White Label", starter: false, professional: false, enterprise: true },
  { feature: "Support", starter: "Email", professional: "Priority", enterprise: "Dedicated" },
  { feature: "Storage", starter: "10 GB", professional: "100 GB", enterprise: "Custom" },
  { feature: "Users", starter: "1", professional: "5", enterprise: "Unlimited" },
  { feature: "Website Hosting", starter: true, professional: true, enterprise: true },
  { feature: "SSL", starter: true, professional: true, enterprise: true },
  { feature: "Custom Domain", starter: true, professional: true, enterprise: true },
  { feature: "Backup", starter: "Weekly", professional: "Daily", enterprise: "Continuous" },
  { feature: "Security", starter: "Standard", professional: "Enhanced", enterprise: "Enterprise" },
];

export const WHY_CHOOSE = [
  {
    title: "Built for Realtors",
    description:
      "Pipelines, inventory, site visits, and partner workflows designed for how real estate teams actually sell.",
    icon: "home" as const,
  },
  {
    title: "Modern Website Included",
    description:
      "Launch a conversion-ready website with forms, landing pages, and SEO tools — without a separate stack.",
    icon: "globe" as const,
  },
  {
    title: "Powerful CRM",
    description:
      "Capture leads, automate follow-ups, track calls and WhatsApp, and manage every deal in one place.",
    icon: "crm" as const,
  },
  {
    title: "Grow Faster",
    description:
      "Analytics, automation, and marketing integrations help your team close more deals with less effort.",
    icon: "rocket" as const,
  },
];

export const PRICING_FAQS = [
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. You can cancel your subscription at any time. Your plan remains active until the end of the current billing period.",
  },
  {
    question: "Do you offer a free trial?",
    answer:
      "Yes. Start with a 14-day free trial to explore Brosavo Real Estate CRM, website tools, and core workflows before you commit. No credit card required.",
  },
  {
    question: "Can I use my own domain?",
    answer:
      "Absolutely. Connect your custom domain with SSL included so your website and property pages stay on-brand.",
  },
  {
    question: "Can you migrate my existing CRM?",
    answer:
      "Yes. Our team can help migrate contacts, properties, and deal history from spreadsheets or another CRM — especially on Professional and Enterprise plans.",
  },
  {
    question: "Do you provide support?",
    answer:
      "Starter includes email support. Professional includes priority support. Enterprise includes a dedicated account manager and custom SLAs.",
  },
  {
    question: "Can I integrate WhatsApp?",
    answer:
      "Yes. Starter includes WhatsApp notifications. Professional and Enterprise unlock WhatsApp API messaging for automated engagement.",
  },
  {
    question: "Can I upgrade later?",
    answer:
      "Yes. Upgrade or add website packages anytime as your team, lead volume, or branch network grows.",
  },
  {
    question: "How secure is my data?",
    answer:
      "Brosavo uses encrypted connections, role-based access, regular backups, and enterprise-grade infrastructure practices to protect your CRM and website data.",
  },
];

export const PRICING_TESTIMONIALS = [
  {
    quote:
      "Brosavo replaced our spreadsheet chaos. Lead response time dropped, and our agents finally work from one shared pipeline.",
    author: "Ananya Mehta",
    company: "Horizon Realty Group",
    avatar: "AM",
    rating: 5,
  },
  {
    quote:
      "The CRM plus website combo is a game changer. Inquiries flow straight into follow-ups — we stopped losing warm leads.",
    author: "Daniel Okonkwo",
    company: "PrimeNest Brokers",
    avatar: "DO",
    rating: 5,
  },
  {
    quote:
      "WhatsApp automation and analytics helped our team scale without hiring more coordinators. ROI was obvious within a quarter.",
    author: "Priya Nair",
    company: "Skyline Properties",
    avatar: "PN",
    rating: 5,
  },
];

export const PRICING_NAV_SECTIONS = [
  { id: "plans", label: "Plans" },
  { id: "addons", label: "Websites" },
  { id: "compare", label: "Compare" },
  { id: "roi", label: "ROI" },
  { id: "faq", label: "FAQ" },
] as const;
