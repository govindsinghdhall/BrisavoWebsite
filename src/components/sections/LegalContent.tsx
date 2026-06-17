import { BlurReveal } from "@/components/animations/TextReveal";

interface LegalSection {
  title: string;
  content: readonly string[];
}

interface LegalContentProps {
  sections: readonly LegalSection[];
  lastUpdated: string;
}

export function LegalContent({ sections, lastUpdated }: LegalContentProps) {
  return (
    <section className="section-padding relative">
      <div className="container-wide max-w-3xl">
        <BlurReveal>
          <p className="text-sm text-muted font-mono mb-12">Last updated: {lastUpdated}</p>
        </BlurReveal>

        <div className="space-y-12">
          {sections.map((section, i) => (
            <BlurReveal key={section.title} delay={i * 0.05}>
              <div>
                <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                <div className="space-y-4">
                  {section.content.map((paragraph, j) => (
                    <p key={j} className="text-muted leading-relaxed text-sm md:text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </BlurReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
