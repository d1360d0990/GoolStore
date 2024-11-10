const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();
const {body, check}=require("express-validator");
const fotoUserUpload = require("../service/fotoUserUpload");
const logregMiddleware = require("../middlewares/logregMiddelware");
const validateCurrentPassword = require("../middlewares/changePassword");

router.get("/login", logregMiddleware, usersController.showLogin);
router.get("/somosgooolstore", usersController.somos);
router.post("/login", usersController.login);

router.get("/logout", usersController.logout);
router.get("/register", logregMiddleware, usersController.showRegister);


//----------------------------------------Validar Registro Back----------------------------------
const validator = [
  body('nombre').isLength({min: 2}).withMessage('Nombre debe tener más de 1 caracter').notEmpty().trim().withMessage('Ingrese su nombre'),
  body('apellido').isLength({min: 2}).withMessage('Apellido debe tener más de 1 caracter').notEmpty().trim().withMessage('Ingrese su apellido'),
  body('dni').isInt().trim().withMessage('Ingrese su dni'),
  body('telefono').isInt().trim().withMessage('Ingrese su teléfono'),
  body('domicilio').notEmpty().trim().withMessage('Ingrese su domicilio'),
  body('country').notEmpty().trim().withMessage('Ingrese su pais'),
  body('nombreUsuario').notEmpty().trim().withMessage('Ingrese su nombre de usuario'),
  body('email').isEmail().trim().withMessage('Ingrese su email'),
  body('emailVerify').isEmail().trim().withMessage('Confirme su email')
      .custom((value, {req}) => value === req.body.email).withMessage("Los emails no coinciden"),
  body('password')
      .notEmpty().withMessage('Ingrese una contraseña')
      .trim()
      .isLength({ min: 8 }).withMessage('La contraseña debe contener al menos 8 caracteres.'),
  body('passwordVerify').notEmpty().withMessage('Confirme su contraseña')
      .notEmpty().withMessage('Ingrese una contraseña')
      .trim()
      .isLength({ min: 8 }).withMessage('La contraseña debe contener al menos 8 caracteres.')
      .custom((value, {req}) => value === req.body.password).withMessage("Las contraseñas no coinciden"),
  check('admincomp')
  .exists().withMessage('Seleccione un rol')
  .bail()
  // .custom((value, { req }) => {
  //     if (!req.body.role || !Array.isArray(req.body.role) || req.body.role.length !== 1) {
  //         throw new Error('Seleccione un rol válido');
  //     }
  //     return true;
  // })
    ] 
const validatorCuenta = [
  body('nombreUsuario').notEmpty().trim().withMessage('Ingrese su nombre de usuario'),
  body('email').isEmail().trim().withMessage('Ingrese su email'),
  body('emailVerify').isEmail().trim().withMessage('Confirme su email')
      .custom((value, {req}) => value === req.body.email).withMessage("Los emails no coinciden"),
  // body('password')
  //     .notEmpty().withMessage('Ingrese una contraseña')
  //     .trim()
  //     .isLength({ min: 8 }).withMessage('La contraseña debe contener al menos 8 caracteres.'),
  // body('passwordVerify').notEmpty().withMessage('Confirme su contraseña')
  //     .notEmpty().withMessage('Ingrese una contraseña')
  //     .trim()
  //     .isLength({ min: 8 }).withMessage('La contraseña debe contener al menos 8 caracteres.')
  //     .custom((value, {req}) => value === req.body.password).withMessage("Las contraseñas no coinciden"),
   // Validar que si newPassword tiene un valor, confirmNewPassword también lo tenga
  // Validar que si newPassword tiene un valor, sea válida
  check('newP')
  .optional()
  .isLength({ min: 8 }).withMessage('La nueva contraseña debe tener al menos 8 caracteres')
  .bail()
  .custom((value, { req }) => {
      if (!value && req.body.confirmNewP) { //el nombre confirmNewP es el name del input de confirmar contraseña
          throw new Error('Debes ingresar una nueva contraseña si deseas confirmarla');
      }
      return true;
  }),

// Validar que si newPassword existe, confirmNewPassword también lo haga y coincidan
check('confirmNewP')
  .if(body('newP').exists()) // Solo validar si newPassword existe
  .notEmpty().withMessage('Debes confirmar la nueva contraseña')
  .custom((value, { req }) => {
      if (value !== req.body.newP) {
          throw new Error('Las contraseñas no coinciden');
      }
      return true;
  }),

  check('admincomp')
  .exists().withMessage('Seleccione un rol')
  .bail(),
  check('currentPassword').notEmpty().withMessage('Ingrese su contraseña actual')
  // .custom((value, { req }) => {
  //     if (!req.body.role || !Array.isArray(req.body.role) || req.body.role.length !== 1) {
  //         throw new Error('Seleccione un rol válido');
  //     }
  //     return true;
  // })
    ] 
const validatorPerfil  = [
  body('nombre').notEmpty().trim().withMessage('Ingrese su nombre'),
  body('apellido').notEmpty().trim().withMessage('Ingrese su apellido'),
  body('dni').isInt().trim().withMessage('Ingrese su dni'),
  body('telefono').isInt().trim().withMessage('Ingrese su teléfono'),
  body('domicilio').notEmpty().trim().withMessage('Ingrese su domicilio'),
  body('country').notEmpty().trim().withMessage('Ingrese su pais'),
  
  // .custom((value, { req }) => {
  //     if (!req.body.role || !Array.isArray(req.body.role) || req.body.role.length !== 1) {
  //         throw new Error('Seleccione un rol válido');
  //     }
  //     return true;
  // })
    ] 
// router.get("/register", usersController.showRegister);



router.post("/register", fotoUserUpload.single("foto"), validator, usersController.register);
router.get("/perfil", usersController.perfil);
// router.get("/perfil/:id", usersController.perfil);
router.get("/editar-perfil", usersController.showEdit);
router.get("/editar-cuenta", usersController.showEditCuenta);
router.put(
    "/perfil/:id",
    fotoUserUpload.single("foto"),
    validatorPerfil,
    // logregMiddleware,
    usersController.editUser
  );
router.put(
    "/cuenta/:id",
    // fotoUserUpload.single("foto"),
    // logregMiddleware,
    validatorCuenta,
    validateCurrentPassword,
    usersController.editCuenta
  );

module.exports = router;

router.post('/validate-password', usersController.validatePassword);

// validacion de rutas
// app.use((req, res, next) => {
//   if (req.session.user) {
//       next();
//   } else {
//       res.redirect('/login');
//   }
// });
