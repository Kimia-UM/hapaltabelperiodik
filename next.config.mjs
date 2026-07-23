/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',   // Generate static HTML/CSS/JS for Netlify
  trailingSlash: true, // Netlify-friendly URL format
};

export default nextConfig;
