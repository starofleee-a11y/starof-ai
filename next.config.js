/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return [{ source: "/workflow", destination: "/consulting", permanent: true }];
  },
};
module.exports = nextConfig;
