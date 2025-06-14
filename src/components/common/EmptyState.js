// components/common/EmptyState.js
'use client';

import React from 'react';

const EmptyState = ({ 
  title = "No hay resultados", 
  description = "No se encontraron elementos.", 
  actionText = "Intentar de nuevo",
  onAction = null 
}) => {
  return (
    <div className="bg-white py-12 px-6 shadow-sm rounded-lg text-center border border-gray-100">
      <svg className="mx-auto h-12 w-12 text-amber-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h2 className="text-xl font-semibold mt-4 text-gray-900">{title}</h2>
      <p className="text-gray-600 mt-2 mb-6">{description}</p>
      {onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 transition"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;