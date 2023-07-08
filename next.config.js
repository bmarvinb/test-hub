/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en-US", "uk"],
    defaultLocale: "en-US",
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
