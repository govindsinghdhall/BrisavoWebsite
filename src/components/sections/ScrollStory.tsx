"use client";

import { motion } from "framer-motion";
import { BlurReveal } from "@/components/animations/TextReveal";

const STORY_STEPS = [
  {
    phase: "01",
    title: "Discovery",
    description: "Deep analysis of your business architecture, technical requirements, and growth trajectory.",
    blocks: 4,
  },
  {
    phase: "02",
    title: "Architecture",
    description: "Design scalable systems with cloud-native patterns, security-first principles, and AI integration.",
    blocks: 6,
  },
  {
    phase: "03",
    title: "Engineering",
    description: "Elite engineering teams across Canada and India building with precision and velocity.",
    blocks: 8,
  },
  {
    phase: "04",
    title: "Deployment",
    description: "Zero-downtime deployments, automated CI/CD pipelines, and global infrastructure provisioning.",
    blocks: 5,
  },
  {
    phase: "05",
    title: "Scale",
    description: "Continuous optimization, monitoring, and evolution as your platform grows to millions of users.",
    blocks: 10,
  },
];

function StoryVisual({ blocks }: { blocks: number }) {
  const cols = Math.ceil(Math.sqrt(blocks));

  return (
    <div className="relative w-full h-48 md:h-64 rounded-2xl glass overflow-hidden p-4">
      <div
        className="grid gap-2 h-full"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {Array.from({ length: blocks }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="rounded-lg bg-white/5 border border-white/5"
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
    </div>
  );
}

export function ScrollStory() {
  return (
    <section className="section-padding relative">
      <div className="container-wide">
        <BlurReveal>
          <div className="text-center mb-20">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent-violet mb-4 block">
              Our Process
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              A Cinematic Engineering Journey
            </h2>
          </div>
        </BlurReveal>

        <div className="space-y-24 md:space-y-32">
          {STORY_STEPS.map((step, i) => (
            <motion.div
              key={step.phase}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid md:grid-cols-2 gap-8 md:gap-16 items-center"
            >
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <span className="text-6xl md:text-8xl font-bold text-white/5 font-mono">
                  {step.phase}
                </span>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight -mt-8 md:-mt-12 mb-4">
                  {step.title}
                </h3>
                <p className="text-muted leading-relaxed max-w-md">{step.description}</p>
              </div>
              <div className={i % 2 === 1 ? "md:order-1" : ""}>
                <StoryVisual blocks={step.blocks} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
