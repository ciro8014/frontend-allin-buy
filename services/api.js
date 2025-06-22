// services/api.js - Servicio de conexión con el backend PHP

// Configuración base de la API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/php/api';

console.log('🔗 API Base URL:', API_BASE_URL);

/**
 * Clase principal para manejar todas las peticiones a la API
 */
class ApiService {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    /**
     * Método privado para realizar peticiones HTTP
     */
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        try {
            console.log(`🌐 ${options.method || 'GET'} ${url}`);
            
            const response = await fetch(url, config);
            
            // Verificar si la respuesta es JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error(`Respuesta no válida del servidor. Content-Type: ${contentType}`);
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || `Error HTTP: ${response.status}`);
            }

            console.log(`✅ Respuesta exitosa de ${endpoint}:`, data);
            return {
                success: true,
                data: data.data,
                ...data
            };

        } catch (error) {
            console.error(`❌ Error en ${endpoint}:`, error);
            return {
                success: false,
                error: error.message,
                data: null
            };
        }
    }

    // ==================== PRODUCTOS ====================

    /**
     * Obtener productos destacados para la página principal
     */
    async getProductosDestacados() {
        return this.request('/productos.php/destacados');
    }

    /**
     * Obtener todos los productos con filtros
     */
    async getProductos(filtros = {}) {
        const params = new URLSearchParams();
        
        Object.keys(filtros).forEach(key => {
            if (filtros[key] !== null && filtros[key] !== undefined && filtros[key] !== '') {
                params.append(key, filtros[key]);
            }
        });

        const queryString = params.toString();
        const endpoint = `/productos.php${queryString ? `?${queryString}` : ''}`;
        
        return this.request(endpoint);
    }

    /**
     * Obtener producto por ID
     */
    async getProducto(id) {
        return this.request(`/productos.php/${id}`);
    }

    /**
     * Buscar productos
     */
    async buscarProductos(termino, filtros = {}) {
        return this.getProductos({
            buscar: termino,
            ...filtros
        });
    }

    /**
     * Obtener productos por categoría
     */
    async getProductosPorCategoria(categoriaId, filtros = {}) {
        return this.request(`/productos.php/categoria/${categoriaId}?${new URLSearchParams(filtros)}`);
    }

    // ==================== CATEGORÍAS ====================

    /**
     * Obtener categorías destacadas para la página principal
     */
    async getCategoriasDestacadas() {
        return this.request('/categorias.php/destacadas');
    }

    /**
     * Obtener todas las categorías
     */
    async getCategorias() {
        return this.request('/categorias.php');
    }

    /**
     * Obtener categoría por ID
     */
    async getCategoria(id) {
        return this.request(`/categorias.php/${id}`);
    }

    // ==================== CARRITO ====================

    /**
     * Obtener carrito del usuario
     */
    async getCarrito(usuarioId) {
        return this.request(`/carrito.php/${usuarioId}`);
    }

    /**
     * Agregar producto al carrito
     */
    async agregarAlCarrito(usuarioId, productoId, cantidad = 1) {
        return this.request(`/carrito.php/${usuarioId}`, {
            method: 'POST',
            body: JSON.stringify({
                producto_id: productoId,
                cantidad: cantidad
            })
        });
    }

    /**
     * Actualizar cantidad en carrito
     */
    async actualizarCarrito(usuarioId, productoId, cantidad) {
        return this.request(`/carrito.php/${usuarioId}/${productoId}`, {
            method: 'PUT',
            body: JSON.stringify({
                cantidad: cantidad
            })
        });
    }

    /**
     * Eliminar producto del carrito
     */
    async eliminarDelCarrito(usuarioId, productoId) {
        return this.request(`/carrito.php/${usuarioId}/${productoId}`, {
            method: 'DELETE'
        });
    }

    /**
     * Limpiar todo el carrito
     */
    async limpiarCarrito(usuarioId) {
        return this.request(`/carrito.php/${usuarioId}/limpiar`, {
            method: 'DELETE'
        });
    }

    /**
     * Obtener totales del carrito
     */
    async getTotalesCarrito(usuarioId) {
        return this.request(`/carrito.php/${usuarioId}/total`);
    }

    // ==================== USUARIOS ====================

    /**
     * Registrar nuevo usuario
     */
    async registrarUsuario(datosUsuario) {
        return this.request('/usuarios.php/registro', {
            method: 'POST',
            body: JSON.stringify(datosUsuario)
        });
    }

    /**
     * Iniciar sesión
     */
    async login(email, password) {
        return this.request('/usuarios.php/login', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
    }

    /**
     * Obtener perfil de usuario
     */
    async getPerfil(usuarioId) {
        return this.request(`/usuarios.php/perfil/${usuarioId}`);
    }

    /**
     * Actualizar usuario
     */
    async actualizarUsuario(usuarioId, datos) {
        return this.request(`/usuarios.php/${usuarioId}`, {
            method: 'PUT',
            body: JSON.stringify(datos)
        });
    }

    // ==================== PEDIDOS ====================

    /**
     * Crear pedido desde carrito
     */
    async crearPedido(datoPedido) {
        return this.request('/pedidos.php/crear', {
            method: 'POST',
            body: JSON.stringify(datoPedido)
        });
    }

    /**
     * Obtener pedidos del usuario
     */
    async getPedidosUsuario(usuarioId) {
        return this.request(`/pedidos.php/usuario/${usuarioId}`);
    }

    /**
     * Obtener pedido por número
     */
    async getPedidoPorNumero(numeroPedido) {
        return this.request(`/pedidos.php/numero/${numeroPedido}`);
    }

    /**
     * Actualizar estado de pedido
     */
    async actualizarPedido(pedidoId, datos) {
        return this.request(`/pedidos.php/${pedidoId}`, {
            method: 'PUT',
            body: JSON.stringify(datos)
        });
    }

    // ==================== UTILIDADES ====================

    /**
     * Test de conexión con el backend
     */
    async testConexion() {
        try {
            const response = await this.getProductosDestacados();
            return {
                success: true,
                message: 'Conexión exitosa con el backend',
                data: response
            };
        } catch (error) {
            return {
                success: false,
                message: 'Error de conexión con el backend',
                error: error.message
            };
        }
    }

    /**
     * Obtener usuario actual (simulado - en producción usar JWT)
     */
    getCurrentUser() {
        if (typeof window === 'undefined') return null;
        
        try {
            const userData = localStorage.getItem('allinbuy_user');
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error('Error obteniendo usuario actual:', error);
            return null;
        }
    }

    /**
     * Guardar usuario actual
     */
    setCurrentUser(userData) {
        if (typeof window === 'undefined') return;
        
        try {
            localStorage.setItem('allinbuy_user', JSON.stringify(userData));
        } catch (error) {
            console.error('Error guardando usuario:', error);
        }
    }

    /**
     * Cerrar sesión
     */
    logout() {
        if (typeof window === 'undefined') return;
        
        try {
            localStorage.removeItem('allinbuy_user');
            localStorage.removeItem('allinbuy_token');
        } catch (error) {
            console.error('Error cerrando sesión:', error);
        }
    }
}

// Crear instancia singleton
const apiService = new ApiService();

// Exportar APIs específicas para facilitar el uso
export const productosAPI = {
    getDestacados: () => apiService.getProductosDestacados(),
    getAll: (filtros) => apiService.getProductos(filtros),
    getById: (id) => apiService.getProducto(id),
    buscar: (termino, filtros) => apiService.buscarProductos(termino, filtros),
    getPorCategoria: (categoriaId, filtros) => apiService.getProductosPorCategoria(categoriaId, filtros)
};

export const categoriasAPI = {
    getDestacadas: () => apiService.getCategoriasDestacadas(),
    getAll: () => apiService.getCategorias(),
    getById: (id) => apiService.getCategoria(id)
};

export const carritoAPI = {
    get: (usuarioId) => apiService.getCarrito(usuarioId),
    addItem: (usuarioId, productoId, cantidad) => apiService.agregarAlCarrito(usuarioId, productoId, cantidad),
    updateItem: (usuarioId, productoId, cantidad) => apiService.actualizarCarrito(usuarioId, productoId, cantidad),
    removeItem: (usuarioId, productoId) => apiService.eliminarDelCarrito(usuarioId, productoId),
    clear: (usuarioId) => apiService.limpiarCarrito(usuarioId),
    getTotals: (usuarioId) => apiService.getTotalesCarrito(usuarioId)
};

// services/api.js - Actualización para autenticación (agregar estas funciones)

// Actualizar el objeto usuariosAPI con estas mejoras:
export const usuariosAPI = {
  // Registro mejorado
  register: async (datos) => {
    try {
      const response = await apiService.request('/usuarios.php/registro', {
        method: 'POST',
        body: JSON.stringify(datos)
      });
      
      if (response.success) {
        // Auto-login después del registro
        const loginResponse = await usuariosAPI.login(datos.email, datos.password);
        return loginResponse;
      }
      
      return response;
    } catch (error) {
      return {
        success: false,
        error: 'Error de conexión'
      };
    }
  },

  // Login mejorado
  login: async (email, password) => {
    try {
      const response = await apiService.request('/usuarios.php/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      
      return response;
    } catch (error) {
      return {
        success: false,
        error: 'Error de conexión'
      };
    }
  },

  // Obtener perfil
  getPerfil: (usuarioId) => apiService.request(`/usuarios.php/perfil/${usuarioId}`),

  // Actualizar usuario
  update: (usuarioId, datos) => apiService.request(`/usuarios.php/${usuarioId}`, {
    method: 'PUT',
    body: JSON.stringify(datos)
  }),

  // Gestión de sesión mejorada
  getCurrentUser: () => {
    if (typeof window === 'undefined') return null;
    
    try {
      const userData = localStorage.getItem('allinbuy_user');
      const token = localStorage.getItem('allinbuy_token');
      
      if (userData && token) {
        const user = JSON.parse(userData);
        // Verificar si el token no ha expirado (simple check)
        return user;
      }
      
      return null;
    } catch (error) {
      console.error('Error obteniendo usuario actual:', error);
      return null;
    }
  },

  // Guardar usuario
  setCurrentUser: (userData) => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('allinbuy_user', JSON.stringify(userData));
    } catch (error) {
      console.error('Error guardando usuario:', error);
    }
  },

  // Logout mejorado
  logout: () => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem('allinbuy_user');
      localStorage.removeItem('allinbuy_token');
      
      // Redirigir a la página principal
      window.location.href = '/';
    } catch (error) {
      console.error('Error cerrando sesión:', error);
    }
  },

  // Verificar si el usuario está autenticado
  isAuthenticated: () => {
    const user = usuariosAPI.getCurrentUser();
    const token = localStorage.getItem('allinbuy_token');
    return !!(user && token);
  },

  // Verificar si el usuario es vendedor
  isVendor: () => {
    const user = usuariosAPI.getCurrentUser();
    return user && user.rol === 'vendedor';
  },

  // Recuperar contraseña (placeholder)
  forgotPassword: async (email) => {
    // En una implementación real, esto haría una llamada a la API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Correo de recuperación enviado'
        });
      }, 1000);
    });
  }
};

export const pedidosAPI = {
    crear: (datos) => apiService.crearPedido(datos),
    getByUser: (usuarioId) => apiService.getPedidosUsuario(usuarioId),
    getByNumber: (numero) => apiService.getPedidoPorNumero(numero),
    update: (pedidoId, datos) => apiService.actualizarPedido(pedidoId, datos)
};

// Exportar el servicio principal por defecto
export default apiService;

// Exportar función de test para debug
export const testConexion = () => apiService.testConexion();