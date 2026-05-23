/**
 * @file emailTemplates.ts
 * @description AksharSync — Email Template Builder
 *
 * Provides strongly-typed builder functions for every transactional email
 * sent by the consultation booking flow:
 *
 *   • buildUserConfirmationEmail  — premium dark-mode HTML + plain-text
 *   • buildAdminNotificationEmail — clean light-mode HTML + plain-text
 *
 * ─────────────────────────────────────────────────────────────────────────
 * NOTE: This TypeScript file is the canonical design source for the
 * templates. The PHP runtime uses `emailTemplates.php` (auto-generated
 * from this file) so that PHPMailer can include it directly.
 * ─────────────────────────────────────────────────────────────────────────
 */

// ─── Brand Tokens ────────────────────────────────────────────────────────────

const BRAND = {
  primaryBlue:   '#7fd0ff',
  primaryPurple: '#472187',
  darkBg:        '#060e1a',
  cardBg:        '#0a1628',
  siteUrl:       'https://aksharsync.com',
  supportEmail:  'support@aksharsync.com',
  companyName:   'AksharSync',
  tagline:       'Retention Marketing Agency',
} as const;

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ContactFormData {
  /** Full name submitted by the user */
  name:         string;
  /** User's email address */
  email:        string;
  /** Phone number (digits only, no country code) */
  phone:        string;
  /** Dialing country code, e.g. "+91" */
  countryCode:  string;
  /** Optional website URL */
  website:      string;
}

export interface EmailPayload {
  subject:   string;
  htmlBody:  string;
  plainBody: string;
}

export interface DualEmailPayload {
  user:  EmailPayload;
  admin: EmailPayload;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * HTML-escape a string to prevent injection in email templates.
 * Mirrors PHP's `htmlspecialchars()`.
 */
function escHtml(str: string): string {
  return str
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#039;');
}

/** Returns the first word of a full name. */
function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] ?? fullName;
}

/** Formats the current year as a 4-digit string. */
function currentYear(): string {
  return new Date().getFullYear().toString();
}

/** Formats a UTC timestamp in a human-readable form. */
function receivedAt(): string {
  return new Date().toUTCString();
}

// ─── Shared Sub-template: Gradient Step Badge ─────────────────────────────────

function stepBadge(n: number): string {
  return `
    <div style="width:24px;height:24px;background:linear-gradient(135deg,${BRAND.primaryBlue},${BRAND.primaryPurple});
                border-radius:50%;text-align:center;line-height:24px;font-size:11px;font-weight:800;color:#fff;">${n}</div>`;
}

// ─── Shared Sub-template: Detail Row (dark card) ──────────────────────────────

interface DetailRowOptions {
  icon:         string;
  label:        string;
  value:        string;
  valueColor?:  string;
  isLast?:      boolean;
}

function darkDetailRow({ icon, label, value, valueColor = '#ffffff', isLast = false }: DetailRowOptions): string {
  const marginStyle = isLast ? '' : 'margin-bottom:14px;';
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="${marginStyle}">
      <tr>
        <td width="20" valign="top" style="padding-top:1px;">
          <span style="font-size:14px;">${icon}</span>
        </td>
        <td style="padding-left:10px;">
          <div style="font-size:10px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:1px;">${label}</div>
          <div style="font-size:14px;font-weight:600;color:${valueColor};margin-top:2px;">${value}</div>
        </td>
      </tr>
    </table>`;
}

// ─── Template 1: User Confirmation (Premium Dark) ────────────────────────────

/**
 * Builds the dark-themed confirmation email sent to the user after they
 * submit a consultation request.
 */
function buildUserConfirmationHtml(data: ContactFormData): string {
  const fn        = escHtml(firstName(data.name));
  const name      = escHtml(data.name);
  const email     = escHtml(data.email);
  const phone     = data.phone
    ? escHtml(`${data.countryCode} ${data.phone}`)
    : '—';
  const website   = data.website ? escHtml(data.website) : '—';
  const year      = currentYear();

  const details = [
    darkDetailRow({ icon: '👤', label: 'Name',    value: name }),
    darkDetailRow({ icon: '✉️', label: 'Email',   value: email,  valueColor: BRAND.primaryBlue }),
    darkDetailRow({ icon: '📞', label: 'Phone',   value: phone }),
    darkDetailRow({ icon: '🌐', label: 'Website', value: website, isLast: true }),
  ].join('\n');

  return /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Consultation Confirmed — ${BRAND.companyName}</title>
</head>
<body style="margin:0;padding:0;background-color:${BRAND.darkBg};font-family:'Segoe UI',Arial,sans-serif;">

<!-- ═══ WRAPPER ═══════════════════════════════════════════════════════════ -->
<table width="100%" cellpadding="0" cellspacing="0"
       style="background-color:${BRAND.darkBg};padding:40px 16px;">
  <tr><td align="center">
  <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

    <!-- TOP ACCENT BAR -->
    <tr>
      <td style="height:4px;background:linear-gradient(90deg,${BRAND.primaryBlue},${BRAND.primaryPurple});
                 border-radius:4px 4px 0 0;"></td>
    </tr>

    <!-- ═══ CARD ══════════════════════════════════════════════════════════ -->
    <tr>
      <td style="background:${BRAND.cardBg};border:1px solid rgba(127,208,255,0.12);
                 border-top:none;border-radius:0 0 20px 20px;padding:0;">

        <!-- HEADER -->
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="background:linear-gradient(135deg,rgba(127,208,255,0.07) 0%,rgba(71,33,135,0.12) 100%);
                       padding:36px 40px;border-bottom:1px solid rgba(127,208,255,0.08);">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-size:22px;font-weight:900;letter-spacing:-0.5px;">
                      <span style="color:${BRAND.primaryBlue};">Akshar</span><span style="color:#ffffff;">Sync</span>
                    </div>
                    <div style="font-size:11px;color:rgba(127,208,255,0.6);margin-top:2px;
                                letter-spacing:1px;text-transform:uppercase;">${BRAND.tagline}</div>
                  </td>
                  <td align="right">
                    <span style="display:inline-block;background:rgba(40,200,64,0.12);
                                 border:1px solid rgba(40,200,64,0.3);border-radius:20px;
                                 padding:6px 14px;font-size:11px;font-weight:700;
                                 color:#28c840;letter-spacing:0.5px;">
                      ✓&nbsp;CONFIRMED
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- HERO -->
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:40px 40px 32px;text-align:center;">
              <div style="width:72px;height:72px;
                          background:linear-gradient(135deg,${BRAND.primaryBlue},${BRAND.primaryPurple});
                          border-radius:50%;margin:0 auto 20px;line-height:72px;text-align:center;">
                <span style="font-size:32px;line-height:72px;">📅</span>
              </div>
              <h1 style="margin:0 0 10px;font-size:26px;font-weight:800;color:#ffffff;
                         letter-spacing:-0.5px;line-height:1.2;">
                Consultation Booked!
              </h1>
              <p style="margin:0 auto;font-size:15px;color:rgba(255,255,255,0.5);
                        line-height:1.6;max-width:400px;">
                Hi <strong style="color:${BRAND.primaryBlue};">${fn}</strong> 👋 —
                we've received your request and we're excited to connect with you!
              </p>
            </td>
          </tr>
        </table>

        <!-- DIVIDER -->
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:0 40px;">
              <div style="height:1px;background:rgba(255,255,255,0.06);"></div>
            </td>
          </tr>
        </table>

        <!-- DETAILS CARD -->
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:32px 40px;">
              <div style="background:rgba(127,208,255,0.04);border:1px solid rgba(127,208,255,0.1);
                          border-radius:14px;padding:24px;">
                <div style="font-size:10px;font-weight:700;color:rgba(127,208,255,0.6);
                             letter-spacing:1.5px;text-transform:uppercase;margin-bottom:18px;">
                  Your Submission Details
                </div>
                ${details}
              </div>
            </td>
          </tr>
        </table>

        <!-- WHAT HAPPENS NEXT -->
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:0 40px 32px;">
              <div style="background:rgba(71,33,135,0.08);border:1px solid rgba(71,33,135,0.2);
                          border-radius:14px;padding:24px;">
                <div style="font-size:10px;font-weight:700;color:rgba(167,139,250,0.8);
                             letter-spacing:1.5px;text-transform:uppercase;margin-bottom:16px;">
                  📋 What Happens Next
                </div>

                <!-- Step 1 -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
                  <tr>
                    <td width="28" valign="top">${stepBadge(1)}</td>
                    <td style="padding-left:12px;">
                      <div style="font-size:13px;font-weight:600;color:#fff;">We'll review your details</div>
                      <div style="font-size:12px;color:rgba(255,255,255,0.45);margin-top:2px;">
                        Our team will analyse your brand within 24 hours.
                      </div>
                    </td>
                  </tr>
                </table>

                <!-- Step 2 -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
                  <tr>
                    <td width="28" valign="top">${stepBadge(2)}</td>
                    <td style="padding-left:12px;">
                      <div style="font-size:13px;font-weight:600;color:#fff;">Confirm your call slot</div>
                      <div style="font-size:12px;color:rgba(255,255,255,0.45);margin-top:2px;">
                        We'll send you a calendar invite with a Google Meet link.
                      </div>
                    </td>
                  </tr>
                </table>

                <!-- Step 3 -->
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td width="28" valign="top">${stepBadge(3)}</td>
                    <td style="padding-left:12px;">
                      <div style="font-size:13px;font-weight:600;color:#fff;">30-min growth strategy call</div>
                      <div style="font-size:12px;color:rgba(255,255,255,0.45);margin-top:2px;">
                        Walk away with a clear 90-day retention roadmap.
                      </div>
                    </td>
                  </tr>
                </table>

              </div>
            </td>
          </tr>
        </table>

        <!-- CTA BUTTON -->
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:0 40px 36px;text-align:center;">
              <a href="${BRAND.siteUrl}"
                 style="display:inline-block;background:linear-gradient(135deg,${BRAND.primaryBlue} 0%,${BRAND.primaryPurple} 100%);
                        color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;
                        padding:14px 36px;border-radius:10px;letter-spacing:0.3px;">
                Visit AksharSync.com →
              </a>
              <p style="margin:16px 0 0;font-size:12px;color:rgba(255,255,255,0.3);">
                Questions? Reply to this email — we're always here to help.
              </p>
            </td>
          </tr>
        </table>

        <!-- FOOTER -->
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="background:rgba(255,255,255,0.02);border-top:1px solid rgba(255,255,255,0.05);
                       padding:20px 40px;border-radius:0 0 20px 20px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size:13px;font-weight:700;color:rgba(255,255,255,0.3);">AksharSync</span>
                    <span style="font-size:11px;color:rgba(255,255,255,0.2);margin-left:8px;">${BRAND.tagline}</span>
                  </td>
                  <td align="right">
                    <a href="${BRAND.siteUrl}"
                       style="font-size:11px;color:rgba(127,208,255,0.5);text-decoration:none;">aksharsync.com</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

      </td>
    </tr><!-- /CARD -->

    <!-- BOTTOM NOTE -->
    <tr>
      <td style="padding:20px 0;text-align:center;">
        <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.2);line-height:1.6;">
          You're receiving this because you submitted a consultation request at aksharsync.com.<br>
          &copy; ${year} ${BRAND.companyName}. All rights reserved.
        </p>
      </td>
    </tr>

  </table>
  </td></tr>
</table>

</body>
</html>`;
}

function buildUserConfirmationPlain(data: ContactFormData): string {
  const fn      = firstName(data.name);
  const phone   = data.phone ? `${data.countryCode} ${data.phone}` : '—';
  const website = data.website || '—';

  return [
    `Hi ${fn},`,
    '',
    `Your ${BRAND.companyName} consultation request has been received!`,
    '',
    "Here's what you submitted:",
    `  Name:    ${data.name}`,
    `  Email:   ${data.email}`,
    `  Phone:   ${phone}`,
    `  Website: ${website}`,
    '',
    'What happens next:',
    '  1. Our team will review your details within 24 hours.',
    "  2. We'll send a calendar invite with a Google Meet link.",
    '  3. Enjoy a 30-min growth strategy call with our experts.',
    '',
    'Questions? Simply reply to this email.',
    '',
    `— The ${BRAND.companyName} Team`,
    BRAND.siteUrl,
  ].join('\n');
}

// ─── Template 2: Admin Notification (Clean Light) ────────────────────────────

/**
 * Builds the light-themed lead alert email sent to the admin inbox whenever
 * a new consultation request comes in.
 */
function buildAdminNotificationHtml(data: ContactFormData, receivedTimestamp: string): string {
  const name    = escHtml(data.name);
  const fn      = escHtml(firstName(data.name));
  const email   = escHtml(data.email);
  const phone   = data.phone ? escHtml(`${data.countryCode} ${data.phone}`) : '—';
  const website = data.website ? escHtml(data.website) : '—';
  const year    = currentYear();

  const tableRow = (
    label: string,
    value: string,
    shaded = false,
    valueStyle = 'font-size:14px;font-weight:700;color:#1a1a2e;',
  ): string => `
    <tr style="border-top:1px solid #eef0f5;${shaded ? 'background:#fafbff;' : ''}">
      <td style="padding:12px 16px;font-size:12px;font-weight:600;color:#666;">${label}</td>
      <td style="padding:12px 16px;${valueStyle}">${value}</td>
    </tr>`;

  return /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>New Lead — ${BRAND.companyName}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:'Segoe UI',Arial,sans-serif;">

<!-- ═══ WRAPPER ═══════════════════════════════════════════════════════════ -->
<table width="100%" cellpadding="0" cellspacing="0"
       style="background:#f4f4f4;padding:32px 16px;">
  <tr><td align="center">
  <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

    <!-- TOP BAR -->
    <tr>
      <td style="height:4px;background:linear-gradient(90deg,${BRAND.primaryBlue},${BRAND.primaryPurple});
                 border-radius:4px 4px 0 0;"></td>
    </tr>

    <!-- ═══ CARD ══════════════════════════════════════════════════════════ -->
    <tr>
      <td style="background:#ffffff;border-radius:0 0 16px 16px;padding:32px 36px;
                 box-shadow:0 4px 20px rgba(0,0,0,0.06);">

        <!-- HEADER -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
          <tr>
            <td>
              <div style="font-size:11px;font-weight:700;color:${BRAND.primaryPurple};
                           text-transform:uppercase;letter-spacing:1.5px;margin-bottom:4px;">
                New Lead Alert
              </div>
              <h2 style="margin:0;font-size:20px;font-weight:800;color:#1a1a2e;">
                Consultation Request
              </h2>
            </td>
            <td align="right" valign="top">
              <span style="display:inline-block;background:#f0f9ff;border:1px solid ${BRAND.primaryBlue};
                           border-radius:20px;padding:5px 12px;font-size:11px;font-weight:700;
                           color:${BRAND.primaryPurple};">
                🔔 Action Required
              </span>
            </td>
          </tr>
        </table>

        <!-- DETAILS TABLE -->
        <table width="100%" cellpadding="0" cellspacing="0"
               style="border:1px solid #eef0f5;border-radius:10px;overflow:hidden;margin-bottom:24px;">
          <tr style="background:#f8f9fc;">
            <td style="padding:10px 16px;font-size:11px;font-weight:700;text-transform:uppercase;
                       letter-spacing:1px;color:#888;width:90px;">Field</td>
            <td style="padding:10px 16px;font-size:11px;font-weight:700;text-transform:uppercase;
                       letter-spacing:1px;color:#888;">Value</td>
          </tr>
          ${tableRow('👤 Name',      name,    false)}
          ${tableRow('✉️ Email',     email,   true,  `font-size:14px;font-weight:700;color:${BRAND.primaryPurple};`)}
          ${tableRow('📞 Phone',     phone,   false, 'font-size:14px;color:#1a1a2e;')}
          ${tableRow('🌐 Website',   website, true,  'font-size:14px;color:#1a1a2e;')}
          ${tableRow('🕐 Received',  receivedTimestamp, false, 'font-size:13px;color:#888;')}
        </table>

        <!-- QUICK REPLY CTA -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
          <tr>
            <td align="center">
              <a href="mailto:${email}?subject=Re:%20Your%20AksharSync%20Consultation"
                 style="display:inline-block;background:linear-gradient(135deg,${BRAND.primaryBlue},${BRAND.primaryPurple});
                        color:#fff;font-size:13px;font-weight:700;text-decoration:none;
                        padding:12px 28px;border-radius:8px;">
                Reply to ${fn} →
              </a>
            </td>
          </tr>
        </table>

        <!-- FOOTER NOTE -->
        <p style="margin:0;font-size:11px;color:#bbb;text-align:center;line-height:1.6;">
          Sent from aksharsync.com contact form &nbsp;·&nbsp; ${year} ${BRAND.companyName}
        </p>

      </td>
    </tr><!-- /CARD -->

  </table>
  </td></tr>
</table>

</body>
</html>`;
}

function buildAdminNotificationPlain(data: ContactFormData, receivedTimestamp: string): string {
  const phone   = data.phone ? `${data.countryCode} ${data.phone}` : '—';
  const website = data.website || '—';

  return [
    'New Consultation Request',
    '',
    `Name:     ${data.name}`,
    `Email:    ${data.email}`,
    `Phone:    ${phone}`,
    `Website:  ${website}`,
    `Received: ${receivedTimestamp}`,
  ].join('\n');
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Generates the user-facing confirmation email payload.
 *
 * @example
 * const { subject, htmlBody, plainBody } = buildUserConfirmationEmail(formData);
 */
export function buildUserConfirmationEmail(data: ContactFormData): EmailPayload {
  return {
    subject:   `✅ Your ${BRAND.companyName} Consultation is Confirmed!`,
    htmlBody:  buildUserConfirmationHtml(data),
    plainBody: buildUserConfirmationPlain(data),
  };
}

/**
 * Generates the admin lead-alert email payload.
 *
 * @param data               - Validated contact form data.
 * @param receivedTimestamp  - Human-readable timestamp string (e.g. from PHP `date()`).
 *
 * @example
 * const { subject, htmlBody, plainBody } = buildAdminNotificationEmail(formData, '22 May 2026 09:45 UTC');
 */
export function buildAdminNotificationEmail(
  data: ContactFormData,
  receivedTimestamp: string = receivedAt(),
): EmailPayload {
  return {
    subject:   `🔔 New Consultation Request — ${data.name}`,
    htmlBody:  buildAdminNotificationHtml(data, receivedTimestamp),
    plainBody: buildAdminNotificationPlain(data, receivedTimestamp),
  };
}

/**
 * Convenience function: generates both email payloads in one call.
 *
 * @example
 * const { user, admin } = buildConsultationEmails(formData);
 * await mailer.send({ to: formData.email, ...user });
 * await mailer.send({ to: ADMIN_EMAIL,    ...admin });
 */
export function buildConsultationEmails(
  data: ContactFormData,
  receivedTimestamp?: string,
): DualEmailPayload {
  return {
    user:  buildUserConfirmationEmail(data),
    admin: buildAdminNotificationEmail(data, receivedTimestamp),
  };
}
