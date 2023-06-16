/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    api_base_url: "http://localhost:3001/",
    timeout: 5000,
  },
};

module.exports = nextConfig;
