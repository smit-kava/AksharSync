<?php

/**
 * @file emailTemplates.php
 * @description AksharSync — Email Template Functions
 *
 * PHP mirror of emailTemplates.ts — generated from the same design.
 * Provides two functions consumed by send-email.php:
 *
 *   buildUserConfirmationEmail($data)            → ['subject', 'html', 'plain']
 *   buildAdminNotificationEmail($data, $timestamp) → ['subject', 'html', 'plain']
 *
 * ─────────────────────────────────────────────────────────────────────────
 * Usage in send-email.php:
 *   require __DIR__ . '/emailTemplates.php';
 *   $user  = buildUserConfirmationEmail($data);
 *   $admin = buildAdminNotificationEmail($data);
 * ─────────────────────────────────────────────────────────────────────────
 */

// ─── Brand Tokens ────────────────────────────────────────────────────────────

const BRAND_PRIMARY_BLUE   = '#7fd0ff';
const BRAND_PRIMARY_PURPLE = '#472187';
const BRAND_DARK_BG        = '#060e1a';
const BRAND_CARD_BG        = '#0a1628';
const BRAND_SITE_URL       = 'https://aksharsync.com';
const BRAND_TAGLINE        = 'Retention Marketing Agency';
const BRAND_COMPANY        = 'AksharSync';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Returns the first word of a full name.
 */
function emailFirstName(string $fullName): string
{
    return explode(' ', trim($fullName))[0] ?? $fullName;
}

/**
 * Renders a numbered gradient step badge for the "What Happens Next" section.
 */
function stepBadge(int $n): string
{
    return '<div style="width:24px;height:24px;'
        . 'background:linear-gradient(135deg,' . BRAND_PRIMARY_BLUE . ',' . BRAND_PRIMARY_PURPLE . ');'
        . 'border-radius:50%;text-align:center;line-height:24px;font-size:11px;font-weight:800;color:#fff;">'
        . $n . '</div>';
}

/**
 * Renders a single detail row inside the dark submission-details card.
 *
 * @param string $icon       Emoji icon
 * @param string $label      Row label text
 * @param string $value      Escaped display value
 * @param string $valueColor CSS colour for the value
 * @param bool   $isLast     When true, removes bottom margin
 */
function darkDetailRow(string $icon, string $label, string $value, string $valueColor = '#ffffff', bool $isLast = false): string
{
    $margin = $isLast ? '' : 'margin-bottom:14px;';
    return <<<HTML
    <table width="100%" cellpadding="0" cellspacing="0" style="{$margin}">
      <tr>
        <td width="20" valign="top" style="padding-top:1px;">
          <span style="font-size:14px;">{$icon}</span>
        </td>
        <td style="padding-left:10px;">
          <div style="font-size:10px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:1px;">{$label}</div>
          <div style="font-size:14px;font-weight:600;color:{$valueColor};margin-top:2px;">{$value}</div>
        </td>
      </tr>
    </table>
    HTML;
}

/**
 * Renders a single row inside the admin light-theme details table.
 */
function adminTableRow(string $label, string $value, bool $shaded = false, string $valueStyle = 'font-size:14px;font-weight:700;color:#1a1a2e;'): string
{
    $bg = $shaded ? 'background:#fafbff;' : '';
    return <<<HTML
    <tr style="border-top:1px solid #eef0f5;{$bg}">
      <td style="padding:12px 16px;font-size:12px;font-weight:600;color:#666;">{$label}</td>
      <td style="padding:12px 16px;{$valueStyle}">{$value}</td>
    </tr>
    HTML;
}

// ─── Template 1: User Confirmation (Premium Dark) ────────────────────────────

function buildUserConfirmationHtml(array $data): string
{
    $fn      = htmlspecialchars(emailFirstName($data['name']));
    $name    = htmlspecialchars($data['name']);
    $email   = htmlspecialchars($data['email']);
    $phone   = !empty($data['phone'])
                 ? htmlspecialchars($data['countryCode'] . ' ' . $data['phone'])
                 : '—';
    $website = !empty($data['website']) ? htmlspecialchars($data['website']) : '—';
    $year    = date('Y');

    $details  = darkDetailRow('👤', 'Name',    $name);
    $details .= darkDetailRow('✉️', 'Email',   $email,  BRAND_PRIMARY_BLUE);
    $details .= darkDetailRow('📞', 'Phone',   $phone);
    $details .= darkDetailRow('🌐', 'Website', $website, '#ffffff', true);

    $step1 = stepBadge(1);
    $step2 = stepBadge(2);
    $step3 = stepBadge(3);

    $b  = BRAND_PRIMARY_BLUE;
    $p  = BRAND_PRIMARY_PURPLE;
    $bg = BRAND_DARK_BG;
    $cb = BRAND_CARD_BG;
    $tl = BRAND_TAGLINE;
    $co = BRAND_COMPANY;
    $su = BRAND_SITE_URL;

    return <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Consultation Confirmed — {$co}</title>
</head>
<body style="margin:0;padding:0;background-color:{$bg};font-family:'Segoe UI',Arial,sans-serif;">

<!-- ═══ WRAPPER ═══════════════════════════════════════════════════════════ -->
<table width="100%" cellpadding="0" cellspacing="0"
       style="background-color:{$bg};padding:40px 16px;">
  <tr><td align="center">
  <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

    <!-- TOP ACCENT BAR -->
    <tr>
      <td style="height:4px;background:linear-gradient(90deg,{$b},{$p});border-radius:4px 4px 0 0;"></td>
    </tr>

    <!-- ═══ CARD ══════════════════════════════════════════════════════════ -->
    <tr>
      <td style="background:{$cb};border:1px solid rgba(127,208,255,0.12);
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
                      <span style="color:{$b};">Akshar</span><span style="color:#ffffff;">Sync</span>
                    </div>
                    <div style="font-size:11px;color:rgba(127,208,255,0.6);margin-top:2px;
                                letter-spacing:1px;text-transform:uppercase;">{$tl}</div>
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
                          background:linear-gradient(135deg,{$b},{$p});
                          border-radius:50%;margin:0 auto 20px;line-height:72px;text-align:center;">
                <span style="font-size:32px;line-height:72px;">📅</span>
              </div>
              <h1 style="margin:0 0 10px;font-size:26px;font-weight:800;color:#ffffff;
                         letter-spacing:-0.5px;line-height:1.2;">
                Consultation Booked!
              </h1>
              <p style="margin:0 auto;font-size:15px;color:rgba(255,255,255,0.5);
                        line-height:1.6;max-width:400px;">
                Hi <strong style="color:{$b};">{$fn}</strong> 👋 —
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
                {$details}
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

                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
                  <tr>
                    <td width="28" valign="top">{$step1}</td>
                    <td style="padding-left:12px;">
                      <div style="font-size:13px;font-weight:600;color:#fff;">We'll review your details</div>
                      <div style="font-size:12px;color:rgba(255,255,255,0.45);margin-top:2px;">Our team will analyse your brand within 24 hours.</div>
                    </td>
                  </tr>
                </table>

                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
                  <tr>
                    <td width="28" valign="top">{$step2}</td>
                    <td style="padding-left:12px;">
                      <div style="font-size:13px;font-weight:600;color:#fff;">Confirm your call slot</div>
                      <div style="font-size:12px;color:rgba(255,255,255,0.45);margin-top:2px;">We'll send you a calendar invite with a Google Meet link.</div>
                    </td>
                  </tr>
                </table>

                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td width="28" valign="top">{$step3}</td>
                    <td style="padding-left:12px;">
                      <div style="font-size:13px;font-weight:600;color:#fff;">30-min growth strategy call</div>
                      <div style="font-size:12px;color:rgba(255,255,255,0.45);margin-top:2px;">Walk away with a clear 90-day retention roadmap.</div>
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
              <a href="{$su}"
                 style="display:inline-block;background:linear-gradient(135deg,{$b} 0%,{$p} 100%);
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
                    <span style="font-size:13px;font-weight:700;color:rgba(255,255,255,0.3);">{$co}</span>
                    <span style="font-size:11px;color:rgba(255,255,255,0.2);margin-left:8px;">{$tl}</span>
                  </td>
                  <td align="right">
                    <a href="{$su}" style="font-size:11px;color:rgba(127,208,255,0.5);text-decoration:none;">aksharsync.com</a>
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
          &copy; {$year} {$co}. All rights reserved.
        </p>
      </td>
    </tr>

  </table>
  </td></tr>
</table>

</body>
</html>
HTML;
}

function buildUserConfirmationPlain(array $data): string
{
    $fn      = emailFirstName($data['name']);
    $phone   = !empty($data['phone']) ? ($data['countryCode'] . ' ' . $data['phone']) : '—';
    $website = !empty($data['website']) ? $data['website'] : '—';

    return implode("\n", [
        "Hi {$fn},",
        '',
        'Your ' . BRAND_COMPANY . ' consultation request has been received!',
        '',
        "Here's what you submitted:",
        "  Name:    {$data['name']}",
        "  Email:   {$data['email']}",
        "  Phone:   {$phone}",
        "  Website: {$website}",
        '',
        'What happens next:',
        '  1. Our team will review your details within 24 hours.',
        "  2. We'll send a calendar invite with a Google Meet link.",
        '  3. Enjoy a 30-min growth strategy call with our experts.',
        '',
        'Questions? Simply reply to this email.',
        '',
        '— The ' . BRAND_COMPANY . ' Team',
        BRAND_SITE_URL,
    ]);
}

/**
 * Returns ['subject' => string, 'html' => string, 'plain' => string]
 *
 * @param array{name:string, email:string, phone:string, countryCode:string, website:string} $data
 */
function buildUserConfirmationEmail(array $data): array
{
    return [
        'subject' => '✅ Your ' . BRAND_COMPANY . ' Consultation is Confirmed!',
        'html'    => buildUserConfirmationHtml($data),
        'plain'   => buildUserConfirmationPlain($data),
    ];
}

// ─── Template 2: Admin Notification (Clean Light) ────────────────────────────

function buildAdminNotificationHtml(array $data, string $receivedTimestamp): string
{
    $fn      = htmlspecialchars(emailFirstName($data['name']));
    $name    = htmlspecialchars($data['name']);
    $email   = htmlspecialchars($data['email']);
    $phone   = !empty($data['phone'])
                 ? htmlspecialchars($data['countryCode'] . ' ' . $data['phone'])
                 : '—';
    $website = !empty($data['website']) ? htmlspecialchars($data['website']) : '—';
    $year    = date('Y');

    $rows  = adminTableRow('👤 Name',     $name,               false);
    $rows .= adminTableRow('✉️ Email',    $email,              true,  'font-size:14px;font-weight:700;color:' . BRAND_PRIMARY_PURPLE . ';');
    $rows .= adminTableRow('📞 Phone',    $phone,              false, 'font-size:14px;color:#1a1a2e;');
    $rows .= adminTableRow('🌐 Website',  $website,            true,  'font-size:14px;color:#1a1a2e;');
    $rows .= adminTableRow('🕐 Received', $receivedTimestamp,  false, 'font-size:13px;color:#888;');

    $b  = BRAND_PRIMARY_BLUE;
    $p  = BRAND_PRIMARY_PURPLE;
    $co = BRAND_COMPANY;

    return <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>New Lead — {$co}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:'Segoe UI',Arial,sans-serif;">

<!-- ═══ WRAPPER ═══════════════════════════════════════════════════════════ -->
<table width="100%" cellpadding="0" cellspacing="0"
       style="background:#f4f4f4;padding:32px 16px;">
  <tr><td align="center">
  <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

    <!-- TOP BAR -->
    <tr>
      <td style="height:4px;background:linear-gradient(90deg,{$b},{$p});border-radius:4px 4px 0 0;"></td>
    </tr>

    <!-- ═══ CARD ══════════════════════════════════════════════════════════ -->
    <tr>
      <td style="background:#ffffff;border-radius:0 0 16px 16px;padding:32px 36px;
                 box-shadow:0 4px 20px rgba(0,0,0,0.06);">

        <!-- HEADER -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
          <tr>
            <td>
              <div style="font-size:11px;font-weight:700;color:{$p};
                           text-transform:uppercase;letter-spacing:1.5px;margin-bottom:4px;">
                New Lead Alert
              </div>
              <h2 style="margin:0;font-size:20px;font-weight:800;color:#1a1a2e;">Consultation Request</h2>
            </td>
            <td align="right" valign="top">
              <span style="display:inline-block;background:#f0f9ff;border:1px solid {$b};
                           border-radius:20px;padding:5px 12px;font-size:11px;font-weight:700;color:{$p};">
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
          {$rows}
        </table>

        <!-- QUICK REPLY CTA -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
          <tr>
            <td align="center">
              <a href="mailto:{$email}?subject=Re:%20Your%20AksharSync%20Consultation"
                 style="display:inline-block;background:linear-gradient(135deg,{$b},{$p});
                        color:#fff;font-size:13px;font-weight:700;text-decoration:none;
                        padding:12px 28px;border-radius:8px;">
                Reply to {$fn} →
              </a>
            </td>
          </tr>
        </table>

        <!-- FOOTER NOTE -->
        <p style="margin:0;font-size:11px;color:#bbb;text-align:center;line-height:1.6;">
          Sent from aksharsync.com contact form &nbsp;·&nbsp; {$year} {$co}
        </p>

      </td>
    </tr><!-- /CARD -->

  </table>
  </td></tr>
</table>

</body>
</html>
HTML;
}

function buildAdminNotificationPlain(array $data, string $receivedTimestamp): string
{
    $phone   = !empty($data['phone']) ? ($data['countryCode'] . ' ' . $data['phone']) : '—';
    $website = !empty($data['website']) ? $data['website'] : '—';

    return implode("\n", [
        'New Consultation Request',
        '',
        "Name:     {$data['name']}",
        "Email:    {$data['email']}",
        "Phone:    {$phone}",
        "Website:  {$website}",
        "Received: {$receivedTimestamp}",
    ]);
}

/**
 * Returns ['subject' => string, 'html' => string, 'plain' => string]
 *
 * @param array{name:string, email:string, phone:string, countryCode:string, website:string} $data
 * @param string $receivedTimestamp  Human-readable timestamp (defaults to now)
 */
function buildAdminNotificationEmail(array $data, string $receivedTimestamp = ''): array
{
    if ($receivedTimestamp === '') {
        $receivedTimestamp = date('D, d M Y — H:i:s T');
    }

    return [
        'subject' => '🔔 New Consultation Request — ' . $data['name'],
        'html'    => buildAdminNotificationHtml($data, $receivedTimestamp),
        'plain'   => buildAdminNotificationPlain($data, $receivedTimestamp),
    ];
}
