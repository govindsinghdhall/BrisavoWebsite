"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FOOTER_LINKS, CONTACT } from "@/lib/data";
import { ArrowUpRight, Mail } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[200px] bg-accent-blue/5 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-accent-violet/5 blur-[100px]" />
      </div>

      <div className="container-wide relative section-padding !pt-20 !pb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-accent-blue to-accent-violet" />
                <div className="absolute inset-[2px] rounded-[6px] bg-background flex items-center justify-center">
                  <span className="text-xs font-bold text-gradient-accent">B</span>
                </div>
              </div>
              <span className="text-lg font-semibold">Brisavo</span>
            </Link>
            <p className="text-sm text-muted leading-relaxed mb-4 max-w-xs">
              Global technology company engineering mission-critical software, AI products, and digital infrastructure worldwide.
            </p>
            <div className="space-y-2 mb-6">
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span>{CONTACT.email}</span>
              </a>
              <a
                href={CONTACT.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
              >
                <InstagramIcon className="w-4 h-4 shrink-0" />
                <span>@{CONTACT.instagram.handle}</span>
              </a>
              {CONTACT.phones.map((phone) => (
                <a
                  key={phone.href}
                  href={phone.href}
                  className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  <span>{phone.flag}</span>
                  <span>{phone.number}</span>
                </a>
              ))}
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="glass rounded-full px-3 py-1.5 text-xs font-mono">🇨🇦 Canada</span>
              <span className="glass rounded-full px-3 py-1.5 text-xs font-mono">🇮🇳 India</span>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-mono uppercase tracking-wider text-muted mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/50 hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Brisavo Technologies. Global Technology Company.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <Link href="/privacy" className="text-xs text-muted hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-muted hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="text-xs text-muted hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>

          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-xs font-mono text-accent-cyan"
          >
            Building technology globally
          </motion.div>
        </div>

        <div className="mt-12 overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap"
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <span
                key={i}
                className="text-[8vw] md:text-[6vw] font-bold text-foreground/[0.03] mx-8 select-none"
              >
                BRISAVO
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
