// components/vendor/VendorProfile.js
'use client';

import React, { useState } from 'react';

const VendorProfile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    nombre: user?.nombre || '',
    apellido: user?.apellido || '',
    email: user?.email || '',
    telefono: user?.telefono || '',
    nombreNegocio: 'Textiles Andinos', // Simulado
    descripcion: 'Especialistas en textiles tradicionales cusqueños con más de 10 años de experiencia.',
    direccion: 'Av. El Sol 123, Cusco, Perú',
    categoria: 'Textiles',
    redesSociales: {
      facebook: '',
      instagram: '',
      whatsapp: '+51 984 123 456'
    }
  });

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setProfileData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = () => {
    // Aquí iría la lógica para guardar en la API
    console.log('Guardando perfil:', profileData);
    setIsEditing(false);
    // Mostrar toast de éxito
  };

  const handleCancel = () => {
    // Resetear datos
    setProfileData({
      nombre: user?.nombre || '',
      apellido: user?.apellido || '',
      email: user?.email || '',
      telefono: user?.telefono || '',
      nombreNegocio: 'Textiles Andinos',
      descripcion: 'Especialistas en textiles tradicionales cusqueños con más de 10 años de experiencia.',
      direccion: 'Av. El Sol 123, Cusco, Perú',
      categoria: 'Textiles',
      redesSociales: {
        facebook: '',
        instagram: '',
        whatsapp: '+51 984 123 456'
      }
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Perfil del Vendedor</h2>
              <p className="text-sm text-gray-600">Gestiona la información de tu negocio</p>
            </div>
            <div className="flex items-center space-x-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-md hover:bg-amber-700"
                  >
                    Guardar
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-md hover:bg-amber-700"
                >
                  Editar perfil
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Contenido del perfil */}
        <div className="p-6 space-y-8">
          {/* Información personal */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Información Personal</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                    className="text-black w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.nombre}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Apellido
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.apellido}
                    onChange={(e) => handleInputChange('apellido', e.target.value)}
                    className="text-black w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.apellido}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="text-black w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.telefono}
                    onChange={(e) => handleInputChange('telefono', e.target.value)}
                    className="text-black w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.telefono}</p>
                )}
              </div>
            </div>
          </div>

          {/* Información del negocio */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Información del Negocio</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del Negocio
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.nombreNegocio}
                    onChange={(e) => handleInputChange('nombreNegocio', e.target.value)}
                    className="text-black w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.nombreNegocio}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                {isEditing ? (
                  <textarea
                    rows={4}
                    value={profileData.descripcion}
                    onChange={(e) => handleInputChange('descripcion', e.target.value)}
                    className="text-black w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    placeholder="Describe tu negocio y lo que lo hace especial..."
                  />
                ) : (
                  <p className="text-gray-900">{profileData.descripcion}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dirección
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.direccion}
                      onChange={(e) => handleInputChange('direccion', e.target.value)}
                      className="text-black w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.direccion}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoría Principal
                  </label>
                  {isEditing ? (
                    <select
                      value={profileData.categoria}
                      onChange={(e) => handleInputChange('categoria', e.target.value)}
                      className="text-black w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    >
                      <option value="Textiles">Textiles</option>
                      <option value="Artesanía">Artesanía</option>
                      <option value="Alimentos">Alimentos</option>
                      <option value="Turismo">Turismo</option>
                      <option value="Joyería">Joyería</option>
                      <option value="Cerámica">Cerámica</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{profileData.categoria}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Redes sociales */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Redes Sociales</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Facebook
                </label>
                {isEditing ? (
                  <input
                    type="url"
                    value={profileData.redesSociales.facebook}
                    onChange={(e) => handleInputChange('redesSociales.facebook', e.target.value)}
                    placeholder="https://facebook.com/tu-negocio"
                    className="text-black w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  />
                ) : (
                  <p className="text-gray-900">
                    {profileData.redesSociales.facebook || 'No configurado'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instagram
                </label>
                {isEditing ? (
                  <input
                    type="url"
                    value={profileData.redesSociales.instagram}
                    onChange={(e) => handleInputChange('redesSociales.instagram', e.target.value)}
                    placeholder="https://instagram.com/tu-negocio"
                    className="text-black w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  />
                ) : (
                  <p className="text-gray-900">
                    {profileData.redesSociales.instagram || 'No configurado'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  WhatsApp
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.redesSociales.whatsapp}
                    onChange={(e) => handleInputChange('redesSociales.whatsapp', e.target.value)}
                    placeholder="+51 999 999 999"
                    className="text-black w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.redesSociales.whatsapp}</p>
                )}
              </div>
            </div>
          </div>

          {/* Estadísticas del perfil */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Estadísticas del Perfil</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-amber-600">4.8</p>
                <p className="text-sm text-gray-600">Calificación</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">156</p>
                <p className="text-sm text-gray-600">Reseñas</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">24</p>
                <p className="text-sm text-gray-600">Productos</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">2</p>
                <p className="text-sm text-gray-600">Años activo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;