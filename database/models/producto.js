module.exports = (sequelize, dataTypes) => {
  let alias = "Producto";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: dataTypes.STRING,
    },
    descripcion: {
      type: dataTypes.STRING,
    },
    imagen: {
      type: dataTypes.STRING,
    },
    color: {
      type: dataTypes.STRING,
    },
    precio: {
      type: dataTypes.DECIMAL(10, 2),
    },
    oferta: {
      type: dataTypes.BOOLEAN,
      defaultValue: false
  },
  descuento: {
      type: dataTypes.FLOAT,
      defaultValue: 0
  },
  };
  let config = {
    tableName: "productos",
    timestamps: false,
  };
  let Producto = sequelize.define(alias, cols, config);
  Producto.associate = (models) => {
    Producto.belongsTo(models.Marca, {
      as: "marca",
      foreignKey: "id_marca",
    });
    Producto.belongsTo(models.Talle, {
      as: "talle",
      foreignKey: "id_talle",
    });
    Producto.belongsTo(models.Categoria, {
       as: "categoria",
       foreignKey: "id_categoria",
     });
  };
  return Producto;
};
