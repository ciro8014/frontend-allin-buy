// Archivo: src/services/api.js

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/php/api';

// Función helper para hacer requests
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}

// ============= PRODUCTOS =============

export const productosAPI = {
  // Obtener productos destacados para la página principal
  getDestacados: async () => {
    return apiRequest('/productos.php/destacados');
  },

  // Obtener todos los productos con filtros
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/productos.php${queryString ? '?' + queryString : ''}`);
  },

  // Obtener producto por ID
  getById: async (id) => {
    return apiRequest(`/productos.php/${id}`);
  },

  // Obtener productos por categoría
  getByCategoria: async (categoriaId, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/productos.php/categoria/${categoriaId}${queryString ? '?' + queryString : ''}`);
  },

  // Crear producto
  create: async (producto) => {
    return apiRequest('/productos.php', {
      method: 'POST',
      body: JSON.stringify(producto),
    });
  },

  // Actualizar producto
  update: async (id, producto) => {
    return apiRequest(`/productos.php/${id}`, {
      method: 'PUT',
      body: JSON.stringify(producto),
    });
  },

  // Eliminar producto
  delete: async (id) => {
    return apiRequest(`/productos.php/${id}`, {
      method: 'DELETE',
    });
  },
};

// ============= CATEGORÍAS =============

export const categoriasAPI = {
  // Obtener categorías destacadas
  getDestacadas: async () => {
    return apiRequest('/categorias.php/destacadas');
  },

  // Obtener todas las categorías
  getAll: async (incluirInactivas = false) => {
    const params = incluirInactivas ? '?incluir_inactivas=1' : '';
    return apiRequest(`/categorias.php${params}`);
  },

  // Obtener categoría por ID
  getById: async (id) => {
    return apiRequest(`/categorias.php/${id}`);
  },

  // Crear categoría
  create: async (categoria) => {
    return apiRequest('/categorias.php', {
      method: 'POST',
      body: JSON.stringify(categoria),
    });
  },

  // Actualizar categoría
  update: async (id, categoria) => {
    return apiRequest(`/categorias.php/${id}`, {
      method: 'PUT',
      body: JSON.stringify(categoria),
    });
  },

  // Eliminar categoría
  delete: async (id) => {
    return apiRequest(`/categorias.php/${id}`, {
      method: 'DELETE',
    });
  },
};

// ============= USUARIOS =============

export const usuariosAPI = {
  // Registrar usuario
  register: async (userData) => {
    return apiRequest('/usuarios.php/registro', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Iniciar sesión
  login: async (email, password) => {
    return apiRequest('/usuarios.php/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  // Obtener perfil de usuario
  getProfile: async (userId) => {
    return apiRequest(`/usuarios.php/perfil/${userId}`);
  },

  // Actualizar perfil
  updateProfile: async (userId, userData) => {
    return apiRequest(`/usuarios.php/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  // Obtener todos los usuarios (admin)
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/usuarios.php${queryString ? '?' + queryString : ''}`);
  },
};

// ============= CARRITO =============

export const carritoAPI = {
  // Obtener carrito del usuario
  get: async (userId) => {
    return apiRequest(`/carrito.php/${userId}`);
  },

  // Obtener solo totales del carrito
  getTotal: async (userId) => {
    return apiRequest(`/carrito.php/${userId}/total`);
  },

  // Agregar producto al carrito
  addItem: async (userId, productoId, cantidad = 1) => {
    return apiRequest(`/carrito.php/${userId}`, {
      method: 'POST',
      body: JSON.stringify({ producto_id: productoId, cantidad }),
    });
  },

  // Actualizar cantidad de producto
  updateItem: async (userId, productoId, cantidad) => {
    return apiRequest(`/carrito.php/${userId}/${productoId}`, {
      method: 'PUT',
      body: JSON.stringify({ cantidad }),
    });
  },

  // Eliminar producto del carrito
  removeItem: async (userId, productoId) => {
    return apiRequest(`/carrito.php/${userId}/${productoId}`, {
      method: 'DELETE',
    });
  },

  // Limpiar carrito
  clear: async (userId) => {
    return apiRequest(`/carrito.php/${userId}/limpiar`, {
      method: 'DELETE',
    });
  },
};

// ============= PEDIDOS =============

export const pedidosAPI = {
  // Obtener todos los pedidos
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/pedidos.php${queryString ? '?' + queryString : ''}`);
  },

  // Obtener pedidos por usuario
  getByUser: async (userId) => {
    return apiRequest(`/pedidos.php/usuario/${userId}`);
  },

  // Obtener pedido por ID
  getById: async (id) => {
    return apiRequest(`/pedidos.php/${id}`);
  },

  // Obtener pedido por número
  getByNumber: async (numeroPedido) => {
    return apiRequest(`/pedidos.php/numero/${numeroPedido}`);
  },

  // Crear pedido desde carrito
  createFromCart: async (pedidoData) => {
    return apiRequest('/pedidos.php/crear', {
      method: 'POST',
      body: JSON.stringify(pedidoData),
    });
  },

  // Actualizar estado del pedido
  updateStatus: async (id, estado, data = {}) => {
    return apiRequest(`/pedidos.php/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ estado, ...data }),
    });
  },

  // Cancelar pedido
  cancel: async (id) => {
    return apiRequest(`/pedidos.php/${id}`, {
      method: 'DELETE',
    });
  },
};

// ============= HOOKS PERSONALIZADOS =============

// Hook para manejar estados de carga
export function useApiState() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (apiCall) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, execute };
}

// ============= UTILIDADES =============

export const apiUtils = {
  // Construir URL con parámetros
  buildUrl: (endpoint, params = {}) => {
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined) {
        url.searchParams.append(key, params[key]);
      }
    });
    return url.toString();
  },

  // Manejar errores de API
  handleError: (error) => {
    console.error('API Error:', error);
    
    // Puedes personalizar el manejo de errores aquí
    if (error.message.includes('404')) {
      return 'Recurso no encontrado';
    } else if (error.message.includes('401')) {
      return 'No autorizado. Por favor, inicia sesión';
    } else if (error.message.includes('500')) {
      return 'Error interno del servidor. Inténtalo más tarde';
    }
    
    return error.message || 'Ha ocurrido un error inesperado';
  },

  // Formatear respuesta de API
  formatResponse: (response) => {
    if (response.success) {
      return response.data;
    } else {
      throw new Error(response.error || 'Error en la respuesta de la API');
    }
  },
};

// Exportar todo como default también
export default {
  productos: productosAPI,
  categorias: categoriasAPI,
  usuarios: usuariosAPI,
  carrito: carritoAPI,
  pedidos: pedidosAPI,
  utils: apiUtils,
};
