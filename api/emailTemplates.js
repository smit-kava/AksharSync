/**
 * api/emailTemplates.js
 * Professional HTML email templates for AksharSync.
 * 4 templates + 2-day follow-up review email.
 */

export const BRAND = {
  blue:       '#7fd0ff',
  purple:     '#472187',
  darkBg:     '#060e1a',
  cardBg:     '#0a1628',
  siteUrl:    'https://aksharsync.com',
  reviewUrl:  'https://aksharsync.com/write-review',
  company:    'AksharSync',
  tagline:    'Retention Marketing Agency',
  supportEmail: 'support@aksharsync.com',
};

export function esc(s = '') {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
export function firstName(n = '') { return n.trim().split(/\s+/)[0] ?? n; }
export function year() { return new Date().getFullYear(); }
export function fmtDate() { return new Date().toUTCString(); }

// ─── Shared layout wrappers ───────────────────────────────────────────────────
function darkWrapper(content) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>AksharSync</title></head>
<body style="margin:0;padding:0;background:${BRAND.darkBg};font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.darkBg};padding:40px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
  <tr><td style="height:4px;background:linear-gradient(90deg,${BRAND.blue},${BRAND.purple});border-radius:4px 4px 0 0;"></td></tr>
  <tr><td style="background:${BRAND.cardBg};border:1px solid rgba(127,208,255,0.1);border-top:none;border-radius:0 0 20px 20px;">
    ${content}
  </td></tr>
  <tr><td style="padding:24px 0;text-align:center;">
    <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.2);line-height:1.8;">
      &copy; ${year()} ${BRAND.company} &nbsp;&bull;&nbsp; ${BRAND.tagline}<br>
      <a href="${BRAND.siteUrl}" style="color:rgba(127,208,255,0.4);text-decoration:none;">${BRAND.siteUrl}</a>
    </p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

function lightWrapper(content) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>AksharSync</title></head>
<body style="margin:0;padding:0;background:#f0f2f5;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f2f5;padding:40px 16px;">
<tr><td align="center">
<table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">
  <tr><td style="height:4px;background:linear-gradient(90deg,${BRAND.blue},${BRAND.purple});border-radius:4px 4px 0 0;"></td></tr>
  <tr><td style="background:#ffffff;border-radius:0 0 16px 16px;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    ${content}
  </td></tr>
  <tr><td style="padding:20px 0;text-align:center;">
    <p style="margin:0;font-size:11px;color:#aaa;">&copy; ${year()} ${BRAND.company} &nbsp;&bull;&nbsp; <a href="${BRAND.siteUrl}" style="color:#888;text-decoration:none;">${BRAND.siteUrl}</a></p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

// ─── Dark header block ────────────────────────────────────────────────────────
function darkHeader(badge = '') {
  return `<table width="100%" cellpadding="0" cellspacing="0">
  <tr><td style="background:linear-gradient(135deg,rgba(127,208,255,0.06),rgba(71,33,135,0.1));padding:32px 40px;border-bottom:1px solid rgba(127,208,255,0.08);">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td>
        <div style="font-size:22px;font-weight:900;letter-spacing:-0.5px;">
          <span style="color:${BRAND.blue};">Akshar</span><span style="color:#fff;">Sync</span>
        </div>
        <div style="font-size:10px;color:rgba(127,208,255,0.55);letter-spacing:1.5px;text-transform:uppercase;margin-top:3px;">${BRAND.tagline}</div>
      </td>
      ${badge ? `<td align="right"><span style="background:rgba(40,200,64,0.12);border:1px solid rgba(40,200,64,0.28);border-radius:20px;padding:5px 14px;font-size:11px;font-weight:700;color:#28c840;letter-spacing:0.5px;">${badge}</span></td>` : ''}
    </tr></table>
  </td></tr>
</table>`;
}

// ─── Light header block ───────────────────────────────────────────────────────
function lightHeader(label, title) {
  return `<table width="100%" cellpadding="0" cellspacing="0">
  <tr><td style="padding:32px 36px 24px;">
    <div style="font-size:10px;font-weight:700;color:${BRAND.purple};text-transform:uppercase;letter-spacing:1.5px;margin-bottom:6px;">${label}</div>
    <div style="font-size:22px;font-weight:800;color:#1a1a2e;line-height:1.2;">${title}</div>
  </td></tr>
</table>`;
}

// ─── Dark data row ────────────────────────────────────────────────────────────
function darkRow(label, value, color = '#fff', last = false) {
  return `<table width="100%" cellpadding="0" cellspacing="0" style="${last ? '' : 'margin-bottom:14px;'}">
  <tr>
    <td width="16" valign="top"><div style="width:3px;height:100%;background:${BRAND.blue};border-radius:2px;margin-top:3px;"></div></td>
    <td style="padding-left:12px;">
      <div style="font-size:10px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:1px;">${label}</div>
      <div style="font-size:14px;font-weight:600;color:${color};margin-top:3px;">${value}</div>
    </td>
  </tr>
</table>`;
}

// ─── Light table row ──────────────────────────────────────────────────────────
function lightRow(label, value, shaded = false) {
  return `<tr style="border-top:1px solid #eef0f5;${shaded ? 'background:#fafbff;' : ''}">
  <td style="padding:11px 20px;font-size:12px;font-weight:600;color:#888;width:110px;">${label}</td>
  <td style="padding:11px 20px;font-size:13px;color:#1a1a2e;">${value}</td>
</tr>`;
}

// ─── Dark CTA button ──────────────────────────────────────────────────────────
function darkBtn(href, text) {
  return `<table cellpadding="0" cellspacing="0" style="margin:0 auto;">
  <tr><td style="border-radius:10px;background:linear-gradient(135deg,${BRAND.blue},${BRAND.purple});">
    <a href="${href}" style="display:inline-block;padding:14px 36px;font-size:14px;font-weight:700;color:#060e1a;text-decoration:none;letter-spacing:0.3px;">${text}</a>
  </td></tr>
</table>`;
}

// ─── Step row ─────────────────────────────────────────────────────────────────
function step(n, title, desc, last = false) {
  return `<table width="100%" cellpadding="0" cellspacing="0" style="${last ? '' : 'margin-bottom:16px;'}">
  <tr>
    <td width="32" valign="top">
      <div style="width:26px;height:26px;background:linear-gradient(135deg,${BRAND.blue},${BRAND.purple});border-radius:50%;text-align:center;line-height:26px;font-size:12px;font-weight:800;color:#060e1a;">${n}</div>
    </td>
    <td style="padding-left:12px;">
      <div style="font-size:13px;font-weight:700;color:#fff;">${title}</div>
      <div style="font-size:12px;color:rgba(255,255,255,0.42);margin-top:3px;line-height:1.5;">${desc}</div>
    </td>
  </tr>
</table>`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEMPLATE 1 — Contact Inquiry: Customer "Thank You" (dark)
// ═══════════════════════════════════════════════════════════════════════════════
export function contactCustomerEmail({ name, email }) {
  const fn = esc(firstName(name));
  const body = `
    ${darkHeader('MESSAGE RECEIVED')}
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:40px 40px 28px;text-align:center;">
        <div style="width:64px;height:64px;background:linear-gradient(135deg,${BRAND.blue},${BRAND.purple});border-radius:50%;margin:0 auto 20px;display:flex;align-items:center;justify-content:center;">
          <div style="width:64px;height:64px;line-height:64px;text-align:center;font-size:28px;">&#x2709;</div>
        </div>
        <h1 style="margin:0 0 12px;font-size:24px;font-weight:800;color:#fff;letter-spacing:-0.3px;">Thanks for reaching out, ${fn}!</h1>
        <p style="margin:0 auto;font-size:14px;color:rgba(255,255,255,0.48);max-width:380px;line-height:1.75;">
          We've received your message and a member of our team will get back to you personally within <strong style="color:${BRAND.blue};">24 hours</strong>.
        </p>
      </td></tr>
    </table>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:0 40px 28px;">
        <div style="border-top:1px solid rgba(255,255,255,0.06);"></div>
      </td></tr>
    </table>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:0 40px 28px;">
        <div style="background:rgba(71,33,135,0.08);border:1px solid rgba(71,33,135,0.18);border-radius:14px;padding:24px;">
          <div style="font-size:10px;font-weight:700;color:rgba(167,139,250,0.7);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:18px;">What Happens Next</div>
          ${step(1, 'Team review', 'We read every message personally — no bots, no templates.')}
          ${step(2, 'Personal reply', 'Expect a reply from our team within one business day.')}
          ${step(3, 'Strategy session', 'If it\'s a good fit, we\'ll invite you for a free 30-min audit call.', true)}
        </div>
      </td></tr>
    </table>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:0 40px 36px;text-align:center;">
        ${darkBtn(BRAND.siteUrl, 'Visit AksharSync.com \u2192')}
        <p style="margin:16px 0 0;font-size:12px;color:rgba(255,255,255,0.28);">
          Questions? Reply directly to this email.
        </p>
      </td></tr>
    </table>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.05);">
        <table width="100%" cellpadding="0" cellspacing="0"><tr>
          <td><span style="font-size:12px;font-weight:700;color:rgba(255,255,255,0.25);">${BRAND.company}</span></td>
          <td align="right"><a href="mailto:${BRAND.supportEmail}" style="font-size:11px;color:rgba(127,208,255,0.4);text-decoration:none;">${BRAND.supportEmail}</a></td>
        </tr></table>
      </td></tr>
    </table>`;
  return {
    html: darkWrapper(body),
    text: `Hi ${firstName(name)},\n\nThank you for reaching out to ${BRAND.company}!\n\nWe've received your message and will get back to you within 24 hours.\n\nQuestions? Reply to this email.\n\n— The ${BRAND.company} Team\n${BRAND.siteUrl}`,
    subject: `We got your message, ${firstName(name)}! — ${BRAND.company}`,
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEMPLATE 2 — Contact Inquiry: Admin Notification (light)
// ═══════════════════════════════════════════════════════════════════════════════
export function contactAdminEmail({ name, email, message }) {
  const fn = esc(firstName(name));
  const body = `
    ${lightHeader('New Contact Inquiry', `Message from ${esc(name)}`)}
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:0 36px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eef0f5;border-radius:10px;overflow:hidden;">
          <tr style="background:#f8f9fc;">
            <td style="padding:10px 20px;font-size:11px;font-weight:700;text-transform:uppercase;color:#aaa;width:110px;">Field</td>
            <td style="padding:10px 20px;font-size:11px;font-weight:700;text-transform:uppercase;color:#aaa;">Value</td>
          </tr>
          ${lightRow('Name', `<strong>${esc(name)}</strong>`)}
          ${lightRow('Email', `<a href="mailto:${esc(email)}" style="color:${BRAND.purple};font-weight:700;text-decoration:none;">${esc(email)}</a>`, true)}
          ${lightRow('Message', esc(message) || '<span style="color:#ccc;">—</span>')}
          ${lightRow('Received', fmtDate(), true)}
        </table>
      </td></tr>
    </table>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:0 36px 32px;text-align:center;">
        <a href="mailto:${esc(email)}?subject=Re:%20Your%20AksharSync%20Inquiry"
           style="display:inline-block;background:linear-gradient(135deg,${BRAND.blue},${BRAND.purple});color:#fff;font-size:13px;font-weight:700;text-decoration:none;padding:13px 32px;border-radius:9px;letter-spacing:0.3px;">
          Reply to ${fn} \u2192
        </a>
      </td></tr>
    </table>`;
  return {
    html: lightWrapper(body),
    text: `New Contact Inquiry\n\nName: ${name}\nEmail: ${email}\nMessage: ${message || '—'}\nReceived: ${fmtDate()}`,
    subject: `New Contact Inquiry — ${name}`,
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEMPLATE 3 — Booking: Customer Confirmation (dark)
// ═══════════════════════════════════════════════════════════════════════════════
export function bookingCustomerEmail({ name, email, bookingDate, bookingTime, website }) {
  const fn = esc(firstName(name));
  const site = website ? esc(website) : '—';
  const body = `
    ${darkHeader('BOOKING CONFIRMED')}
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:36px 40px 24px;text-align:center;">
        <h1 style="margin:0 0 10px;font-size:24px;font-weight:800;color:#fff;">You're booked, ${fn}!</h1>
        <p style="margin:0 auto;font-size:14px;color:rgba(255,255,255,0.45);max-width:380px;line-height:1.75;">
          Your free Retention Audit call has been scheduled. We're looking forward to showing you exactly where you're leaving money on the table.
        </p>
      </td></tr>
    </table>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:0 40px 28px;">
        <div style="background:rgba(127,208,255,0.05);border:1px solid rgba(127,208,255,0.15);border-radius:14px;padding:28px;">
          <div style="font-size:10px;font-weight:700;color:rgba(127,208,255,0.6);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:20px;">Your Booking Details</div>
          ${darkRow('Date', esc(bookingDate), BRAND.blue)}
          ${darkRow('Time', esc(bookingTime), BRAND.blue)}
          ${darkRow('Format', '30-min Google Meet Call', '#fff')}
          ${darkRow('Website', site, '#fff', true)}
        </div>
      </td></tr>
    </table>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:0 40px 28px;">
        <div style="background:rgba(71,33,135,0.08);border:1px solid rgba(71,33,135,0.18);border-radius:14px;padding:24px;">
          <div style="font-size:10px;font-weight:700;color:rgba(167,139,250,0.7);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:18px;">What to Expect</div>
          ${step(1, 'Calendar invite', 'We\'ll send a Google Meet link to your email before the call.')}
          ${step(2, 'Retention deep-dive', 'We\'ll analyse your current lifecycle strategy live on the call.')}
          ${step(3, 'Actionable roadmap', 'Walk away with a clear 90-day plan to grow LTV and reduce churn.', true)}
        </div>
      </td></tr>
    </table>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:0 40px 36px;text-align:center;">
        ${darkBtn(BRAND.siteUrl, 'Visit AksharSync.com \u2192')}
        <p style="margin:16px 0 0;font-size:12px;color:rgba(255,255,255,0.28);">Need to reschedule? Just reply to this email.</p>
      </td></tr>
    </table>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.05);">
        <table width="100%" cellpadding="0" cellspacing="0"><tr>
          <td><span style="font-size:12px;font-weight:700;color:rgba(255,255,255,0.25);">${BRAND.company}</span></td>
          <td align="right"><a href="mailto:${BRAND.supportEmail}" style="font-size:11px;color:rgba(127,208,255,0.4);text-decoration:none;">${BRAND.supportEmail}</a></td>
        </tr></table>
      </td></tr>
    </table>`;
  return {
    html: darkWrapper(body),
    text: `Hi ${firstName(name)},\n\nYour Retention Audit call is confirmed!\n\nDate: ${bookingDate}\nTime: ${bookingTime}\nFormat: 30-min Google Meet\n\nWe'll send the calendar invite shortly.\n\n— The ${BRAND.company} Team\n${BRAND.siteUrl}`,
    subject: `Your Retention Audit is Confirmed — ${bookingDate}`,
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEMPLATE 4 — Booking: Admin Notification (light)
// ═══════════════════════════════════════════════════════════════════════════════
export function bookingAdminEmail({ name, email, bookingDate, bookingTime, phone, countryCode, website, message }) {
  const fn = esc(firstName(name));
  const body = `
    ${lightHeader('New Booking Alert', `Audit Booked by ${esc(name)}`)}
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:0 36px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eef0f5;border-radius:10px;overflow:hidden;">
          <tr style="background:#f8f9fc;">
            <td style="padding:10px 20px;font-size:11px;font-weight:700;text-transform:uppercase;color:#aaa;width:110px;">Field</td>
            <td style="padding:10px 20px;font-size:11px;font-weight:700;text-transform:uppercase;color:#aaa;">Value</td>
          </tr>
          ${lightRow('Name', `<strong>${esc(name)}</strong>`)}
          ${lightRow('Email', `<a href="mailto:${esc(email)}" style="color:${BRAND.purple};font-weight:700;text-decoration:none;">${esc(email)}</a>`, true)}
          ${lightRow('Phone', phone ? `${esc(countryCode)} ${esc(phone)}` : '—')}
          ${lightRow('Website', website ? `<a href="https://${esc(website)}" style="color:#555;">${esc(website)}</a>` : '—', true)}
          ${lightRow('Date', `<strong style="color:${BRAND.purple};">${esc(bookingDate)}</strong>`)}
          ${lightRow('Time', `<strong>${esc(bookingTime)}</strong>`, true)}
          ${lightRow('Notes', esc(message) || '—')}
          ${lightRow('Received', fmtDate(), true)}
        </table>
      </td></tr>
    </table>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:0 36px 32px;text-align:center;">
        <a href="mailto:${esc(email)}?subject=Your%20AksharSync%20Audit%20%E2%80%94%20Calendar%20Invite"
           style="display:inline-block;background:linear-gradient(135deg,${BRAND.blue},${BRAND.purple});color:#fff;font-size:13px;font-weight:700;text-decoration:none;padding:13px 32px;border-radius:9px;letter-spacing:0.3px;">
          Send Calendar Invite to ${fn} \u2192
        </a>
      </td></tr>
    </table>`;
  return {
    html: lightWrapper(body),
    text: `New Booking!\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone ? `${countryCode} ${phone}` : '—'}\nWebsite: ${website || '—'}\nDate: ${bookingDate}\nTime: ${bookingTime}\nNotes: ${message || '—'}\nReceived: ${fmtDate()}`,
    subject: `New Audit Booking — ${name} on ${bookingDate}`,
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEMPLATE 5 — 2-Day Follow-up: Review Request (dark)
// ═══════════════════════════════════════════════════════════════════════════════
export function reviewFollowUpEmail({ name }) {
  const fn = esc(firstName(name));
  const body = `
    ${darkHeader()}
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:36px 40px 28px;text-align:center;">
        <h1 style="margin:0 0 12px;font-size:22px;font-weight:800;color:#fff;">How did we do, ${fn}?</h1>
        <p style="margin:0 auto;font-size:14px;color:rgba(255,255,255,0.45);max-width:380px;line-height:1.75;">
          It's been a couple of days since you connected with us. We'd love to hear about your experience — it takes less than 60 seconds.
        </p>
      </td></tr>
    </table>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:0 40px 32px;text-align:center;">
        <div style="background:rgba(127,208,255,0.04);border:1px solid rgba(127,208,255,0.12);border-radius:14px;padding:28px;margin-bottom:28px;">
          <div style="font-size:28px;margin-bottom:12px;">&#11088;</div>
          <p style="margin:0 0 20px;font-size:14px;color:rgba(255,255,255,0.55);line-height:1.7;">
            Your honest review helps other brands discover AksharSync — and helps us keep improving.
          </p>
          ${darkBtn(BRAND.reviewUrl, 'Leave a Quick Review \u2192')}
        </div>
        <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.25);line-height:1.7;">
          No account needed. Anonymous reviews welcome.<br>
          Don't want emails? <a href="mailto:${BRAND.supportEmail}?subject=Unsubscribe" style="color:rgba(127,208,255,0.35);text-decoration:none;">Unsubscribe here</a>.
        </p>
      </td></tr>
    </table>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.05);">
        <table width="100%" cellpadding="0" cellspacing="0"><tr>
          <td><span style="font-size:12px;font-weight:700;color:rgba(255,255,255,0.25);">${BRAND.company}</span></td>
          <td align="right"><a href="${BRAND.reviewUrl}" style="font-size:11px;color:rgba(127,208,255,0.4);text-decoration:none;">Write a Review</a></td>
        </tr></table>
      </td></tr>
    </table>`;
  return {
    html: darkWrapper(body),
    text: `Hi ${firstName(name)},\n\nHow did we do?\n\nWe'd love to hear about your experience with ${BRAND.company}. It takes less than 60 seconds:\n\n${BRAND.reviewUrl}\n\nThank you!\n— The ${BRAND.company} Team`,
    subject: `How was your AksharSync experience, ${firstName(name)}?`,
  };
}
