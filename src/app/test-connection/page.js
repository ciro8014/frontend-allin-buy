// pages/test-connection.js (o app/test-connection/page.js si usas App Router)
'use client'; // ← IMPORTANTE: Agregar esto al inicio

import { useState, useEffect } from 'react';

export default function TestConnection() {
    const [resultados, setResultados] = useState({});
    const [loading, setLoading] = useState(false);

    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/php/api';

    // Función para hacer un test básico
    const testBasico = async () => {
        try {
            const response = await fetch(`${API_BASE}/productos.php`);
            const data = await response.json();
            
            return {
                status: response.status,
                success: response.ok,
                data: data,
                timestamp: new Date().toLocaleTimeString()
            };
        } catch (error) {
            return {
                status: 0,
                success: false,
                error: error.message,
                timestamp: new Date().toLocaleTimeString()
            };
        }
    };

    // Test de cada endpoint
    const testEndpoints = async () => {
        setLoading(true);
        const tests = {};

        // Test 1: Productos
        console.log('🧪 Probando productos...');
        tests.productos = await testBasico();

        // Test 2: Usuarios
        console.log('🧪 Probando usuarios...');
        try {
            const response = await fetch(`${API_BASE}/usuarios.php`);
            const data = await response.json();
            tests.usuarios = {
                status: response.status,
                success: response.ok,
                data: data,
                timestamp: new Date().toLocaleTimeString()
            };
        } catch (error) {
            tests.usuarios = {
                status: 0,
                success: false,
                error: error.message,
                timestamp: new Date().toLocaleTimeString()
            };
        }

        // Test 3: Carrito (necesita user ID)
        console.log('🧪 Probando carrito...');
        try {
            const response = await fetch(`${API_BASE}/carrito.php/2`);
            const data = await response.json();
            tests.carrito = {
                status: response.status,
                success: response.ok,
                data: data,
                timestamp: new Date().toLocaleTimeString()
            };
        } catch (error) {
            tests.carrito = {
                status: 0,
                success: false,
                error: error.message,
                timestamp: new Date().toLocaleTimeString()
            };
        }

        // Test 4: Pedidos
        console.log('🧪 Probando pedidos...');
        try {
            const response = await fetch(`${API_BASE}/pedidos.php`);
            const data = await response.json();
            tests.pedidos = {
                status: response.status,
                success: response.ok,
                data: data,
                timestamp: new Date().toLocaleTimeString()
            };
        } catch (error) {
            tests.pedidos = {
                status: 0,
                success: false,
                error: error.message,
                timestamp: new Date().toLocaleTimeString()
            };
        }

        // Test 5: CORS
        console.log('🧪 Probando CORS...');
        try {
            const response = await fetch(`${API_BASE}/productos.php`, {
                method: 'OPTIONS'
            });
            tests.cors = {
                status: response.status,
                success: response.ok,
                headers: Object.fromEntries(response.headers.entries()),
                timestamp: new Date().toLocaleTimeString()
            };
        } catch (error) {
            tests.cors = {
                status: 0,
                success: false,
                error: error.message,
                timestamp: new Date().toLocaleTimeString()
            };
        }

        setResultados(tests);
        setLoading(false);
    };

    // Test automático al cargar la página
    useEffect(() => {
        testEndpoints();
    }, []);

    const getStatusColor = (success, status) => {
        if (success && status >= 200 && status < 300) return 'text-green-600 bg-green-50';
        if (status >= 400 && status < 500) return 'text-yellow-600 bg-yellow-50';
        return 'text-red-600 bg-red-50';
    };

    const getStatusIcon = (success, status) => {
        if (success && status >= 200 && status < 300) return '✅';
        if (status >= 400 && status < 500) return '⚠️';
        return '❌';
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                        🔗 Test de Conexión Backend ↔ Frontend
                    </h1>

                    <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h2 className="font-semibold text-blue-800 mb-2">Información de Conexión:</h2>
                        <p><strong>Frontend:</strong> http://localhost:3000</p>
                        <p><strong>Backend:</strong> {API_BASE}</p>
                        <p><strong>Última prueba:</strong> {new Date().toLocaleString()}</p>
                    </div>

                    <div className="flex justify-center mb-8">
                        <button
                            onClick={testEndpoints}
                            disabled={loading}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                                loading 
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'
                            }`}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    Probando...
                                </span>
                            ) : (
                                '🔄 Probar Conexión'
                            )}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(resultados).map(([endpoint, result]) => (
                            <div key={endpoint} className="border rounded-lg p-4 bg-gray-50">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-semibold text-lg capitalize">
                                        📡 {endpoint}
                                    </h3>
                                    <span className="text-2xl">
                                        {getStatusIcon(result.success, result.status)}
                                    </span>
                                </div>

                                <div className={`p-3 rounded-lg ${getStatusColor(result.success, result.status)}`}>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-medium">Estado HTTP:</span>
                                        <span className="font-bold">{result.status}</span>
                                    </div>
                                    
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-medium">Conexión:</span>
                                        <span className="font-bold">
                                            {result.success ? 'EXITOSA' : 'FALLIDA'}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">Hora:</span>
                                        <span className="text-sm">{result.timestamp}</span>
                                    </div>
                                </div>

                                {result.error && (
                                    <div className="mt-3 p-2 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
                                        <strong>Error:</strong> {result.error}
                                    </div>
                                )}

                                {result.data && result.success && (
                                    <details className="mt-3">
                                        <summary className="cursor-pointer text-blue-600 hover:text-blue-800 text-sm">
                                            Ver respuesta completa
                                        </summary>
                                        <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto max-h-32">
                                            {JSON.stringify(result.data, null, 2)}
                                        </pre>
                                    </details>
                                )}

                                {endpoint === 'cors' && result.headers && (
                                    <details className="mt-3">
                                        <summary className="cursor-pointer text-blue-600 hover:text-blue-800 text-sm">
                                            Ver headers CORS
                                        </summary>
                                        <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto max-h-32">
                                            {JSON.stringify(result.headers, null, 2)}
                                        </pre>
                                    </details>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Resumen */}
                    <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                        <h3 className="font-semibold mb-3">📊 Resumen de Conectividad:</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            {Object.entries(resultados).map(([endpoint, result]) => (
                                <div key={endpoint} className="p-2 bg-white rounded shadow">
                                    <div className="text-lg mb-1">
                                        {getStatusIcon(result.success, result.status)}
                                    </div>
                                    <div className="text-sm font-medium capitalize">{endpoint}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Instrucciones */}
                    <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h3 className="font-semibold text-yellow-800 mb-2">📋 ¿Qué significan los resultados?</h3>
                        <ul className="text-sm text-yellow-700 space-y-1">
                            <li><strong>✅ Verde:</strong> Conexión exitosa, todo funciona</li>
                            <li><strong>⚠️ Amarillo:</strong> Conexión establecida pero hay un error en la API</li>
                            <li><strong>❌ Rojo:</strong> No se puede conectar al backend</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}