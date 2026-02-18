/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fungle.s3.ap-northeast-2.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
