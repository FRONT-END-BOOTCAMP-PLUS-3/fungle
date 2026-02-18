/** @type {import('next').NextConfig} */
const s3Host =
  process.env.NEXT_PUBLIC_S3_IMAGE_HOST ||
  (process.env.AWS_S3_BUCKET_NAME && process.env.AWS_REGION
    ? `${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com`
    : "fungle.s3.ap-northeast-2.amazonaws.com");

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
        protocol: "https",
        hostname: s3Host,
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
