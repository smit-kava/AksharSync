import { AppRoutes } from "./routes";
import ScrollProgress from "./components/ScrollProgress";
import ScrollToTop from "./components/ScrollToTop";
import { PageLoader, CustomCursor } from "./components";
import { SmoothScroll } from "./components/SmoothScroll";

export default function App() {
  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <PageLoader />
      <ScrollProgress />
      <AppRoutes />
      <ScrollToTop />
    </>
  );
}
