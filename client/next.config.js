
/** @type {import('next').NextConfig} */

const nextConfig = {

  allowedDevOrigins: [

    "192.173.7.154",

  ],

  images: {

    remotePatterns: [

      {

        protocol: "https",

        hostname:
          "lh3.googleusercontent.com",

      },

      {

        protocol: "https",

        hostname:
          "images.unsplash.com",

      },

      {

        protocol: "https",

        hostname:
          "res.cloudinary.com",

      },

    ],

  },

};

module.exports = nextConfig;

