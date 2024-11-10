const Categoria = require('../models/Categoria');

async function cargarCategorias(req, res, next) {
    try {
        const categorias = await Categoria.findAll();
        res.locals.categorias = categorias; // Disponibles en todas las vistas
        next();
    } catch (error) {
        console.error("Error al cargar categorías:", error);
        next(error);
    }
}
