"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BlurReveal } from "@/components/animations/TextReveal";
import { Send, Mail, MapPin, Phone, CheckCircle } from "lucide-react";
import { CONTACT } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Contact({ showHeader = true }: { showHeader?: boolean }) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.name.trim()) newErrors.name = "Name is required";
    if (!formState.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formState.email)) newErrors.email = "Invalid email";
    if (!formState.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  const fields = [
    { id: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
    { id: "email", label: "Email Address", type: "email", placeholder: "john@company.com" },
    { id: "company", label: "Company", type: "text", placeholder: "Your Company" },
  ] as const;

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-blue/5 blur-[200px] rounded-full" />

      <div className="container-wide relative">
        {showHeader && (
          <SectionHeader
            label="Contact Command Center"
            title="Let's Build Something Extraordinary"
            description="Ready to transform your technology? Our global team is standing by."
            align="center"
          />
        )}

        <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
              ...CONTACT.phones.map((p) => ({
                icon: Phone,
                label: p.label,
                value: `${p.flag} ${p.number}`,
                href: p.href,
              })),
              { icon: MapPin, label: "Offices", value: CONTACT.offices, href: undefined },
            ].map((item, i) => (
              <BlurReveal key={`${item.label}-${i}`} delay={i * 0.1}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="glass rounded-xl p-4 flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent-blue/10 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-accent-blue" />
                  </div>
                  <div>
                    <div className="text-xs text-muted uppercase tracking-wider">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-sm font-medium hover:text-accent-blue transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-sm font-medium">{item.value}</div>
                    )}
                  </div>
                </motion.div>
              </BlurReveal>
            ))}

            <BlurReveal delay={0.4}>
              <div className="glass rounded-xl p-4 mt-6">
                <div className="flex items-center gap-2 text-xs font-mono text-green-400 mb-2">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-green-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  System Online — Response within 24h
                </div>
                <p className="text-xs text-muted">
                  Our engineering team operates across time zones for rapid response.
                </p>
              </div>
            </BlurReveal>
          </div>

          <div className="lg:col-span-3">
            <BlurReveal delay={0.2}>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass rounded-2xl p-12 text-center border border-green-500/20"
                >
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold mb-2">Message Transmitted</h3>
                  <p className="text-muted">Our team will respond within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-8 border border-white/5 space-y-5">
                  {fields.map((field) => (
                    <div key={field.id}>
                      <label htmlFor={field.id} className="text-xs font-mono uppercase tracking-wider text-muted mb-2 block">
                        {field.label}
                      </label>
                      <div className="relative">
                        <input
                          id={field.id}
                          type={field.type}
                          placeholder={field.placeholder}
                          value={formState[field.id]}
                          onChange={(e) =>
                            setFormState((p) => ({ ...p, [field.id]: e.target.value }))
                          }
                          onFocus={() => setFocused(field.id)}
                          onBlur={() => setFocused(null)}
                          className={cn(
                            "w-full bg-white/5 border rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300",
                            focused === field.id
                              ? "border-accent-blue/50 bg-white/8 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                              : "border-white/10 hover:border-white/20",
                            errors[field.id] && "border-red-500/50"
                          )}
                        />
                        {errors[field.id] && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs text-red-400 mt-1"
                          >
                            {errors[field.id]}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  ))}

                  <div>
                    <label htmlFor="message" className="text-xs font-mono uppercase tracking-wider text-muted mb-2 block">
                      Project Details
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Tell us about your project..."
                      value={formState.message}
                      onChange={(e) => setFormState((p) => ({ ...p, message: e.target.value }))}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      className={cn(
                        "w-full bg-white/5 border rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300 resize-none",
                        focused === "message"
                          ? "border-accent-blue/50 bg-white/8 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                          : "border-white/10 hover:border-white/20",
                        errors.message && "border-red-500/50"
                      )}
                    />
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-400 mt-1"
                      >
                        {errors.message}
                      </motion.p>
                    )}
                  </div>

                  <MagneticButton type="submit" variant="primary" className="w-full !rounded-xl">
                    <Send className="w-4 h-4" />
                    Transmit Message
                  </MagneticButton>
                </form>
              )}
            </BlurReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
