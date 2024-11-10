module.exports = (sequelize, dataTypes) => {
  let alias = "Talle";
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
    tableName: "talles",
    timestamps: false,
  };
  let Talle = sequelize.define(alias, cols, config);
  Talle.associate = (models) => {
    Talle.hasMany(models.Producto, {
      as: "producto",
      foreignKey: "id_talle",
    });
  };
  return Talle;
};
