// const nextConfig = {
//   productionBrowserSourceMaps: false,
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         // hostname: 'images.unsplash.com',
//         hostname: "api-talukdar.fahimsultan.com",
//         port: "",
//         pathname: "/**",
//       },
//     ],
//   },
// };

// export default nextConfig;

const nextConfig = {
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api-talukdar.fahimsultan.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
