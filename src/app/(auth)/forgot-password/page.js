'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Por favor ingresa tu correo electrónico');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simular envío de email de recuperación
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // En una implementación real, aquí harías la llamada a la API
      // const response = await usuariosAPI.forgotPassword(email);
      
      setSuccess(true);
    } catch (error) {
      console.error('Error enviando email:', error);
      setError('Error al enviar el correo. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link href="/" className="flex justify-center">
            <span className="text-3xl font-bold text-amber-600">AllinBuy</span>
          </Link>
          
          <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center">
              <svg className="mx-auto h-16 w-16 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ¡Correo enviado!
              </h2>
              <p className="text-gray-600 mb-6">
                Hemos enviado un enlace de recuperación a <strong>{email}</strong>. 
                Revisa tu bandeja de entrada y sigue las instrucciones.
              </p>
              <div className="space-y-3">
                <Link 
                  href="/login"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md transition font-medium inline-block"
                >
                  Volver al login
                </Link>
                <button
                  onClick={() => {
                    setSuccess(false);
                    setEmail('');
                  }}
                  className="w-full text-amber-600 hover:text-amber-700 py-2 px-4 transition font-medium"
                >
                  Enviar a otro correo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center">
          <span className="text-3xl font-bold text-amber-600">AllinBuy</span>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Recuperar contraseña
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                className="text-black mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                placeholder="tu@email.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500'
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </>
              ) : (
                'Enviar enlace de recuperación'
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="text-center">
              <Link 
                href="/login" 
                className="text-sm text-amber-600 hover:text-amber-500 font-medium"
              >
                ← Volver al login
              </Link>
            </div>
          </div>

          {/* Información adicional */}
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">¿No recibes el correo?</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Revisa tu carpeta de spam</li>
              <li>• Verifica que el correo esté escrito correctamente</li>
              <li>• El enlace expira en 24 horas</li>
            </ul>
            <p className="text-sm text-gray-500 mt-3">
              Si sigues teniendo problemas, contacta a soporte en{' '}
              <a href="mailto:soporte@allinbuy.pe" className="text-amber-600 hover:text-amber-500">
                soporte@allinbuy.pe
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}