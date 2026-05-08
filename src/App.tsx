import { AppRoutes } from "./routes";
import ScrollProgress from "./components/ScrollProgress";
import ScrollToTop from "./components/ScrollToTop";
import { PageLoader, CustomCursor } from "./components";

export default function App() {
  return (
    <>
      <CustomCursor />
      <PageLoader />
      <ScrollProgress />
      <AppRoutes />
      <ScrollToTop />
    </>
  );
}
