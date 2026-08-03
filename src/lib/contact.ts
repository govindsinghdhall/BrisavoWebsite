import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(120),
  email: z.string().trim().email("Invalid email").max(200),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Message is required").max(5000),
  plan: z.string().trim().max(80).optional().or(z.literal("")),
  intent: z.string().trim().max(80).optional().or(z.literal("")),
  addon: z.string().trim().max(80).optional().or(z.literal("")),
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
    ["Email", input.email],
    ["Company", input.company || "—"],
    ["Plan", input.plan || "—"],
    ["Intent", input.intent || "—"],
    ["Addon", input.addon || "—"],
  ];

  const metaRows = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:8px 12px;color:#64748b;font-size:13px;width:120px;">${escapeHtml(label)}</td>
        <td style="padding:8px 12px;color:#0f172a;font-size:14px;font-weight:600;">${escapeHtml(value)}</td>
      </tr>`
    )
    .join("");

  return `
  <div style="font-family:Inter,Segoe UI,Arial,sans-serif;background:#f8fafc;padding:24px;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;">
      <div style="padding:20px 24px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:#fff;">
        <h1 style="margin:0;font-size:18px;">New Brosavo contact enquiry</h1>
      </div>
      <div style="padding:8px 12px;">
        <table style="width:100%;border-collapse:collapse;">${metaRows}</table>
      </div>
      <div style="padding:8px 24px 24px;">
        <p style="margin:0 0 8px;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Message</p>
        <p style="margin:0;color:#0f172a;font-size:14px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(input.message)}</p>
      </div>
    </div>
  </div>`;
}
