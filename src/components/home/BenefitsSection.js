// Archivo: src/components/home/BenefitsSection.js
'use client';

import React from 'react';

const BenefitsSection = () => {
  const benefits = [
    {
      title: "Productos Auténticos",
      description: "Todos nuestros productos son elaborados por artesanos y emprendedores cusqueños, garantizando autenticidad y calidad.",
      icon: (
        <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L3 9V20H21V9L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Envíos Seguros",
      description: "Ofrecemos envíos a todo el Perú con seguimiento en tiempo real y embalaje seguro para proteger tus compras.",
      icon: (
        <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none">
          <path d="M12 3L3 10V21H21V10L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M16 11H8V13H16V11Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M12 15V17" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      title: "Apoyo Local",
      description: "Al comprar en Allin Buy, contribuyes directamente al desarrollo económico de las comunidades cusqueñas.",
      icon: (
        <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C8.68629 2 6 4.68629 6 8C6 11.3137 8.68629 14 12 14C15.3137 14 18 11.3137 18 8C18 4.68629 15.3137 2 12 2Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M20 22V20C20 17.7909 18.2091 16 16 16H8C5.79086 16 4 17.7909 4 20V22" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 18V22" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-amber-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
            ¿Por qué comprar en Allin Buy?
          </h2>
          <p className="text-lg text-gray-700/90 mb-6 max-w-2xl mx-auto">
            Compra con confianza y apoya a emprendedores locales
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white group relative p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-amber-50 hover:border-amber-100"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white to-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              
              <div className="relative z-10">
                <div className="mb-6 flex justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl flex items-center justify-center shadow-md">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;