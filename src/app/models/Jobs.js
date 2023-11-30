module.exports = (sequelize, DataTypes) => {
  const Jobs = sequelize.define(
    "Jobs",
    {
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.STRING,
      address: DataTypes.STRING,
      requeriments: DataTypes.STRING,
      responsibility: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN,
      author_id: DataTypes.INTEGER,
      remuneration : DataTypes.NUMBER,
    },
    {
      tableName: 'jobs'
    }
  );

  Jobs.associate = (models) => {
    Jobs.belongsTo(models.User,
      { foreignKey: 'author_id', as: 'author' });
  };

  // Jobs.associate = (models) => {
  //   Jobs.belongsToMany(models.Candidacy, { through: models.JobsAndCandidacy });
  // };

  // Jobs.belongsTo (User, { foreignKey: "authorId", as: "author", });


  return Jobs;
};
