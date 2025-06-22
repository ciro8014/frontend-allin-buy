// components/vendor/RecentOrders.js
'use client';

import React from 'react';
import Link from 'next/link';

const RecentOrders = ({ orders, isFullView = false }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'enviado':
        return 'bg-blue-100 text-blue-800';
      case 'entregado':
        return 'bg-green-100 text-green-800';
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pendiente':
        return 'Pendiente';
      case 'enviado':
        return 'Enviado';
      case 'entregado':
        return 'Entregado';
      case 'cancelado':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return `S/ ${amount.toFixed(2)}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">
            {isFullView ? 'Todos los Pedidos' : 'Pedidos Recientes'}
          </h3>
          {!isFullView && (
            <Link 
              href="/vendor/orders" 
              className="text-sm text-amber-600 hover:text-amber-700 font-medium"
            >
              Ver todos
            </Link>
          )}
        </div>
      </div>

      <div className="overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-6 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay pedidos</h3>
            <p className="mt-1 text-sm text-gray-500">
              Aún no tienes pedidos recientes.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {orders.map((order) => (
              <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          #{order.numero}
                        </p>
                        <p className="text-sm text-gray-600">{order.cliente}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {formatCurrency(order.total)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDate(order.fecha)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">
                          {order.productos.join(', ')}
                        </p>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.estado)}`}>
                        {getStatusText(order.estado)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Acciones rápidas */}
                <div className="mt-3 flex items-center space-x-2">
                  <button className="text-xs bg-amber-100 text-amber-800 hover:bg-amber-200 px-2 py-1 rounded transition">
                    Ver detalles
                  </button>
                  {order.estado === 'pendiente' && (
                    <button className="text-xs bg-blue-100 text-blue-800 hover:bg-blue-200 px-2 py-1 rounded transition">
                      Marcar como enviado
                    </button>
                  )}
                  {order.estado === 'enviado' && (
                    <button className="text-xs bg-green-100 text-green-800 hover:bg-green-200 px-2 py-1 rounded transition">
                      Marcar como entregado
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isFullView && orders.length > 0 && (
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Mostrando {orders.length} pedidos
            </p>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
                Anterior
              </button>
              <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
                Siguiente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentOrders;