'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// En una aplicación real, estos datos vendrían de una API
const getProductById = (id) => {
  const products = {
    '1': {
      id: 1, 
      name: "Chal de alpaca trenzado", 
      price: 89.99,
      description: "Chal artesanal elaborado con lana de alpaca pura, tejido a mano por artesanas cusqueñas con técnicas ancestrales. Suavidad y calidez excepcionales. Disponible en colores naturales con diseños geométricos tradicionales que representan la cosmovisión andina.",
      images: [
        "/assets/macbook_image.png", // Usando imágenes de placeholder
        "/assets/product_details_page_apple_earphone_image1.png",
        "/assets/product_details_page_apple_earphone_image2.png",
        "/assets/product_details_page_apple_earphone_image3.png"
      ],
      category: "Textiles",
      seller: {
        name: "Textiles Andinos",
        rating: 4.7,
        products: 24,
        joinedDate: "Marzo 2022"
      },
      rating: 4.5,
      reviewCount: 27,
      stock: 15,
      specifications: [
        { name: "Material", value: "100% lana de alpaca" },
        { name: "Tamaño", value: "180 x 60 cm" },
        { name: "Peso", value: "250 gramos" },
        { name: "Técnica", value: "Tejido a mano en telar tradicional" },
        { name: "Origen", value: "Comunidad de Chinchero, Cusco" },
        { name: "Cuidados", value: "Lavado en seco recomendado" }
      ],
      reviews: [
        {
          id: 1,
          user: "María L.",
          date: "12 Abril, 2025",
          rating: 5,
          comment: "La calidad es increíble, muy suave al tacto y los colores son hermosos. El envío fue rápido y llegó bien empaquetado."
        },
        {
          id: 2,
          user: "Carlos R.",
          date: "28 Marzo, 2025",
          rating: 4,
          comment: "Excelente producto, muy cálido y con lindos acabados. Le quito una estrella porque los colores son un poco diferentes a los de la foto."
        },
        {
          id: 3,
          user: "Ana P.",
          date: "15 Marzo, 2025",
          rating: 5,
          comment: "Compré este chal como regalo para mi madre y quedó encantada. La calidad del tejido es exquisita y se nota que es un producto artesanal genuino."
        }
      ],
      relatedProducts: [2, 6, 8]
    },
    '2': {
      id: 2, 
      name: "Cerámica artesanal Inca", 
      price: 120.00,
      description: "Pieza de cerámica artesanal inspirada en diseños incas tradicionales. Cada pieza es modelada y pintada a mano por maestros ceramistas de la región de Cusco, utilizando técnicas ancestrales transmitidas por generaciones. Ideal para decoración o como objeto de colección.",
      images: [
        "/assets/bose_headphone_image.png", // Usando imágenes de placeholder
        "/assets/product_details_page_apple_earphone_image2.png",
        "/assets/product_details_page_apple_earphone_image3.png",
        "/assets/product_details_page_apple_earphone_image4.png"
      ],
      category: "Artesanía",
      seller: {
        name: "ArteCusco",
        rating: 4.9,
        products: 37,
        joinedDate: "Enero 2021"
      },
      rating: 5,
      reviewCount: 18,
      stock: 8,
      specifications: [
        { name: "Material", value: "Arcilla natural" },
        { name: "Altura", value: "25 cm" },
        { name: "Diámetro", value: "15 cm" },
        { name: "Técnica", value: "Modelado a mano" },
        { name: "Pintura", value: "Pigmentos naturales" },
        { name: "Origen", value: "San Sebastián, Cusco" }
      ],
      reviews: [
        {
          id: 1,
          user: "Pedro M.",
          date: "5 Abril, 2025",
          rating: 5,
          comment: "Increíble pieza de artesanía, la calidad y los detalles son impresionantes. Estoy muy satisfecho con mi compra."
        },
        {
          id: 2,
          user: "Laura T.",
          date: "22 Marzo, 2025",
          rating: 5,
          comment: "Una verdadera obra de arte, los colores y acabados son incluso mejores que en las fotos. Llegó perfectamente embalada."
        }
      ],
      relatedProducts: [1, 3, 4]
    }
  };
  
  return products[id] || null;
};

export default function ProductDetailPage({ params }) {
  const { id } = params;
  const product = getProductById(id);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  // Si el producto no existe
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
        <p className="mb-8">Lo sentimos, el producto que estás buscando no existe o ha sido eliminado.</p>
        <Link 
          href="/products" 
          className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-6 rounded-lg transition"
        >
          Volver al catálogo
        </Link>
      </div>
    );
  }

  // Generar estrellas para la calificación
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <Image 
            key={i}
            src="/assets/star_icon.svg"
            alt="Estrella"
            width={16}
            height={16}
            className="inline-block"
          />
        );
      } else if (i - 0.5 <= rating) {
        stars.push(
          <Image 
            key={i}
            src="/assets/star_icon.svg"
            alt="Media estrella"
            width={16}
            height={16}
            className="inline-block opacity-60"
          />
        );
      } else {
        stars.push(
          <Image 
            key={i}
            src="/assets/star_dull_icon.svg"
            alt="Estrella vacía"
            width={16}
            height={16}
            className="inline-block"
          />
        );
      }
    }
    return stars;
  };

  // Manejar cambios de cantidad
  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(prevQuantity => prevQuantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  // Manejar añadir al carrito
  const handleAddToCart = () => {
    // En una implementación real, esto se conectaría con el estado global o API
    console.log('Añadir al carrito:', { ...product, quantity });
    alert(`${quantity} unidad(es) de ${product.name} añadido(s) al carrito`);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-amber-600">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-amber-600">Productos</Link>
          <span className="mx-2">/</span>
          <Link href={`/categories/${product.category.toLowerCase()}`} className="hover:text-amber-600">
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{product.name}</span>
        </div>

        {/* Sección principal de producto */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Imágenes del producto */}
            <div>
              <div className="relative h-80 md:h-96 mb-4 rounded-lg overflow-hidden border border-gray-200">
                <Image 
                  src={product.images[selectedImage]} 
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex space-x-4 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <div 
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 border rounded-md cursor-pointer transition ${
                      selectedImage === index 
                        ? 'border-amber-500 shadow-sm' 
                        : 'border-gray-200 hover:border-amber-300'
                    }`}
                  >
                    <Image 
                      src={image} 
                      alt={`${product.name} - Imagen ${index + 1}`}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Información del producto */}
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-500">
                  {product.rating.toFixed(1)} ({product.reviewCount} reseñas)
                </span>
              </div>

              <div className="flex items-center mb-6">
                <Link href={`/vendor/${product.seller.name.toLowerCase().replace(' ', '-')}`} className="text-gray-600 hover:text-amber-600 transition">
                  Vendido por: <span className="font-medium">{product.seller.name}</span>
                </Link>
                <span className="mx-2 text-gray-300">|</span>
                <div className="flex items-center">
                  <div className="flex mr-1">
                    {renderStars(product.seller.rating)}
                  </div>
                  <span className="text-sm text-gray-500">{product.seller.rating}</span>
                </div>
              </div>

              <div className="text-3xl font-bold text-amber-700 mb-4">
                S/ {product.price.toFixed(2)}
              </div>
              
              <div className={`mb-6 ${product.stock < 10 ? 'text-amber-600' : 'text-green-600'}`}>
                {product.stock > 0 ? (
                  <>
                    <span className="font-medium">Stock disponible: </span>
                    {product.stock} unidades
                  </>
                ) : (
                  <span className="font-medium text-red-600">Agotado</span>
                )}
              </div>

              <div className="mb-8">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  Cantidad
                </label>
                <div className="flex items-center">
                  <button 
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className={`p-2 border border-gray-300 rounded-l-md ${
                      quantity <= 1 ? 'bg-gray-100 text-gray-400' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Image src="/assets/decrease_arrow.svg" alt="Decrementar" width={16} height={16} />
                  </button>
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value);
                      if (newQuantity >= 1 && newQuantity <= product.stock) {
                        setQuantity(newQuantity);
                      }
                    }}
                    className="p-2 w-16 text-center border-t border-b border-gray-300 focus:outline-none focus:ring-0"
                  />
                  <button 
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                    className={`p-2 border border-gray-300 rounded-r-md ${
                      quantity >= product.stock ? 'bg-gray-100 text-gray-400' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Image src="/assets/increase_arrow.svg" alt="Incrementar" width={16} height={16} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex-grow py-3 px-6 rounded-lg flex items-center justify-center ${
                    product.stock === 0
                      ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                      : 'bg-amber-500 hover:bg-amber-600 text-white transition'
                  }`}
                >
                  <Image src="/assets/cart_icon.svg" alt="Carrito" width={20} height={20} className="mr-2 invert" />
                  Añadir al carrito
                </button>
                <button className="flex-grow sm:flex-grow-0 py-3 px-6 border border-amber-500 text-amber-500 rounded-lg hover:bg-amber-50 transition flex items-center justify-center">
                  <Image src="/assets/heart_icon.svg" alt="Favorito" width={20} height={20} className="mr-2" />
                  Guardar
                </button>
              </div>
            </div>
          </div>

          {/* Pestañas de información */}
          <div className="border-t border-gray-200">
            <div className="flex border-b border-gray-200">
              <button 
                className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                  activeTab === 'description'
                    ? 'text-amber-600 border-b-2 border-amber-500'
                    : 'text-gray-500 hover:text-amber-600'
                }`}
                onClick={() => setActiveTab('description')}
              >
                Descripción
              </button>
              <button 
                className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                  activeTab === 'specifications'
                    ? 'text-amber-600 border-b-2 border-amber-500'
                    : 'text-gray-500 hover:text-amber-600'
                }`}
                onClick={() => setActiveTab('specifications')}
              >
                Especificaciones
              </button>
              <button 
                className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                  activeTab === 'reviews'
                    ? 'text-amber-600 border-b-2 border-amber-500'
                    : 'text-gray-500 hover:text-amber-600'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Reseñas ({product.reviewCount})
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'description' && (
                <div>
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="divide-y divide-gray-200">
                      {product.specifications.map((spec, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="py-3 px-4 text-sm font-medium text-gray-700">
                            {spec.name}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-500">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex mr-2">
                        {renderStars(product.rating)}
                      </div>
                      <span className="text-xl font-medium">{product.rating.toFixed(1)}</span>
                      <span className="ml-2 text-gray-500">({product.reviewCount} reseñas)</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {product.reviews.map(review => (
                      <div key={review.id} className="pb-6 border-b border-gray-200 last:border-0">
                        <div className="flex justify-between mb-2">
                          <div className="font-medium">{review.user}</div>
                          <div className="text-sm text-gray-500">{review.date}</div>
                        </div>
                        <div className="flex mb-3">
                          {renderStars(review.rating)}
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 text-center">
                    <p className="text-gray-600 mb-4">¿Ya compraste este producto? Comparte tu opinión</p>
                    <button className="bg-amber-100 text-amber-700 py-2 px-6 rounded-lg hover:bg-amber-200 transition">
                      Escribir una reseña
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Información del vendedor */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Acerca del vendedor</h2>
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="md:w-1/3">
                <h3 className="font-medium text-lg mb-2">{product.seller.name}</h3>
                <div className="flex items-center mb-2">
                  <div className="flex mr-2">
                    {renderStars(product.seller.rating)}
                  </div>
                  <span className="text-sm text-gray-500">
                    {product.seller.rating.toFixed(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-1">
                  <span className="font-medium">Productos:</span> {product.seller.products}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  <span className="font-medium">Miembro desde:</span> {product.seller.joinedDate}
                </p>
                <Link 
                  href={`/vendor/${product.seller.name.toLowerCase().replace(' ', '-')}`} 
                  className="text-amber-600 hover:text-amber-700 font-medium text-sm flex items-center"
                >
                  Ver perfil del vendedor
                  <Image 
                    src="/assets/arrow_right_icon_colored.svg" 
                    alt="Ver más" 
                    width={16} 
                    height={16} 
                    className="ml-1" 
                  />
                </Link>
              </div>
              <div className="md:w-2/3 md:border-l md:border-gray-200 md:pl-6">
                <p className="text-gray-700">
                  Somos un emprendimiento dedicado a la elaboración y comercialización de productos artesanales 
                  de alta calidad, elaborados por talentosos artesanos cusqueños. Cada una de nuestras piezas es única, 
                  transmitiendo la rica cultura y tradiciones de nuestra región.
                </p>
                <div className="mt-4">
                  <Link 
                    href={`/contact-vendor/${product.seller.name.toLowerCase().replace(' ', '-')}`} 
                    className="bg-gray-100 text-gray-700 py-2 px-4 rounded hover:bg-gray-200 transition text-sm"
                  >
                    Contactar al vendedor
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Productos relacionados */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Productos relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Aquí irían productos relacionados, usando componentes similares a la página de productos */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                <Link href={`/products/${i}`}>
                  <div className="relative h-40">
                    <Image 
                      src={`/assets/product_details_page_apple_earphone_image${i}.png`}
                      alt="Producto relacionado"
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <Link href={`/products/${i}`}>
                    <h3 className="font-medium mb-1 hover:text-amber-600 transition line-clamp-1">
                      Producto relacionado {i}
                    </h3>
                  </Link>
                  <p className="text-xs text-gray-500 mb-2">Categoría • Vendedor</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-amber-700">S/ 99.99</span>
                    <button className="bg-amber-100 text-amber-700 p-1.5 rounded-full hover:bg-amber-200 transition">
                      <Image src="/assets/cart_icon.svg" alt="Añadir al carrito" width={16} height={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}