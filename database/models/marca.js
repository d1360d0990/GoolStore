module.exports = (sequelize, dataTypes) => {
  let alias = "Marca";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descripcion: {
      type: dataTypes.STRING,
    },
  };
  let config = {
    tableName: "marcas",
    timestamps: false,
  };
  let Marca = sequelize.define(alias, cols, config);
  Marca.associate = (models) => {
    Marca.hasMany(models.Producto, {
      as: "producto",
      foreignKey: "id_marca",
    });
  };
  return Marca;
};
