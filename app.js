const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 8080;
const methodOverride = require("method-override");
const rutaUsers = require("./routes/users.js");
const rutaProducts = require("./routes/products.js");
const rutaMain = require("./routes/main.js");
const bodyParser = require("body-parser");
const session = require("express-session");
const rememberMiddleware = require("./middlewares/rememberMiddleware.js");
const sessionMiddleware = require("./middlewares/sessionMiddleware.js");
const obtenerCategorias = require("./middlewares/obtenerCategorias.js");
const flash = require('connect-flash');
// const Swal = require('sweetalert2')


app.use(flash());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "claveSecreta",
    saveUninitialized: false,
    resave: false,
    cookie: { secure: false },
  })
);
app.use(sessionMiddleware);
app.use(rememberMiddleware);
app.use(obtenerCategorias);

// app.use(obtenerCategorias);
app.use("/users", rutaUsers);
app.use("/products", rutaProducts);
app.use("/", rutaMain);

app.listen(port, () => {
  console.log("Servidor corriendo en el puerto", port);
});