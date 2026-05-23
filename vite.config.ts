import { defineConfig, loadEnv } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: "/",
    plugins: [
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      {
        // ─── Local PHP-equivalent API handler ──────────────────────────────
        // Intercepts POST /api/send-email.php and runs api/send-email.js
        // (Node.js + Nodemailer) using .env.local credentials.
        // Production uses the real PHP file served by Apache.
        name: "php-email-api",
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === "/api/send-email.php" && req.method === "POST") {
              let body = "";
              req.on("data", (chunk) => { body += chunk; });
              req.on("end", async () => {
                try {
                  Object.assign(process.env, env);
                  const data = JSON.parse(body);
                  // @ts-ignore
                  const { default: handler } = await import("./api/send-email.js");
                  const mockRes = {
                    status(code: number) { res.statusCode = code; return this; },
                    json(payload: unknown) {
                      res.setHeader("Content-Type", "application/json");
                      res.end(JSON.stringify(payload));
                    },
                  };
                  await handler({ method: "POST", body: data }, mockRes);
                } catch (error: any) {
                  res.statusCode = 500;
                  res.end(JSON.stringify({ success: false, error: error.message }));
                }
              });
              return;
            }
            next();
          });
        },
      },
    ],
    server: {
      proxy: {
        // Reviews always fetched from production
        "/api/reviews": {
          target: "https://aksharsync.com",
          changeOrigin: true,
          secure: true,
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("@mui"))          return "vendor-mui";
              if (id.includes("framer-motion")) return "vendor-framer";
              if (id.includes("react"))         return "vendor-react";
              return "vendor";
            }
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
  };
});
