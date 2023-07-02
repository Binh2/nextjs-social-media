/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // loader: 'custom',
    // loaderFile: '/src/lib/imageLoader.ts',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/*',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/*/image/upload/**'
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        port: '',
        pathname: '/**'
      }
    ],
  },
  async rewrites() {
    return [
      // {  
      //   source: "/combineImage",
      //   destination: "/combine"
      // }
      // {
      //   destination: "http://localhost:80/api",
      //   source: "/api"
      // }
    ]
  },
  // eslint: {
  //   ignoreDuringBuilds: true
  // },
}

module.exports = nextConfig

