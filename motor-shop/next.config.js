/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    api_base_url: "http://localhost:3001/",
    // api_base_url: "https://motor-shop-grupo30.onrender.com/",
    timeout: 5000,
  },
};

module.exports = nextConfig;
