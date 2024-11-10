module.exports = function (sequelize, dataTypes) {
  let alias = "Carrito";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_usuario: {
      type: dataTypes.INTEGER,
    },
    id_producto: {
      type: dataTypes.INTEGER,
    },
    cantidad: {
      type: dataTypes.INTEGER,
    },
    total: {
      type: dataTypes.DECIMAL(10, 2),
    },
  };
  let config = {
    tableName: "carritos",
    timestamps: false,
  };
  let Carrito = sequelize.define(alias, cols, config);
  Carrito.associate = (models) => {
    Carrito.belongsTo(models.Usuario, {
      as: "usuario",
      foreignKey: "id_usuario",
    });
  };
  return Carrito;
};
