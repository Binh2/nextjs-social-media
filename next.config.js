/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'res.cloudinary.com',
      'i.pinimg.com',
    ],
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'avatars.githubusercontent.com',
    //     port: '',
    //     pathname: '/u/*',
    //   },
    //   {
    //     protocol: 'https',
    //     hostname: 'res.cloudinary.com',
    //     port: '',
    //     pathname: '/*/image/upload/**',
    //   }
    // ],
  }
}

module.exports = nextConfig

