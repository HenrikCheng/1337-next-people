/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    customKey: 'api-key 14:2023-04-05:henrik.cheng@1337.tech 1818628c1a0136bfe3d4f2146c9789fe008bc3d7dfbe7d4b923c6eac5d63c024',
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.1337co.de",
        port: "",
        pathname: "/profile/**",
      },
    ],
  },
};

module.exports = nextConfig;
