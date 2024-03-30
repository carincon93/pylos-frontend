/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: process.env.NEXT_PUBLIC_NESTJS_PROTOCOL,
                hostname: process.env.NEXT_PUBLIC_DOMAIN,
                port: process.env.NEXT_PUBLIC_NESTJS_PORT,
                pathname: '/uploads/**',
            },
        ],
    },
}

export default nextConfig
