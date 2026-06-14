"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

function getEmailHtml(name: string, email: string, budget: string, details: string) {
  const timestamp = Date.now().toString(36).toUpperCase();
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Project Request — ${name}</title>
</head>
<body style="margin:0;padding:0;background:#1c1c1c;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#1c1c1c;padding:40px 20px;">
<tr><td align="center">
<table width="580" cellpadding="0" cellspacing="0" style="background:#0d0d0d;border:1px solid #2a2a2a;">

  <!-- HEADER -->
  <tr><td style="background:#0d0d0d;border-bottom:1px solid #2a2a2a;padding:36px 40px;">
    <p style="margin:0 0 16px;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.35em;color:#555;text-transform:uppercase;">PREETHAM-ANANTHU.VERCEL.APP — PORTFOLIO</p>
    <span style="display:inline-block;background:#D4FF00;color:#030303;font-family:'Courier New',monospace;font-size:9px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;padding:5px 12px;margin-bottom:20px;">⬤ NEW REQUEST</span>
    <h1 style="margin:0;font-size:40px;font-weight:800;color:#F5F5F5;text-transform:uppercase;letter-spacing:-0.03em;line-height:1.0;font-family:Arial Black,Arial,sans-serif;">NEW<br/>PROJECT<br/><span style="color:#D4FF00;">INQUIRY</span></h1>
  </td></tr>

  <!-- FIELDS -->
  <tr><td style="padding:32px 40px;">

    <!-- Name + Budget grid -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#2a2a2a;border-collapse:separate;border-spacing:1px;margin-bottom:1px;">
      <tr>
        <td style="background:#0d0d0d;padding:16px 18px;width:49%;">
          <p style="margin:0 0 7px;font-family:'Courier New',monospace;font-size:8px;letter-spacing:0.35em;text-transform:uppercase;color:#555;">CLIENT NAME</p>
          <p style="margin:0;font-size:16px;color:#E8E8E8;font-family:Arial,Helvetica,sans-serif;">${name}</p>
        </td>
        <td style="background:#0d0d0d;padding:16px 18px;width:49%;">
          <p style="margin:0 0 7px;font-family:'Courier New',monospace;font-size:8px;letter-spacing:0.35em;text-transform:uppercase;color:#555;">BUDGET RANGE</p>
          <p style="margin:0;font-size:16px;color:#D4FF00;font-weight:600;font-family:Arial,Helvetica,sans-serif;">${budget}</p>
        </td>
      </tr>
    </table>

    <!-- Email -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr>
        <td style="background:#0d0d0d;border-top:1px solid #1a1a1a;padding:16px 18px;">
          <p style="margin:0 0 7px;font-family:'Courier New',monospace;font-size:8px;letter-spacing:0.35em;text-transform:uppercase;color:#555;">EMAIL ADDRESS</p>
          <p style="margin:0;font-size:16px;color:#E8E8E8;font-family:Arial,Helvetica,sans-serif;">${email}</p>
        </td>
      </tr>
    </table>

    <!-- Details -->
    <div style="background:#111111;border:1px solid #2a2a2a;border-left:3px solid #D4FF00;padding:20px 22px;margin-bottom:24px;">
      <p style="margin:0 0 12px;font-family:'Courier New',monospace;font-size:8px;letter-spacing:0.35em;text-transform:uppercase;color:#555;">// PROJECT DETAILS</p>
      <p style="margin:0;font-size:15px;color:#C8C8C8;line-height:1.75;font-family:Arial,Helvetica,sans-serif;">${details}</p>
    </div>

    <!-- Meta -->
    <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #1e1e1e;padding-top:20px;">
      <tr>
        <td style="font-family:'Courier New',monospace;font-size:8px;letter-spacing:0.2em;color:#3a3a3a;text-transform:uppercase;">REF: #PRJ-${timestamp}</td>
        <td align="right" style="font-family:'Courier New',monospace;font-size:8px;letter-spacing:0.2em;color:#3a3a3a;text-transform:uppercase;">PORTFOLIO CONTACT FORM</td>
      </tr>
    </table>

  </td></tr>

  <!-- FOOTER -->
  <tr><td style="background:#030303;border-top:1px solid #1e1e1e;padding:20px 40px;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="font-family:'Courier New',monospace;font-size:8px;letter-spacing:0.2em;color:#3a3a3a;text-transform:uppercase;">PREETHAM — FRONTEND ARCHITECT</td>
        <td align="right"><a href="https://preetham-ananthu.vercel.app" style="font-family:'Courier New',monospace;font-size:8px;letter-spacing:0.2em;color:#D4FF00;text-decoration:none;text-transform:uppercase;">PREETHAM-ANANTHU.VERCEL.APP ↗</a></td>
      </tr>
    </table>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const details = formData.get("details") as string;
  const budget = formData.get("budget") as string;

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.RESEND_FROM_EMAIL || "uni.preetham@gmail.com",
      subject: `[NEW REQUEST] ${name} — ${budget}`,
      text: `Name: ${name}\nEmail: ${email}\nBudget: ${budget}\nDetails: ${details}`,
      html: getEmailHtml(name, email, budget, details),
    });
    console.log("Resend success:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Resend error:", error);
    return { success: false, error };
  }
}