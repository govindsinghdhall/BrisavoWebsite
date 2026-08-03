"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BlurReveal } from "@/components/animations/TextReveal";
import { Send, Mail, MapPin, Phone, CheckCircle, Loader2 } from "lucide-react";
import { CONTACT } from "@/lib/data";
import { CONTACT_ROLES } from "@/lib/contact";
import { cn } from "@/lib/utils";

const CONTACT_SUCCESS_KEY = "brosavo-contact-demo-submitted";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function isValidPhone(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (!/^\+?[0-9\s().-]+$/.test(trimmed)) return false;
  const digits = trimmed.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

function getDeviceType() {
  if (typeof window === "undefined") return "";
  const width = window.innerWidth;
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

function OptionGroup({
  label,
  options,
  value,
  error,
  disabled,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  error?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-3 block text-xs font-mono uppercase tracking-wider text-muted">
        {label}
      </p>
      <div
        className="grid gap-2 sm:grid-cols-2"
        role="radiogroup"
        aria-label={label}
      >
        {options.map((option) => {
          const selected = value === option;
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={disabled}
              onClick={() => onChange(option)}
              className={cn(
                "rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all duration-200",
                selected
                  ? "border-accent-blue/50 bg-accent-blue/10 text-foreground shadow-[0_0_20px_rgba(59,130,246,0.08)]"
                  : "border-border bg-surface text-foreground/80 hover:border-glass-border hover:bg-surface-hover",
                error && !value && "border-red-500/50"
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
      {error ? (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-xs text-red-400"
        >
          {error}
        </motion.p>
      ) : null}
    </div>
  );
}

export function Contact({ showHeader = true }: { showHeader?: boolean }) {
  const searchParams = useSearchParams();
  const successRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    city: "",
    role: "",
    teamSize: "",
    interest: "",
    plan: "",
    intent: "",
    addon: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(CONTACT_SUCCESS_KEY) === "1") {
        setSubmitted(true);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  useEffect(() => {
    setFormState((prev) => ({
      ...prev,
      plan: searchParams.get("plan") || prev.plan,
      intent: searchParams.get("intent") || prev.intent,
      addon: searchParams.get("addon") || prev.addon,
    }));
  }, [searchParams]);

  useEffect(() => {
    if (!submitted) return;
    successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [submitted]);

  const markSubmitted = () => {
    setSubmitted(true);
    setSubmitError(null);
    setErrors({});
    try {
      sessionStorage.setItem(CONTACT_SUCCESS_KEY, "1");
    } catch {
      // ignore storage errors
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    try {
      sessionStorage.removeItem(CONTACT_SUCCESS_KEY);
    } catch {
      // ignore storage errors
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.name.trim()) newErrors.name = "Name is required";
    if (!formState.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!isValidPhone(formState.phone))
      newErrors.phone = "Enter a valid international phone number";
    if (!formState.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formState.email))
      newErrors.email = "Invalid email";
    if (!formState.city.trim()) newErrors.city = "City / Location is required";
    if (!formState.role.trim()) newErrors.role = "Please select who you are";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitError(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      const payload = {
        ...formState,
        teamSize: formState.teamSize || undefined,
        interest: formState.interest || undefined,
        utm_source: searchParams.get("utm_source") || "",
        utm_medium: searchParams.get("utm_medium") || "",
        utm_campaign: searchParams.get("utm_campaign") || "",
        utm_term: searchParams.get("utm_term") || "",
        utm_content: searchParams.get("utm_content") || "",
        referrer: typeof document !== "undefined" ? document.referrer : "",
        current_page:
          typeof window !== "undefined" ? window.location.href : "",
        timestamp: new Date().toISOString(),
        browser: typeof navigator !== "undefined" ? navigator.userAgent : "",
        device: getDeviceType(),
        screen_resolution:
          typeof window !== "undefined"
            ? `${window.screen.width}x${window.screen.height}`
            : "",
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data: { error?: string } = {};
      try {
        data = (await response.json()) as { error?: string };
      } catch {
        // Non-JSON error body
      }

      if (!response.ok) {
        setSubmitError(data.error || "Failed to send message. Please try again.");
        return;
      }

      markSubmitted();
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const fields = [
    {
      id: "name" as const,
      label: "Full Name",
      type: "text",
      placeholder: "John Doe",
      autoComplete: "name",
    },
    {
      id: "phone" as const,
      label: "Phone Number",
      type: "tel",
      placeholder: "+91 98765 43210",
      autoComplete: "tel",
    },
    {
      id: "email" as const,
      label: "Email Address",
      type: "email",
      placeholder: "john@company.com",
      autoComplete: "email",
    },
    {
      id: "company" as const,
      label: "Agency / Builder / Brokerage Name",
      type: "text",
      placeholder: "Your agency or brokerage",
      autoComplete: "organization",
    },
    {
      id: "city" as const,
      label: "City / Location",
      type: "text",
      placeholder: "Gurugram",
      autoComplete: "address-level2",
    },
  ];

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
                  System Online — Response within 2h
                </div>
                <p className="text-xs text-muted">
                  Our engineering team operates across time zones for rapid response.
                </p>
              </div>
            </BlurReveal>
          </div>

          <div className="lg:col-span-3">
            {submitted ? (
                <motion.div
                  ref={successRef}
                  role="status"
                  aria-live="polite"
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="glass rounded-2xl p-8 md:p-12 text-center border border-green-500/30 bg-green-500/5 shadow-[0_0_40px_rgba(34,197,94,0.12)]"
                >
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold mb-2 text-foreground">
                    Request Received!
                  </h3>
                  <p className="text-muted max-w-md mx-auto leading-7">
                    Thank you for contacting Brosavo.
                    <br />
                    <br />
                    One of our product specialists will contact you within 2
                    business hours to understand your requirements and schedule
                    a personalized demo.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:mx-auto sm:max-w-md">
                    <a
                      href={CONTACT.whatsapp.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(37,211,102,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1ebe57] hover:shadow-[0_14px_36px_rgba(37,211,102,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      aria-label={`Chat on WhatsApp at ${CONTACT.whatsapp.number}`}
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                        <WhatsAppIcon className="h-5 w-5" />
                      </span>
                      Chat on WhatsApp
                    </a>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {CONTACT.phones.map((phone) => (
                        <MagneticButton
                          key={phone.href}
                          href={phone.href}
                          variant="secondary"
                          className="w-full !rounded-xl"
                        >
                          <Phone className="w-4 h-4" />
                          Call {phone.label}
                        </MagneticButton>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={resetForm}
                      className="mt-1 text-sm font-medium text-accent-blue transition-opacity hover:opacity-80"
                    >
                      Submit another request
                    </button>
                  </div>

                  <p className="mt-5 text-xs text-muted">
                    WhatsApp · {CONTACT.whatsapp.number}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-8 border border-border space-y-5">
                  {(formState.plan || formState.intent || formState.addon) && (
                    <div className="rounded-xl border border-accent-blue/20 bg-accent-blue/8 px-4 py-3 text-sm text-foreground/80">
                      Enquiry context:{" "}
                      {[formState.intent, formState.plan, formState.addon]
                        .filter(Boolean)
                        .join(" · ")}
                    </div>
                  )}

                  {fields.map((field) => (
                    <div key={field.id}>
                      <label
                        htmlFor={field.id}
                        className="mb-2 block text-xs font-mono uppercase tracking-wider text-muted"
                      >
                        {field.label}
                      </label>
                      <div className="relative">
                        <input
                          id={field.id}
                          type={field.type}
                          placeholder={field.placeholder}
                          autoComplete={field.autoComplete}
                          value={formState[field.id]}
                          onChange={(e) =>
                            setFormState((p) => ({
                              ...p,
                              [field.id]: e.target.value,
                            }))
                          }
                          onFocus={() => setFocused(field.id)}
                          onBlur={() => setFocused(null)}
                          disabled={submitting}
                          className={cn(
                            "w-full rounded-xl border bg-surface px-4 py-3 text-sm outline-none transition-all duration-300",
                            focused === field.id
                              ? "border-accent-blue/50 bg-surface shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                              : "border-border hover:border-glass-border",
                            errors[field.id] && "border-red-500/50"
                          )}
                        />
                        {errors[field.id] && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-1 text-xs text-red-400"
                          >
                            {errors[field.id]}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  ))}

                  <OptionGroup
                    label="I am a"
                    options={CONTACT_ROLES}
                    value={formState.role}
                    error={errors.role}
                    disabled={submitting}
                    onChange={(role) => setFormState((p) => ({ ...p, role }))}
                  />

                  {/* <OptionGroup
                    label="How many agents work in your business?"
                    options={CONTACT_TEAM_SIZES}
                    value={formState.teamSize}
                    error={errors.teamSize}
                    disabled={submitting}
                    onChange={(teamSize) =>
                      setFormState((p) => ({ ...p, teamSize }))
                    }
                  /> */}

                  {/* <OptionGroup
                    label="I'm interested in"
                    options={CONTACT_INTERESTS}
                    value={formState.interest}
                    error={errors.interest}
                    disabled={submitting}
                    onChange={(interest) =>
                      setFormState((p) => ({ ...p, interest }))
                    }
                  /> */}

                  {/* <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {TRUST_BADGES.map((badge) => (
                      <div
                        key={badge}
                        className="rounded-xl border border-border bg-surface/70 px-3 py-2.5 text-center text-[11px] leading-4 text-foreground/75"
                      >
                        {badge}
                      </div>
                    ))}
                  </div> */}

                  {Object.keys(errors).length > 0 ? (
                    <p className="rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-400">
                      Please fill in the required fields highlighted above.
                    </p>
                  ) : null}

                  {submitError ? (
                    <p className="rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-400">
                      {submitError}
                    </p>
                  ) : null}

                  <MagneticButton
                    type="submit"
                    variant="primary"
                    className="w-full !rounded-xl"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Request Free Demo
                      </>
                    )}
                  </MagneticButton>
                </form>
              )}
          </div>
        </div>
      </div>
    </section>
  );
}
