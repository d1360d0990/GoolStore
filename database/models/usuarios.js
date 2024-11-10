module.exports = function (sequelize, dataTypes) {
  let alias = "Usuario";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: dataTypes.STRING,
    },
    apellido: {
      type: dataTypes.STRING,
    },
    dni: {
      type: dataTypes.STRING,
    },
    telefono: {
      type: dataTypes.STRING,
    },
    domicilio: {
      type: dataTypes.STRING,
    },
    pais: {
      type: dataTypes.STRING,
    },
    nombre_usuario: {
      type: dataTypes.STRING,
    },
    email: {
      type: dataTypes.STRING,
    },
    password: {
      type: dataTypes.STRING,
    },
    tipo_usuario: {
      type: dataTypes.STRING,
    },
    genero: {
      type: dataTypes.STRING,
    },
    foto_perfil: {
      type: dataTypes.STRING,
    },
  };
  let config = {
    tableName: "usuarios",
    timestamps: false,
  };
  let Usuario = sequelize.define(alias, cols, config);

  // Usuario.associate = (models) => {
  //   Usuario.belongsTo(models.Carrito, {
  //     as: "carrito",
  //     foreignKey: "id_usuario",
  //   });
  // };

  return Usuario;
};
