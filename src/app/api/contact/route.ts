import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  buildContactEmailHtml,
  contactFormSchema,
} from "@/lib/contact";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail =
      process.env.CONTACT_TO_EMAIL || "hellobrosavo@gmail.com";
    const fromEmail =
      process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: parsed.error.issues[0]?.message || "Validation failed",
        },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: `Brosavo <${fromEmail}>`,
      to: [toEmail],
      replyTo: data.email,
      subject: `New contact from ${data.name}${data.company ? ` (${data.company})` : ""}`,
      html: buildContactEmailHtml(data),
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Company: ${data.company || "—"}`,
        `Plan: ${data.plan || "—"}`,
        `Intent: ${data.intent || "—"}`,
        `Addon: ${data.addon || "—"}`,
        "",
        "Message:",
        data.message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
