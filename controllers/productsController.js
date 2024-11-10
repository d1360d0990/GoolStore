const db = require("../database/models");
const fs = require("fs");
const path = require("path");
const { validationResult } = require('express-validator');
const dataSource = require("../service/dataSource.js");
const { Sequelize, where } = require("sequelize");
const { Op } = require('sequelize');
const productsController = {
  productsList: null,
  showDetails: (req, res) => {
    db.Producto.findbyPk(req.param).then((producto) => {
      return res.render("products/details-product2", { producto, usuario });
    });
  },
  showShopCart: (req, res) => {
    if (req.session.user) {
      const usuario = req.session.user;
      res.render("products/shop-cart", { usuario });
    }
  },
  // showAll: async (req, res) => {
  //   let usuario = req.session.user || null; 
  //   if (usuario) {
  //   } else {
  //     usuario = {};
  //   }
  //   console.log(usuario);

  //   db.Producto.findAll().then((productos) => {
  //     return res.render("products/productos", { productos, usuario });
  //   });

  // },
  showAll: async (req, res) => {
    try {
      // Obtener todos los productos de la base de datos
      const productos = await db.Producto.findAll({
        include: {
          model: db.Marca, //Acá se pone el modelo, o sea el return que se envia desde el modelo Marca
          as: 'marca',  // Alias que definimos en la asociación
          attributes: ['descripcion'] // Solo traer el nombre de la marca
        }
        // {   model: Talle,
        //   as: 'talles',  // Alias que definimos en la asociación
        //   attributes: ['talle'] 
        //  }

      });
      let successMessage = req.flash('successMessage')[0] || '';
      // Renderizar la vista y pasar los productos
      res.render('products/productos', { productos, successMessage });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al cargar los productos');
    }
  },
  showOfertas: async (req, res) => {
    try {
      // Obtener todos los productos de la base de datos
      const productos = await db.Producto.findAll({
        where: {
          oferta: true
        },
        include: {
          model: db.Marca, //Acá se pone el modelo, o sea el return que se envia desde el modelo Marca
          as: 'marca',  // Alias que definimos en la asociación
          attributes: ['descripcion'] // Solo traer el nombre de la marca
        }
        // {   model: Talle,
        //   as: 'talles',  // Alias que definimos en la asociación
        //   attributes: ['talle'] 
        //  }

      });
      let successMessage = req.flash('successMessage')[0] || '';
      // Renderizar la vista y pasar los productos
      res.render('products/ofertas', { productos, successMessage });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al cargar los productos');
    }
  },
  showById: async function (req, res) {
    let usuario = req.session.user || null; // Asigna null si no hay usuario
    let successMessage = req.flash('successMessage')[0] || '';
    // Verifica si el usuario tiene la propiedad admincomp y si es "admin"
    if (usuario && usuario.tipo_usuario === "admin") {
      console.log("administrador:", usuario);
    } else {
      usuario = {};
    }
    db.Producto.findByPk(req.params.id, {
      include: [
        {
          model: db.Talle,
          attributes: ["descripcion"],
          as: "talle",
        },
        {
          model: db.Marca,
          attributes: ["descripcion"],
          as: "marca",
        }
        
      ],
    }).then((producto) => {
      return res.render("products/details-product2", {
        producto,
        usuario,
        successMessage
      });
    });
  },
  showByIdCategoria: async function (req, res) {
    let usuario = req.session.user || null; // Asigna null si no hay usuario
    let successMessage = req.flash('successMessage')[0] || '';
    
    // Verifica si el usuario tiene la propiedad admincomp y si es "admin"
    if (usuario && usuario.tipo_usuario === "admin") {
      console.log("administrador:", usuario);
    } else {
      usuario = {};
    }
  
    try {
      // Busca el producto por ID e incluye las asociaciones
      const producto = await db.Producto.findByPk(req.params.id, {
        include: [
          {
            model: db.Talle,
            attributes: ["descripcion"],
            as: "talle",
          },
          {
            model: db.Marca,
            attributes: ["descripcion"],
            as: "marca",
          },
          {
            model: db.Categoria,
            as: "categoria",
            include: [
              {
                model: db.Categoria,  //Modifiqué y agregue relaciones, ya que este metodo sólo funciona con relaciones belongsTo. Los otros metodos funcionan con hasMany, los metodos mostrarproductos y demas. Debo investigarlo.
                as: "subca",
                include: [
                  {
                    model: db.Categoria,
                    as: "tiposPro",
                  }
                ]
              }
            ]
          }
        ],
      });
  
      if (!producto) {
        return res.status(404).send("Producto no encontrado");
      }
      const categoria = producto.categoria;
      const subcategoria = categoria?.subca || null;
      const tipoProducto = subcategoria?.tiposPro || null;
      return res.render("products/details-product2", {
        producto,
        usuario,
        successMessage,
        categoria,
        subcategoria,
        tipoProducto
      });
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      return res.status(500).send("Error interno del servidor");
    }
  },
  
  showBrand: async (req, res) => {
    const { brand } = req.params.brand;
    this.productsList = await dataSource.load();
    res.render("products/brands", {
      productos: this.productsList,
      brand: brand,
    });
    console.log(this.productsList);
  },

  showAddProduct: async (req, res) => {
    try {
      // Consultas a la base de datos para obtener marcas y talles
      let marcas = db.Marca.findAll();
      let talles = db.Talle.findAll();
      //   const categoriasPrincipales = await db.Categoria.findAll({
      //     where: { parent_id: null },
      //     include: {
      //         model: db.Categoria, //esta es la linea 122
      //         as: 'subcategoria'
      //     }

      // });
      const categoriasPrincipales = await db.Categoria.findAll({
        where: { parent_id: null, nivel: 1 },
        include: {
          model: db.Categoria,
          as: 'subcategoria',
          where: { nivel: 2 },
          required: false, // Hacer opcional en caso de que alguna categoría no tenga subcategorías
          include: {
            model: db.Categoria,
            as: 'tiposProducto', // Esto representa el nivel de tipo de producto
            where: { nivel: 3 },
            required: false
          }
        }
      });

      const errorMessage = req.flash('ValErrorMessage')[0] || ''; // Recuperar el mensaje de error
      const successMessage = req.flash('successMessage')[0] || ''; // Recuperar el mensaje de éxito
      Promise.all([marcas, talles]).then(([marcas, talles]) => {
        res.render("products/addproduct", { marcas, talles, mapsDeError: {}, errorMessage, successMessage, categoriasPrincipales });
      });
    } catch (error) {
      console.error("Error obteniendo las categorías:", error);
      res.status(500).send("Hubo un error al cargar las categorías.");
    }
  },

  addProduct: async (req, res) => {
    try {
      // Consultas a la base de datos para obtener marcas y talles
      let marcas = db.Marca.findAll();
      let talles = db.Talle.findAll();

      // Validación de errores en el request
      let errores = validationResult(req);
      const imgProduct = req.file ? `${req.file.filename}` : "default.jpg";
      const { nombre, descripcion, color, precio, marca, tipoProducto, talle } = req.body;

      if (errores.isEmpty()) {
        // Si no hay errores, crear el producto
        await db.Producto.create({
          nombre,
          descripcion,
          imagen: imgProduct,
          color,
          precio,
          id_categoria: tipoProducto,
          id_marca: marca,
          id_talle: talle
        });
        // Guardar mensaje de éxito en flash
        req.flash('successMessage', 'Producto creado con éxito.');
        return res.redirect('/products/addproduct'); // Redirigir a la misma página de carga
        // Redirigir al listado de productos
        // return res.redirect("/products");
        // return res.render("products/addproduct", { mapsDeError: {} });
      } else {
        console.log(errores.mapped());
        req.flash('ValErrorMessage', 'Complete los campos requeridos');
        // Si hay errores, realizar las consultas para obtener marcas y talles
        let [marcasResult, tallesResult] = await Promise.all([marcas, talles]);
        const errorMessage = req.flash('ValErrorMessage')[0] || '';
        const successMessage = req.flash('successMessage')[0] || ''; // Recuperar el mensaje de éxito
        // Renderizar la vista de agregar producto con los errores, los datos viejos y las listas de marcas y talles
        return res.render("products/addproduct", {
          marcas: marcasResult,
          talles: tallesResult,
          mapsDeError: errores.mapped(),
          old: req.body,
          errorMessage, // Datos ingresados para que el formulario no se reinicie
          successMessage
        });
      }
    } catch (error) {
      console.error(error);
      req.flash('ValErrorMessage', 'Ocurrió un error. Intente nuevamente');
      return res.render("products/addproduct");

      // return res.status(500).send('Error al procesar la solicitud');
    }
  },

  showEditForm: async (req, res) => {
    try {
      const marcas = await db.Marca.findAll();
      const talles = await db.Talle.findAll();
      const errorMessage = req.flash('ValErrorMessage')[0] || '';
      const successMessage = req.flash('successMessage')[0] || '';

      const producto = await db.Producto.findByPk(req.params.id, {
        include: [
          {
            model: db.Talle,
            attributes: ["id", "descripcion"],
            as: "talle",
          },
          {
            model: db.Marca,
            attributes: ["id", "descripcion"],
            as: "marca",
          },
          {

            model: db.Categoria,
            as: "categoria",
            include: [
              {
                model: db.Categoria,
                as: "subca",
                include: [
                  {
                    model: db.Categoria,
                    as: "tiposPro",
                  }
                ]
              }
            ]
          }
        ],
      });
      //ETE METODO USO PARA OBTENER LOS DATOS DE LAS CATEGORIAS, SUBCATEGORIAS Y TIPOS DE PRODUCTOS. HABIA ERROR PORQUE ESTABA NOMBRANDO A LAS VARIABLES DE FORMA INCORRECTA, LE PONIA "SUBCATEGORIA" Y "CATEGORIA", Y LOS RENOMBRÉ COMO "subcategoriaEditado" Y "categoriaEditado" PARA QUE NO HAYA ERROR.
      let tipo = producto.id_categoria;
      let productoEditado = await db.Categoria.findByPk(tipo);
      let subcategoriaEditado = await db.Categoria.findByPk(productoEditado.parent_id);
      let categoriaEditado = await db.Categoria.findByPk(subcategoriaEditado.parent_id);

      console.log('tipo:', tipo);
      console.log('productoEditado:', productoEditado);
      console.log('subcategoria:', subcategoriaEditado);
      console.log('categoria:', categoriaEditado);
      // Verificar si el producto existe
      if (!producto) {
        return res.status(404).send("Producto no encontrado.");
      }

      // Obtener las categorías principales
      const categoriasPrincipales = await db.Categoria.findAll({
        where: { parent_id: null, nivel: 1 },
        include: {
          model: db.Categoria,
          as: 'subcategoria',
          where: { nivel: 2 },
          required: false,
          include: {
            model: db.Categoria,
            as: 'tiposProducto',
            where: { nivel: 3 },
            required: false
          }
        }
      });

      // Definir los IDs de categoría, subcategoría y tipo de producto actuales del producto. SE USAN EL NOMBRE DE LAS RELACIONES!!! ES OTRA FORMA DE ACCEDER A LOS DATOS DE LAS CATEGORIAS. ESTA FORMA NO LA USO
      const productoTipo = producto.categoria ? producto.categoria : null;
      const productoSubcategoria = producto.categoria && producto.categoria.subca ? producto.categoria.subca : null; // Acceso correcto
      const productoCategoria = producto.categoria && producto.categoria.subca && producto.categoria.subca.tiposPro ? producto.categoria.subca.tiposPro : null;
      console.log('1',productoTipo);
      console.log('2',productoSubcategoria);
      console.log('3',productoCategoria);
      // Renderizar la vista
      res.render("products/editproduct", {
        producto,
        marcas,
        talles,
        mapsDeError: {},
        errorMessage,
        successMessage,
        categoriasPrincipales,
        productoEditado,
        subcategoriaEditado,
        categoriaEditado,
        productoTipo,
        productoSubcategoria,
        productoCategoria
      });
    } catch (error) {
      console.error("Error en showEditForm:", error);
      res.status(500).send("Hubo un error al cargar el formulario de edición.");
    }
  },


  editProduct: async (req, res) => {
    try {
      // Consultas a la base de datos para obtener marcas y talles (await porque son operaciones asincrónicas)
      let marcas = await db.Marca.findAll();
      let talles = await db.Talle.findAll();
      let categorias = await db.Categoria.findAll();

      // Validación de errores en el request
      let errores = validationResult(req);
      console.log(errores);
      // Manejo de imagen del producto
      let imgProduct = req.file?.filename ? `${req.file.filename}` : req.body.currentImage;

      const { id } = req.params;
      let producto = await db.Producto.findByPk(id);
      if (errores.isEmpty()) {
        console.log('dentro del if errores is empty');
        // Si no hay errores, actualizar el producto
        await db.Producto.update(
          {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            imagen: imgProduct,
            color: req.body.color,
            precio: req.body.precio,
            id_talle: req.body.talle,
            id_marca: req.body.marca,
            id_categoria: req.body.tipoProducto,
            oferta: req.body.oferta === "on",
            descuento: parseFloat(req.body.descuento) || 0,
          },
          { where: { id: id } }
        );
        // const { id } = req.params;
        console.log('objeto producto', producto);
        req.flash('successMessage', 'Producto editado con éxito.');
        // Redirigir a la vista de detalle del producto actualizado
        return res.redirect(`/products/detail/${id}`);
      } else {
        console.log(errores.mapped());
        req.flash('ValErrorMessage', 'Complete los campos requeridos');
        const errorMessage = req.flash('ValErrorMessage')[0] || '';
        const successMessage = req.flash('successMessage')[0] || ''; // Recuperar el mensaje de éxito
        // Si hay errores, renderizar la vista de edición con errores y datos viejos
        return res.render("products/editproduct", {
          producto: producto,
          marcas: marcas,
          talles: talles,
          mapsDeError: errores.mapped(),
          old: req.body,
          successMessage,
          errorMessage // Datos ingresados para que el formulario no se reinicie


        });
      }
    } catch (error) {
      console.error(error);
      req.flash('ValErrorMessage', 'Ocurrió un error. Intente nuevamente');
      // return res.status(500).send("Error al procesar la solicitud");
      return res.redirect(`/products/detail/${id}`);
    }
  },

  // Método para listar productos por categoría principal

  mostrarProductos: async (req, res) => {
    async function obtenerCategoriaPrincipal(categoriaId) {
      let categoriaActual = await db.Categoria.findByPk(categoriaId);
      while (categoriaActual && categoriaActual.nivel !== 1) {
        categoriaActual = await db.Categoria.findByPk(categoriaActual.parent_id);
      }
      return categoriaActual;
    }
    async function obtenerSubcategoria(categoriaId) {
      let subCategoriaActual = await db.Categoria.findByPk(categoriaId);
      while (subCategoriaActual && subCategoriaActual.nivel !== 2 && subCategoriaActual.nivel !== 1) {
        subCategoriaActual = await db.Categoria.findByPk(subCategoriaActual.parent_id);
      }
      return subCategoriaActual;
    }

    try {

      const { categoriaId } = req.query; // Obtenemos el ID de categoría seleccionada
      // const categoriaSeleccionadaId = Number(categoriaId); // Convertimos a número
      let categoriaSeleccionadaId = categoriaId; // Convertimos a número
      console.log('categoriaId:', categoriaId);
      // Buscamos la categoría seleccionada en la base de datos
      let categoriaSeleccionada = await db.Categoria.findByPk(categoriaSeleccionadaId); //Primer where

      // Si no se encuentra la categoría, mostramos todos los productos
      if (!categoriaSeleccionada) {
        // Asumiendo que `productos` está disponible en el contexto, quizás desde una consulta previa
        const productos = await db.Producto.findAll(); // Obtiene todos los productos
        return res.render('products/productos', { productos });
      }
      let categoriaPrincipal='';
      let nombreSubcategoria='';
      let tipoProducto='';
      let bannerSubcategoria='';
      
      
      let categoriaBanner = '';
      let subCategoriaBanner = '';
      let bannerTipoProducto = '';
      let bannerCategoriaPrincipal = '';
      if (categoriaSeleccionada.nivel === 1) {
        categoriaPrincipal = await obtenerCategoriaPrincipal(categoriaSeleccionadaId);
        bannerCategoriaPrincipal = categoriaPrincipal ? categoriaPrincipal : null; //Acá se le da el valor a la categoria en caso de que se haga clic en una categoria principal (nivel 1)

      }
      if (categoriaSeleccionada.nivel === 2) {
        nombreSubcategoria = await obtenerSubcategoria(categoriaSeleccionadaId);
        categoriaPrincipal = await db.Categoria.findByPk(nombreSubcategoria.parent_id);
        bannerCategoriaPrincipal = categoriaPrincipal ? categoriaPrincipal : null; //Acá se le da el valor a la categoria en caso de que se haga clic en una categoria principal
        bannerSubcategoria = nombreSubcategoria ? nombreSubcategoria: null;
        // bannerSubcategoriaCategoria = subCategoriaCategoria ? subCategoriaCategoria.categoria : null; //Acá se le da el valor a la categoria en caso de que se haga clic en una subcategoria (nivel 2)
      }

      if (categoriaSeleccionada.nivel === 3) {
        tipoProducto = await db.Categoria.findByPk(categoriaSeleccionadaId);
        nombreSubcategoria = await db.Categoria.findByPk(tipoProducto.parent_id);
        categoriaPrincipal = await db.Categoria.findByPk(nombreSubcategoria.parent_id);

        bannerTipoProducto = tipoProducto ? tipoProducto : null;
        bannerCategoriaPrincipal = categoriaPrincipal ? categoriaPrincipal : null;
        bannerSubcategoria = nombreSubcategoria ? nombreSubcategoria : null;
      }
  

      let productosFiltrados = [];
  
      console.log('categoriaBanner:', categoriaBanner);
      // Caso 1: Si es una categoría principal
      if (categoriaSeleccionada.nivel === 1) {
        const subcategorias = await db.Categoria.findAll({ where: { parent_id: categoriaSeleccionadaId } });//Segundo where
        const subcategoriasIds = subcategorias.map(sub => sub.id);
        // console.log('subcategoria:', subcategorias);
        // console.log('subcategoriasid:', subcategoriasIds);

        const tiposProductos = await db.Categoria.findAll({ where: { parent_id: subcategoriasIds } });
        const tiposProductosIds = tiposProductos.map(tipo => tipo.id);

        productosFiltrados = await db.Producto.findAll({
          where: {
            [Op.or]: [
              { id_categoria: categoriaSeleccionadaId },
              { id_categoria: subcategoriasIds },
              { id_categoria: tiposProductosIds }

            ]
          }
        });


      }
      // Caso 2: Si es una subcategoría
      else if (categoriaSeleccionada.nivel === 2) {
        const tiposProductos = await db.Categoria.findAll({ where: { parent_id: categoriaSeleccionadaId } });
        const tiposProductosIds = tiposProductos.map(tipo => tipo.id);

        productosFiltrados = await db.Producto.findAll({
          where: {
            [Op.or]: [
              { id_categoria: categoriaSeleccionadaId },
              { id_categoria: tiposProductosIds }
            ]
          }
        });
      }
      // Caso 3: Si es un tipo de producto específico
      else if (categoriaSeleccionada.nivel === 3) {
        productosFiltrados = await db.Producto.findAll({ where: { id_categoria: categoriaSeleccionadaId } });
        // console.log(productosFiltrados);
      }

      // Enviamos los productos filtrados a la vista

      res.render('products/productoscat', { productos: productosFiltrados, categoriaBanner, nombreSubcategoria: null, bannerSubcategoria, bannerCategoriaPrincipal, bannerTipoProducto});
    } catch (error) {
      console.error("Error al mostrar productos:", error);
      res.status(500).send("Ocurrió un error al procesar la solicitud.");
    }
  },

  showMenu: async (req, res) => {
    try {
      const categorias = await db.Categoria.findAll();
      res.render('partials/navbar', { categorias });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al cargar las categorías');
    }
  },
  showDelete: (req, res) => {
    let usuario = req.session.user || null; // Asigna null si no hay usuario
    const errorMessage = req.flash('ValErrorMessage')[0] || ''; // Recuperar el mensaje de error
    const successMessage = req.flash('successMessage')[0] || ''; // Recuperar el mensaje de éxito
    // Verifica si el usuario tiene la propiedad admincomp y si es "admin"
    if (usuario && usuario.admincomp === "admin") {
      console.log("administrador:", usuario);
    } else {
      usuario = {};
    }
    const pedidoProducto = db.Producto.findByPk(req.params.id, {
      include: [
        {
          model: db.Talle,
          attributes: ["descripcion"],
          as: "talle",
        },
        {
          model: db.Marca,
          attributes: ["descripcion"],
          as: "marca",
        },
      ],
    }).then((producto) => {
      return res.render("products/showDelete", {
        producto,
        usuario,
        errorMessage,
        successMessage
      });
    });
  },
  deleteProduct: async (req, res) => {
    let productId = req.params.id;
    db.Producto.destroy({ where: { id: productId }, force: true }) // force: true es para asegurar que se ejecute la acción
      .then(() => {
        req.flash('successMessage', 'Producto eliminado con éxito.');
        return res.redirect("/products");
      })
      .catch((error) => res.send(error));
  },
  searchProduct: async (req, res) => {
    const query = req.query.query;
    try {
      const productos = await db.Producto.findAll({
        where: {
      [Sequelize.Op.or]: [
        {
          nombre: {
            [Sequelize.Op.like]: `%${query}%`
          }
        },
        {
          '$Marca.descripcion$': {
            [Sequelize.Op.like]: `%${query}%`
          }
        }
      ]
    },
    include: [
      {
        model: db.Marca,
        as: 'marca', 
        attributes: ['descripcion'] // Incluir sólo el campo necesario de la marca
      }
    ]
      });
      res.render('products/resultadosBusqueda', { productos, query })
    } catch (error) {
      console.error('Error en la busqueda', error);
      res.status(500).send('Error en la busqueda')
    }

  },
  menuSearch: async (req, res) => {
    try {
      const categoria = req.params.id;
      const productos = await db.Producto.findAll({
        where: { id_categoria: categoria }
      });

      res.sender('productosPorCategoria', { productos })

    } catch { error }
  }
};
module.exports = productsController;
