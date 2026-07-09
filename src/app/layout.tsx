import type { Metadata } from "next";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { GSAPProvider } from "@/components/providers/GSAPProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brisavo — Global Technology Company | AI, Software & Enterprise Systems",
  description:
    "Brisavo is a global technology company with offices in Canada and India, engineering mission-critical software, AI products, and digital infrastructure for businesses worldwide.",
  keywords: [
    "Brisavo",
    "global technology company",
    "AI development",
    "enterprise software",
    "SaaS development",
    "Canada India technology",
    "digital transformation",
    "cloud infrastructure",
  ],
  authors: [{ name: "Brisavo Technologies" }],
  openGraph: {
    title: "Brisavo — Building The Future Of Digital Infrastructure",
    description:
      "Global technology company engineering AI, software, automation, and enterprise systems. Canada × India.",
    url: "https://brisavo.com",
    siteName: "Brisavo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brisavo — Global Technology Company",
    description: "Engineering excellence across continents. AI. Software. Automation. Scale.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground">
        <ThemeProvider>
          <SmoothScroll>
            <GSAPProvider>{children}</GSAPProvider>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
