module.exports = (sequelize, DataTypes) => {
  const Packages = sequelize.define(
    "Packages",
    {
      title: DataTypes.STRING,
      price: DataTypes.STRING,
      description: DataTypes.STRING,
      profession_id: DataTypes.INTEGER,
    },
    {
      tableName: "packages",
    }
  );

  Packages.associate = (models) => {
    // def relationship of the user
    Packages.belongsTo(models.User, { foreignKey: "author_id", as: "author" });

    // def relationship of the professions
    Packages.belongsTo(models.Professions, {
      foreignKey: "profession_id",
      as: "packages",
    });

    // def relationship of the package items
    Packages.hasMany(models.PackageItems, {
      foreignKey: "package_id",
      as: "package_items",
    });
  };

  return Packages;
};
