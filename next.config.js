/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost', 
      '127.0.0.1',
      'localhost:8000',
      '127.0.0.1:8000',
      'tu-servidor.com' // Agregar tu dominio en producción
    ],
    unoptimized: true, // Para desarrollo local
  },
  
  // Configuración para el desarrollo
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  // Configurar headers para desarrollo
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },

  // Configurar rewrites si es necesario
  async rewrites() {
    return [
      // Ejemplo para proxy de API en desarrollo
      // {
      //   source: '/api/:path*',
      //   destination: 'http://localhost/php/api/:path*',
      // },
    ];
  },
};

module.exports = nextConfig;