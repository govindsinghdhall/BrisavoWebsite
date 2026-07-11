"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 transition-all duration-500",
          scrolled && "py-3"
        )}
      >
        <nav
          className={cn(
            "container-wide mx-auto flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-500",
            "glass-strong shadow-[0_4px_24px_var(--nav-shadow)]",
            scrolled && "shadow-[0_8px_32px_var(--nav-shadow)]"
          )}
        >
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 overflow-hidden rounded-2xl bg-slate-950/5 border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.12)]">
              <img src="/logo.svg" alt="BRISΛVO logo" className="h-full w-full object-cover" />
            </div>
            <span className="text-lg font-semibold tracking-wider">
              BRIS<span style={{ color: "#5B74F6" }}>Λ</span>VO
            </span>
          </Link>

          <div className="hidden xl:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3 py-2 text-sm transition-colors group",
                  isActive(link.href) ? "text-foreground" : "text-foreground/60 hover:text-foreground"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-accent-blue transition-all duration-300",
                    isActive(link.href) ? "w-3/4" : "w-0 group-hover:w-3/4"
                  )}
                />
              </Link>
            ))}
          </div>

          <div className="hidden xl:flex items-center gap-2">
            <ThemeToggle />
            <MagneticButton href="/contact" variant="primary" className="!px-6 !py-2.5 !text-sm">
              Contact Us
            </MagneticButton>
          </div>

          <div className="xl:hidden flex items-center gap-1">
            <ThemeToggle />
            <button
              className="relative w-10 h-10 flex items-center justify-center"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <motion.div
                animate={{ rotate: mobileOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.div>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 xl:hidden"
          >
            <motion.div
              className="absolute inset-0 bg-overlay backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm glass-strong p-8 pt-24 flex flex-col gap-1 overflow-y-auto"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block text-xl font-medium py-3 border-b border-border transition-colors",
                      isActive(link.href) ? "text-foreground" : "text-foreground/80 hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8"
              >
                <MagneticButton
                  href="/contact"
                  variant="primary"
                  className="w-full"
                  onClick={() => setMobileOpen(false)}
                >
                  Contact Us
                </MagneticButton>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
