/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: [
    //   'avatars.githubusercontent.com',
    //   'res.cloudinary.com',
    // ],
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
      {  
        source: "/combine",
        destination: "/combineImage"
      }
    ]
  }
}

module.exports = nextConfig

