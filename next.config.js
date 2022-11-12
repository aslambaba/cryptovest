/** @type {import('next').NextConfig} */
require('dotenv').config();

const nextConfig = {
  reactStrictMode: true,
  env: {
    ContractAddress: process.env.ContractAddress_FROM_dotenv,
  },
}

module.exports = nextConfig
