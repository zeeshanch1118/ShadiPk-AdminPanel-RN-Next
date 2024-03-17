
/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   swcMinify: true,
   images: {
      domains: [
         "i.stack.imgur.com",
         "spk.shadi.pk",
         "cdn.pixabay.com",
         "shadi.pk",
         "api.shadi.pk",
         "app.shadi.pk",
         "i.ibb.co",
         "api.imgbb.com",
         "i.ibb.com",
      ],
      deviceSizes: [600, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      formats: ["image/avif", "image/webp"],
      remotePatterns: [
         {
            protocol: "https",
            hostname: "api.shadi.pk",
            port: "**",
            pathname: "/**",
         },
      ],
      minimumCacheTTL: 15000000,
   },
};

module.exports = nextConfig;
