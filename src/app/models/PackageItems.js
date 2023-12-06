module.exports = (sequelize, DataTypes) => {
    const PackageItems = sequelize.define(
      "PackageItems",
      {
        name: DataTypes.STRING,
        package_id: DataTypes.INTEGER,
      },
      {
        tableName: 'package_items'
      }
    );
  
    PackageItems.associate = (models) => {
      PackageItems.belongsTo(models.Packages,
        { foreignKey: 'package_id', as: 'package' });
    };
  
  
  
    return PackageItems;
  };
  