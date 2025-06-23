// components/auth/AuthGuard.js
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usuariosAPI } from '../../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';

const AuthGuard = ({ children, requireAuth = true, requireVendor = false, redirectTo = '/auth/login' }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      const isAuthenticated = usuariosAPI.isAuthenticated();
      const isVendor = usuariosAPI.isVendor();

      if (requireAuth && !isAuthenticated) {
        router.push(redirectTo);
        return;
      }

      if (requireVendor && !isVendor) {
        router.push('/login');
        return;
      }

      setIsAuthorized(true);
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      if (requireAuth) {
        router.push(redirectTo);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Verificando acceso..." />;
  }

  if (!isAuthorized && requireAuth) {
    return null; // El redirect ya se ejecutó
  }

  return children;
};

export default AuthGuard;
