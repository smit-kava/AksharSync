import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CommonLayout, PageTransition } from "../components";
import LandingPage from "../pages/LandingPage";
import ServicesPage from "../pages/ServicesPage";
import ServiceDetailPage from "../pages/services/ServiceDetailPage";
import AboutPage from "../pages/AboutPage";
import WhyPage from "../pages/WhyPage";
import { ROUTE_PATHS } from "./paths";
import SMSService from "../pages/services/SocialMediaservices/SMSService";
import WhatsappService from "../pages/services/SocialMediaservices/WhatsappService";
import LifecycleAudit from "../pages/services/LifecycleAudit";
import CreativeAudit from "../pages/services/CreativeAudit";
import DeliverabilityAudit from "../pages/services/DeliverabilityAudit";
import RevenueAudit from "../pages/services/RevenueAudit";
import PushNotification from "../pages/services/SocialMediaservices/PushNotification";
import InstagramDM from "../pages/services/SocialMediaservices/InstagramDM";
import ContactUs from "../pages/ContactUs";
import KlaviyoAuditPage from "../pages/KlaviyoAuditPage";
import RetentionAuditBooking from "../pages/RetentionAuditBooking";
import WriteReview from "../pages/WriteReview";

export function AppRoutes() {
  const location = useLocation();

  return (
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
          <Route path={ROUTE_PATHS.SERVICE_WEB_DEV} element={<PageTransition><ServiceDetailPage /></PageTransition>} />

          {/* Messaging & Engagement Channels */}
          <Route path={ROUTE_PATHS.SERVICE_SMS} element={<PageTransition><SMSService /></PageTransition>} />
          <Route path={ROUTE_PATHS.SERVICE_PUSH_NOTIFICATIONS} element={<PageTransition><PushNotification /></PageTransition>} />
          <Route path={ROUTE_PATHS.SERVICE_WHATSAPP_MARKETING} element={<PageTransition><WhatsappService /></PageTransition>} />
          <Route path={ROUTE_PATHS.SERVICE_RCS_MARKETING} element={<PageTransition><ServiceDetailPage /></PageTransition>} />
          <Route path={ROUTE_PATHS.SERVICE_INSTAGRAM_DM} element={<PageTransition><InstagramDM /></PageTransition>} />

          {/* Audit Services */}
          <Route path={ROUTE_PATHS.SERVICE_LIFECYCLE_AUDIT} element={<PageTransition><LifecycleAudit /></PageTransition>} />
          <Route path={ROUTE_PATHS.SERVICE_CREATIVE_AUDIT} element={<PageTransition><CreativeAudit /></PageTransition>} />
          <Route path={ROUTE_PATHS.SERVICE_DELIVERABILITY_AUDIT} element={<PageTransition><DeliverabilityAudit /></PageTransition>} />
          <Route path={ROUTE_PATHS.SERVICE_REVENUE_AUDIT} element={<PageTransition><RevenueAudit /></PageTransition>} />

          <Route path={ROUTE_PATHS.ABOUT} element={<PageTransition><AboutPage /></PageTransition>} />
          <Route path={ROUTE_PATHS.WHY} element={<PageTransition><WhyPage /></PageTransition>} />
          <Route path={ROUTE_PATHS.CONTACT} element={<PageTransition><ContactUs /></PageTransition>} />
          <Route path={ROUTE_PATHS.KLAVIYO_AUDIT} element={<PageTransition><KlaviyoAuditPage /></PageTransition>} />
          <Route path={ROUTE_PATHS.RETENTION_AUDIT_BOOKING} element={<PageTransition><RetentionAuditBooking /></PageTransition>} />
          <Route path="*" element={<Navigate to={ROUTE_PATHS.HOME} replace />} />
        </Route>

        {/* Standalone Pages (No Footer/Nav) */}
        <Route path={ROUTE_PATHS.WRITE_REVIEW} element={<PageTransition><WriteReview /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}
