/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
