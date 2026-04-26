import { AppRoutes } from "./routes";
import ScrollProgress from "./components/ScrollProgress";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <>
      <ScrollProgress />
      <AppRoutes />
      <ScrollToTop />
    </>
  );
}
