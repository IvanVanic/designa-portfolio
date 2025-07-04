// open-next.config.ts
const config = {
  default: {
    // Cloudflare Workers configuration
    platform: "cloudflare-workers",
    // Build output directory
    buildCommand: "pnpm run build",
    // Output directory for the build
    outputDirectory: ".open-next",
    // Environment variables
    env: {
      NODE_ENV: "production",
    },
  },
};
export default config;
