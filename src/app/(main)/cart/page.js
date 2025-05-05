'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Datos de ejemplo para el carrito
const initialCartItems = [
  {
    id: 1,
    name: "Chal de alpaca trenzado",
    price: 89.99,
    quantity: 1,
    image: "/assets/macbook_image.png",
    seller: "Textiles Andinos",
    stock: 15,
  },
  {
    id: 2,
    name: "Cerámica artesanal Inca",
    price: 120.00,
    quantity: 2,
    image: "/assets/bose_headphone_image.png",
    seller: "ArteCusco",
    stock: 8,
  },
  {
    id: 3,
    name: "Café orgánico de altura",
    price: 35.50,
    quantity: 1,
    image: "/assets/cannon_camera_image.png",
    seller: "Café Qosqo",
    stock: 20,
  }
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  
  // Calcular el subtotal
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Impuestos estimados (18% IGV para Perú)
  const taxRate = 0.18;
  const taxAmount = subtotal * taxRate;
  
  // Costo de envío (fijo para este ejemplo)
  const shippingCost = subtotal > 0 ? 10 : 0;
  
  // Total final
  const total = subtotal + taxAmount + shippingCost - discount;
  
  // Función para actualizar la cantidad de un producto
  const updateQuantity = (id, newQuantity) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: parseInt(newQuantity) };
      }
      return item;
    });
    setCartItems(updatedItems);
  };
  
  // Función para eliminar un producto del carrito
  const removeItem = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
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
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Carrito de Compras</h1>
        
        {cartItems.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="mb-6">
              <Image src="/assets/cart_icon.svg" alt="Carrito vacío" width={64} height={64} className="mx-auto" />
            </div>
            <h2 className="text-xl font-semibold mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-600 mb-6">Parece que aún no has añadido productos a tu carrito.</p>
            <Link 
              href="/products" 
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
                  <h2 className="text-xl font-semibold text-gray-900">Productos ({cartItems.length})</h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-4">
                      <div className="flex-shrink-0 w-full sm:w-32 h-32 relative">
                        <Image 
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row justify-between">
                          <div>
                            <Link href={`/products/${item.id}`}>
                              <h3 className="text-lg font-medium text-gray-900 hover:text-amber-600 transition">
                                {item.name}
                              </h3>
                            </Link>
                            <p className="text-sm text-gray-500">Vendido por: {item.seller}</p>
                            <p className="text-lg font-bold text-amber-600 mt-1">
                              S/ {formatPrice(item.price)}
                            </p>
                            <p className={item.stock < 5 ? "text-red-500 text-xs mt-1" : "text-green-600 text-xs mt-1"}>
                              {item.stock < 5 ? `Solo quedan ${item.stock} disponibles!` : "En stock"}
                            </p>
                          </div>
                          <div className="mt-4 sm:mt-0">
                            <div className="flex items-center">
                              <label className="text-sm text-gray-700 mr-2">Cantidad:</label>
                              <select
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, e.target.value)}
                                className="rounded-md border-gray-300 py-1 text-base focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                              >
                                {[...Array(Math.min(10, item.stock)).keys()].map(num => (
                                  <option key={num + 1} value={num + 1}>{num + 1}</option>
                                ))}
                              </select>
                            </div>
                            <div className="flex items-center mt-4">
                              <button 
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 hover:text-red-700 text-sm flex items-center"
                              >
                                <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Eliminar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-6 border-t border-gray-200 flex justify-between items-center flex-wrap gap-4">
                  <Link 
                    href="/products" 
                    className="flex items-center text-amber-600 hover:text-amber-700"
                  >
                    <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                    </svg>
                    Continuar comprando
                  </Link>
                  <button 
                    onClick={() => setCartItems([])} 
                    className="text-red-500 hover:text-red-700"
                  >
                    Vaciar carrito
                  </button>
                </div>
              </div>
            </div>
            
            {/* Resumen de la compra */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
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
                            className="rounded-l-md flex-1 block w-full border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                            placeholder="Código de cupón"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                          />
                          <button
                            onClick={applyCoupon}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
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
                    className={`w-full block text-center py-3 px-4 rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${
                      cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={(e) => cartItems.length === 0 && e.preventDefault()}
                  >
                    Proceder al pago
                  </Link>
                </div>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Formas de pago aceptadas</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-white p-2 rounded border border-gray-200">
                    <Image src="/assets/visa.svg" alt="Visa" width={40} height={26} />
                  </div>
                  <div className="bg-white p-2 rounded border border-gray-200">
                    <Image src="/assets/mastercard.svg" alt="Mastercard" width={40} height={26} />
                  </div>
                  <div className="bg-white p-2 rounded border border-gray-200">
                    <Image src="/assets/american_express.svg" alt="American Express" width={40} height={26} />
                  </div>
                  <div className="bg-white p-2 rounded border border-gray-200">
                    <Image src="/assets/paypal.svg" alt="PayPal" width={40} height={26} />
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