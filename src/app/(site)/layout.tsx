import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { GSAPProvider } from "@/components/providers/GSAPProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "../globals.css";

export const metadata: Metadata = {
  title: "BRISΛVO — Global Technology Company | AI, Software & Enterprise Systems",
  description:
    "BRISΛVO is a global technology company with offices in Canada and India, engineering mission-critical software, AI products, and digital infrastructure for businesses worldwide.",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  metadataBase: new URL("https://BRISΛVO.com"),
  keywords: [
    "BRISΛVO",
    "global technology company",
    "AI development",
    "enterprise software",
    "SaaS development",
    "Canada India technology",
    "digital transformation",
    "cloud infrastructure",
  ],
  authors: [{ name: "BRISΛVO Technologies" }],
  openGraph: {
    title: "BRISΛVO — Building The Future Of Digital Infrastructure",
    description:
      "Global technology company engineering AI, software, automation, and enterprise systems. Canada × India.",
    url: "https://BRISΛVO.com",
    siteName: "BRISΛVO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BRISΛVO — Global Technology Company",
    description: "Engineering excellence across continents. AI. Software. Automation. Scale.",
  },
  robots: { index: true, follow: true },
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground">
        <ThemeProvider>
          <SmoothScroll>
            <GSAPProvider>
              <Navigation />
              <main>{children}</main>
              <Footer />
            </GSAPProvider>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
