import { z } from "zod";

export const CONTACT_ROLES = [
  // "Real Estate Agent",
  "Real Estate Broker",
  "Builder / Developer",
  "Property Consultant",
  // "Channel Partner",
  // "Real Estate Agency",
  // "Investor",
  "Other",
] as const;

export const CONTACT_TEAM_SIZES = [
  "Just Me",
  "2–5",
  "6–20",
  "21–50",
  "50+",
] as const;

export const CONTACT_INTERESTS = [
  "Real Estate CRM",
  "CRM + Website",
  "Website Only",
  "WhatsApp Automation",
  "Custom Software",
  "Not Sure Yet",
] as const;

export type ContactRole = (typeof CONTACT_ROLES)[number];
export type ContactTeamSize = (typeof CONTACT_TEAM_SIZES)[number];
export type ContactInterest = (typeof CONTACT_INTERESTS)[number];

const optionalString = z.string().trim().max(300).optional().or(z.literal(""));

const phoneSchema = z
  .string()
  .trim()
  .min(7, "Phone number is required")
  .max(30, "Phone number is too long")
  .refine((value) => {
    const digits = value.replace(/\D/g, "");
    return digits.length >= 7 && digits.length <= 15;
  }, "Enter a valid phone number")
  .refine(
    (value) => /^\+?[0-9\s().-]+$/.test(value),
    "Enter a valid international phone number"
  );

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(120),
  phone: phoneSchema,
  email: z.string().trim().email("Invalid email").max(200),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  city: z.string().trim().min(2, "City / Location is required").max(120),
  role: z.enum(CONTACT_ROLES, {
    message: "Please select who you are",
  }),
  teamSize: z.preprocess(
    (val) => (val === "" || val == null ? undefined : val),
    z
      .enum(CONTACT_TEAM_SIZES, {
        message: "Please select your team size",
      })
      .optional()
  ),
  interest: z.preprocess(
    (val) => (val === "" || val == null ? undefined : val),
    z
      .enum(CONTACT_INTERESTS, {
        message: "Please select what you're interested in",
      })
      .optional()
  ),
  plan: optionalString,
  intent: optionalString,
  addon: optionalString,
  utm_source: optionalString,
  utm_medium: optionalString,
  utm_campaign: optionalString,
  utm_term: optionalString,
  utm_content: optionalString,
  referrer: optionalString,
  current_page: optionalString,
  timestamp: optionalString,
  browser: optionalString,
  device: optionalString,
  screen_resolution: optionalString,
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildContactEmailHtml(input: ContactFormInput): string {
  const rows: Array<[string, string]> = [
    ["Name", input.name],
    ["Phone", input.phone],
    ["Email", input.email],
    ["Agency / Builder / Brokerage", input.company || "—"],
    ["City / Location", input.city],
    ["I am a", input.role],
    ["Team Size", input.teamSize || "—"],
    ["Interested in", input.interest || "—"],
    ["Plan", input.plan || "—"],
    ["Intent", input.intent || "—"],
    ["Addon", input.addon || "—"],
    ["UTM Source", input.utm_source || "—"],
    ["UTM Medium", input.utm_medium || "—"],
    ["UTM Campaign", input.utm_campaign || "—"],
    ["UTM Term", input.utm_term || "—"],
    ["UTM Content", input.utm_content || "—"],
    ["Referrer", input.referrer || "—"],
    ["Current Page", input.current_page || "—"],
    ["Timestamp", input.timestamp || "—"],
    ["Browser", input.browser || "—"],
    ["Device", input.device || "—"],
    ["Screen", input.screen_resolution || "—"],
  ];

  const metaRows = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:8px 12px;color:#64748b;font-size:13px;width:160px;vertical-align:top;">${escapeHtml(label)}</td>
        <td style="padding:8px 12px;color:#0f172a;font-size:14px;font-weight:600;">${escapeHtml(value)}</td>
      </tr>`
    )
    .join("");

  return `
  <div style="font-family:Inter,Segoe UI,Arial,sans-serif;background:#f8fafc;padding:24px;">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;">
      <div style="padding:20px 24px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:#fff;">
        <h1 style="margin:0;font-size:18px;">New Brosavo demo request</h1>
      </div>
      <div style="padding:8px 12px 20px;">
        <table style="width:100%;border-collapse:collapse;">${metaRows}</table>
      </div>
    </div>
  </div>`;
}

export function buildContactEmailText(input: ContactFormInput): string {
  return [
    `Name: ${input.name}`,
    `Phone: ${input.phone}`,
    `Email: ${input.email}`,
    `Agency / Builder / Brokerage: ${input.company || "—"}`,
    `City / Location: ${input.city}`,
    `I am a: ${input.role}`,
    `Team Size: ${input.teamSize || "—"}`,
    `Interested in: ${input.interest || "—"}`,
    `Plan: ${input.plan || "—"}`,
    `Intent: ${input.intent || "—"}`,
    `Addon: ${input.addon || "—"}`,
    `UTM Source: ${input.utm_source || "—"}`,
    `UTM Medium: ${input.utm_medium || "—"}`,
    `UTM Campaign: ${input.utm_campaign || "—"}`,
    `UTM Term: ${input.utm_term || "—"}`,
    `UTM Content: ${input.utm_content || "—"}`,
    `Referrer: ${input.referrer || "—"}`,
    `Current Page: ${input.current_page || "—"}`,
    `Timestamp: ${input.timestamp || "—"}`,
    `Browser: ${input.browser || "—"}`,
    `Device: ${input.device || "—"}`,
    `Screen: ${input.screen_resolution || "—"}`,
  ].join("\n");
}
