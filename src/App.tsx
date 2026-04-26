import { AppRoutes } from "./routes";
import ScrollProgress from "./components/ScrollProgress";
import ScrollToTop from "./components/ScrollToTop";
import { PageLoader } from "./components";

export default function App() {
  return (
    <>
      <PageLoader />
      <ScrollProgress />
      <AppRoutes />
      <ScrollToTop />
    </>
  );
}
