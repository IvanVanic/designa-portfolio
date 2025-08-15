/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow loading images from an external domain
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdna.artstation.com",
      },
      {
        protocol: "https",
        hostname: "cdnb.artstation.com",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
