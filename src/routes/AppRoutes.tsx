import { Navigate, Route, Routes } from "react-router-dom";
import { CommonLayout } from "../components";
import LandingPage from "../pages/LandingPage";
import SolutionsPage from "../pages/SolutionsPage";
import ServicesPage from "../pages/ServicesPage";
import AboutPage from "../pages/AboutPage";
import WhyPage from "../pages/WhyPage";
import { ROUTE_PATHS } from "./paths";


export function AppRoutes() {
  return (
    <Routes>
      <Route element={<CommonLayout />}>
        <Route path={ROUTE_PATHS.HOME} element={<LandingPage />} />
        <Route path={ROUTE_PATHS.SOLUTIONS} element={<SolutionsPage />} />
        <Route path={ROUTE_PATHS.SERVICES} element={<ServicesPage />} />
        <Route path={ROUTE_PATHS.SERVICE_DIGITAL_STRATEGY} element={<ServicesPage />} />
        <Route path={ROUTE_PATHS.SERVICE_SEO} element={<ServicesPage />} />
        <Route path={ROUTE_PATHS.SERVICE_CONTENT} element={<ServicesPage />} />
        <Route path={ROUTE_PATHS.SERVICE_WEB_DEV} element={<ServicesPage />} />
        <Route path={ROUTE_PATHS.ABOUT} element={<AboutPage />} />
        <Route path={ROUTE_PATHS.WHY} element={<WhyPage />} />
        <Route path="*" element={<Navigate to={ROUTE_PATHS.HOME} replace />} />
      </Route>
    </Routes>
  );
}
