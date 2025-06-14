// Archivo: src/components/home/VendorCTA.js
'use client';

import React from 'react';
import Link from 'next/link';

const VendorCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-amber-50 to-amber-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">
          <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
            Emprendedores Cusqueños
          </span>
        </h2>
        
        <p className="text-lg text-amber-800 mb-10 max-w-2xl mx-auto leading-relaxed">
          Conecta con clientes a nivel nacional y muestra tus productos en nuestra plataforma digital. 
          <span className="block mt-2 font-medium">¡Impulsa tus ventas hoy mismo!</span>
        </p>
        
        <Link 
          href="/register?type=vendor" 
          className="inline-block px-8 py-3.5 bg-gradient-to-br from-amber-400 to-amber-600 text-white rounded-lg 
                    font-semibold text-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-200 
                    shadow-md active:scale-95"
        >
          🛍️ Registrar mi negocio
        </Link>
        
        <div className="mt-8 flex justify-center space-x-4">
          <div className="w-3 h-3 bg-amber-300 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-amber-400 rounded-full animate-bounce delay-100"></div>
          <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </section>
  );
};

export default VendorCTA;