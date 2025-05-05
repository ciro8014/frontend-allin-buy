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
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <LogoIcon />
            </Link>
            <p className="text-gray-400 mb-4">
              Tu tienda online para los mejores productos tecnológicos. Envíos a todo el país con los mejores precios garantizados.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FacebookIcon />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <InstagramIcon />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <TwitterIcon />
              </a>
            </div>
          </div>

          {/* Enlaces útiles */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-500">Enlaces útiles</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Preguntas frecuentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Categorías */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-500">Categorías</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=laptops" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Laptops
                </Link>
              </li>
              <li>
                <Link href="/products?category=smartphones" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Smartphones
                </Link>
              </li>
              <li>
                <Link href="/products?category=audio" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Audio
                </Link>
              </li>
              <li>
                <Link href="/products?category=accessories" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Accesorios
                </Link>
              </li>
              <li>
                <Link href="/products?category=gaming" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Gaming
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-500">Contáctanos</h3>
            <address className="not-italic">
              <p className="text-gray-400 mb-2">
                Calle Principal 123<br />
                Ciudad, CP 12345
              </p>
              <p className="text-gray-400 mb-2">
                <strong className="text-amber-500">Email:</strong><br />
                <a href="mailto:info@allinbuy.com" className="hover:text-amber-500 transition-colors">
                  info@allinbuy.com
                </a>
              </p>
              <p className="text-gray-400">
                <strong className="text-amber-500">Teléfono:</strong><br />
                <a href="tel:+34900123456" className="hover:text-amber-500 transition-colors">
                  +34 900 123 456
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} AllinBuy. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <Link href="/terms" className="text-gray-400 hover:text-amber-500 transition-colors">
                Términos y condiciones
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-amber-500 transition-colors">
                Política de privacidad
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-amber-500 transition-colors">
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