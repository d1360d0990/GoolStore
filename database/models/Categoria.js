module.exports = (sequelize, dataTypes) => {
    let alias = "Categoria";
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      parent_id: {
        type: dataTypes.INTEGER,
        allowNull: true
    },
      nivel: {
        type: dataTypes.INTEGER,
        allowNull: false
    },
      categoria: {
        type: dataTypes.STRING,
        allowNull: false
      },
    };
    let config = {
      tableName: "categorias",
      timestamps: false,
    };
    let Categoria = sequelize.define(alias, cols, config);
    Categoria.associate = (models) => {
      Categoria.hasMany(models.Producto, {
        as: "producto",
        foreignKey: "id_categoria",
      });
      Categoria.hasMany(models.Categoria, {
        as: "subcategoria",
        foreignKey: "parent_id",
      });
      Categoria.belongsTo(models.Categoria, {
        as: "padre",
        foreignKey: "parent_id",
      });
      Categoria.hasMany(models.Categoria, {
         as: 'tiposProducto', 
         foreignKey:'parent_id', 
      })
      Categoria.belongsTo(models.Categoria, {
        as: "subca",
        foreignKey: "parent_id",
      });
     
      Categoria.belongsTo(models.Categoria, {
         as: 'tiposPro', 
         foreignKey:'parent_id', 
      })
    }
    return Categoria;
}
  