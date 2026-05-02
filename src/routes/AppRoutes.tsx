import { Navigate, Route, Routes } from "react-router-dom";
import { CommonLayout } from "../components";
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

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<CommonLayout />}>
        <Route path={ROUTE_PATHS.HOME} element={<LandingPage />} />
        <Route path={ROUTE_PATHS.SERVICES} element={<ServicesPage />} />

        {/* Lifecycle & Automation */}
        <Route path={ROUTE_PATHS.SERVICE_EMAIL_FLOWS} element={<ServiceDetailPage />} />
        <Route path={ROUTE_PATHS.SERVICE_CUSTOMER_JOURNEYS} element={<ServiceDetailPage />} />
        <Route path={ROUTE_PATHS.SERVICE_MULTICHANNEL_AUTOMATION} element={<ServiceDetailPage />} />

        {/* Technical Architecture */}
        <Route path={ROUTE_PATHS.SERVICE_ESP_MIGRATION} element={<ServiceDetailPage />} />
        <Route path={ROUTE_PATHS.SERVICE_CRM_DATA_SYNC} element={<ServiceDetailPage />} />
        <Route path={ROUTE_PATHS.SERVICE_DELIVERABILITY_AUDITS} element={<ServiceDetailPage />} />
        <Route path={ROUTE_PATHS.SERVICE_LIQUID_AMPSCRIPT} element={<ServiceDetailPage />} />

        {/* Creative Production */}
        <Route path={ROUTE_PATHS.SERVICE_MODULAR_TEMPLATES} element={<ServiceDetailPage />} />
        <Route path={ROUTE_PATHS.SERVICE_UX_UI_DESIGN} element={<ServiceDetailPage />} />
        <Route path={ROUTE_PATHS.SERVICE_WHITE_LABEL_SOLUTIONS} element={<ServiceDetailPage />} />

        {/* Additional Services */}
        <Route path={ROUTE_PATHS.SERVICE_DIGITAL_STRATEGY} element={<ServiceDetailPage />} />
        <Route path={ROUTE_PATHS.SERVICE_SEO} element={<ServiceDetailPage />} />
        <Route path={ROUTE_PATHS.SERVICE_CONTENT} element={<ServiceDetailPage />} />
        <Route path={ROUTE_PATHS.SERVICE_WEB_DEV} element={<ServiceDetailPage />} />

        {/* Messaging & Engagement Channels */}
        <Route path={ROUTE_PATHS.SERVICE_SMS} element={<SMSService />} />
        <Route path={ROUTE_PATHS.SERVICE_PUSH_NOTIFICATIONS} element={<PushNotification />} />
        <Route path={ROUTE_PATHS.SERVICE_WHATSAPP_MARKETING} element={<WhatsappService />} />
        <Route path={ROUTE_PATHS.SERVICE_RCS_MARKETING} element={<ServiceDetailPage />} />
        <Route path={ROUTE_PATHS.SERVICE_INSTAGRAM_DM} element={<InstagramDM />} />

        {/* Audit Services */}
        <Route path={ROUTE_PATHS.SERVICE_LIFECYCLE_AUDIT} element={<LifecycleAudit />} />
        <Route path={ROUTE_PATHS.SERVICE_CREATIVE_AUDIT} element={<CreativeAudit />} />
        <Route path={ROUTE_PATHS.SERVICE_DELIVERABILITY_AUDIT} element={<DeliverabilityAudit />} />
        <Route path={ROUTE_PATHS.SERVICE_REVENUE_AUDIT} element={<RevenueAudit />} />

        <Route path={ROUTE_PATHS.ABOUT} element={<AboutPage />} />
        <Route path={ROUTE_PATHS.WHY} element={<WhyPage />} />
        <Route path={ROUTE_PATHS.CONTACT} element={<ContactUs />} />
        <Route path="*" element={<Navigate to={ROUTE_PATHS.HOME} replace />} />
      </Route>
    </Routes>
  );
}
