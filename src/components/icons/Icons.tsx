import { SvgIcon, type SvgIconProps } from "@mui/material";

/**
 * ─── AksharSync Global Icon Library ───────────────────────────────────────────
 *
 * Usage:
 *   import { Icon, EmailIcon, SmsIcon } from "@/components/icons";
 *
 *   // Generic renderer (use name string)
 *   <Icon name="email" sx={{ fontSize: 24, color: "#7fd0ff" }} />
 *
 *   // Direct import (best for tree-shaking)
 *   <EmailIcon sx={{ fontSize: 24, color: "#7fd0ff" }} />
 * ──────────────────────────────────────────────────────────────────────────────
 */

export type IconProps = SvgIconProps;

// ═══════════════════════════════════════════════════════════════════════════════
//  NAVIGATION / CATEGORY ICONS
// ═══════════════════════════════════════════════════════════════════════════════

/** Circular refresh arrow — Lifecycle & Automation */
export function LifecycleIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12 4V1L8 5l4 4V6a6 6 0 1 1-6 6H4a8 8 0 1 0 8-8z" />
    </SvgIcon>
  );
}

/** Gear / cog — Technical Architecture */
export function ArchitectureIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
    </SvgIcon>
  );
}

/** Star sparkle — Creative Production */
export function CreativeIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </SvgIcon>
  );
}

/** Chat bubble — Messaging & Engagement */
export function MessagingIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M21 15c0 1.1-.9 2-2 2H7l-4 4V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v10z" />
    </SvgIcon>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  SERVICE ICONS — Lifecycle & Automation
// ═══════════════════════════════════════════════════════════════════════════════

/** Email / envelope */
export function EmailIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
    </SvgIcon>
  );
}

/** Journey map / route */
export function JourneyIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9 1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z" />
    </SvgIcon>
  );
}

/** Multi-channel / grid */
export function MultiChannelIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
    </SvgIcon>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  SERVICE ICONS — Technical Architecture
// ═══════════════════════════════════════════════════════════════════════════════

/** ESP / transfer arrows */
export function EspMigrationIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M6.99 11 3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z" />
    </SvgIcon>
  );
}

/** CRM sync / database */
export function CrmSyncIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm0 2c3.87 0 6 1.5 6 2s-2.13 2-6 2-6-1.5-6-2 2.13-2 6-2zm0 14c-3.87 0-6-1.5-6-2v-1.73c1.41.9 3.57 1.73 6 1.73s4.59-.83 6-1.73V17c0 .5-2.13 2-6 2z" />
    </SvgIcon>
  );
}

/** Deliverability / shield check */
export function DeliverabilityIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
    </SvgIcon>
  );
}

/** Liquid / code template */
export function TemplatingIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
    </SvgIcon>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  SERVICE ICONS — Creative Production
// ═══════════════════════════════════════════════════════════════════════════════

/** Modular template / grid blocks */
export function ModularTemplateIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z" />
    </SvgIcon>
  );
}

/** UX/UI design / pen tool */
export function UxUiIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </SvgIcon>
  );
}

/** White label / badge */
export function WhiteLabelIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z" />
    </SvgIcon>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  SERVICE ICONS — Messaging & Engagement
// ═══════════════════════════════════════════════════════════════════════════════

/** SMS / text message */
export function SmsIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z" />
    </SvgIcon>
  );
}

/** Push notification / bell */
export function PushNotificationIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
    </SvgIcon>
  );
}

/** WhatsApp-style phone bubble */
export function WhatsAppIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.445 0 .081 5.363.079 11.971c0 2.112.551 4.176 1.596 6.036L0 24l6.15-1.613a11.826 11.826 0 005.9 1.577h.005c6.605 0 11.97-5.363 11.972-11.971a11.82 11.82 0 00-3.505-8.473" />
    </SvgIcon>
  );
}

/** RCS / antenna signal */
export function RcsIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M1 9l2 2c2.88-2.88 6.79-4.08 10.53-3.62l1.19-2.3C9.77 4.38 4.98 5.98 1 9zm20.48-1.54-1.2 2.3C21.88 10.83 23 12.3 23 14h2c0-2.55-1.35-4.78-3.52-6.54zM5 13l2 2c1.13-1.13 2.63-1.8 4.27-1.95L12.5 11C9.97 10.97 7.51 11.59 5 13zm7 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm2.5-5.5c-3.29 0-6.27 1.3-8.5 3.5l2 2c1.65-1.65 3.92-2.67 6.44-2.67.66 0 1.3.08 1.91.23l1.18-2.28c-.98-.5-2.05-.78-3.03-.78z" />
    </SvgIcon>
  );
}

/** Instagram DM / camera lens */
export function InstagramDmIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </SvgIcon>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  BRAND / TOOL ICONS
// ═══════════════════════════════════════════════════════════════════════════════

/** Target / Klaviyo / Segment bullseye */
export function TargetIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-12.5c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5 4.5-2.02 4.5-4.5-2.02-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </SvgIcon>
  );
}

/** Simple chat bubble for SMS */
export function ChatIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z" />
    </SvgIcon>
  );
}

/** Broadcast / satellite dish — live SMS broadcast hub */
export function BroadcastIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12 5c-3.87 0-7 3.13-7 7s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm-1-2.5v-5l4 2.5-4 2.5z" />
      <path d="M12 1C6.48 1 2 5.48 2 11h2c0-4.42 3.58-8 8-8s8 3.58 8 8h2c0-5.52-4.48-10-10-10zm0 4C8.13 5 5 8.13 5 12h2c0-2.76 2.24-5 5-5s5 2.24 5 5h2c0-3.87-3.13-7-7-7z" />
    </SvgIcon>
  );
}

/** Package / shipping box — order shipped SMS */
export function PackageIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M20.54 5.23L19.15 3.55C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z" />
    </SvgIcon>
  );
}

/** Win-back / recycle refresh arrows — re-engagement campaign */
export function WinBackIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
    </SvgIcon>
  );
}

/** Trending up — revenue growth chart */
export function TrendUpIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
    </SvgIcon>
  );
}

/** Bolt / lightning flash — speed & power */
export function BoltIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M7 2v11h3v9l7-12h-4l4-8z" />
    </SvgIcon>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  GENERIC <Icon /> COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

const ICON_MAP = {
  // Category icons
  lifecycle: LifecycleIcon,
  architecture: ArchitectureIcon,
  creative: CreativeIcon,
  messaging: MessagingIcon,

  // Lifecycle & Automation
  email: EmailIcon,
  journey: JourneyIcon,
  multichannel: MultiChannelIcon,

  // Technical Architecture
  espMigration: EspMigrationIcon,
  crmSync: CrmSyncIcon,
  deliverability: DeliverabilityIcon,
  templating: TemplatingIcon,

  // Creative Production
  modularTemplate: ModularTemplateIcon,
  uxUi: UxUiIcon,
  whiteLabel: WhiteLabelIcon,

  // Messaging & Engagement
  sms: SmsIcon,
  pushNotification: PushNotificationIcon,
  whatsapp: WhatsAppIcon,
  rcs: RcsIcon,
  instagramDm: InstagramDmIcon,

  // Brand / Tools
  target: TargetIcon,
  chat: ChatIcon,
  broadcast: BroadcastIcon,
  package: PackageIcon,
  winBack: WinBackIcon,
  trendUp: TrendUpIcon,
  bolt: BoltIcon,
} as const;

export type IconName = keyof typeof ICON_MAP;

export interface IconComponentProps extends IconProps {
  /** Icon key from the ICON_MAP registry */
  name: IconName;
}

/**
 * Generic Icon renderer — choose any registered icon by name.
 */
export function Icon({ name, ...props }: IconComponentProps) {
  const Component = ICON_MAP[name];
  return <Component {...props} />;
}
