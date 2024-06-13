/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'links.papareact.com'
            },
            {
                protocol: 'https',
                hostname: 'tartecosmetics.com'
            }
        ]
    }
};

export default nextConfig;


// ,
//     async headers() {
//         return [
//             {
//                 // matching all API routes
//                 source: "/api/:path*",
//                 headers: [
//                     { key: "Access-Control-Allow-Credentials", value: "true" },
//                     { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
//                     { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
//                     { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, Authorization SecretSessionId" },
//                 ]
//             }
//         ]
//     }