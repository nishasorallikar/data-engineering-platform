import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Speed up production builds by ignoring TS and ESLint checks during the build step.
  // (You should ensure these are run locally or in a separate CI step)
  typescript: {
    ignoreBuildErrors: true,
  },

  experimental: {
    // Optimizes imports from large libraries by only loading modules you actually use
    optimizePackageImports: ["lucide-react", "framer-motion", "shadcn", "@base-ui/react"],
  },
  // Ensure we are fully utilizing Turbopack where possible
  // Compiler options can also go here (e.g. removeConsole: process.env.NODE_ENV === "production")
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
};

export default nextConfig;
