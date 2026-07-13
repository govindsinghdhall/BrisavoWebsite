"use client";

import { BlurReveal, TextReveal } from "@/components/animations/TextReveal";
import styles from "./PageHero.module.css";

interface PageHeroProps {
  label: string;
  title: string;
  description?: string;
}

export function PageHero({ label, title, description }: PageHeroProps) {
  return (
    <section className={styles.section}>
      <div className={styles.glowLayer}>
        <div className={styles.glowBlue} />
        <div className={styles.glowViolet} />
      </div>
      <div className={styles.content}>
        <BlurReveal immediate>
          <span className={styles.label}>
            <span className={styles.labelRule} />
            {label}
          </span>
        </BlurReveal>
        <h1 className={styles.title}>
          <TextReveal text={title} as="span" immediate />
        </h1>
        {description && (
          <BlurReveal immediate>
            <p className={styles.description}>{description}</p>
          </BlurReveal>
        )}
      </div>
    </section>
  );
}
