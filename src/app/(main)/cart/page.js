'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { carritoAPI, usuariosAPI } from '../../../../services/api';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [cartSummary, setCartSummary] = useState({
    total_items: 0,
    total_productos: 0,
    total_precio: 0,
    items_disponibles: 0,
    hay_items_no_disponibles: false
  });
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Cargar carrito al montar el componente
  useEffect(() => {
    const loadCart = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Obtener usuario actual
        const user = usuariosAPI.getCurrentUser();
        if (!user) {
          setError('Debes iniciar sesión para ver tu carrito');
          setIsLoading(false);
          return;
        }

        setCurrentUser(user);

        // Cargar items del carrito
        const response = await carritoAPI.get(user.id);
        
        if (response.success) {
          setCartItems(response.data.items || []);
          setCartSummary(response.data.resumen || cartSummary);
        } else {
          setError('Error al cargar el carrito: ' + response.error);
        }
      } catch (error) {
        console.error('Error cargando carrito:', error);
        setError('Error de conexión al servidor');
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  // Calcular totales
  const subtotal = cartSummary.total_precio || 0;
  const taxRate = 0.18; // IGV 18% para Perú
  const taxAmount = subtotal * taxRate;
  const shippingCost = subtotal > 0 ? 10 : 0;
  const total = subtotal + taxAmount + shippingCost - discount;

  // Función para actualizar la cantidad de un producto
  const updateQuantity = async (productId, newQuantity) => {
    if (!currentUser || isUpdating) return;

    try {
      setIsUpdating(true);
      
      const response = await carritoAPI.updateItem(currentUser.id, productId, newQuantity);
      
      if (response.success) {
        // Recargar carrito para obtener datos actualizados
        const cartResponse = await carritoAPI.get(currentUser.id);
        if (cartResponse.success) {
          setCartItems(cartResponse.data.items || []);
          setCartSummary(cartResponse.data.resumen || cartSummary);
        }
      } else {
        alert('Error al actualizar cantidad: ' + response.error);
      }
    } catch (error) {
      console.error('Error actualizando cantidad:', error);
      alert('Error de conexión al actualizar');
    } finally {
      setIsUpdating(false);
    }
  };

  // Función para eliminar un producto del carrito
  const removeItem = async (productId) => {
    if (!currentUser || isUpdating) return;

    if (!confirm('¿Estás seguro de que quieres eliminar este producto del carrito?')) {
      return;
    }

    try {
      setIsUpdating(true);
      
      const response = await carritoAPI.removeItem(currentUser.id, productId);
      
      if (response.success) {
        // Recargar carrito
        const cartResponse = await carritoAPI.get(currentUser.id);
        if (cartResponse.success) {
          setCartItems(cartResponse.data.items || []);
          setCartSummary(cartResponse.data.resumen || cartSummary);
        }
      } else {
        alert('Error al eliminar producto: ' + response.error);
      }
    } catch (error) {
      console.error('Error eliminando producto:', error);
      alert('Error de conexión al eliminar');
    } finally {
      setIsUpdating(false);
    }
  };

  // Función para limpiar todo el carrito
  const clearCart = async () => {
    if (!currentUser || isUpdating) return;

    if (!confirm('¿Estás seguro de que quieres vaciar todo el carrito?')) {
      return;
    }

    try {
      setIsUpdating(true);
      
      const response = await carritoAPI.clear(currentUser.id);
      
      if (response.success) {
        setCartItems([]);
        setCartSummary({
          total_items: 0,
          total_productos: 0,
          total_precio: 0,
          items_disponibles: 0,
          hay_items_no_disponibles: false
        });
        setDiscount(0);
        setCouponApplied(false);
        setCouponCode('');
      } else {
        alert('Error al vaciar carrito: ' + response.error);
      }
    } catch (error) {
      console.error('Error vaciando carrito:', error);
      alert('Error de conexión al vaciar carrito');
    } finally {
      setIsUpdating(false);
    }
  };

  // Función para aplicar un cupón de descuento
  const applyCoupon = () => {
    // Simulación de cupón de descuento
    if (couponCode.toLowerCase() === 'allinbuy10') {
      const discountAmount = subtotal * 0.10; // 10% de descuento
      setDiscount(discountAmount);
      setCouponApplied(true);
    } else {
      alert('Cupón inválido');
      setCouponCode('');
    }
  };

  // Función para formatear precios
  const formatPrice = (price) => {
    return price.toFixed(2);
  };

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="w-20 h-8 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center max-w-md mx-auto">
            <svg className="mx-auto h-12 w-12 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Error al cargar carrito</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            {!currentUser ? (
              <Link 
                href="/login" 
                className="inline-block bg-amber-600 hover:bg-amber-700 text-white py-2 px-6 rounded-lg transition"
              >
                Iniciar sesión
              </Link>
            ) : (
              <button 
                onClick={() => window.location.reload()}
                className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-6 rounded-lg transition"
              >
                Intentar de nuevo
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Carrito de Compras</h1>
        
        {cartItems.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="mb-6">
              <svg className="mx-auto h-16 w-16 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-600 mb-6">Parece que aún no has añadido productos a tu carrito.</p>
            <Link 
              href="/productos" 
              className="inline-block bg-amber-500 hover:bg-amber-600 text-white py-3 px-6 rounded-lg transition"
            >
              Explorar Productos
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Productos en el carrito */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Productos ({cartSummary.total_productos})
                  </h2>
                  {cartSummary.hay_items_no_disponibles && (
                    <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                      <p className="text-sm text-yellow-800">
                        ⚠️ Algunos productos en tu carrito tienen problemas de disponibilidad
                      </p>
                    </div>
                  )}
                </div>
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-4">
                      <div className="flex-shrink-0 w-full sm:w-32 h-32 relative">
                        <Image 
                          src={item.producto_imagen || '/assets/placeholder.png'}
                          alt={item.producto_nombre}
                          fill
                          className="object-contain"
                          sizes="128px"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row justify-between">
                          <div>
                            <Link href={`/productos/${item.producto_id}`}>
                              <h3 className="text-lg font-medium text-gray-900 hover:text-amber-600 transition">
                                {item.producto_nombre}
                              </h3>
                            </Link>
                            <p className="text-sm text-gray-500">Categoría: {item.categoria_nombre}</p>
                            <p className="text-lg font-bold text-amber-600 mt-1">
                              S/ {formatPrice(item.producto_precio)}
                            </p>
                            <p className={`text-xs mt-1 ${
                              item.disponible 
                                ? item.producto_stock < 5 
                                  ? 'text-orange-600' 
                                  : 'text-green-600'
                                : 'text-red-600'
                            }`}>
                              {item.disponible 
                                ? item.producto_stock < 5 
                                  ? `Solo quedan ${item.producto_stock} disponibles!` 
                                  : "En stock"
                                : "No disponible"
                              }
                            </p>
                          </div>
                          <div className="mt-4 sm:mt-0">
                            <div className="flex items-center">
                              <label className="text-sm text-gray-700 mr-2">Cantidad:</label>
                              <select
                                value={item.cantidad}
                                onChange={(e) => updateQuantity(item.producto_id, parseInt(e.target.value))}
                                disabled={isUpdating || !item.disponible}
                                className="rounded-md border-gray-300 py-1 text-base focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm text-black disabled:bg-gray-100 disabled:cursor-not-allowed"
                              >
                                {[...Array(Math.min(10, item.producto_stock || 10)).keys()].map(num => (
                                  <option key={num + 1} value={num + 1}>{num + 1}</option>
                                ))}
                              </select>
                            </div>
                            <div className="flex items-center mt-4">
                              <button 
                                onClick={() => removeItem(item.producto_id)}
                                disabled={isUpdating}
                                className="text-red-500 hover:text-red-700 text-sm flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                {isUpdating ? 'Eliminando...' : 'Eliminar'}
                              </button>
                            </div>
                            <div className="mt-2 text-right">
                              <p className="text-sm text-gray-600">
                                Subtotal: <span className="font-medium">S/ {formatPrice(item.subtotal)}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-6 border-t border-gray-200 flex justify-between items-center flex-wrap gap-4">
                  <Link 
                    href="/productos" 
                    className="flex items-center text-amber-600 hover:text-amber-700"
                  >
                    <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                    </svg>
                    Continuar comprando
                  </Link>
                  <button 
                    onClick={clearCart}
                    disabled={isUpdating}
                    className="text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpdating ? 'Vaciando...' : 'Vaciar carrito'}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Resumen de la compra */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6 sticky top-8">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Resumen de la orden</h2>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">S/ {formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Impuestos (18%)</span>
                    <span>S/ {formatPrice(taxAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Envío</span>
                    <span>{shippingCost > 0 ? `S/ ${formatPrice(shippingCost)}` : 'Gratis'}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Descuento</span>
                      <span>- S/ {formatPrice(discount)}</span>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-lg font-bold">S/ {formatPrice(total)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    {!couponApplied ? (
                      <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium text-gray-700">Cupón de descuento</label>
                        <div className="flex">
                          <input
                            type="text"
                            className="text-black rounded-l-md flex-1 block w-full border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                            placeholder="Código de cupón"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                          />
                          <button
                            onClick={applyCoupon}
                            disabled={!couponCode.trim()}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Aplicar
                          </button>
                        </div>
                        <p className="text-xs text-gray-500">Prueba el código: 'allinbuy10' para un 10% de descuento</p>
                      </div>
                    ) : (
                      <div className="bg-green-50 border border-green-200 rounded-md p-3 text-sm text-green-700 flex justify-between items-center">
                        <div>
                          <span className="font-medium">¡Cupón aplicado!</span>
                          <p className="text-xs">10% de descuento</p>
                        </div>
                        <button 
                          onClick={() => {
                            setDiscount(0);
                            setCouponApplied(false);
                            setCouponCode('');
                          }}
                          className="text-red-500 hover:text-red-700 text-xs"
                        >
                          Quitar
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <Link
                    href="/checkout"
                    className={`w-full block text-center py-3 px-4 rounded-md shadow-sm text-white font-medium transition ${
                      cartSummary.items_disponibles === 0 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500'
                    }`}
                    onClick={(e) => {
                      if (cartSummary.items_disponibles === 0) {
                        e.preventDefault();
                        alert('No puedes proceder al pago porque no hay productos disponibles en tu carrito');
                      }
                    }}
                  >
                    {cartSummary.items_disponibles === 0 ? 'No disponible' : 'Proceder al pago'}
                  </Link>
                  
                  {cartSummary.hay_items_no_disponibles && (
                    <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                      <p className="text-xs text-yellow-800">
                        Algunos productos no están disponibles y no se incluirán en tu pedido
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Formas de pago aceptadas</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-white p-2 rounded border border-gray-200">
                    <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">VISA</span>
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded border border-gray-200">
                    <div className="w-10 h-6 bg-red-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">MC</span>
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded border border-gray-200">
                    <div className="w-10 h-6 bg-blue-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">AMEX</span>
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded border border-gray-200">
                    <div className="w-10 h-6 bg-blue-700 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">PP</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Compras seguras: todos los pagos están encriptados con seguridad SSL
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}