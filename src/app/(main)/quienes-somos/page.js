'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function QuienesSomosPage() {
  // Miembros del equipo
  const teamMembers = [
    {
      name: "María Sánchez",
      role: "Fundadora y CEO",
      bio: "Emprendedora cusqueña con más de 10 años de experiencia en comercio electrónico y desarrollo comunitario. Su visión es conectar artesanos locales con mercados globales.",
      image: "/assets/girl_with_headphone_image.png"
    },
    {
      name: "Carlos Huamán",
      role: "Director de Operaciones",
      bio: "Especialista en logística con enfoque en zonas rurales. Ha desarrollado sistemas de distribución eficientes adaptados a la geografía andina.",
      image: "/assets/boy_with_laptop_image.png"
    },
    {
      name: "Laura Pacheco",
      role: "Coordinadora de Artesanos",
      bio: "Artesana textil de Chinchero con amplio conocimiento en técnicas ancestrales. Facilita la capacitación y onboarding de artesanos a la plataforma.",
      image: "/assets/girl_with_earphone_image.png"
    },
    {
      name: "Roberto Quispe",
      role: "Director de Tecnología",
      bio: "Ingeniero de software cusqueño con experiencia en startups tecnológicas. Lidera el desarrollo de soluciones digitales accesibles para comunidades rurales.",
      image: "/assets/header_macbook_image.png"
    }
  ];

  // Valores de la empresa
  const values = [
    {
      title: "Autenticidad",
      description: "Promovemos y preservamos las técnicas artesanales auténticas y la identidad cultural cusqueña.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      )
    },
    {
      title: "Comercio Justo",
      description: "Garantizamos precios justos y transparentes que reconocen el valor del trabajo artesanal y apoyan la economía local.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
        </svg>
      )
    },
    {
      title: "Sostenibilidad",
      description: "Promovemos prácticas ambientalmente responsables en toda nuestra cadena de valor, desde la producción hasta la entrega.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
        </svg>
      )
    },
    {
      title: "Innovación",
      description: "Combinamos tradición con tecnología para crear soluciones que potencien el alcance y crecimiento de los emprendimientos locales.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-amber-600 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image 
            src="/assets/header_playstation_image.png"
            alt="Artesanía cusqueña"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-amber-500 opacity-90 z-10"></div>
        
        <div className="container mx-auto px-4 py-20 relative z-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Quiénes Somos</h1>
            <p className="text-xl opacity-90 mb-8">
              Conectando el talento cusqueño con el mundo a través del comercio electrónico sostenible
            </p>
            <div className="w-20 h-1 bg-white mx-auto rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="text-sm text-gray-500">
            <Link href="/" className="hover:text-amber-600">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">Quiénes Somos</span>
          </div>
        </div>
      </div>

      {/* Nuestra Historia */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Nuestra Historia</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <span className="font-semibold text-amber-700">Allin Buy</span> nació en 2025 como respuesta a la necesidad de conectar a 
                  los talentosos artesanos y emprendedores de la región de Cusco con mercados más amplios, 
                  aprovechando el potencial del comercio electrónico.
                </p>
                <p>
                  Todo comenzó cuando María Sánchez, nuestra fundadora, observó cómo muchos artesanos 
                  locales luchaban por dar visibilidad a sus extraordinarios productos más allá 
                  del turismo estacional. Con su experiencia en comercio electrónico y su pasión 
                  por la cultura cusqueña, desarrolló un modelo que combina la tecnología con un 
                  enfoque comunitario.
                </p>
                <p>
                  Hoy, <span className="font-semibold text-amber-700">Allin Buy</span> se ha convertido en una plataforma que no solo comercializa 
                  productos, sino que preserva técnicas ancestrales, fomenta el emprendimiento local 
                  y promueve un modelo de negocio sostenible que beneficia directamente a las comunidades.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="/assets/girl_with_earphone_image.png"
                alt="Historia de Allin Buy"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <p className="text-white text-lg font-medium">"Conectando tradición con innovación"</p>
                <p className="text-white/80 text-sm">- María Sánchez, Fundadora</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-md border border-amber-100">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-amber-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Nuestra Misión</h3>
              <p className="text-gray-700 leading-relaxed">
                Empoderar a los emprendedores cusqueños facilitando su acceso al mercado digital, 
                promoviendo el comercio justo y preservando la autenticidad de sus productos.
                Buscamos crear un impacto positivo en las comunidades artesanales, mejorando 
                su calidad de vida a través del comercio sostenible.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md border border-amber-100">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-amber-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Nuestra Visión</h3>
              <p className="text-gray-700 leading-relaxed">
                Ser la plataforma líder en comercio electrónico de productos artesanales y tradicionales 
                en Perú, reconocida por su impacto social positivo, su compromiso con la sostenibilidad 
                y por ser un puente entre la rica herencia cultural cusqueña y consumidores globales
                que valoran la autenticidad y la calidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestros Valores */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
              Nuestros Valores
            </h2>
            <p className="text-lg text-gray-700/90 mb-6 max-w-3xl mx-auto">
              Los principios que guían cada decisión que tomamos y definen nuestra cultura
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-50 to-amber-100 rounded-full flex items-center justify-center mb-6 text-amber-600">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nuestro Equipo */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
              Nuestro Equipo
            </h2>
            <p className="text-lg text-gray-700/90 mb-6 max-w-3xl mx-auto">
              Personas comprometidas con hacer realidad nuestra misión
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-all border border-gray-100"
                style={{animation: `fadeIn 0.5s ease forwards ${index * 0.1}s`, opacity: 0}}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 group-hover:opacity-70 transition-opacity"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-gray-900">{member.name}</h3>
                  <p className="text-amber-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                  <div className="flex mt-4">
                    <a href="#" className="text-gray-400 hover:text-amber-600 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M22.5 12.066c0-5.799-4.702-10.5-10.5-10.5s-10.5 4.7-10.5 10.5c0 5.24 3.84 9.584 8.86 10.373v-7.337h-2.668v-3.036h2.668V9.74c0-2.633 1.568-4.085 3.97-4.085 1.15 0 2.352.205 2.352.205v2.584h-1.324c-1.303 0-1.71.81-1.71 1.64v1.97h2.912l-.465 3.036h-2.447v7.337c5.02-.788 8.859-5.131 8.859-10.372z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-amber-600 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.489.5.092.682-.217.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.532 1.03 1.532 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.934.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-amber-600">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Invitación y CTA */}
      <section className="py-16 bg-amber-600 text-white">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-3xl font-bold mb-6">Sé parte de nuestra comunidad</h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Ya sea como cliente o como emprendedor, te invitamos a unirte a nuestra misión 
            de conectar el talento cusqueño con el mundo.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/productos" 
              className="bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
            >
              Explorar productos
            </Link>
            <Link 
              href="/register?type=vendor" 
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
            >
              Unirme como vendedor
            </Link>
          </div>
        </div>
      </section>

      {/* Sección de Contacto */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
              Contáctanos
            </h2>
            <p className="text-lg text-gray-700/90 mb-6 max-w-3xl mx-auto">
              Estamos aquí para responder a tus preguntas y escuchar tus sugerencias
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">Dirección</h3>
                      <p className="mt-1 text-gray-700">
                        Av. El Sol 123<br />
                        Cusco, Perú
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                      <p className="mt-1 text-gray-700">
                        info@allinbuy.pe<br />
                        soporte@allinbuy.pe
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">Teléfono</h3>
                      <p className="mt-1 text-gray-700">
                        +51 84 123 456<br />
                        +51 987 654 321
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">Horario de atención</h3>
                      <p className="mt-1 text-gray-700">
                        Lunes a Viernes: 9:00 AM - 6:00 PM<br />
                        Sábado: 9:00 AM - 1:00 PM
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex space-x-4">
                  <a href="#" className="text-gray-600 hover:text-amber-600">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.5 12.066c0-5.799-4.702-10.5-10.5-10.5s-10.5 4.7-10.5 10.5c0 5.24 3.84 9.584 8.86 10.373v-7.337h-2.668v-3.036h2.668V9.74c0-2.633 1.568-4.085 3.97-4.085 1.15 0 2.352.205 2.352.205v2.584h-1.324c-1.303 0-1.71.81-1.71 1.64v1.97h2.912l-.465 3.036h-2.447v7.337c5.02-.788 8.859-5.131 8.859-10.372z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-amber-600">
                    <span className="sr-only">Instagram</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-amber-600">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-6 text-gray-900">Envíanos un mensaje</h3>
                <form>
                  <div className="grid grid-cols-1 gap-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Nombre completo
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="py-3 px-4 block w-full shadow-sm focus:ring-amber-500 focus:border-amber-500 border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <div className="mt-1">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="py-3 px-4 block w-full shadow-sm focus:ring-amber-500 focus:border-amber-500 border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Teléfono
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          className="py-3 px-4 block w-full shadow-sm focus:ring-amber-500 focus:border-amber-500 border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Mensaje
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          className="py-3 px-4 block w-full shadow-sm focus:ring-amber-500 focus:border-amber-500 border-gray-300 rounded-md"
                        ></textarea>
                      </div>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="w-full bg-amber-600 py-3 px-6 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition"
                      >
                        Enviar mensaje
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}