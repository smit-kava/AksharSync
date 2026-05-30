import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
}

const BASE_URL = "https://aksharsync.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/favicon.svg`;

/**
 * SEO component — drop into any page to set per-page <head> meta tags.
 * Usage:  <SEO title="About Us" description="..." />
 */
export function SEO({
  title,
  description = "AksharSync provides Email Marketing, WhatsApp Marketing, Instagram Marketing, Template Design, Automation Services and Digital Business Solutions.",
  keywords = "AksharSync, Email Marketing, WhatsApp Marketing, Instagram Marketing, Template Design, Digital Marketing, Business Automation, CRM, Lifecycle, Klaviyo",
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
}: SEOProps) {
  const fullTitle = title
    ? `${title} | AksharSync`
    : "AksharSync | Email, WhatsApp & Digital Marketing Services";

  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : BASE_URL;

  return (
    <Helmet>
      {/* ── Primary ── */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="AksharSync" />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      <link rel="canonical" href={canonicalUrl} />

      {/* ── Open Graph ── */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="AksharSync" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content="AksharSync Logo" />
      <meta property="og:locale" content="en_US" />

      {/* ── Twitter ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@Aksharsync" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* ── JSON-LD Structured Data ── */}
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "AksharSync",
        "url": BASE_URL,
        "logo": `${BASE_URL}/favicon.svg`,
        "description": description,
        "foundingDate": "2014",
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer support",
          "url": `${BASE_URL}/contact`,
        },
        "sameAs": [
          "https://x.com/Aksharsync",
          "https://www.instagram.com/aksharsync",
        ],
      })}</script>
    </Helmet>
  );
}

export default SEO;
