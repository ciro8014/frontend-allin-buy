// src/components/common/ClientNotifications.js
'use client';

import React from 'react';
import { useNotification, NotificationContainer } from '../../hooks/useNotification';

// Provider global para notificaciones
const NotificationContext = React.createContext();

export const useGlobalNotification = () => {
  const context = React.useContext(NotificationContext);
  if (!context) {
    // Si no hay provider, crear uno temporal
    return {
      success: (message) => alert(`✅ ${message}`),
      error: (message) => alert(`❌ ${message}`),
      warning: (message) => alert(`⚠️ ${message}`),
      info: (message) => alert(`ℹ️ ${message}`)
    };
  }
  return context;
};

const ClientNotifications = () => {
  const { notifications, removeNotification, success, error, warning, info } = useNotification();

  return (
    <NotificationContext.Provider value={{ success, error, warning, info }}>
      <NotificationContainer 
        notifications={notifications} 
        onRemove={removeNotification} 
      />
    </NotificationContext.Provider>
  );
};

export default ClientNotifications;