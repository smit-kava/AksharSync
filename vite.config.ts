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
        name: "api-handler",
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === "/api/send-email.php" && req.method === "POST") {
              // Read the body
              let body = "";
              req.on("data", (chunk) => {
                body += chunk;
              });

              req.on("end", async () => {
                try {
                  // Inject env vars into process.env for the local handler
                  Object.assign(process.env, env);

                  const data = JSON.parse(body);
                  // Import the handler dynamically
                  // @ts-ignore
                  const { default: handler } = await import("./api/send-email.js");
                  
                  // Mock req/res for the handler
                  const mockRes = {
                    status(code: number) {
                      res.statusCode = code;
                      return this;
                    },
                    json(payload: any) {
                      res.setHeader("Content-Type", "application/json");
                      res.end(JSON.stringify(payload));
                    },
                  };

                  await handler({ method: "POST", body: data }, mockRes);
                } catch (error: any) {
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: error.message }));
                }
              });
              return;
            }
            next();
          });
        },
      },
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("@mui")) {
                return "vendor-mui";
              }
              if (id.includes("framer-motion")) {
                return "vendor-framer";
              }
              if (id.includes("react")) {
                return "vendor-react";
              }
              return "vendor";
            }
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
  };
});
