'use client';

import React from 'react';
import Link from 'next/link';
import { 
  LogoIcon, 
  FacebookIcon, 
  InstagramIcon, 
  TwitterIcon 
} from '../common/Icons';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <div className="flex items-center">
                <LogoIcon className="h-10 w-10 text-amber-500" />
                <span className="ml-2 text-lg font-bold text-amber-400">AllinBuy</span>
              </div>
            </Link>
            <p className="text-gray-300 mb-4">
              Conectamos artesanos y emprendedores cusqueños con clientes de todo Perú. Productos auténticos con envíos a todo el país.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-300 hover:text-amber-400 transition-colors">
                <FacebookIcon className="h-6 w-6" />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-300 hover:text-amber-400 transition-colors">
                <InstagramIcon className="h-6 w-6" />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-300 hover:text-amber-400 transition-colors">
                <TwitterIcon className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Enlaces útiles */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Enlaces útiles</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/quienes-somos" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/preguntas-frecuentes" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Preguntas frecuentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Categorías */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Categorías</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categorias/artesania" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Artesanía
                </Link>
              </li>
              <li>
                <Link href="/categorias/textiles" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Textiles
                </Link>
              </li>
              <li>
                <Link href="/categorias/alimentos" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Alimentos
                </Link>
              </li>
              <li>
                <Link href="/categorias/turismo" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Turismo
                </Link>
              </li>
              <li>
                <Link href="/categorias/accesorios" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Accesorios
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Contáctanos</h3>
            <address className="not-italic text-gray-300">
              <p className="flex items-start mb-2">
                <span className="mr-2">📍</span>
                <span>Av. El Sol 123, Cusco, Perú</span>
              </p>
              <p className="flex items-start mb-2">
                <span className="mr-2">✉️</span>
                <a href="mailto:info@allinbuy.pe" className="hover:text-amber-400 transition-colors">
                  info@allinbuy.pe
                </a>
              </p>
              <p className="flex items-start">
                <span className="mr-2">📞</span>
                <a href="tel:+51984123456" className="hover:text-amber-400 transition-colors">
                  +51 984 123 456
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} AllinBuy. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <Link href="/terminos-condiciones" className="text-gray-300 hover:text-amber-400 transition-colors">
                Términos y condiciones
              </Link>
              <Link href="/politica-privacidad" className="text-gray-300 hover:text-amber-400 transition-colors">
                Política de privacidad
              </Link>
              <Link href="/politica-cookies" className="text-gray-300 hover:text-amber-400 transition-colors">
                Política de cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;