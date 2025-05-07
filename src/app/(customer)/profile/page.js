'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProfilePage() {
  // Estado para los datos del perfil (en una app real, esto vendría de una API)
  const [profile, setProfile] = useState({
    name: 'Juan Pérez',
    email: 'juan.perez@ejemplo.com',
    phone: '+51 987 654 321',
    address: 'Av. El Sol 456, Cusco, Perú',
    avatar: '/assets/boy_with_laptop_image.png',
    memberSince: 'Mayo 2024',
    notificationPreferences: {
      orderUpdates: true,
      promotions: false,
      recommendations: true,
      newsletter: false
    }
  });

  // Estado para manejar el modo de edición
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...profile });

  // Estado para el mensaje de éxito
  const [showSuccess, setShowSuccess] = useState(false);

  // Maneja los cambios en el formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        notificationPreferences: {
          ...prev.notificationPreferences,
          [name]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(formData);
    setIsEditing(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  // Pestañas de la página de perfil
  const tabs = [
    { name: 'Información Personal', current: true },
    { name: 'Direcciones', current: false },
    { name: 'Métodos de Pago', current: false },
    { name: 'Seguridad', current: false }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumbs */}
        <div className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-amber-600">Inicio</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Mi Perfil</span>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8 border border-gray-100">
          <div className="bg-gradient-to-r from-amber-600 to-amber-400 text-white py-8 px-6 md:px-10 relative">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4 md:mb-0">
                <Image 
                  src={profile.avatar}
                  alt={profile.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="md:ml-6">
                <h1 className="text-2xl md:text-3xl font-bold">{profile.name}</h1>
                <p className="text-amber-50 mt-1">
                  Cliente desde {profile.memberSince}
                </p>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="absolute top-4 right-4 bg-white/20 text-white py-2 px-4 rounded-lg hover:bg-white/30 transition-colors text-sm font-medium backdrop-blur-sm"
                >
                  Editar Perfil
                </button>
              )}
            </div>
          </div>

          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              {tabs.map((tab, idx) => (
                <button
                  key={idx}
                  className={`py-4 px-6 text-sm font-medium whitespace-nowrap ${
                    tab.current
                      ? 'border-b-2 border-amber-500 text-amber-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6 md:p-8">
            {/* Mensaje de éxito */}
            {showSuccess && (
              <div className="mb-6 bg-green-50 text-green-800 rounded-lg px-4 py-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                </svg>
                ¡Perfil actualizado con éxito!
              </div>
            )}

            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Información Personal</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Dirección Principal</label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Preferencias de Notificaciones</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="orderUpdates"
                          name="orderUpdates"
                          checked={formData.notificationPreferences.orderUpdates}
                          onChange={handleChange}
                          className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                        />
                        <label htmlFor="orderUpdates" className="ml-3 text-sm text-gray-700">
                          Actualizaciones de pedidos
                          <span className="block text-gray-500 text-xs mt-0.5">Recibe notificaciones sobre el estado de tus pedidos.</span>
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="promotions"
                          name="promotions"
                          checked={formData.notificationPreferences.promotions}
                          onChange={handleChange}
                          className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                        />
                        <label htmlFor="promotions" className="ml-3 text-sm text-gray-700">
                          Promociones y descuentos
                          <span className="block text-gray-500 text-xs mt-0.5">Recibe ofertas especiales y descuentos exclusivos.</span>
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="recommendations"
                          name="recommendations"
                          checked={formData.notificationPreferences.recommendations}
                          onChange={handleChange}
                          className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                        />
                        <label htmlFor="recommendations" className="ml-3 text-sm text-gray-700">
                          Recomendaciones personalizadas
                          <span className="block text-gray-500 text-xs mt-0.5">Recibe sugerencias basadas en tus intereses y compras.</span>
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="newsletter"
                          name="newsletter"
                          checked={formData.notificationPreferences.newsletter}
                          onChange={handleChange}
                          className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                        />
                        <label htmlFor="newsletter" className="ml-3 text-sm text-gray-700">
                          Boletín de noticias
                          <span className="block text-gray-500 text-xs mt-0.5">Mantente informado sobre novedades y artículos de interés.</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({...profile});
                      setIsEditing(false);
                    }}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Información Personal</h2>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Nombre Completo</dt>
                      <dd className="mt-1 text-gray-900">{profile.name}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Email</dt>
                      <dd className="mt-1 text-gray-900">{profile.email}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Teléfono</dt>
                      <dd className="mt-1 text-gray-900">{profile.phone}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Dirección Principal</dt>
                      <dd className="mt-1 text-gray-900">{profile.address}</dd>
                    </div>
                  </dl>
                </div>
                
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Preferencias de Notificaciones</h2>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className={`inline-flex mt-0.5 h-5 w-5 items-center justify-center rounded-full ${
                        profile.notificationPreferences.orderUpdates ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                      }`}>
                        {profile.notificationPreferences.orderUpdates ? (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                          </svg>
                        )}
                      </span>
                      <div className="ml-3">
                        <h3 className="text-sm text-gray-800 font-medium">Actualizaciones de pedidos</h3>
                        <p className="text-sm text-gray-500">Notificaciones sobre el estado de tus pedidos.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className={`inline-flex mt-0.5 h-5 w-5 items-center justify-center rounded-full ${
                        profile.notificationPreferences.promotions ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                      }`}>
                        {profile.notificationPreferences.promotions ? (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                          </svg>
                        )}
                      </span>
                      <div className="ml-3">
                        <h3 className="text-sm text-gray-800 font-medium">Promociones y descuentos</h3>
                        <p className="text-sm text-gray-500">Ofertas especiales y descuentos exclusivos.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className={`inline-flex mt-0.5 h-5 w-5 items-center justify-center rounded-full ${
                        profile.notificationPreferences.recommendations ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                      }`}>
                        {profile.notificationPreferences.recommendations ? (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                          </svg>
                        )}
                      </span>
                      <div className="ml-3">
                        <h3 className="text-sm text-gray-800 font-medium">Recomendaciones personalizadas</h3>
                        <p className="text-sm text-gray-500">Sugerencias basadas en tus intereses y compras.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className={`inline-flex mt-0.5 h-5 w-5 items-center justify-center rounded-full ${
                        profile.notificationPreferences.newsletter ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                      }`}>
                        {profile.notificationPreferences.newsletter ? (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                          </svg>
                        )}
                      </span>
                      <div className="ml-3">
                        <h3 className="text-sm text-gray-800 font-medium">Boletín de noticias</h3>
                        <p className="text-sm text-gray-500">Información sobre novedades y artículos de interés.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="p-6 md:p-8">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Actividad Reciente</h2>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actividad
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Detalles
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        6 Mayo, 2025
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Cambio de contraseña
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Cambio de contraseña exitoso
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        30 Abril, 2025
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Actualización de perfil
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Actualización de información personal
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        25 Abril, 2025
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Nueva dirección
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Dirección de envío agregada
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        15 Abril, 2025
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Inicio de sesión
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Inicio de sesión exitoso
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}