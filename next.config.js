/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    customKey:
      "api-key 14:2023-04-21:henrik.cheng@1337.tech 100958dea4700eb7ff48d70ed312bcd1f530ad2d29c7bdae9c69c0621115f8ae",
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
