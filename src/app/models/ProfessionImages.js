module.exports = (sequelize, DataTypes) => {
    const ProfessionImages = sequelize.define(
      "ProfessionImages",
      {
        image: DataTypes.STRING,
        Profession_id: DataTypes.INTEGER,
      },
      {
        tableName: 'profession_images'
      }
    );
  
    ProfessionImages.associate = (models) => {
      ProfessionImages.belongsTo(models.Professions,
        { foreignKey: 'Profession_id', as: 'Profession' });
    };
  
  
  
    return ProfessionImages;
  };
  