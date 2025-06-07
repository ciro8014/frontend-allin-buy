// components/ProductList.js
import { useState, useEffect } from 'react';
import apiService from '../services/api';

const ProductList = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [busqueda, setBusqueda] = useState('');

    // Cargar productos al montar el componente
    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await apiService.getProductos();
            
            if (response.success) {
                setProductos(response.data);
            } else {
                setError(response.error || 'Error al cargar productos');
            }
        } catch (err) {
            setError('Error de conexión');
        } finally {
            setLoading(false);
        }
    };

    const buscarProductos = async (e) => {
        e.preventDefault();
        if (!busqueda.trim()) {
            cargarProductos();
            return;
        }

        setLoading(true);
        try {
            const response = await apiService.buscarProductos(busqueda);
            
            if (response.success) {
                setProductos(response.data);
            } else {
                setError(response.error || 'Error en la búsqueda');
            }
        } catch (err) {
            setError('Error de conexión');
        } finally {
            setLoading(false);
        }
    };

    const agregarAlCarrito = async (productoId) => {
        // Obtener usuario actual
        const user = apiService.getCurrentUser();
        
        if (!user) {
            alert('Debes iniciar sesión para agregar productos al carrito');
            return;
        }

        try {
            const response = await apiService.agregarAlCarrito(user.id, productoId, 1);
            
            if (response.success) {
                alert('Producto agregado al carrito');
            } else {
                alert(response.error || 'Error al agregar al carrito');
            }
        } catch (err) {
            alert('Error de conexión');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-4">
                <div className="flex">
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Error</h3>
                        <p className="text-sm text-red-700 mt-1">{error}</p>
                        <button 
                            onClick={cargarProductos}
                            className="mt-2 text-sm text-red-800 hover:text-red-600 underline"
                        >
                            Reintentar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Barra de búsqueda */}
            <div className="mb-8">
                <form onSubmit={buscarProductos} className="flex gap-4">
                    <input
                        type="text"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        placeholder="Buscar productos..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Buscar
                    </button>
                    <button
                        type="button"
                        onClick={cargarProductos}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Ver Todos
                    </button>
                </form>
            </div>

            {/* Lista de productos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {productos.map((producto) => (
                    <div key={producto.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        {/* Imagen del producto */}
                        <div className="h-48 bg-gray-200 flex items-center justify-center">
                            {producto.imagen_principal ? (
                                <img 
                                    src={producto.imagen_principal} 
                                    alt={producto.nombre}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="text-gray-400 text-4xl">📦</div>
                            )}
                        </div>

                        {/* Información del producto */}
                        <div className="p-4">
                            <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                                {producto.nombre}
                            </h3>
                            
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                {producto.descripcion || 'Sin descripción'}
                            </p>

                            {/* Precio */}
                            <div className="mb-3">
                                {producto.precio_oferta ? (
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl font-bold text-red-600">
                                            S/ {parseFloat(producto.precio_oferta).toFixed(2)}
                                        </span>
                                        <span className="text-sm text-gray-500 line-through">
                                            S/ {parseFloat(producto.precio).toFixed(2)}
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-xl font-bold text-gray-900">
                                        S/ {parseFloat(producto.precio).toFixed(2)}
                                    </span>
                                )}
                            </div>

                            {/* Stock */}
                            <div className="mb-3 text-sm">
                                {producto.stock > 0 ? (
                                    <span className="text-green-600">
                                        Stock: {producto.stock} disponibles
                                    </span>
                                ) : (
                                    <span className="text-red-600">Sin stock</span>
                                )}
                            </div>

                            {/* Categoría */}
                            {producto.categoria_nombre && (
                                <div className="mb-3">
                                    <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                        {producto.categoria_nombre}
                                    </span>
                                </div>
                            )}

                            {/* Botones */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => agregarAlCarrito(producto.id)}
                                    disabled={producto.stock === 0}
                                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                                        producto.stock > 0
                                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                >
                                    {producto.stock > 0 ? '🛒 Agregar' : 'Sin Stock'}
                                </button>
                                
                                <button 
                                    onClick={() => window.open(`/producto/${producto.id}`, '_blank')}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                                >
                                    Ver
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mensaje si no hay productos */}
            {productos.length === 0 && !loading && (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                        No se encontraron productos
                    </h3>
                    <p className="text-gray-500">
                        Intenta con otros términos de búsqueda
                    </p>
                </div>
            )}
        </div>
    );
};

export default ProductList;