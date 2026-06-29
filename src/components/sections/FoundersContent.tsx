"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FOUNDERS, CONTACT } from "@/lib/data";
import { BlurReveal } from "@/components/animations/TextReveal";
import { MapPin, Mail, Phone, ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function FoundersContent() {
  return (
    <section className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-violet/[0.03] via-transparent to-transparent" />

      <div className="container-wide relative">
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {FOUNDERS.map((founder, i) => (
            <BlurReveal key={founder.title} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -4 }}
                className="glass rounded-3xl p-8 md:p-10 border border-border hover:border-border transition-all duration-500 h-full"
              >
                <div className="flex items-start gap-6 mb-8">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-blue to-accent-violet flex items-center justify-center text-xl font-bold shrink-0">
                    {founder.avatar}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-1">{founder.name}</h3>
                    <p className="text-accent-cyan font-mono text-sm">{founder.title}</p>
                    <div className="flex items-center gap-1.5 text-xs text-muted mt-2">
                      <MapPin className="w-3.5 h-3.5" />
                      {founder.location}
                    </div>
                  </div>
                </div>

                <p className="text-muted leading-relaxed mb-6">{founder.bio}</p>

                <div className="flex flex-wrap gap-2">
                  {founder.focus.map((area) => (
                    <span
                      key={area}
                      className="text-xs font-mono px-3 py-1.5 rounded-full glass text-foreground/60"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </motion.div>
            </BlurReveal>
          ))}
        </div>

        <BlurReveal delay={0.3}>
          <div className="glass rounded-3xl p-8 md:p-12 border border-accent-blue/10 text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Connect With Leadership</h3>
            <p className="text-muted mb-8 max-w-lg mx-auto">
              For strategic partnerships, enterprise engagements, and executive inquiries — reach our founders office directly.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4 text-accent-blue" />
                {CONTACT.email}
              </a>
              {CONTACT.phones.map((phone) => (
                <a
                  key={phone.href}
                  href={phone.href}
                  className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
                >
                  <Phone className="w-4 h-4 text-accent-blue" />
                  {phone.flag} {phone.number}
                </a>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <MagneticButton href="/contact" variant="primary">
                Schedule a Conversation
              </MagneticButton>
              <Link
                href="/team"
                className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors group"
              >
                Meet the Full Team
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </BlurReveal>
      </div>
    </section>
  );
}
