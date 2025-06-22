'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { StarIcon } from '../../../../components/common/Icons';
import { productosAPI, carritoAPI, usuariosAPI } from '../../../../../services/api';

export default function ProductDetailPage({ params }) {
  // Estados del componente
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Desenvolver los parámetros usando React.use()
  const resolvedParams = React.use(params);
  const id = resolvedParams.id;

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await productosAPI.getById(id);
        
        if (response.success) {
          setProduct(response.data);
          
          // Cargar productos relacionados de la misma categoría
          if (response.data.category) {
            try {
              const relatedResponse = await productosAPI.getAll({
                buscar: response.data.category,
                limit: 4
              });
              
              if (relatedResponse.success) {
                // Filtrar el producto actual de los relacionados
                const filtered = relatedResponse.data.filter(p => p.id !== parseInt(id));
                setRelatedProducts(filtered.slice(0, 4));
              }
            } catch (relatedError) {
              console.error('Error cargando productos relacionados:', relatedError);
            }
          }
        } else {
          setError('Producto no encontrado');
        }
      } catch (error) {
        console.error('Error cargando producto:', error);
        setError('Error de conexión al servidor');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  // Renderizar estrellas para la calificación
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <StarIcon
          key={i}
          className={`h-4 w-4 ${
            i < Math.floor(rating) 
              ? 'text-yellow-500' 
              : i < rating 
                ? 'text-yellow-400' 
                : 'text-gray-300'
          }`}
        />
      );
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
  const handleAddToCart = async () => {
    try {
      setIsAddingToCart(true);
      
      // Obtener usuario actual (en una implementación real)
      const currentUser = usuariosAPI.getCurrentUser();
      
      if (!currentUser) {
        alert('Debes iniciar sesión para añadir productos al carrito');
        return;
      }

      const response = await carritoAPI.addItem(currentUser.id, product.id, quantity);
      
      if (response.success) {
        alert(`${quantity} unidad(es) de ${product.name} añadido(s) al carrito`);
        setQuantity(1); // Reset cantidad
      } else {
        alert('Error al añadir al carrito: ' + response.error);
      }
    } catch (error) {
      console.error('Error añadiendo al carrito:', error);
      alert('Error de conexión al añadir al carrito');
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="bg-gray-200 h-4 w-2/3 mb-6 rounded"></div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="bg-gray-200 h-80 md:h-96 mb-4 rounded-lg"></div>
                  <div className="flex space-x-4">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className="bg-gray-200 w-20 h-20 rounded-md"></div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="bg-gray-200 h-8 w-3/4 mb-4 rounded"></div>
                  <div className="bg-gray-200 h-4 w-1/2 mb-6 rounded"></div>
                  <div className="bg-gray-200 h-6 w-1/3 mb-6 rounded"></div>
                  <div className="bg-gray-200 h-4 w-2/3 mb-8 rounded"></div>
                  <div className="bg-gray-200 h-12 mb-4 rounded"></div>
                  <div className="flex space-x-4">
                    <div className="bg-gray-200 h-12 w-2/3 rounded-lg"></div>
                    <div className="bg-gray-200 h-12 w-1/3 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
        <p className="mb-8">Lo sentimos, el producto que estás buscando no existe o ha sido eliminado.</p>
        <Link 
          href="/productos" 
          className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-6 rounded-lg transition"
        >
          Volver al catálogo
        </Link>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-amber-600">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href="/productos" className="hover:text-amber-600">Productos</Link>
          <span className="mx-2">/</span>
          {product.category && (
            <>
              <Link href={`/categorias/${product.category.toLowerCase()}`} className="hover:text-amber-600">
                {product.category}
              </Link>
              <span className="mx-2">/</span>
            </>
          )}
          <span className="text-gray-700">{product.name}</span>
        </div>

        {/* Sección principal de producto */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Imágenes del producto */}
            <div>
              <div className="relative h-80 md:h-96 mb-4 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                <Image 
                  src={product.images && product.images[selectedImage] ? product.images[selectedImage] : product.image || '/assets/placeholder.png'} 
                  alt={product.name}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="flex space-x-4 overflow-x-auto scrollbar-thin pb-2">
                {product.images && product.images.length > 1 ? (
                  product.images.map((image, index) => (
                    <button 
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-20 h-20 border rounded-md cursor-pointer transition flex-shrink-0 ${
                        selectedImage === index 
                          ? 'border-amber-600 ring-2 ring-amber-200' 
                          : 'border-gray-200 hover:border-amber-300'
                      }`}
                      aria-label={`Ver imagen ${index + 1}`}
                    >
                      <Image 
                        src={image} 
                        alt={`${product.name} - Imagen ${index + 1}`}
                        fill
                        className="object-contain p-2"
                        sizes="80px"
                      />
                    </button>
                  ))
                ) : (
                  <button 
                    className="relative w-20 h-20 border border-amber-600 ring-2 ring-amber-200 rounded-md cursor-pointer transition flex-shrink-0"
                    aria-label="Ver imagen principal"
                  >
                    <Image 
                      src={product.image || '/assets/placeholder.png'} 
                      alt={product.name}
                      fill
                      className="object-contain p-2"
                      sizes="80px"
                    />
                  </button>
                )}
              </div>
            </div>

            {/* Información del producto */}
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating.toFixed(1)} ({product.reviewCount} reseñas)
                </span>
              </div>

              <div className="flex items-center mb-6">
                <span className="text-gray-600">Vendido por: </span>
                <span className="font-medium text-amber-600 ml-1">{product.seller?.name || 'AllinBuy'}</span>
                {product.seller?.rating && (
                  <>
                    <span className="mx-2 text-gray-300">|</span>
                    <div className="flex items-center">
                      <div className="flex mr-1">
                        {renderStars(product.seller.rating)}
                      </div>
                      <span className="text-sm text-gray-600">{product.seller.rating}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="text-3xl font-bold text-amber-700 mb-4">
                S/ {product.price.toFixed(2)}
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-lg text-gray-500 line-through ml-2">
                    S/ {product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              
              <div className={`mb-6 ${
                product.stock === 0 
                  ? 'text-red-600' 
                  : product.stock < 5 
                    ? 'text-amber-600' 
                    : 'text-green-600'
              }`}>
                {product.stock > 0 ? (
                  <>
                    <span className="font-medium">Stock disponible: </span>
                    {product.stock} unidades
                  </>
                ) : (
                  <span className="font-medium">Agotado</span>
                )}
              </div>

              <div className="mb-8">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  Cantidad
                </label>
                <div className="flex items-center max-w-[180px]">
                  <button 
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className={`p-2 border border-gray-300 rounded-l-md transition-colors ${
                      quantity <= 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                    aria-label="Decrementar cantidad"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                    </svg>
                  </button>
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value);
                      if (!isNaN(newQuantity) && newQuantity >= 1 && newQuantity <= product.stock) {
                        setQuantity(newQuantity);
                      }
                    }}
                    className="p-2 w-16 text-center border-t border-b border-gray-300 focus:outline-none focus:ring-amber-500 text-black"
                    aria-label="Cantidad"
                  />
                  <button 
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                    className={`p-2 border border-gray-300 rounded-r-md transition-colors ${
                      quantity >= product.stock ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                    aria-label="Incrementar cantidad"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || isAddingToCart}
                  className={`flex-grow py-3 px-6 rounded-lg flex items-center justify-center transition-colors ${
                    product.stock === 0
                      ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                      : isAddingToCart
                      ? 'bg-amber-500 cursor-wait text-white'
                      : 'bg-amber-600 hover:bg-amber-700 text-white'
                  }`}
                >
                  {isAddingToCart ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Añadiendo...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Añadir al carrito
                    </>
                  )}
                </button>
                <button 
                  className="flex-grow sm:flex-grow-0 py-3 px-6 border border-amber-500 text-amber-600 rounded-lg hover:bg-amber-50 transition-colors flex items-center justify-center"
                  aria-label="Guardar en favoritos"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Guardar
                </button>
              </div>
            </div>
          </div>

          {/* Pestañas de información */}
          <div className="border-t border-gray-200">
            <div className="flex border-b border-gray-200 overflow-x-auto scrollbar-hide">
              <button 
                className={`py-4 px-6 font-medium text-sm focus:outline-none whitespace-nowrap ${
                  activeTab === 'description'
                    ? 'text-amber-600 border-b-2 border-amber-500'
                    : 'text-gray-500 hover:text-amber-600'
                }`}
                onClick={() => setActiveTab('description')}
              >
                Descripción
              </button>
              <button 
                className={`py-4 px-6 font-medium text-sm focus:outline-none whitespace-nowrap ${
                  activeTab === 'specifications'
                    ? 'text-amber-600 border-b-2 border-amber-500'
                    : 'text-gray-500 hover:text-amber-600'
                }`}
                onClick={() => setActiveTab('specifications')}
              >
                Especificaciones
              </button>
              <button 
                className={`py-4 px-6 font-medium text-sm focus:outline-none whitespace-nowrap ${
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
                      {product.specifications && product.specifications.length > 0 ? (
                        product.specifications.map((spec, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="py-3 px-4 text-sm font-medium text-gray-700">
                              {spec.name}
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600">
                              {spec.value}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="2" className="py-6 px-4 text-center text-gray-500">
                            No hay especificaciones disponibles
                          </td>
                        </tr>
                      )}
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
                    {product.reviews && product.reviews.length > 0 ? (
                      product.reviews.map(review => (
                        <div key={review.id} className="pb-6 border-b border-gray-200 last:border-0">
                          <div className="flex justify-between mb-2">
                            <div className="font-medium text-gray-800">{review.user}</div>
                            <div className="text-sm text-gray-500">{review.date}</div>
                          </div>
                          <div className="flex mb-3">
                            {renderStars(review.rating)}
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">Aún no hay reseñas para este producto</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 text-center">
                    <p className="text-gray-600 mb-4">¿Ya compraste este producto? Comparte tu opinión</p>
                    <button className="bg-amber-100 text-amber-700 py-2 px-6 rounded-lg hover:bg-amber-200 transition-colors font-medium">
                      Escribir una reseña
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Información del vendedor */}
        {product.seller && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8 border border-gray-100">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Acerca del vendedor</h2>
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="md:w-1/3">
                  <h3 className="font-medium text-lg mb-2 text-gray-800">{product.seller.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {renderStars(product.seller.rating)}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.seller.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Productos:</span> {product.seller.products}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    <span className="font-medium">Miembro desde:</span> {product.seller.joinedDate}
                  </p>
                  <Link 
                    href={`/vendedor/${product.seller.name.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="text-amber-600 hover:text-amber-700 font-medium text-sm flex items-center"
                  >
                    Ver perfil del vendedor
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                <div className="md:w-2/3 md:border-l md:border-gray-200 md:pl-6">
                  <p className="text-gray-700">
                    {product.seller.description || `Somos un emprendimiento dedicado a la elaboración y comercialización de productos artesanales 
                    de alta calidad, elaborados por talentosos artesanos cusqueños. Cada una de nuestras piezas es única, 
                    transmitiendo la rica cultura y tradiciones de nuestra región.`}
                  </p>
                  <div className="mt-4">
                    <Link 
                      href={`/contacto-vendedor/${product.seller.name.toLowerCase().replace(/\s+/g, '-')}`} 
                      className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                    >
                      Contactar al vendedor
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Productos relacionados */}
        {relatedProducts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Productos relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <Link href={`/productos/${relatedProduct.id}`} className="block">
                    <div className="relative h-40 bg-gray-50">
                      <Image 
                        src={relatedProduct.image || '/assets/placeholder.png'}
                        alt={relatedProduct.name}
                        fill
                        className="object-contain p-4"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link href={`/productos/${relatedProduct.id}`} className="block group">
                      <h3 className="font-medium mb-1 group-hover:text-amber-600 transition-colors line-clamp-1 text-gray-800">
                        {relatedProduct.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-amber-600 mb-2 font-medium">{relatedProduct.category}</p>
                    <div className="flex items-center mb-2">
                      <div className="flex mr-1">
                        {renderStars(relatedProduct.rating)}
                      </div>
                      <span className="text-xs text-gray-500">({relatedProduct.reviewCount})</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-amber-700">S/ {relatedProduct.price.toFixed(2)}</span>
                      <button 
                        className="bg-amber-100 text-amber-700 p-1.5 rounded-full hover:bg-amber-200 transition-colors"
                        aria-label="Añadir al carrito"
                        onClick={(e) => {
                          e.preventDefault();
                          console.log('Añadir al carrito:', relatedProduct);
                        }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}