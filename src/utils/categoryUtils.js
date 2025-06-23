// src/utils/categoryUtils.js

/**
 * Convierte un texto con tildes y espacios a un slug URL-friendly
 */
export const createSlug = (text) => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .normalize('NFD') // Descompone caracteres con tildes
    .replace(/[\u0300-\u036f]/g, '') // Elimina las tildes
    .replace(/[^a-z0-9\s-]/g, '') // Elimina caracteres especiales
    .replace(/\s+/g, '-') // Reemplaza espacios con guiones
    .replace(/-+/g, '-') // Elimina guiones múltiples
    .trim('-'); // Elimina guiones al inicio/final
};

/**
 * Mapeo manual de categorías para mayor control
 */
export const categorySlugMap = {
  'artesania': 'Artesanía',
  'artesanal': 'Artesanía',
  'textiles': 'Textiles',
  'alimentos': 'Alimentos',
  'turismo': 'Turismo',
  'joyeria': 'Joyería',
  'ceramica': 'Cerámica',
  'cuero': 'Cuero',
  'madera': 'Madera'
};

/**
 * Obtiene el nombre de categoría desde un slug
 */
export const getCategoryNameFromSlug = (slug) => {
  if (!slug) return '';
  
  // Buscar en el mapa manual primero
  if (categorySlugMap[slug.toLowerCase()]) {
    return categorySlugMap[slug.toLowerCase()];
  }
  
  // Si no existe en el mapa, convertir el slug de vuelta a nombre
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Obtiene el slug desde un nombre de categoría
 */
export const getSlugFromCategoryName = (name) => {
  if (!name) return '';
  
  // Buscar en el mapa manual (invertido)
  const foundSlug = Object.keys(categorySlugMap).find(
    slug => categorySlugMap[slug].toLowerCase() === name.toLowerCase()
  );
  
  if (foundSlug) {
    return foundSlug;
  }
  
  // Si no existe en el mapa, crear slug automáticamente
  return createSlug(name);
};

/**
 * Lista de categorías con sus slugs correspondientes
 */
export const categoriesWithSlugs = [
  { id: 1, name: 'Artesanía', slug: 'artesania' },
  { id: 2, name: 'Textiles', slug: 'textiles' },
  { id: 3, name: 'Alimentos', slug: 'alimentos' },
  { id: 4, name: 'Turismo', slug: 'turismo' },
  { id: 5, name: 'Joyería', slug: 'joyeria' },
  { id: 6, name: 'Cerámica', slug: 'ceramica' },
  { id: 7, name: 'Cuero', slug: 'cuero' },
  { id: 8, name: 'Madera', slug: 'madera' }
];

// SQL para actualizar tu base de datos con slugs
export const updateCategoriesSQL = `
-- Agregar columna slug si no existe
ALTER TABLE categorias ADD COLUMN IF NOT EXISTS slug VARCHAR(100) UNIQUE;

-- Actualizar slugs para categorías existentes
UPDATE categorias SET slug = 'artesania' WHERE nombre LIKE '%Artesanía%' OR nombre LIKE '%artesania%';
UPDATE categorias SET slug = 'textiles' WHERE nombre LIKE '%Textiles%' OR nombre LIKE '%textiles%';
UPDATE categorias SET slug = 'alimentos' WHERE nombre LIKE '%Alimentos%' OR nombre LIKE '%alimentos%';
UPDATE categorias SET slug = 'turismo' WHERE nombre LIKE '%Turismo%' OR nombre LIKE '%turismo%';
UPDATE categorias SET slug = 'joyeria' WHERE nombre LIKE '%Joyería%' OR nombre LIKE '%joyeria%';
UPDATE categorias SET slug = 'ceramica' WHERE nombre LIKE '%Cerámica%' OR nombre LIKE '%ceramica%';
UPDATE categorias SET slug = 'cuero' WHERE nombre LIKE '%Cuero%' OR nombre LIKE '%cuero%';
UPDATE categorias SET slug = 'madera' WHERE nombre LIKE '%Madera%' OR nombre LIKE '%madera%';

-- Crear índice para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_categorias_slug ON categorias(slug);
`;

export default {
  createSlug,
  getCategoryNameFromSlug,
  getSlugFromCategoryName,
  categorySlugMap,
  categoriesWithSlugs,
  updateCategoriesSQL
};