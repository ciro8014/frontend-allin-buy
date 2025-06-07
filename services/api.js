// services/api.js - Servicio API para Next.js

class ApiService {
    constructor() {
        // URL base del backend PHP
        this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/php/api';
        this.token = null;
        
        // Cargar token del localStorage si existe
        if (typeof window !== 'undefined') {
            this.token = localStorage.getItem('allinbuy_token');
        }
    }

    // Método base para hacer requests
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        // Agregar token si existe
        if (this.token) {
            config.headers.Authorization = `Bearer ${this.token}`;
        }

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            // Manejar errores HTTP
            if (!response.ok) {
                throw new Error(data.error || `HTTP error! status: ${response.status}`);
            }

            return {
                success: true,
                data: data.data || data,
                message: data.message,
                status: response.status
            };
        } catch (error) {
            console.error('API Error:', error);
            return {
                success: false,
                error: error.message,
                status: 0
            };
        }
    }

    // Métodos GET
    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }

    // Métodos POST
    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    // Métodos PUT
    async put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    // Métodos DELETE
    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }

    // ==================== PRODUCTOS ====================
    
    async getProductos(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const endpoint = `/productos.php${queryString ? `?${queryString}` : ''}`;
        return this.get(endpoint);
    }

    async getProducto(id) {
        return this.get(`/productos.php/${id}`);
    }

    async crearProducto(producto) {
        return this.post('/productos.php', producto);
    }

    async actualizarProducto(id, producto) {
        return this.put(`/productos.php/${id}`, producto);
    }

    async eliminarProducto(id) {
        return this.delete(`/productos.php/${id}`);
    }

    async buscarProductos(termino, filtros = {}) {
        const params = { buscar: termino, ...filtros };
        return this.getProductos(params);
    }

    // ==================== USUARIOS ====================
    
    async registrarUsuario(userData) {
        const response = await this.post('/usuarios.php/registro', userData);
        
        // Si el registro es exitoso, hacer login automático
        if (response.success) {
            const loginResponse = await this.loginUsuario({
                email: userData.email,
                password: userData.password
            });
            return { ...response, loginData: loginResponse };
        }
        
        return response;
    }

    async loginUsuario(credentials) {
        const response = await this.post('/usuarios.php/login', credentials);
        
        // Guardar token si el login es exitoso
        if (response.success && response.data.token) {
            this.token = response.data.token;
            if (typeof window !== 'undefined') {
                localStorage.setItem('allinbuy_token', this.token);
                localStorage.setItem('allinbuy_user', JSON.stringify(response.data.usuario));
            }
        }
        
        return response;
    }

    async obtenerPerfil(userId) {
        return this.get(`/usuarios.php/perfil/${userId}`);
    }

    async actualizarPerfil(userId, userData) {
        return this.put(`/usuarios.php/${userId}`, userData);
    }

    // Cerrar sesión
    logout() {
        this.token = null;
        if (typeof window !== 'undefined') {
            localStorage.removeItem('allinbuy_token');
            localStorage.removeItem('allinbuy_user');
        }
    }

    // Verificar si el usuario está logueado
    isAuthenticated() {
        return !!this.token;
    }

    // Obtener usuario actual del localStorage
    getCurrentUser() {
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem('allinbuy_user');
            return user ? JSON.parse(user) : null;
        }
        return null;
    }

    // ==================== CARRITO ====================
    
    async obtenerCarrito(userId) {
        return this.get(`/carrito.php/${userId}`);
    }

    async obtenerTotalCarrito(userId) {
        return this.get(`/carrito.php/${userId}/total`);
    }

    async agregarAlCarrito(userId, productoId, cantidad = 1) {
        return this.post(`/carrito.php/${userId}`, {
            producto_id: productoId,
            cantidad: cantidad
        });
    }

    async actualizarCarrito(userId, productoId, cantidad) {
        return this.put(`/carrito.php/${userId}/${productoId}`, {
            cantidad: cantidad
        });
    }

    async eliminarDelCarrito(userId, productoId) {
        return this.delete(`/carrito.php/${userId}/${productoId}`);
    }

    async limpiarCarrito(userId) {
        return this.delete(`/carrito.php/${userId}/limpiar`);
    }

    // ==================== PEDIDOS ====================
    
    async obtenerPedidos(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const endpoint = `/pedidos.php${queryString ? `?${queryString}` : ''}`;
        return this.get(endpoint);
    }

    async obtenerPedido(id) {
        return this.get(`/pedidos.php/${id}`);
    }

    async obtenerPedidosPorUsuario(userId) {
        return this.get(`/pedidos.php/usuario/${userId}`);
    }

    async obtenerPedidoPorNumero(numeroPedido) {
        return this.get(`/pedidos.php/numero/${numeroPedido}`);
    }

    async crearPedido(pedidoData) {
        return this.post('/pedidos.php/crear', pedidoData);
    }

    async actualizarEstadoPedido(pedidoId, estado, notas = '') {
        return this.put(`/pedidos.php/${pedidoId}`, {
            estado: estado,
            notas: notas
        });
    }

    async cancelarPedido(pedidoId) {
        return this.delete(`/pedidos.php/${pedidoId}`);
    }
}

// Crear instancia única del servicio
const apiService = new ApiService();

export default apiService;

// También exportar hooks personalizados para React
export const useApi = () => {
    return apiService;
};

// Hook para manejar el estado de autenticación
export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Verificar si hay usuario logueado al cargar
        const currentUser = apiService.getCurrentUser();
        setUser(currentUser);
        setIsLoading(false);
    }, []);

    const login = async (credentials) => {
        setIsLoading(true);
        const response = await apiService.loginUsuario(credentials);
        
        if (response.success) {
            setUser(response.data.usuario);
        }
        
        setIsLoading(false);
        return response;
    };

    const logout = () => {
        apiService.logout();
        setUser(null);
    };

    const register = async (userData) => {
        setIsLoading(true);
        const response = await apiService.registrarUsuario(userData);
        
        if (response.success && response.loginData?.success) {
            setUser(response.loginData.data.usuario);
        }
        
        setIsLoading(false);
        return response;
    };

    return {
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        register
    };
};

// Importar useState y useEffect para los hooks
import { useState, useEffect } from 'react';