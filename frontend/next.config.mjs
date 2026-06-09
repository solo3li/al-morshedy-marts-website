/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["res.cloudinary.com", "images.unsplash.com"],
  },
  async rewrites() {
    const backendUrl = process.env.BACKEND_URL || (process.env.NODE_ENV === 'production' ? 'http://eshak-backend' : 'http://localhost:5256');
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
      {
        source: '/Admin/:path*',
        destination: `${backendUrl}/Admin/:path*`,
      },
      {
        source: '/images/:path*',
        destination: `${backendUrl}/images/:path*`,
      },
    ];
  },
};

export default nextConfig;
