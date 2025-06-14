// Archivo: src/components/home/HeroSection.js
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-amber-600 to-amber-500 text-white py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Conectando Cusco a través del comercio local
          </h1>
          <p className="text-lg mb-8">
            Descubre productos únicos elaborados por emprendedores cusqueños y apoya la economía local.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/productos" 
              className="bg-white text-amber-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-md"
            >
              Explorar productos
            </Link>
            <Link 
              href="/register" 
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
            >
              Registrarse
            </Link>
          </div>
        </div>
        <div className="hidden md:block relative h-80">
          <div className="absolute inset-0 bg-white/20 rounded-lg">
            <Image 
              src="/assets/banner.jpg"
              alt="Productos Artesanales de Cusco"
              className="w-full h-full rounded-lg object-contain p-4"
              width={608}
              height={320}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;