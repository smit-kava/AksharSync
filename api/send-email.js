/**
 * api/send-email.js
 * Local dev email handler — imports professional templates from emailTemplates.js
 */

import nodemailer from 'nodemailer';
import {
  contactCustomerEmail,
  contactAdminEmail,
  bookingCustomerEmail,
  bookingAdminEmail,
  reviewFollowUpEmail,
  firstName,
} from './emailTemplates.js';

// ─── Build transporter from .env.local ───────────────────────────────────────
function createTransporter() {
  return nodemailer.createTransport({
    host:   process.env.EMAIL_HOST ?? 'smtp.gmail.com',
    port:   parseInt(process.env.EMAIL_PORT ?? '465'),
    secure: (process.env.EMAIL_SECURE ?? 'true') === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 15000,
  });
}

// ─── Send helper ──────────────────────────────────────────────────────────────
async function send(transporter, { from, to, replyTo, subject, html, text }) {
  return transporter.sendMail({ from, to, replyTo, subject, html, text });
}

const FROM = () => `"AksharSync" <${process.env.EMAIL_USER}>`;
const ADMIN = () => process.env.EMAIL_TO ?? process.env.EMAIL_USER;

// ─── 2-day follow-up scheduler ────────────────────────────────────────────────
// Sends a review request email 48 hours after the initial contact.
// Note: uses setTimeout — works for local dev. For production, use a cron job.
function scheduleReviewEmail(transporter, { name, email }) {
  const TWO_DAYS_MS = 48 * 60 * 60 * 1000;
  setTimeout(async () => {
    try {
      const tpl = reviewFollowUpEmail({ name });
      await send(transporter, {
        from: FROM(), to: email,
        subject: tpl.subject, html: tpl.html, text: tpl.text,
      });
      console.log(`📬 2-day review email sent → ${email}`);
    } catch (err) {
      console.error('❌ Review follow-up failed:', err.message);
    }
  }, TWO_DAYS_MS);
  console.log(`⏰ Review follow-up scheduled in 48h → ${email}`);
}

// ─── Handler ──────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      name        = '',
      email       = '',
      phone       = '',
      countryCode = '',
      website     = '',
      message     = '',
      bookingDate = '',
      bookingTime = '',
    } = req.body ?? {};

    if (!name.trim() || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Name and Email are required' });
    }

    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ SMTP Connected');

    const isBooking = !!bookingDate && !!bookingTime;
    const data = { name, email, phone, countryCode, website, message, bookingDate, bookingTime };

    if (isBooking) {
      // ── Booking flow ─────────────────────────────────────────────────────────
      const customerTpl = bookingCustomerEmail(data);
      const adminTpl    = bookingAdminEmail(data);

      await send(transporter, {
        from: FROM(), to: email,
        subject: customerTpl.subject, html: customerTpl.html, text: customerTpl.text,
      });
      await send(transporter, {
        from: FROM(), to: ADMIN(), replyTo: email,
        subject: adminTpl.subject, html: adminTpl.html, text: adminTpl.text,
      });

      // Schedule review follow-up 48 hours later
      scheduleReviewEmail(transporter, { name, email });

      console.log(`📧 Booking emails sent → customer(${email}) + admin`);

    } else {
      // ── Contact inquiry flow ─────────────────────────────────────────────────
      const customerTpl = contactCustomerEmail({ name, email });
      const adminTpl    = contactAdminEmail({ name, email, message });

      await send(transporter, {
        from: FROM(), to: email,
        subject: customerTpl.subject, html: customerTpl.html, text: customerTpl.text,
      });
      await send(transporter, {
        from: FROM(), to: ADMIN(), replyTo: email,
        subject: adminTpl.subject, html: adminTpl.html, text: adminTpl.text,
      });

      // Schedule review follow-up 48 hours later
      scheduleReviewEmail(transporter, { name, email });

      console.log(`📧 Contact emails sent → customer(${email}) + admin`);
    }

    return res.status(200).json({ success: true, message: 'Email sent successfully' });

  } catch (error) {
    console.error('❌ SMTP ERROR:', error);
    let msg = error.message;
    if (error.code === 'EAUTH')   msg = 'Authentication failed — check EMAIL_USER/EMAIL_PASS in .env.local';
    if (error.code === 'ESOCKET') msg = 'Connection failed — port blocked or wrong host';
    return res.status(500).json({
      success: false,
      message: 'Could not send email. Please contact us at support@aksharsync.com',
      error: msg,
      code: error.code ?? null,
    });
  }
}
