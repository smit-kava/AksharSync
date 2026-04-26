import { Navigate, Route, Routes } from "react-router-dom";
import { CommonLayout } from "../components";
import LandingPage from "../pages/LandingPage";
import ServicesPage from "../pages/ServicesPage";
import ServiceDetailPage from "../pages/services/ServiceDetailPage";
import AboutPage from "../pages/AboutPage";
import WhyPage from "../pages/WhyPage";
import { ROUTE_PATHS } from "./paths";
import SMSService from "../pages/services/SMSService";

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
        <Route path={ROUTE_PATHS.SERVICE_PUSH_NOTIFICATIONS} element={<ServiceDetailPage />} />
        <Route path={ROUTE_PATHS.SERVICE_WHATSAPP_MARKETING} element={<ServiceDetailPage />} />
        <Route path={ROUTE_PATHS.SERVICE_RCS_MARKETING} element={<ServiceDetailPage />} />
        <Route path={ROUTE_PATHS.SERVICE_INSTAGRAM_DM} element={<ServiceDetailPage />} />

        <Route path={ROUTE_PATHS.ABOUT} element={<AboutPage />} />
        <Route path={ROUTE_PATHS.WHY} element={<WhyPage />} />
        <Route path="*" element={<Navigate to={ROUTE_PATHS.HOME} replace />} />
      </Route>
    </Routes>
  );
}
