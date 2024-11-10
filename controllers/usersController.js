const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const { countries } = require('countries-list');
const bcrypt = require("bcryptjs");
const usersDataSource = require("../service/usersDataSource");
const db = require('../database/models'); // Asegúrate de que esta ruta sea correcta
const Producto = db.Producto;
const Marca = db.Marca;
const Usuario = db.Usuario;
const Talle = db.Talle;
const usersController = {
  somos: (req, res) => {
    res.render("users/somosgooolstore");
  },
  userList: null,
  user: null,
  showLogin: (req, res) => {
    let errorMessage = req.flash('ValErrorMessage')[0] || ''; // Recuperar el mensaje de error
    let successMessage = req.flash('successMessage')[0] || ''; //esta linea hace que si hay un mensaje de éxito, entonces se muestre en la vista. Y si no hay un mensaje de éxito, entonces no se muestre en la vista. Este req.flash viene desde el backend, desde el método el cual configura el success message y luego redirige el flujo hacia esta ruta/método. Y el [0] es para que se muestre el mensaje de éxito en la vista. Si no se pone el [0], entonces no se mostrará el mensaje de éxito en la vista. 

    usuario = req.session.user
    res.render("users/login", { usuario, successMessage, errorMessage });
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const usuario = await Usuario.findOne({
        where: { email }
      });
      if (!usuario) {
        req.flash('ValErrorMessage', 'Email o contraseña incorrectos');
        const errorMessage = req.flash('ValErrorMessage')[0] || '';
        // return res.status(404).json({ message: 'Usuario no encontrado' });
        return res.render("users/login", { errorMessage, successMessage: '' });

      }
      console.log(req.body);
      console.log(usuario);
      const validPassword = await bcrypt.compare(password, usuario.password);
      if (!validPassword) {
        req.flash('ValErrorMessage', 'Email o contraseña incorrectos');
        const errorMessage = req.flash('ValErrorMessage')[0] || '';
        // return res.status(404).json({ message: 'Contraseña incorrecta' });
        return res.render("users/login", { errorMessage , successMessage: ''});
      }
      req.session.user = usuario;
      console.log('session:', req.session);
      if (req.body.remember) {
        res.cookie("remember", usuario.email, { maxAge: 60 * 10000 });
      }
      res.redirect("/users/perfil");
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error en el servidor' })
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.redirect("/");
  },
  showRegister: (req, res) => {
    // res.render("users/register");
    let errorMessage = req.flash('ValErrorMessage')[0] || ''; // Recuperar el mensaje de error
    let countryList = Object.values(countries).map(country => country.name);
    // let errores = validationResult(req);
    // mapsDeError = undefined;
    console.log('error message en el showregister:', errorMessage);
    res.render('users/register', { countries: countryList, mapsDeError: {}, errorMessage });
  },
  register: async (req, res) => {
    let errores = validationResult(req);
    const countryList = Object.values(countries).map(country => country.name); //Lo que esta linea hace es que toma el objeto countries y lo convierte en un array con los nombres de los paises. Y eso se guarda en la variable countryList. Y el objeto countries se encuentra en la libreria countries-list.
    if (errores.isEmpty()) {
      const fotoUsuario = req.file ? `${req.file.filename}` : "default.jpg";
      const {
        nombre,
        apellido,
        dni,
        telefono,
        domicilio,
        country,
        nombreUsuario,
        email,
        password,
        admincomp,
        tipoUsuario,
        foto,
      } = req.body;
      console.log('justo antes del try')
      try {
        // Verificar si el email ya está registrado
        const emailExistente = await Usuario.findOne({
          where: { email }
        });
  
        if (emailExistente) {
          req.flash('ValErrorMessage', 'El email ya está registrado');
          let errorMessage = req.flash('ValErrorMessage')[0] || '';
          return res.render("users/register", {
            mapsDeError: { email: { msg: 'El email ya está registrado' } },
            old: req.body,
            countries: countryList,
            errorMessage
          });
        }
        console.log('emailExistente:', emailExistente);

      const newUser = {
        // id: uuidv4(),
        // id: crypto.randomUUID(),
        nombre,
        apellido,
        dni,
        telefono,
        domicilio,
        pais: country,
        nombre_usuario: nombreUsuario,
        email,
        password: bcrypt.hashSync(password, 10),
        tipo_usuario: admincomp,
        genero: tipoUsuario,
        foto_perfil: fotoUsuario,
      };
      // Intenta crear el nuevo usuario
      // const emailExistente = await Usuario.findOne({
      //   where: { email }
      // });
      // if (emailExistente) {
      //   req.flash('ValErrorMessage', 'El email ya está registrado');
      //   return res.render("users/register", {
      //     mapsDeError: { email: { msg: 'El email ya está registrado' } },
      //     old: req.body,
      //     countries: countryList
      //   });
      // }
      // try {
        await db.Usuario.create(newUser);
        req.flash('successMessage', 'Usuario registrado con éxito.'); //No sé a dónde va este mensaje. El mensaje que sale es el de el ejs
        // res.redirect(`/users/perfil`);
        res.redirect('/users/login'); // Redirige después de la creación exitosa
      } catch (error) {
        console.error(error);
        if (!res.headersSent) {
          res.status(500).send("Error al crear el usuario");
        }
      }

    } else {
      // Si hay errores de validación, renderiza el formulario con los errores
      console.log('errores:', errores.mapped());
      return res.render("users/register", {
        mapsDeError: errores.mapped(),
        old: req.body,
        countries: countryList,
        errorMessage: 'Complete los campos requeridos'
      });
    }

  },
  perfil: (req, res) => {
    const usuario = req.session.user; // Obtén el usuario de la sesión
    let successMessage = req.flash('successMessage')[0] || ''; //esta linea hace que si hay un mensaje de éxito, entonces se muestre en la vista. Y si no hay un mensaje de éxito, entonces no se muestre en la vista. Este req.flash viene desde el backend, desde el método el cual configura el success message y luego redirige el flujo hacia esta ruta/método. Y el [0] es para que se muestre el mensaje de éxito en la vista. Si no se pone el [0], entonces no se mostrará el mensaje de éxito en la vista. 
    if (!usuario) {
      return res.redirect('/users/login'); // Redirige si no hay usuario logueado
    }
    res.render("users/userPerfil", { usuario, successMessage }); // Pasa el usuario a la vista
  },
  showEdit: (req, res) => {
    const countryList = Object.values(countries).map(country => country.name);
    const usuario = req.session.user;
    const errorMessage = req.flash('ValErrorMessage')[0] || ''; // Recuperar el mensaje de error
    const successMessage = req.flash('successMessage')[0] || ''; // Recuperar el mensaje de éxito
    res.render("users/editarPerfil", { usuario, countries: countryList, mapsDeError: {}, errorMessage, successMessage });
  },
  showEditCuenta: (req, res) => {
    // const countryList = Object.values(countries).map(country => country.name);
    const usuario = req.session.user; //Aca en esta linea lo que se hace es traer el usuario de la session, porque dentro del usuario están los datos que se quieren editar. Y la session user toma los datos de la base de datos. Y esa asignacion de datos se realiza cuando el usuario se loguea.
    const errorMessage = req.flash('errorMessage')[0] || '';
    const successMessage = req.flash('successMessage')[0] || ''; // Recuperar el mensaje de éxito
    res.render("users/editarCuenta", { usuario, mapsDeError: {}, errorMessage, successMessage });
    // console.log(errorMessage);
  },
  editUser: async (req, res) => {
    try {
      let image = "";
      let errores = validationResult(req);
      const countryList = Object.values(countries).map(country => country.name);
      const { nombre,
        apellido,
        dni,
        telefono,
        domicilio,
        country,
        tipoUsuario } = req.body;

      // Verificar si hay una nueva imagen cargada
      if (req.file?.filename) {
        image = req.file.filename;
      } else {
        image = req.body.currentImage;
      }

      const { id } = req.params;
      let usuario = await db.Usuario.findByPk(id);
      if (errores.isEmpty()) {
        // Buscar el producto por ID y actualizar los campos
        await db.Usuario.update(
          {
            nombre,
            apellido,
            dni,
            telefono,
            domicilio,
            pais: country,
            genero: tipoUsuario,
            foto_perfil: image
          },
          { where: { id } } // Condición para encontrar el producto por ID
        );
        //ACTUALIZA LA SESSION CON LOS NUEVOS DATOS EDITADOS
        const userUpdated = await Usuario.findByPk(id); // Consulta los datos actualizados
        req.session.user = userUpdated;
        // console.log(req.body);
        //res.redirect(`/users/perfil/${id}`);
        req.flash('successMessage', 'Perfil editado con éxito.');
        res.redirect(`/users/perfil`);
      } else {
        // Si hay errores, renderizar la vista de edición con errores y datos viejos
        req.flash('ValErrorMessage', 'Complete los campos requeridos');
        const errorMessage = req.flash('ValErrorMessage')[0] || '';
        const successMessage = req.flash('successMessage')[0] || '';
        console.log('errores:', errores.mapped());
        console.log('else de errores');
        // Recuperar el mensaje de éxito
        return res.render("users/editarPerfil", {
          usuario: usuario,
          mapsDeError: errores.mapped(),
          old: req.body, // Datos ingresados para que el formulario no se reinicie
          countries: countryList,
          successMessage,
          errorMessage
        });
      }
    } catch (error) {
      console.error("Error al actualizar el usuario: ", error);
      req.flash('ValErrorMessage', 'Ocurrió un error. Intente nuevamente');
      // res.status(500).send("Error al actualizar el usuario");
      return res.redirect(`/users/perfil`);

    }
  },
  editCuenta: async (req, res) => {
    try {
      let errores = validationResult(req);
      const errorMessage = req.flash('errorMessage')[0] || '';
      const { email, password, nombreUsuario, admincomp, newP, confirmNewP, currentPassword } = req.body;
      const { id } = req.params;
      let usuario = await db.Usuario.findByPk(id);
      let hashedNewPassword;
      if (newP && confirmNewP) { //Esta linea hace que si newP y confirmNewP existen, entonces se ejecuta el siguiente bloque de codigo. Y si no existen, entonces no se ejecuta el siguiente bloque de codigo.
        if (newP !== confirmNewP) {
          return res.render("users/editarPerfil", {
            usuario: usuario,
            mapsDeError: { confirmNewPassword: { msg: "Las contraseñas no coinciden" } },
            old: req.body,
          });
        }
        hashedNewPassword = await bcrypt.hash(newP, 10);
      }
      console.log('Errores', errores.isEmpty());
      console.log(errores.mapped());
      console.log('Pass hasheada', hashedNewPassword);
      if (errores.isEmpty()) {
        await db.Usuario.update(
          {
            nombre_usuario: nombreUsuario,
            tipo_usuario: admincomp,
            email,
            // password: bcrypt.hashSync(password, 10)
            ...(hashedNewPassword && { password: hashedNewPassword }) //Este spread operator lo que hace es que si la condicion de hashedNewPassword se cumple, entonces se agrega el password al objeto que se va a actualizar. Y si no se cumple la condicion, entonces no se agrega el password al objeto que se va a actualizar.
          },
          { where: { id } } // Condición para encontrar el usuario por ID
        );
        //ACTUALIZA LA SESSION CON LOS NUEVOS DATOS EDITADOS
        const userUpdated = await Usuario.findByPk(id); // Consulta los datos actualizados
        req.session.user = userUpdated;
        req.flash('successMessage', 'Cuenta editada con éxito.'); //esta linea es necesaria para que se muestre el mensaje de éxito en la vista. Sin esta linea, no se mostrará el mensaje de éxito en ruta a la cual se redirige.
        // console.log(req.body);
        //res.redirect(`/users/perfil/${id}`);
        res.redirect(`/users/perfil`);
      } else {
        console.log('Errores else', errores.isEmpty());
        // Si hay errores, renderizar la vista de edición con errores y datos viejos
        return res.render("users/editarCuenta", {
          usuario: usuario,
          errorMessage,
          mapsDeError: errores.mapped(),
          old: req.body // Datos ingresados para que el formulario no se reinicie
        });
      }
    } catch (error) {
      console.error("Error al actualizar el usuario: ", error);
      res.status(500).send("Error al actualizar el usuario");
    }


  },
  validatePassword: async (req, res) => {
    try {
      const usuario = req.session.user;
      const { currentPassword } = req.body;

      // Aquí deberías obtener el usuario actual. Puedes hacerlo desde req.user si estás usando autenticación
      // O puedes buscarlo en la base de datos según alguna condición, por ejemplo, el id del usuario:
      const userId = usuario.id; // Si estás usando sesiones o autenticación por tokens
      const user = await db.Usuario.findByPk(userId); // Obtenemos el usuario desde la base de datos
      // console.log(usuario);
      console.log('contraseña es:', user.password);
      console.log('dni es:', user.dni);
      console.log('current password es:', currentPassword);
      // Comparamos la contraseña ingresada (password) con la contraseña almacenada en la base de datos
      const match = await bcrypt.compare(currentPassword, user.password);

      if (match) {
        res.json({ valid: true });
      } else {
        res.json({ valid: false });
      }
    } catch (error) {
      console.error('Error al validar la contraseña backend:', error);
      res.status(500).json({ error: 'Error al validar la contraseña' });
    }
  }
};

module.exports = usersController;
