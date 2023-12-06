module.exports = (sequelize, DataTypes) => {
  const Professions = sequelize.define(
    "Professions",
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      author_id: DataTypes.INTEGER,
    },
    {
      tableName: "professions",
    }
  );

  Professions.associate = (models) => {
    // def relationship of the user
    Professions.belongsTo(models.User, { foreignKey: "author_id", as: "author" });

    // def relationship of the packages
    Professions.hasMany(models.Packages, { foreignKey: "profession_id", as: "packages" });

    // def relationship of the faqs (frequently asked question)
    Professions.hasMany(models.Faqs, { foreignKey: "Profession_id", as: "faqs" });

    // def relationship of the profession images
    Professions.hasMany(models.ProfessionImages, { foreignKey: "Profession_id", as: "images" });

  };

  return Professions;
};
