import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CommonLayout, PageTransition } from "../components";
import { ROUTE_PATHS } from "./paths";
import { Box, LinearProgress } from "@mui/material";

// Statically import home page for maximum initial load performance
import LandingPage from "../pages/LandingPage";

// Lazy-loaded routes for code splitting
const ServicesPage = lazy(() => import("../pages/ServicesPage"));
const ServiceDetailPage = lazy(() => import("../pages/services/ServiceDetailPage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const WhyPage = lazy(() => import("../pages/WhyPage"));
const SMSService = lazy(() => import("../pages/services/SocialMediaservices/SMSService"));
const WhatsappService = lazy(() => import("../pages/services/SocialMediaservices/WhatsappService"));
const LifecycleAudit = lazy(() => import("../pages/services/LifecycleAudit"));
const CreativeAudit = lazy(() => import("../pages/services/CreativeAudit"));
const DeliverabilityAudit = lazy(() => import("../pages/services/DeliverabilityAudit"));
const RevenueAudit = lazy(() => import("../pages/services/RevenueAudit"));
const PushNotification = lazy(() => import("../pages/services/SocialMediaservices/PushNotification"));
const InstagramDM = lazy(() => import("../pages/services/SocialMediaservices/InstagramDM"));
const ContactUs = lazy(() => import("../pages/ContactUs"));
const KlaviyoAuditPage = lazy(() => import("../pages/KlaviyoAuditPage"));
const RetentionAuditBooking = lazy(() => import("../pages/RetentionAuditBooking"));
const WriteReview = lazy(() => import("../pages/WriteReview"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const WebDevelopmentService = lazy(() => import("../pages/services/WebDevelopmentService"));
const AppDevelopmentService = lazy(() => import("../pages/services/AppDevelopmentService"));
const SubServiceDetailPage = lazy(() => import("../pages/services/SubServiceDetailPage"));

const LazyLoader = () => (
  <Box sx={{ width: "100%", position: "fixed", top: 0, left: 0, zIndex: 9999 }}>
    <LinearProgress 
      sx={{ 
        height: 3, 
        bgcolor: "rgba(56,189,248,0.1)",
        "& .MuiLinearProgress-bar": {
          background: "linear-gradient(90deg, #38bdf8, #818cf8)",
        }
      }} 
    />
  </Box>
);

export function AppRoutes() {
  const location = useLocation();

  return (
    <Suspense fallback={<LazyLoader />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<CommonLayout />}>
            <Route path={ROUTE_PATHS.HOME} element={<PageTransition><LandingPage /></PageTransition>} />
            <Route path={ROUTE_PATHS.SERVICES} element={<PageTransition><ServicesPage /></PageTransition>} />

            {/* Lifecycle & Automation */}
            <Route path={ROUTE_PATHS.SERVICE_EMAIL_FLOWS} element={<PageTransition><ServiceDetailPage /></PageTransition>} />
            <Route path={ROUTE_PATHS.SERVICE_CUSTOMER_JOURNEYS} element={<PageTransition><ServiceDetailPage /></PageTransition>} />
            <Route path={ROUTE_PATHS.SERVICE_MULTICHANNEL_AUTOMATION} element={<PageTransition><ServiceDetailPage /></PageTransition>} />

            {/* Technical Architecture */}
            <Route path={ROUTE_PATHS.SERVICE_ESP_MIGRATION} element={<PageTransition><ServiceDetailPage /></PageTransition>} />
            <Route path={ROUTE_PATHS.SERVICE_CRM_DATA_SYNC} element={<PageTransition><ServiceDetailPage /></PageTransition>} />
            <Route path={ROUTE_PATHS.SERVICE_DELIVERABILITY_AUDITS} element={<PageTransition><ServiceDetailPage /></PageTransition>} />
            <Route path={ROUTE_PATHS.SERVICE_LIQUID_AMPSCRIPT} element={<PageTransition><ServiceDetailPage /></PageTransition>} />

            {/* Creative Production */}
            <Route path={ROUTE_PATHS.SERVICE_MODULAR_TEMPLATES} element={<PageTransition><ServiceDetailPage /></PageTransition>} />
            <Route path={ROUTE_PATHS.SERVICE_UX_UI_DESIGN} element={<PageTransition><ServiceDetailPage /></PageTransition>} />
            <Route path={ROUTE_PATHS.SERVICE_WHITE_LABEL_SOLUTIONS} element={<PageTransition><ServiceDetailPage /></PageTransition>} />

            {/* Additional Services */}
            <Route path={ROUTE_PATHS.SERVICE_DIGITAL_STRATEGY} element={<PageTransition><ServiceDetailPage /></PageTransition>} />
            <Route path={ROUTE_PATHS.SERVICE_SEO} element={<PageTransition><ServiceDetailPage /></PageTransition>} />
            <Route path={ROUTE_PATHS.SERVICE_CONTENT} element={<PageTransition><ServiceDetailPage /></PageTransition>} />
            {/* Messaging & Engagement Channels */}
            <Route path={ROUTE_PATHS.SERVICE_SMS} element={<PageTransition><SMSService /></PageTransition>} />
            <Route path={ROUTE_PATHS.SERVICE_PUSH_NOTIFICATIONS} element={<PageTransition><PushNotification /></PageTransition>} />
            <Route path={ROUTE_PATHS.SERVICE_WHATSAPP_MARKETING} element={<PageTransition><WhatsappService /></PageTransition>} />
            {/* <Route path={ROUTE_PATHS.SERVICE_RCS_MARKETING} element={<PageTransition><ServiceDetailPage /></PageTransition>} /> */}
            <Route path={ROUTE_PATHS.SERVICE_INSTAGRAM_DM} element={<PageTransition><InstagramDM /></PageTransition>} />

            {/* Audit Services */}
            <Route path={ROUTE_PATHS.SERVICE_LIFECYCLE_AUDIT} element={<PageTransition><LifecycleAudit /></PageTransition>} />
            <Route path={ROUTE_PATHS.SERVICE_CREATIVE_AUDIT} element={<PageTransition><CreativeAudit /></PageTransition>} />
            <Route path={ROUTE_PATHS.SERVICE_DELIVERABILITY_AUDIT} element={<PageTransition><DeliverabilityAudit /></PageTransition>} />
            <Route path={ROUTE_PATHS.SERVICE_REVENUE_AUDIT} element={<PageTransition><RevenueAudit /></PageTransition>} />

            {/* Core Development Services */}
            <Route path={ROUTE_PATHS.SERVICE_WEB_DEVELOPMENT} element={<PageTransition><WebDevelopmentService /></PageTransition>} />
            <Route path={ROUTE_PATHS.SERVICE_APP_DEVELOPMENT} element={<PageTransition><AppDevelopmentService /></PageTransition>} />

            {/* Development Sub-Services */}
            <Route path={`${ROUTE_PATHS.SERVICE_WEB_DEVELOPMENT}/:subSlug`} element={<PageTransition><SubServiceDetailPage category="web" /></PageTransition>} />
            <Route path={`${ROUTE_PATHS.SERVICE_APP_DEVELOPMENT}/:subSlug`} element={<PageTransition><SubServiceDetailPage category="app" /></PageTransition>} />

            <Route path={ROUTE_PATHS.ABOUT} element={<PageTransition><AboutPage /></PageTransition>} />
            <Route path={ROUTE_PATHS.WHY} element={<PageTransition><WhyPage /></PageTransition>} />
            <Route path={ROUTE_PATHS.CONTACT} element={<PageTransition><ContactUs /></PageTransition>} />
            <Route path={ROUTE_PATHS.KLAVIYO_AUDIT} element={<PageTransition><KlaviyoAuditPage /></PageTransition>} />
            <Route path={ROUTE_PATHS.RETENTION_AUDIT_BOOKING} element={<PageTransition><RetentionAuditBooking /></PageTransition>} />
          </Route>

          {/* Standalone Pages (No Footer/Nav) */}
          <Route path={ROUTE_PATHS.WRITE_REVIEW} element={<PageTransition><WriteReview /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}
