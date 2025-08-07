/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: process.env.BLOB_HOSTNAME
      ? [
          {
            protocol: "https",
            hostname: process.env.BLOB_HOSTNAME,
          },
        ]
      : [],
  },
};

export default nextConfig;
