'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function OrdersPage() {
  // Datos de ejemplo para los pedidos (en una app real, vendría de una API)
  const [orders, setOrders] = useState([
    {
      id: 'ORD-2025-0042',
      date: '3 Mayo, 2025',
      total: 358.90,
      status: 'Entregado',
      statusColor: 'green',
      items: [
        {
          id: 101,
          name: "Cerámica artesanal Inca",
          price: 120.00,
          quantity: 1,
          image: "/assets/cannon_camera_image.png"
        },
        {
          id: 201,
          name: "Chal de alpaca trenzado",
          price: 89.90,
          quantity: 2,
          image: "/assets/macbook_image.png"
        },
        {
          id: 301,
          name: "Café orgánico de altura",
          price: 35.50,
          quantity: 1,
          image: "/assets/venu_watch_image.png"
        }
      ],
      address: "Av. El Sol 456, Cusco, Perú",
      paymentMethod: "Tarjeta terminada en 4242",
      trackingNumber: "TRAC789012345",
      deliveryDate: "2 Mayo, 2025"
    },
    {
      id: 'ORD-2025-0037',
      date: '28 Abril, 2025',
      total: 175.00,
      status: 'En camino',
      statusColor: 'blue',
      items: [
        {
          id: 102,
          name: "Retablo ayacuchano",
          price: 85.50,
          quantity: 1,
          image: "/assets/bose_headphone_image.png"
        },
        {
          id: 302,
          name: "Chocolate artesanal 72% cacao",
          price: 25.00,
          quantity: 3,
          image: "/assets/projector_image.png"
        }
      ],
      address: "Av. El Sol 456, Cusco, Perú",
      paymentMethod: "Tarjeta terminada en 4242",
      trackingNumber: "TRAC567890123",
      deliveryDate: "7 Mayo, 2025 (Estimado)"
    },
    {
      id: 'ORD-2025-0025',
      date: '15 Abril, 2025',
      total: 256.50,
      status: 'Procesando',
      statusColor: 'amber',
      items: [
        {
          id: 502,
          name: "Aretes de plata con diseño inca",
          price: 65.00,
          quantity: 1,
          image: "/assets/sony_airbuds_image.png"
        },
        {
          id: 601,
          name: "Jarrón decorativo inca",
          price: 89.00,
          quantity: 1,
          image: "/assets/header_macbook_image.png"
        },
        {
          id: 701,
          name: "Chaleco con bordados andinos",
          price: 110.00,
          quantity: 1,
          image: "/assets/girl_with_headphone_image.png"
        }
      ],
      address: "Av. El Sol 456, Cusco, Perú",
      paymentMethod: "Tarjeta terminada en 4242",
      trackingNumber: "Pendiente",
      deliveryDate: "10-14 Mayo, 2025 (Estimado)"
    },
    {
      id: 'ORD-2025-0018',
      date: '2 Abril, 2025',
      total: 150.00,
      status: 'Cancelado',
      statusColor: 'red',
      items: [
        {
          id: 401,
          name: "Tour Valle Sagrado",
          price: 150.00,
          quantity: 1,
          image: "/assets/jbl_soundbox_image.png"
        }
      ],
      address: "Av. El Sol 456, Cusco, Perú",
      paymentMethod: "Tarjeta terminada en 4242",
      trackingNumber: "N/A",
      deliveryDate: "Cancelado"
    }
  ]);

  // Estado para el pedido expandido
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  // Estado para los filtros
  const [filter, setFilter] = useState('all');

  // Función para alternar la expansión de un pedido
  const toggleOrderExpanded = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  // Filtrar pedidos según el estado seleccionado
  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => {
        if (filter === 'active') {
          return ['En camino', 'Procesando'].includes(order.status);
        }
        return order.status.toLowerCase() === filter.toLowerCase();
      });

  // Obtener el color de estado para un pedido
  const getStatusColor = (status) => {
    switch (status) {
      case 'Entregado':
        return 'bg-green-100 text-green-800';
      case 'En camino':
        return 'bg-blue-100 text-blue-800';
      case 'Procesando':
        return 'bg-amber-100 text-amber-800';
      case 'Cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumbs */}
        <div className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-amber-600">Inicio</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Mis Pedidos</span>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 mb-8">
          <div className="bg-gradient-to-r from-amber-600 to-amber-400 px-6 py-4">
            <h1 className="text-xl md:text-2xl font-bold text-white">Mis Pedidos</h1>
          </div>

          {/* Filtros */}
          <div className="border-b border-gray-200 bg-gray-50">
            <div className="px-4 sm:px-6">
              <nav className="flex space-x-4 overflow-x-auto py-4">
                <button
                  className={`px-3 py-2 text-sm rounded-md font-medium ${
                    filter === 'all'
                      ? 'bg-amber-100 text-amber-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setFilter('all')}
                >
                  Todos
                </button>
                <button
                  className={`px-3 py-2 text-sm rounded-md font-medium ${
                    filter === 'active'
                      ? 'bg-amber-100 text-amber-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setFilter('active')}
                >
                  Activos
                </button>
                <button
                  className={`px-3 py-2 text-sm rounded-md font-medium ${
                    filter === 'entregado'
                      ? 'bg-amber-100 text-amber-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setFilter('entregado')}
                >
                  Entregados
                </button>
                <button
                  className={`px-3 py-2 text-sm rounded-md font-medium ${
                    filter === 'cancelado'
                      ? 'bg-amber-100 text-amber-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setFilter('cancelado')}
                >
                  Cancelados
                </button>
              </nav>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto h-24 w-24 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No se encontraron pedidos</h3>
                <p className="mt-1 text-sm text-gray-500">
                  No tienes pedidos que coincidan con este filtro.
                </p>
                <div className="mt-6">
                  <Link
                    href="/productos"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700"
                  >
                    Explorar Productos
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div 
                      className="px-4 py-5 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer"
                      onClick={() => toggleOrderExpanded(order.id)}
                    >
                      <div className="mb-2 sm:mb-0">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                          Pedido {order.id}
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                          Realizado el {order.date}
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          S/ {order.total.toFixed(2)}
                        </p>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                        <button className="mt-2 sm:mt-0 text-amber-600 hover:text-amber-800">
                          {expandedOrderId === order.id ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                    
                    {expandedOrderId === order.id && (
                      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                          <div className="sm:col-span-2">
                            <dt className="text-sm font-medium text-gray-500">Productos</dt>
                            <dd className="mt-1">
                              <ul className="divide-y divide-gray-200">
                                {order.items.map((item) => (
                                  <li key={item.id} className="py-4 flex">
                                    <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                                      <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                    <div className="ml-4 flex-1">
                                      <div className="flex justify-between">
                                        <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                                        <p className="text-sm font-medium text-gray-900">S/ {(item.price * item.quantity).toFixed(2)}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {item.quantity} x S/ {item.price.toFixed(2)}
                                      </p>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </dd>
                          </div>
                          
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Dirección de envío</dt>
                            <dd className="mt-1 text-sm text-gray-900">{order.address}</dd>
                          </div>
                          
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Método de pago</dt>
                            <dd className="mt-1 text-sm text-gray-900">{order.paymentMethod}</dd>
                          </div>
                          
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Número de seguimiento</dt>
                            <dd className="mt-1 text-sm text-gray-900">{order.trackingNumber}</dd>
                          </div>
                          
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Fecha de entrega</dt>
                            <dd className="mt-1 text-sm text-gray-900">{order.deliveryDate}</dd>
                          </div>
                          
                          <div className="sm:col-span-2 border-t border-gray-200 pt-4">
                            <div className="flex justify-between">
                              <dt className="text-base font-medium text-gray-900">Total</dt>
                              <dd className="text-base font-medium text-gray-900">S/ {order.total.toFixed(2)}</dd>
                            </div>
                          </div>
                          
                          <div className="sm:col-span-2 flex flex-wrap gap-4">
                            {(order.status === "En camino" || order.status === "Procesando") && (
                              <Link
                                href={`/customer/track/${order.id}`}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700"
                              >
                                Seguir Pedido
                              </Link>
                            )}
                            
                            {order.status !== "Cancelado" && (
                              <Link
                                href={`/customer/orders/${order.id}/invoice`}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                              >
                                Ver Factura
                              </Link>
                            )}
                            
                            {order.status === "Entregado" && (
                              <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                              >
                                Calificar Productos
                              </button>
                            )}
                            
                            {(order.status === "En camino" || order.status === "Procesando") && (
                              <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
                              >
                                Cancelar Pedido
                              </button>
                            )}
                          </div>
                        </dl>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">¿Necesitas ayuda con tu pedido?</h2>
            <p className="text-gray-600 mb-6">
              Si tienes alguna pregunta o problema con tus pedidos, nuestro equipo de atención al cliente está disponible para ayudarte.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
                Contactar Soporte
              </a>
              <a 
                href="#" 
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Preguntas Frecuentes
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}