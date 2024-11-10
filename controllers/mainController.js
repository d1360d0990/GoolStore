const db = require("../database/models");
const fs = require("fs");
const path = require("path");
const { validationResult } = require('express-validator');
const dataSource = require("../service/dataSource.js");
const { Sequelize, where } = require("sequelize");
const { Op } = require('sequelize');
const mainController = {
  showIndex: async (req, res) => {
    let usuario = null;
  
    // Verifica si el usuario está logueado
    if (req.session.user) {
      usuario = req.session.user;
    } else {
      usuario = false;
    }
  
    try {
      // Obtén productos aleatorios
      const randomProducts = await db.Producto.findAll({
        order: Sequelize.literal('RAND()'), // Ordena aleatoriamente
        limit: 9, // Cambia este número para ajustar la cantidad de productos
      });
  
      // Renderiza la vista con el usuario y los productos aleatorios
      return res.render("main/index", { usuario, randomProducts });
    } catch (error) {
      console.error("Error al obtener productos aleatorios:", error);
      res.status(500).send("Hubo un error al cargar los productos.");
    }
  },
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
  
};

module.exports = mainController;
