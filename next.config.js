/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  // Turbopack compatibility (Next.js 16+)
  turbopack: {},

  images: {
    formats: ["image/webp"],
    minimumCacheTTL: 60,
    deviceSizes: [320, 375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
