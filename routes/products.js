const express = require("express");
const productsController = require("../controllers/productsController");
const router = express.Router();
const fileUpload = require("../service/fileUpload");
const {body, check}=require("express-validator");

const userMiddleware = require("../middlewares/userMiddleware.js");
const adminMiddleware = require("../middlewares/adminMiddleware.js");
// router.get("/details-product", (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'details-product.ejs'));
// });

// router.get("/shopping-cart", (req, res) =>{
//    res.sendFile(path.resolve(__dirname,'shopping-cart.ejs'));
// });

const validatorProd = [
  body('nombre').notEmpty().trim().withMessage('Ingrese el nombre del producto').isLength({ min: 2}).withMessage('El nombre debe tener más de 2 caracteres'),
  body('descripcion').notEmpty().trim().withMessage('Ingrese la descripción').isLength({ min: 20}).withMessage('La descripcion debe tener al menos 20 caracteres'),
  body('categoria').notEmpty().trim().withMessage('Ingrese la categoría'),
  body('subcategoria').notEmpty().trim().withMessage('Ingrese la subcategoría'),
  body('tipoProducto').notEmpty().trim().withMessage('Ingrese el tipo de producto'),
  body('color').notEmpty().trim().withMessage('Ingrese el color'),
  body('precio').isDecimal().trim().withMessage('Ingrese el precio'),
  body('marca').notEmpty().trim().withMessage('Ingrese la marca'),
  body('talle').notEmpty().trim().withMessage('Ingrese el talle'),
  
  // .custom((value, { req }) => {
  //     if (!req.body.role || !Array.isArray(req.body.role) || req.body.role.length !== 1) {
  //         throw new Error('Seleccione un rol válido');
  //     }
  //     return true;
  // })
    ] 

router.get("/shop-cart", userMiddleware, productsController.showShopCart);

router.get("/", productsController.showAll);

router.get("/ofertas", productsController.showOfertas);

// router.get("/details-product", productsController.showDetails);

// router.get("/brands/:brand", productsController.showBrand);

router.get("/detail/:id", productsController.showByIdCategoria);

router.get("/addproduct/", adminMiddleware, productsController.showAddProduct);



router.get('/search', productsController.searchProduct);

router.get('/search-menu', productsController.menuSearch);

// router.post(
//   "/",
//   fileUpload.single("imagen"),
//   adminMiddleware,
//   validatorProd,
//   productsController.addProduct
// );
router.post(
  "/",
  fileUpload.single("imagen"),
  adminMiddleware,
  validatorProd,
  productsController.addProduct
);

router.get(
  "/categorias",
  // adminMiddleware,
    productsController.mostrarProductos
);


router.get(
  "/editproduct/:id",
  adminMiddleware,
  productsController.showEditForm
);

router.put(
  "/detail/:id",
  fileUpload.single("imagen"),
  adminMiddleware,
  validatorProd,
  productsController.editProduct
);

router.get("/showDelete/:id", adminMiddleware, productsController.showDelete);

router.delete(
  "/deleteProduct/:id",
  adminMiddleware,
  productsController.deleteProduct
);
//--------------------------------------Destacados-----------------------------------------------------------



module.exports = router;
