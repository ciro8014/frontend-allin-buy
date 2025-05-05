/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    remotePatterns: [],
    unoptimized: false, // Cambiar a true si hay problemas específicos con la optimización
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    disableStaticImages: false, // Mantiene habilitada la importación estática de imágenes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  webpack(config) {
    // Configuración optimizada para el manejo de archivos de imagen
    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|svg|webp|ico)$/i,
      issuer: { and: [/\.(js|jsx|ts|tsx|mdx)$/] },
      type: 'asset/resource',
    });
    
    return config;
  },
};

export default nextConfig;
