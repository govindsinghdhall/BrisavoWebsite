"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Brain, Code, Cloud, Building2, Users, CreditCard,
  Server, Smartphone, Zap, RefreshCw, Database, Layers,
} from "lucide-react";
import { SERVICES } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

const ICON_MAP = {
  brain: Brain,
  code: Code,
  cloud: Cloud,
  building: Building2,
  users: Users,
  "credit-card": CreditCard,
  server: Server,
  smartphone: Smartphone,
  zap: Zap,
  refresh: RefreshCw,
  database: Database,
  layers: Layers,
} as const;

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const Icon = ICON_MAP[service.icon as keyof typeof ICON_MAP];

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      onMouseMove={handleMouse}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={cn(
        "group relative rounded-2xl p-6 md:p-8 overflow-hidden cursor-default",
        "glass border border-border hover:border-border transition-colors duration-500",
        service.span
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700",
          service.gradient
        )}
      />

      <motion.div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"
        style={{ backgroundColor: service.accent }}
        animate={hovered ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <div className="relative z-10">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundColor: `${service.accent}15`, color: service.accent }}
        >
          <Icon className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-semibold mb-3 tracking-tight">{service.title}</h3>
        <p className="text-sm text-muted leading-relaxed">{service.description}</p>

        <motion.div
          className="mt-6 flex items-center gap-2 text-xs font-mono uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: service.accent }}
        >
          <span>Learn more</span>
          <motion.span animate={hovered ? { x: [0, 4, 0] } : {}} transition={{ duration: 1, repeat: Infinity }}>
            →
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Services({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <section className="section-padding relative">
      <div className="container-wide">
        {showHeader && (
          <SectionHeader
            label="Services Universe"
            title="Engineering Excellence At Every Layer"
            description="From AI-native platforms to enterprise infrastructure — we architect, build, and scale technology that powers global businesses."
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(200px,auto)]">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
