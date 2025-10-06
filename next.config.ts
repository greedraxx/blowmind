import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for optimal performance
  output: "export",
  
  // Optimize images for static export
  images: {
    unoptimized: true,
  },
  
  // Ensure trailing slashes for consistent URLs
  trailingSlash: true,
};

export default nextConfig;
