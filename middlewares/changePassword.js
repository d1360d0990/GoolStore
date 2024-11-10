const bcrypt = require('bcryptjs');
const db = require('../database/models');

// Middleware para validar la contraseña actual
const validateCurrentPassword = async (req, res, next) => {
  const { currentPassword } = req.body; // La contraseña actual enviada desde el formulario
  const usuario = req.session.user; // Usuario autenticado desde la sesión

  try {
    // Buscar el usuario en la base de datos para obtener la contraseña actual
    const userDb = await db.Usuario.findByPk(usuario.id);

    // Comparar la contraseña ingresada con la contraseña actual del usuario en la base de datos
    const validPassword = await bcrypt.compare(currentPassword, userDb.password);

    if (!validPassword) {
      // Si la contraseña no es válida, redirigir a la página de edición con un mensaje de error
      req.flash('errorMessage', 'La contraseña actual es incorrecta');
      return res.redirect('/users/editar-cuenta');
    }

    next(); // Si la contraseña es válida, continuar con la ejecución del siguiente middleware o controlador
  } catch (error) {
    console.error('Error al validar la contraseña actual:', error);
    res.status(500).json({ message: 'Error al validar la contraseña actual' });
  }
};

module.exports = validateCurrentPassword;
