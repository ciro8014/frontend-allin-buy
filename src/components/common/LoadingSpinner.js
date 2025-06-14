// components/common/LoadingSpinner.js
'use client';

import React from 'react';

const LoadingSpinner = ({ message = "Cargando..." }) => {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-600 mx-auto mb-4"></div>
            <p className="text-gray-700 text-lg">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;