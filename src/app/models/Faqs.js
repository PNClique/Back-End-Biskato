module.exports = (sequelize, DataTypes) => {
    const Faqs = sequelize.define(
      "Faqs",
      {
        question: DataTypes.STRING,
        asked: DataTypes.STRING,
        Profession_id: DataTypes.INTEGER,
      },
      {
        tableName: 'faqs'
      }
    );
  
    Faqs.associate = (models) => {
      Faqs.belongsTo(models.Professions,
        { foreignKey: 'Profession_id', as: 'Profession' });
    };
  
  
  
    return Faqs;
  };
  