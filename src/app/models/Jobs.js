module.exports = (sequelize, DataTypes) => {
  const Jobs = sequelize.define(
    "Jobs",
    {
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.STRING,
      address: DataTypes.STRING,
      responsibility: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN,
      author_id: DataTypes.INTEGER,
      remuneration: DataTypes.STRING,
      requeriments: DataTypes.ARRAY(DataTypes.STRING)
    },
    {
      tableName: "jobs",
    }
  );

  Jobs.associate = (models) => {
    // def relationships of the users
    Jobs.belongsTo(models.User, { foreignKey: "author_id", as: "author" });

    // // def relationship of the requeriments
    // Jobs.hasMany(models.Requeriments, { foreignKey: "job_id", as: "requeriments" });
    // def relationship of the reports
    Jobs.hasMany(models.Reports, { foreignKey: "job_id", as: "reports" });
    // def relationship of the applications
    Jobs.hasMany(models.Applications, { foreignKey: "job_id", as: "applications" });
  };

  // Jobs.associate = (models) => {
  //   Jobs.belongsToMany(models.Candidacy, { through: models.JobsAndCandidacy });
  // };
  return Jobs;
};
