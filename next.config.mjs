/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        domains: ['www.rhodeskin.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'links.papareact.com'
            },
            {
                protocol: 'http',
                hostname: 'localhost'
            },
            {
                protocol: 'https',
                hostname: 'tartecosmetics.com'
            },
            {
                protocol: 'https',
                hostname: 'rhodeskin.com'
            }

        ]

    }
};

export default nextConfig;