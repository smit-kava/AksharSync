export interface DevSubService {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  accent: string;
  label: string;
  features: string[];
  process: { step: string; title: string; desc: string }[];
  stats: { label: string; value: string }[];
  faq: { question: string; answer: string }[];
}

export const webDevSubServices: DevSubService[] = [
  {
    slug: "custom-website-design",
    title: "Custom Website Design",
    tagline: "Pixel-perfect, brand-first websites",
    accent: "#60a5fa",
    label: "01",
    description: "We design bespoke websites from scratch — tailored to your brand identity, target audience, and conversion goals. Every pixel is intentional, every interaction purposeful.",
    features: ["Brand-aligned visual system","Figma-to-code delivery","Mobile-first responsive layouts","Accessibility (WCAG 2.1) compliance","Custom animation & micro-interactions","Style guide & component library"],
    process: [
      { step: "01", title: "Brand Discovery", desc: "Deep-dive into your brand values, audience, and competitors." },
      { step: "02", title: "Wireframing", desc: "Low-fidelity wireframes approved before visual design begins." },
      { step: "03", title: "Visual Design", desc: "High-fidelity Figma mockups with full responsive breakpoints." },
      { step: "04", title: "Development", desc: "Pixel-perfect coded output, tested across all major browsers." },
    ],
    stats: [{ label: "Avg. Conversion Lift", value: "+38%" },{ label: "Delivery Time", value: "2–4 wks" }],
    faq: [
      { question: "Do you provide the design files?", answer: "Yes — all Figma source files are handed over on project completion." },
      { question: "Can I edit the site myself after launch?", answer: "Absolutely. We integrate a CMS (Contentful, Sanity, or similar) so your team has full editorial control." },
    ],
  },
  {
    slug: "ecommerce-development",
    title: "E-commerce Development",
    tagline: "Stores built to sell, scale, and retain",
    accent: "#34d399",
    label: "02",
    description: "From Shopify Plus to headless WooCommerce — we engineer e-commerce experiences that maximise conversion at every step of the funnel.",
    features: ["Shopify & Shopify Plus","WooCommerce / BigCommerce","Custom checkout flows","Product recommendation engines","Multi-currency & multi-language","Payment gateway integration"],
    process: [
      { step: "01", title: "Platform Strategy", desc: "Choose the right platform for your volume and product type." },
      { step: "02", title: "Store Architecture", desc: "Collections, navigation, and product taxonomy planned for growth." },
      { step: "03", title: "Design & Build", desc: "Custom theme or headless frontend engineered for speed." },
      { step: "04", title: "Launch & Optimise", desc: "Post-launch CRO testing and conversion tracking setup." },
    ],
    stats: [{ label: "Avg. Checkout Completion", value: "+44%" },{ label: "Page Load Target", value: "<1.8s" }],
    faq: [
      { question: "Shopify or headless — which is right for me?", answer: "Shopify works for most brands. Headless makes sense if you need extreme performance or multi-channel publishing." },
      { question: "Do you migrate existing stores?", answer: "Yes — full product, customer, and order data migrations with zero downtime." },
    ],
  },
  {
    slug: "landing-page-engineering",
    title: "Landing Page Engineering",
    tagline: "Ad traffic → paying customers",
    accent: "#fbbf24",
    label: "03",
    description: "High-converting landing pages built for paid campaigns, product launches, and lead generation — A/B tested and optimised from day one.",
    features: ["CRO-first page structure","A/B testing setup (VWO / Optimizely)","Dynamic content via URL params","Fast load (<1s on mobile)","Heatmap & session recording","Seamless CRM / ESP integration"],
    process: [
      { step: "01", title: "Offer Analysis", desc: "We audit your ad copy and offer to align the landing page messaging." },
      { step: "02", title: "Wireframe", desc: "Conversion-focused layout built around your primary CTA." },
      { step: "03", title: "Build & Test", desc: "Full responsive build with analytics and A/B variant ready." },
      { step: "04", title: "Iterate", desc: "Monthly CRO sprints based on real visitor data." },
    ],
    stats: [{ label: "Avg. CVR Lift", value: "+52%" },{ label: "Delivery", value: "5–7 days" }],
    faq: [
      { question: "Can you match our existing brand?", answer: "Yes — we work within your brand guidelines or create a campaign-specific visual direction." },
      { question: "Do you run the A/B tests?", answer: "We set up and monitor tests. You review results and approve winning variants." },
    ],
  },
  {
    slug: "headless-cms-integration",
    title: "Headless CMS Integration",
    tagline: "Content freedom. Developer control.",
    accent: "#a78bfa",
    label: "04",
    description: "Decouple your content from your frontend. We integrate Contentful, Sanity, or Strapi so your team publishes freely while developers maintain full control over performance.",
    features: ["Contentful, Sanity, Strapi setup","Content modelling & schema design","Preview environments","Multi-locale & multi-region","Webhook-based build triggers","Role-based access control"],
    process: [
      { step: "01", title: "CMS Selection", desc: "We recommend the right CMS based on your team size and content volume." },
      { step: "02", title: "Content Modelling", desc: "Structured content schemas designed for reusability." },
      { step: "03", title: "Frontend Integration", desc: "API connections wired to your Next.js or Gatsby frontend." },
      { step: "04", title: "Editor Training", desc: "Live walkthroughs for your content team." },
    ],
    stats: [{ label: "Publishing Speed", value: "10x faster" },{ label: "Setup Time", value: "1–2 wks" }],
    faq: [
      { question: "Which CMS do you recommend?", answer: "Sanity for flexibility, Contentful for enterprise scale. We advise based on your team's workflow." },
      { question: "Can we migrate existing WordPress content?", answer: "Yes — we handle full content migration including images and metadata." },
    ],
  },
  {
    slug: "performance-optimization",
    title: "Performance Optimization",
    tagline: "Sub-2s. 95+ Lighthouse. Every time.",
    accent: "#f472b6",
    label: "05",
    description: "We audit and fix Core Web Vitals issues, eliminate render-blocking resources, and implement modern loading strategies to achieve elite performance scores.",
    features: ["Core Web Vitals audit & fix","Image optimisation (WebP / AVIF)","Code splitting & lazy loading","CDN configuration","Critical CSS extraction","Third-party script management"],
    process: [
      { step: "01", title: "Audit", desc: "Lighthouse + WebPageTest analysis across all key pages." },
      { step: "02", title: "Prioritise", desc: "Issues ranked by impact on LCP, FID, and CLS scores." },
      { step: "03", title: "Implement", desc: "Engineering sprints to resolve each category of issues." },
      { step: "04", title: "Monitor", desc: "RUM (Real User Monitoring) dashboard set up for ongoing tracking." },
    ],
    stats: [{ label: "Avg. Lighthouse Score", value: "96/100" },{ label: "LCP Improvement", value: "-62%" }],
    faq: [
      { question: "Will performance fixes break my design?", answer: "No — all optimisations are non-destructive. We test every change against the original visual output." },
      { question: "How long does a performance project take?", answer: "A typical audit and fix engagement takes 1–2 weeks depending on site complexity." },
    ],
  },
  {
    slug: "api-integrations",
    title: "API & Third-Party Integrations",
    tagline: "Connect your entire tech stack",
    accent: "#7fd0ff",
    label: "06",
    description: "We connect your website to your CRM, ESP, payment gateways, shipping providers, and analytics platforms — building a seamless, automated data ecosystem.",
    features: ["REST & GraphQL API development","Zapier / Make automation","Stripe, PayPal, Razorpay","CRM (HubSpot, Salesforce)","ESP (Klaviyo, Omnisend)","Webhook architecture"],
    process: [
      { step: "01", title: "Stack Audit", desc: "We map your existing tools and identify integration opportunities." },
      { step: "02", title: "Architecture", desc: "Design a clean, scalable data flow between all systems." },
      { step: "03", title: "Build", desc: "API connections with error handling, retries, and logging." },
      { step: "04", title: "Test & Monitor", desc: "Full integration testing and uptime monitoring dashboard." },
    ],
    stats: [{ label: "Manual Tasks Eliminated", value: "85%" },{ label: "Data Sync Delay", value: "<30s" }],
    faq: [
      { question: "Can you integrate with our custom internal tools?", answer: "Yes — if it has an API or webhook support, we can connect it." },
      { question: "What if a third-party API changes?", answer: "Our retainer packages include API maintenance to handle versioning and breaking changes." },
    ],
  },
  {
    slug: "responsive-ux-ui",
    title: "Responsive UI/UX Design",
    tagline: "Beautiful on every device",
    accent: "#fb923c",
    label: "07",
    description: "Mobile-first design systems that deliver exceptional user experiences across all screen sizes — from smartphones to ultrawide monitors.",
    features: ["Mobile-first design system","Atomic design components","Interactive Figma prototypes","Usability testing","Design tokens & theming","Dark mode support"],
    process: [
      { step: "01", title: "Research", desc: "User journey mapping and competitive UX benchmarking." },
      { step: "02", title: "Prototype", desc: "Interactive Figma flows tested with real users before build." },
      { step: "03", title: "Design System", desc: "Full component library with design tokens for consistent scaling." },
      { step: "04", title: "Handoff", desc: "Developer-ready Figma with specs, assets, and annotations." },
    ],
    stats: [{ label: "Task Completion Rate", value: "+61%" },{ label: "Bounce Rate Drop", value: "-34%" }],
    faq: [
      { question: "Do you test on real devices?", answer: "Yes — we test on a device lab covering 20+ phone and tablet models." },
      { question: "Can we use the design system for future work?", answer: "Absolutely — all design tokens and components are yours to extend and build upon." },
    ],
  },
  {
    slug: "security-compliance",
    title: "Security & Compliance",
    tagline: "Protected. Compliant. Enterprise-ready.",
    accent: "#4ade80",
    label: "08",
    description: "SSL, GDPR, PCI-DSS and enterprise security built into every project — not bolted on as an afterthought.",
    features: ["SSL / TLS configuration","GDPR cookie consent setup","PCI-DSS compliance review","Security headers implementation","Penetration testing","Data backup & recovery"],
    process: [
      { step: "01", title: "Security Audit", desc: "Full vulnerability scan across your web infrastructure." },
      { step: "02", title: "Compliance Review", desc: "GDPR and PCI-DSS gap analysis and remediation plan." },
      { step: "03", title: "Implementation", desc: "Security headers, CSP, and cookie management deployed." },
      { step: "04", title: "Ongoing Monitoring", desc: "Automated alerts for certificate expiry, malware, and breaches." },
    ],
    stats: [{ label: "Vulnerability Close Rate", value: "100%" },{ label: "Compliance Time", value: "1 week" }],
    faq: [
      { question: "Do you help with GDPR cookie banners?", answer: "Yes — we implement compliant cookie consent management with granular user controls." },
      { question: "Can you run a penetration test on our existing site?", answer: "Yes — we offer standalone pen test engagements with a detailed findings report." },
    ],
  },
];

export const appDevSubServices: DevSubService[] = [

  {
    slug: "android-development",
    title: "Android App Development",
    tagline: "Kotlin-powered apps for every Android device",
    accent: "#a78bfa",
    label: "01",
    description: "Native Android applications built with Kotlin and Jetpack Compose — optimised for the full Android device landscape from budget phones to foldables.",
    features: ["Kotlin & Jetpack Compose","Material You design system","Adaptive layouts (phone, tablet, foldable)","Firebase Cloud Messaging","Google Play Billing","Biometric authentication"],
    process: [
      { step: "01", title: "Device Strategy", desc: "Define target device matrix and OS version support range." },
      { step: "02", title: "Design", desc: "Material You designs adapting to user wallpaper and theme." },
      { step: "03", title: "Build", desc: "Modular architecture with full unit and UI test coverage." },
      { step: "04", title: "Play Store Launch", desc: "Full Play Store listing with ASO-optimised assets." },
    ],
    stats: [{ label: "Avg. Play Store Rating", value: "4.7 ★" },{ label: "Device Compatibility", value: "98%" }],
    faq: [
      { question: "Which Android versions do you support?", answer: "We target Android 8.0+ (API 26+) covering over 95% of active Android devices." },
      { question: "Do you handle Play Store rejections?", answer: "Yes — we manage the full review process including appeal submissions." },
    ],
  },
  {
    slug: "cross-platform-development",
    title: "Cross-Platform Development",
    tagline: "One codebase. Both platforms. No compromise.",
    accent: "#34d399",
    label: "02",
    description: "React Native apps that deliver near-native quality on iOS and Android simultaneously — faster to ship, cheaper to maintain.",
    features: ["React Native & Expo","Shared business logic","Platform-specific UI adaptations","OTA updates (CodePush)","85%+ code reuse"],
    process: [
      { step: "01", title: "Architecture", desc: "React Native recommended for maximum code reuse." },
      { step: "02", title: "Shared Business Logic", desc: "Core logic, state management, and API layer designed once." },
      { step: "03", title: "Platform Adaptation", desc: "Native look-and-feel applied per platform where it matters." },
      { step: "04", title: "Dual Launch", desc: "Simultaneous App Store and Play Store submission." },
    ],
    stats: [{ label: "Dev Cost Saving vs Native", value: "40%" },{ label: "Time to Market", value: "-35%" }],
    faq: [
      { question: "Is cross-platform as good as native?", answer: "For 90% of apps, yes. We only recommend native when hardware-specific features require it." },
      { question: "Can we migrate a native app to cross-platform?", answer: "Yes — we can migrate iOS or Android to React Native incrementally." },
    ],
  },
  {
    slug: "backend-api-cloud",
    title: "Backend API & Cloud Infrastructure",
    tagline: "Scalable backends built for millions of users",
    accent: "#fbbf24",
    label: "03",
    description: "Node.js, Python, or Go APIs with cloud-native architecture on AWS or GCP — built to scale from 100 to 10 million users without expensive rewrites.",
    features: ["REST & GraphQL APIs","Node.js / Python / Go","AWS Lambda & GCP Cloud Run","PostgreSQL & MongoDB","Redis caching","CI/CD pipeline setup"],
    process: [
      { step: "01", title: "Architecture Design", desc: "Scalable system design review with capacity planning." },
      { step: "02", title: "API Development", desc: "Fully documented REST or GraphQL API with auth." },
      { step: "03", title: "Cloud Setup", desc: "Infrastructure as Code (Terraform) for reproducible environments." },
      { step: "04", title: "Monitoring", desc: "Datadog / CloudWatch dashboards and alerting configured." },
    ],
    stats: [{ label: "Uptime SLA", value: "99.9%" },{ label: "API Response Time", value: "<120ms" }],
    faq: [
      { question: "Do you use serverless or traditional servers?", answer: "Both — we recommend serverless for variable-load apps and traditional for predictable high-throughput workloads." },
      { question: "Can you migrate our existing backend to the cloud?", answer: "Yes — we handle full cloud migrations with zero-downtime cutover strategies." },
    ],
  },
  {
    slug: "push-notifications-messaging",
    title: "Push Notifications & In-App Messaging",
    tagline: "Re-engage users at exactly the right moment",
    accent: "#f472b6",
    label: "04",
    description: "Behaviour-driven push campaigns and in-app messaging flows that re-engage lapsed users, drive conversions, and build long-term retention habits.",
    features: ["Firebase Cloud Messaging","OneSignal / Braze integration","Behavioural trigger setup","Rich media notifications","In-app messaging flows","A/B testing framework"],
    process: [
      { step: "01", title: "Retention Audit", desc: "Identify the exact moments users drop off and need re-engagement." },
      { step: "02", title: "Campaign Design", desc: "Messaging strategy mapped to user lifecycle stages." },
      { step: "03", title: "Integration", desc: "FCM / OneSignal wired to your app with opt-in permission flows." },
      { step: "04", title: "Optimise", desc: "Weekly A/B tests on timing, copy, and rich media formats." },
    ],
    stats: [{ label: "Avg. Push CTR", value: "12.4%" },{ label: "Day-30 Retention Lift", value: "+28%" }],
    faq: [
      { question: "How do you handle notification opt-in rates?", answer: "We implement permission request best practices that consistently achieve 60%+ opt-in rates." },
      { question: "Can you personalise push notifications?", answer: "Yes — with user attributes and behavioural triggers, every notification is contextually relevant." },
    ],
  },
  {
    slug: "app-store-optimization",
    title: "App Store Optimization (ASO)",
    tagline: "Rank higher. Convert more downloads.",
    accent: "#7fd0ff",
    label: "05",
    description: "Data-driven ASO strategies for iOS App Store and Google Play — keyword research, visual creative optimisation, and rating management to maximise organic installs.",
    features: ["Keyword research & tracking","Title & description optimisation","Screenshot & preview video design","A/B testing store assets","Rating & review management","Competitor gap analysis"],
    process: [
      { step: "01", title: "Keyword Audit", desc: "Full keyword universe mapped with volume and difficulty scores." },
      { step: "02", title: "Listing Optimisation", desc: "Title, subtitle, and description rewritten for maximum index coverage." },
      { step: "03", title: "Creative Refresh", desc: "Screenshots and preview videos designed to maximise CVR." },
      { step: "04", title: "Monitor & Iterate", desc: "Weekly ranking reports and monthly creative A/B tests." },
    ],
    stats: [{ label: "Avg. Organic Install Lift", value: "+65%" },{ label: "Keyword Rankings Improved", value: "3x" }],
    faq: [
      { question: "How long before ASO shows results?", answer: "Initial keyword improvements are visible within 2–4 weeks. Full impact is typically seen at 60–90 days." },
      { question: "Do you manage reviews?", answer: "Yes — we provide review response templates and flag negative patterns for the product team." },
    ],
  },
  {
    slug: "analytics-attribution",
    title: "Analytics & Attribution",
    tagline: "Know exactly what drives growth",
    accent: "#fb923c",
    label: "06",
    description: "Full-stack mobile analytics — from Firebase event tracking to multi-touch attribution — giving you the data to make confident product decisions.",
    features: ["Firebase Analytics / Mixpanel","AppsFlyer / Adjust attribution","Custom funnel tracking","Cohort & retention analysis","Revenue analytics","BI dashboard (Looker / Metabase)"],
    process: [
      { step: "01", title: "Event Taxonomy", desc: "Define every event, property, and user attribute to track." },
      { step: "02", title: "SDK Integration", desc: "Analytics SDK wired across all key user flows." },
      { step: "03", title: "Attribution Setup", desc: "MMP configured with ad network integrations." },
      { step: "04", title: "Dashboard Build", desc: "Automated reporting dashboards delivered weekly." },
    ],
    stats: [{ label: "Event Coverage", value: "100%" },{ label: "Attribution Accuracy", value: "97%" }],
    faq: [
      { question: "Which analytics platform do you recommend?", answer: "Firebase for smaller apps, Mixpanel or Amplitude for product-led growth companies needing deep funnel analysis." },
      { question: "Can you migrate from one analytics tool to another?", answer: "Yes — we handle parallel tracking during migration to ensure no data loss." },
    ],
  },
  {
    slug: "maintenance-iteration",
    title: "Maintenance & Feature Iteration",
    tagline: "Your app, always current. Always growing.",
    accent: "#4ade80",
    label: "07",
    description: "Ongoing app maintenance covering OS updates, bug fixes, performance monitoring, and feature development sprints — so your app never falls behind.",
    features: ["Monthly OS compatibility updates","Crash monitoring (Sentry / Crashlytics)","Feature sprint planning","Performance regression testing","App Store compliance updates","Priority bug fix SLA"],
    process: [
      { step: "01", title: "Monthly Audit", desc: "Crash rates, performance metrics, and store rating reviewed." },
      { step: "02", title: "Prioritise", desc: "Bugs and features ranked by user impact and business value." },
      { step: "03", title: "Sprint", desc: "2-week development cycles with TestFlight / Play beta drops." },
      { step: "04", title: "Release", desc: "Staged rollout with rollback capability for every update." },
    ],
    stats: [{ label: "Avg. Response Time (critical bugs)", value: "<4 hrs" },{ label: "App Store Rating Maintained", value: "4.7+" }],
    faq: [
      { question: "What's included in the monthly retainer?", answer: "Bug fixes, OS update testing, one feature sprint, crash monitoring, and monthly performance review." },
      { question: "Can we pause the retainer?", answer: "Yes — retainers can be paused with 30 days notice and resumed when needed." },
    ],
  },
];
