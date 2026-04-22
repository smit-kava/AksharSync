import { ROUTE_PATHS } from "../routes/paths";

export interface ServiceDetail {
  title: string;
  category: string;
  description: string;
  features: string[];
  accent: string;
}

export const servicesData: Record<string, ServiceDetail> = {
  [ROUTE_PATHS.SERVICE_EMAIL_FLOWS]: {
    title: "Email Automation Management",
    category: "Strategic Lifecycle Engineering",
    description: "End-to-end management of your email automation ecosystem, from strategy to execution.",
    features: [
      "Welcome Series Optimization",
      "Abandoned Cart Recovery",
      "Post-Purchase Nurture Flows",
      "Win-back & Re-engagement",
    ],
    accent: "#7fd0ff",
  },
  [ROUTE_PATHS.SERVICE_CUSTOMER_JOURNEYS]: {
    title: "Cross-Platform Journey Mapping",
    category: "Strategic Lifecycle Engineering",
    description: "Visualizing and implementing the complete customer path across all touchpoints.",
    features: [
      "Multi-touch Attribution Analysis",
      "Behavioral Trigger Mapping",
      "Customer Persona Development",
      "Lifecycle Stage Optimization",
    ],
    accent: "#7fd0ff",
  },
  [ROUTE_PATHS.SERVICE_MULTICHANNEL_AUTOMATION]: {
    title: "Multi-Channel Workflows",
    category: "Strategic Lifecycle Engineering",
    description: "Synchronized communication across Email, SMS, WhatsApp, and Push notifications.",
    features: [
      "Omnichannel Syncing",
      "Real-time Event Triggers",
      "Preference Center Management",
      "Dynamic Content Orchestration",
    ],
    accent: "#7fd0ff",
  },
  [ROUTE_PATHS.SERVICE_ESP_MIGRATION]: {
    title: "ESP Migration & Integration",
    category: "Unified Data Architecture",
    description: "Seamless transitions between platforms with zero data loss and minimal downtime.",
    features: [
      "Platform Selection Consulting",
      "Legacy Data Migration",
      "API & Webhook Setup",
      "IP Warming Strategy",
    ],
    accent: "#a78bfa",
  },
  [ROUTE_PATHS.SERVICE_CRM_DATA_SYNC]: {
    title: "CRM Data Sync",
    category: "Unified Data Architecture",
    description: "Perfect synchronization between your CRM and marketing platforms for real-time data accuracy.",
    features: [
      "Two-way Data Sync",
      "Custom Object Mapping",
      "Data Cleansing & Validation",
      "Event-driven Architecture",
    ],
    accent: "#a78bfa",
  },
  [ROUTE_PATHS.SERVICE_DELIVERABILITY_AUDITS]: {
    title: "Deliverability Audits",
    category: "Unified Data Architecture",
    description: "Technical optimization to ensure your messages reach the inbox every time.",
    features: [
      "SPF, DKIM, DMARC Setup",
      "Blacklist Monitoring",
      "Sender Reputation Management",
      "Inbox Placement Testing",
    ],
    accent: "#a78bfa",
  },
  [ROUTE_PATHS.SERVICE_LIQUID_AMPSCRIPT]: {
    title: "Liquid & Ampscript Templating",
    category: "Unified Data Architecture",
    description: "Advanced coding for dynamic, highly personalized message content.",
    features: [
      "Complex Conditional Logic",
      "Dynamic Data Lookups",
      "Personalized Product Recommendations",
      "Multi-language Support",
    ],
    accent: "#a78bfa",
  },
  [ROUTE_PATHS.SERVICE_MODULAR_TEMPLATES]: {
    title: "Modular Template Production",
    category: "High-Performance Growth Platforms",
    description: "Developing scalable, drag-and-drop template systems that empower your team.",
    features: [
      "Reusable Component Library",
      "Brand-aligned Design System",
      "Responsive Layout Testing",
      "Accessibility Compliance",
    ],
    accent: "#34d399",
  },
  [ROUTE_PATHS.SERVICE_UX_UI_DESIGN]: {
    title: "UX/UI Design",
    category: "High-Performance Growth Platforms",
    description: "Data-driven design focused on conversion and seamless user experiences.",
    features: [
      "Conversion Rate Optimization",
      "Interactive Prototyping",
      "User Research & Testing",
      "Visual Brand Identity",
    ],
    accent: "#34d399",
  },
  [ROUTE_PATHS.SERVICE_WHITE_LABEL_SOLUTIONS]: {
    title: "White Label Solutions",
    category: "High-Performance Growth Platforms",
    description: "Premium execution for agencies looking to expand their technical offerings.",
    features: [
      "Invisible Technical Support",
      "Custom Client Reporting",
      "Scalable Workflow Management",
      "Expert Consultative Support",
    ],
    accent: "#34d399",
  },
};
