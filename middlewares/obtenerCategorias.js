const db = require('../database/models')

const obtenerCategorias = async (req,res,next) =>{
    try {
        const categorias = await db.Categoria.findAll();

        res.locals.categorias=categorias;
        
        next();

    }catch(error){
        console.error('Error al obtener las categorias:', error);
        res.status(505).send('Hubo un error al obtener las categorias       ')
        

    }
}
module.exports = obtenerCategorias;