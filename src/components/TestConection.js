'use client';

import { useState, useEffect } from 'react';
import { testConexion, productosAPI, categoriasAPI } from '../../services/api';

export default function TestConnection() {
    const [testResults, setTestResults] = useState({});
    const [loading, setLoading] = useState(false);

    const runTests = async () => {
        setLoading(true);
        const results = {};

        // Test 1: Conexión básica
        console.log('🧪 Probando conexión básica...');
        results.conexion = await testConexion();

        // Test 2: Productos destacados
        console.log('🧪 Probando productos destacados...');
        try {
            const productosRes = await productosAPI.getDestacados();
            results.productos = {
                success: productosRes.success,
                message: productosRes.success ? 'Productos cargados correctamente' : productosRes.error,
                count: productosRes.data?.length || 0
            };
        } catch (error) {
            results.productos = {
                success: false,
                message: error.message,
                count: 0
            };
        }

        // Test 3: Categorías destacadas
        console.log('🧪 Probando categorías destacadas...');
        try {
            const categoriasRes = await categoriasAPI.getDestacadas();
            results.categorias = {
                success: categoriasRes.success,
                message: categoriasRes.success ? 'Categorías cargadas correctamente' : categoriasRes.error,
                count: categoriasRes.data?.length || 0
            };
        } catch (error) {
            results.categorias = {
                success: false,
                message: error.message,
                count: 0
            };
        }

        // Test 4: Verificar variables de entorno
        results.config = {
            success: !!process.env.NEXT_PUBLIC_API_URL,
            message: process.env.NEXT_PUBLIC_API_URL ? 'Variables de entorno configuradas' : 'Falta NEXT_PUBLIC_API_URL',
            apiUrl: process.env.NEXT_PUBLIC_API_URL || 'No configurada'
        };

        setTestResults(results);
        setLoading(false);
    };

    useEffect(() => {
        runTests();
    }, []);

    const getStatusIcon = (success) => {
        return success ? '✅' : '❌';
    };

    const getStatusColor = (success) => {
        return success ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50';
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                    🔗 Test Conexión Frontend ↔ Backend
                </h1>
                <button
                    onClick={runTests}
                    disabled={loading}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        loading 
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                >
                    {loading ? '🔄 Probando...' : '🔄 Probar Conexión'}
                </button>
            </div>

            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h2 className="font-semibold text-blue-800 mb-2">ℹ️ Información:</h2>
                <p><strong>Frontend:</strong> {window.location.origin}</p>
                <p><strong>Backend API:</strong> {process.env.NEXT_PUBLIC_API_URL || 'No configurada'}</p>
                <p><strong>Última prueba:</strong> {new Date().toLocaleString()}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(testResults).map(([test, result]) => (
                    <div key={test} className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-lg capitalize">
                                📡 {test}
                            </h3>
                            <span className="text-2xl">
                                {getStatusIcon(result.success)}
                            </span>
                        </div>

                        <div className={`p-3 rounded-lg ${getStatusColor(result.success)}`}>
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">Estado:</span>
                                <span className="font-bold">
                                    {result.success ? 'EXITOSO' : 'FALLIDO'}
                                </span>
                            </div>
                            
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">Mensaje:</span>
                                <span className="text-sm text-right max-w-xs">
                                    {result.message}
                                </span>
                            </div>

                            {result.count !== undefined && (
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium">Elementos:</span>
                                    <span className="font-bold">{result.count}</span>
                                </div>
                            )}

                            {result.apiUrl && (
                                <div className="mt-2">
                                    <span className="font-medium">API URL:</span>
                                    <div className="text-xs break-all bg-white p-2 rounded mt-1">
                                        {result.apiUrl}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Guía de solución de problemas */}
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">🔧 Solución de problemas:</h3>
                <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
                    <li><strong>Error de conexión:</strong> Verifica que tu servidor PHP esté ejecutándose</li>
                    <li><strong>CORS:</strong> Revisa el archivo php/config/cors.php</li>
                    <li><strong>Base de datos:</strong> Verifica la conexión en php/config/database.php</li>
                    <li><strong>Variables de entorno:</strong> Asegúrate de tener .env.local configurado</li>
                    <li><strong>URL incorrecta:</strong> Verifica NEXT_PUBLIC_API_URL en .env.local</li>
                </ul>
            </div>

            {/* Instrucciones rápidas */}
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">✅ Pasos para resolver problemas:</h3>
                <ol className="text-sm text-green-700 space-y-1 list-decimal list-inside">
                    <li>Crea el archivo .env.local en la raíz del proyecto Next.js</li>
                    <li>Agrega: NEXT_PUBLIC_API_URL=http://localhost/php/api</li>
                    <li>Reinicia tu servidor de desarrollo Next.js (npm run dev)</li>
                    <li>Verifica que tu servidor PHP esté corriendo</li>
                    <li>Ejecuta php/config/database.php para verificar la base de datos</li>
                </ol>
            </div>
        </div>
    );
}