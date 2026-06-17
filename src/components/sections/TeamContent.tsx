"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TEAM } from "@/lib/data";
import { BlurReveal } from "@/components/animations/TextReveal";
import { MapPin, ArrowUpRight } from "lucide-react";

export function TeamContent() {
  return (
    <section className="section-padding relative">
      <div className="container-wide">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM.map((member, i) => (
            <BlurReveal key={member.name} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-8 border border-white/5 hover:border-white/10 transition-all duration-500 h-full flex flex-col"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-blue to-accent-violet flex items-center justify-center text-lg font-bold mb-6">
                  {member.avatar}
                </div>
                <span className="text-xs font-mono text-accent-cyan uppercase tracking-wider mb-2">
                  {member.department}
                </span>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-sm text-accent-blue mb-4">{member.role}</p>
                <p className="text-sm text-muted leading-relaxed flex-1 mb-4">{member.bio}</p>
                <div className="flex items-center gap-1.5 text-xs text-muted">
                  <MapPin className="w-3.5 h-3.5" />
                  {member.location}
                </div>
              </motion.div>
            </BlurReveal>
          ))}
        </div>

        <BlurReveal delay={0.3}>
          <div className="mt-16 text-center">
            <p className="text-muted mb-6">Want to connect with our leadership?</p>
            <Link
              href="/founders-office"
              className="inline-flex items-center gap-2 glass rounded-full px-6 py-3 text-sm font-medium hover:bg-white/10 transition-colors group"
            >
              Visit Founders Office
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </BlurReveal>
      </div>
    </section>
  );
}
