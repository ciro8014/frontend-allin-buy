'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon } from '../../../components/common/Icons';

export default function CategoriasPage() {
  // Datos de ejemplo para las categorías (mismos datos que en la página principal)
  const categories = [
    {
      id: 'artesania',
      name: 'Artesanía',
      description: 'Piezas únicas elaboradas por artesanos locales que reflejan la rica herencia cultural cusqueña. Cada artículo cuenta una historia y representa técnicas tradicionales transmitidas a través de generaciones.',
      imageClass: 'bg-amber-100',
      image: '/assets/header_playstation_image.png', // Imagen placeholder
      productCount: 47
    },
    {
      id: 'textiles',
      name: 'Textiles',
      description: 'Tejidos tradicionales con técnicas ancestrales que representan la iconografía andina. Elaborados principalmente con lana de alpaca y algodón orgánico, estos textiles destacan por sus colores vibrantes y patrones únicos.',
      imageClass: 'bg-blue-100',
      image: '/assets/macbook_image.png', // Imagen placeholder
      productCount: 36
    },
    {
      id: 'alimentos',
      name: 'Alimentos',
      description: 'Productos orgánicos y tradicionales de la región con sabores auténticos del Perú. Desde café orgánico de altura hasta chocolates artesanales y productos derivados de superalimentos andinos como la quinua y la maca.',
      imageClass: 'bg-green-100',
      image: '/assets/bose_headphone_image.png', // Imagen placeholder
      productCount: 29
    },
    {
      id: 'turismo',
      name: 'Turismo',
      description: 'Experiencias auténticas con emprendedores locales que te permiten conocer el verdadero Cusco. Tours personalizados, visitas a comunidades indígenas y experiencias gastronómicas que van más allá del turismo convencional.',
      imageClass: 'bg-purple-100',
      image: '/assets/cannon_camera_image.png', // Imagen placeholder
      productCount: 18
    },
    {
      id: 'joyeria',
      name: 'Joyería',
      description: 'Piezas de joyería artesanal cusqueña elaboradas con plata, oro y piedras semipreciosas. Cada pieza combina técnicas ancestrales con diseños contemporáneos inspirados en la iconografía inca.',
      imageClass: 'bg-red-100',
      image: '/assets/venu_watch_image.png', // Imagen placeholder
      productCount: 22
    },
    {
      id: 'ceramica',
      name: 'Cerámica',
      description: 'Cerámica artística que sigue tradiciones que han existido por siglos en la región. Desde utensilios funcionales hasta piezas decorativas con diseños incas, cada artículo es único y hecho a mano.',
      imageClass: 'bg-yellow-100',
      image: '/assets/jbl_soundbox_image.png', // Imagen placeholder
      productCount: 31
    },
    {
      id: 'moda',
      name: 'Moda Andina',
      description: 'Prendas contemporáneas con toques tradicionales que fusionan lo moderno con las técnicas textiles ancestrales. Ropa y accesorios que llevan la estética andina a la moda actual.',
      imageClass: 'bg-indigo-100',
      image: '/assets/samsung_s23phone_image.png', // Imagen placeholder
      productCount: 25
    },
    {
      id: 'decoracion',
      name: 'Decoración',
      description: 'Artículos decorativos para el hogar que traen la riqueza cultural de los Andes a cualquier espacio. Desde tapices hasta lámparas y elementos decorativos inspirados en la cultura local.',
      imageClass: 'bg-pink-100',
      image: '/assets/sony_airbuds_image.png', // Imagen placeholder
      productCount: 28
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Breadcrumbs */}
        <div className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-amber-600">Inicio</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Categorías</span>
        </div>

        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
            Categorías de Productos
          </h1>
          <p className="text-lg text-gray-700/90 mb-6 max-w-3xl mx-auto">
            Explora nuestra selección de productos artesanales y servicios organizados por categorías, 
            todos creados por emprendedores cusqueños con pasión por su cultura y tradiciones.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Link 
              key={category.id} 
              href={`/categorias/${category.id}`}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 group border border-gray-100 flex flex-col h-full"
              style={{animationDelay: `${index * 100}ms`, animation: 'fadeInUp 0.6s ease forwards'}}
            >
              <div className={`h-48 ${category.imageClass} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 opacity-70 group-hover:opacity-50 transition-opacity"></div>
                <Image 
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-contain mix-blend-multiply p-4 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-amber-800 shadow-sm">
                  {category.productCount} productos
                </div>
              </div>
              <div className="p-5 flex-grow">
                <h2 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-amber-600 transition-colors">
                  {category.name}
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{category.description}</p>
              </div>
              <div className="px-5 pb-5 mt-auto">
                <span className="text-amber-600 font-medium flex items-center">
                  Ver productos de esta categoría
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                    <ArrowRightIcon />
                  </span>
                </span>
              </div>
              <div className="h-1 w-0 bg-amber-500 group-hover:w-full transition-all duration-300"></div>
            </Link>
          ))}
        </div>

        {/* Sección de CTA */}
        <div className="mt-16 bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl p-8 md:p-12 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0 md:pr-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-amber-800">
                ¿No encuentras lo que buscas?
              </h2>
              <p className="text-amber-700 max-w-2xl">
                Contamos con un catálogo en constante crecimiento. Si tienes alguna solicitud especial 
                o estás buscando un producto artesanal específico, no dudes en contactarnos.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/productos" 
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-sm text-center"
              >
                Ver todos los productos
              </Link>
              <Link 
                href="/contacto" 
                className="border-2 border-amber-600 text-amber-700 px-6 py-3 rounded-lg font-semibold hover:bg-amber-50 transition text-center"
              >
                Contactar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}