'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ChartIcon, 
  ProductIcon, 
  OrderIcon, 
  SettingsIcon, 
  AddIcon, 
  MessageIcon,
  SearchIcon,
  ArrowLeftIcon,
  ArrowRightIcon
} from '../../../components/common/Icons';

// Datos de ejemplo para el panel
const dashboardData = {
  totalSales: 12580,
  totalOrders: 150,
  totalProducts: 45,
  newCustomers: 28,
  recentOrders: [
    { id: '12345', customer: 'Juan Pérez', date: '01/05/2025', total: 125, status: 'Entregado' },
    { id: '12346', customer: 'María López', date: '02/05/2025', total: 89, status: 'En proceso' },
    { id: '12347', customer: 'Carlos Ruiz', date: '03/05/2025', total: 250, status: 'Pendiente' },
    { id: '12348', customer: 'Ana García', date: '04/05/2025', total: 75, status: 'En camino' },
  ],
  topProducts: [
    { id: 1, name: 'Auriculares Bose', sold: 24, image: '/assets/bose_headphone_image.png' },
    { id: 2, name: 'MacBook Pro', sold: 18, image: '/assets/macbook_image.png' },
    { id: 3, name: 'Cámara Canon', sold: 15, image: '/assets/cannon_camera_image.png' },
  ],
  products: [
    { id: 1, name: 'Auriculares Bose', price: 299, stock: 45, category: 'Audio', status: 'Activo', image: '/assets/bose_headphone_image.png' },
    { id: 2, name: 'MacBook Pro', price: 1299, stock: 12, category: 'Laptops', status: 'Activo', image: '/assets/macbook_image.png' },
    { id: 3, name: 'Cámara Canon EOS', price: 699, stock: 8, category: 'Fotografía', status: 'Activo', image: '/assets/cannon_camera_image.png' },
    { id: 4, name: 'PlayStation 5', price: 499, stock: 0, category: 'Gaming', status: 'Agotado', image: '/assets/playstation_image.png' },
    { id: 5, name: 'Samsung S23', price: 899, stock: 15, category: 'Smartphones', status: 'Activo', image: '/assets/samsung_s23phone_image.png' },
  ],
  orders: [
    { id: '12345', customer: 'Juan Pérez', date: '01/05/2025', total: 125, status: 'Entregado', items: 2, shipping: 'Estándar' },
    { id: '12346', customer: 'María López', date: '02/05/2025', total: 89, status: 'En proceso', items: 1, shipping: 'Express' },
    { id: '12347', customer: 'Carlos Ruiz', date: '03/05/2025', total: 250, status: 'Pendiente', items: 3, shipping: 'Estándar' },
    { id: '12348', customer: 'Ana García', date: '04/05/2025', total: 75, status: 'En camino', items: 1, shipping: 'Express' },
    { id: '12349', customer: 'Roberto Fernández', date: '04/05/2025', total: 175, status: 'Pendiente', items: 2, shipping: 'Estándar' },
    { id: '12350', customer: 'Laura Martínez', date: '04/05/2025', total: 320, status: 'Entregado', items: 2, shipping: 'Express' },
  ],
  messages: [
    { id: 1, customer: 'Juan Pérez', subject: 'Consulta sobre auriculares', date: '03/05/2025', read: false },
    { id: 2, customer: 'María López', subject: 'Problema con mi pedido', date: '02/05/2025', read: true },
    { id: 3, customer: 'Carlos Ruiz', subject: 'Disponibilidad de producto', date: '30/04/2025', read: true },
  ]
};

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="p-6">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-semibold text-amber-600">AllinBuy Vendedor</span>
          </Link>
        </div>
        <nav className="mt-6">
          <div className="px-4 space-y-1">
            <button 
              onClick={() => setActiveTab('dashboard')} 
              className={`w-full flex items-center px-4 py-3 text-sm rounded-md ${
                activeTab === 'dashboard' ? 'bg-amber-50 text-amber-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <ChartIcon className="mr-3 h-5 w-5" />
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('products')} 
              className={`w-full flex items-center px-4 py-3 text-sm rounded-md ${
                activeTab === 'products' ? 'bg-amber-50 text-amber-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <ProductIcon className="mr-3 h-5 w-5" />
              Productos
            </button>
            <button 
              onClick={() => setActiveTab('orders')} 
              className={`w-full flex items-center px-4 py-3 text-sm rounded-md ${
                activeTab === 'orders' ? 'bg-amber-50 text-amber-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <OrderIcon className="mr-3 h-5 w-5" />
              Pedidos
            </button>
            <button 
              onClick={() => setActiveTab('settings')} 
              className={`w-full flex items-center px-4 py-3 text-sm rounded-md ${
                activeTab === 'settings' ? 'bg-amber-50 text-amber-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <SettingsIcon className="mr-3 h-5 w-5" />
              Configuración
            </button>
            <button 
              onClick={() => setActiveTab('messages')} 
              className={`w-full flex items-center px-4 py-3 text-sm rounded-md ${
                activeTab === 'messages' ? 'bg-amber-50 text-amber-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <MessageIcon className="mr-3 h-5 w-5" />
              Mensajes
            </button>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  {/* Mobile menu button */}
                  <button className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                  </button>
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  <h1 className="text-gray-900 text-xl font-medium self-center">Panel de Vendedor</h1>
                </div>
              </div>
              <div className="flex items-center">
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                  <span className="sr-only">Ver notificaciones</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>

                {/* Profile dropdown */}
                <div className="ml-3 relative">
                  <div>
                    <button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                      <span className="sr-only">Abrir menú de usuario</span>
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                        VL
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="py-6 px-4 sm:px-6 lg:px-8">
          {activeTab === 'dashboard' && (
            <div>
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-amber-100 rounded-md p-3">
                        <svg className="h-6 w-6 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Total Ventas</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">${dashboardData.totalSales}</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-amber-100 rounded-md p-3">
                        <svg className="h-6 w-6 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Total Pedidos</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">{dashboardData.totalOrders}</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-amber-100 rounded-md p-3">
                        <svg className="h-6 w-6 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Total Productos</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">{dashboardData.totalProducts}</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-amber-100 rounded-md p-3">
                        <svg className="h-6 w-6 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Nuevos Clientes</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">{dashboardData.newCustomers}</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent orders */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Pedidos Recientes</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Últimos pedidos recibidos</p>
                  </div>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                    Ver todos
                  </button>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID Pedido
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cliente
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fecha
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Estado
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Acciones</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {dashboardData.recentOrders.map((order) => (
                          <tr key={order.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              #{order.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {order.customer}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {order.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              ${order.total}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                order.status === 'Entregado' ? 'bg-green-100 text-green-800' : 
                                order.status === 'En proceso' ? 'bg-blue-100 text-blue-800' :
                                order.status === 'En camino' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a href="#" className="text-amber-600 hover:text-amber-900">Ver</a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Top products */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Productos más vendidos</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Productos con mayor número de ventas</p>
                  </div>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-amber-700 bg-amber-100 hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                    <AddIcon className="mr-2 h-4 w-4" />
                    Nuevo producto
                  </button>
                </div>
                <div className="border-t border-gray-200">
                  <ul className="divide-y divide-gray-200">
                    {dashboardData.topProducts.map((product) => (
                      <li key={product.id} className="px-4 py-4 sm:px-6">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12 relative">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover rounded-md"
                            />
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="flex justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                                <p className="text-sm text-gray-500">Vendidos: {product.sold} unidades</p>
                              </div>
                              <div className="flex space-x-2">
                                <button className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Gestión de Productos</h2>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                  <AddIcon className="mr-2 h-4 w-4" />
                  Añadir Producto
                </button>
              </div>
              
              {/* Filters */}
              <div className="bg-white shadow rounded-lg p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700">Buscar</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        name="search"
                        id="search"
                        className="focus:ring-amber-500 focus:border-amber-500 block w-full pl-3 pr-10 py-2 sm:text-sm border-gray-300 rounded-md"
                        placeholder="Buscar productos..."
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoría</label>
                    <select
                      id="category"
                      name="category"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md"
                    >
                      <option>Todas las categorías</option>
                      <option>Audio</option>
                      <option>Laptops</option>
                      <option>Smartphones</option>
                      <option>Fotografía</option>
                      <option>Gaming</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Estado</label>
                    <select
                      id="status"
                      name="status"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md"
                    >
                      <option>Todos los estados</option>
                      <option>Activo</option>
                      <option>Inactivo</option>
                      <option>Agotado</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Products Table */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Producto
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Precio
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stock
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Categoría
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Estado
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Acciones</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {dashboardData.products.map((product) => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 relative">
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  className="object-cover rounded-md"
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                <div className="text-sm text-gray-500">ID: {product.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">${product.price}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{product.stock}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{product.category}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              product.status === 'Activo' ? 'bg-green-100 text-green-800' : 
                              product.status === 'Agotado' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {product.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">Editar</button>
                              <button className="text-red-600 hover:text-red-900">Eliminar</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination */}
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      Anterior
                    </button>
                    <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      Siguiente
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Mostrando <span className="font-medium">1</span> a <span className="font-medium">5</span> de <span className="font-medium">12</span> resultados
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                          <span className="sr-only">Previous</span>
                          <ArrowLeftIcon className="h-5 w-5" />
                        </button>
                        <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                          1
                        </button>
                        <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-amber-50 text-sm font-medium text-amber-600">
                          2
                        </button>
                        <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                          3
                        </button>
                        <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                          ...
                        </span>
                        <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                          8
                        </button>
                        <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                          <span className="sr-only">Next</span>
                          <ArrowRightIcon className="h-5 w-5" />
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'orders' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Gestión de Pedidos</h3>
                <p className="mt-1 text-sm text-gray-500">Administra tus pedidos</p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                <p className="text-center text-gray-500">Seleccione esta pestaña para gestionar sus pedidos</p>
              </div>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Configuración</h3>
                <p className="mt-1 text-sm text-gray-500">Gestiona la configuración de tu cuenta</p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                <p className="text-center text-gray-500">Seleccione esta pestaña para gestionar la configuración</p>
              </div>
            </div>
          )}
          
          {activeTab === 'messages' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Mensajes</h3>
                <p className="mt-1 text-sm text-gray-500">Gestiona tus mensajes</p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                <p className="text-center text-gray-500">Seleccione esta pestaña para gestionar sus mensajes</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}