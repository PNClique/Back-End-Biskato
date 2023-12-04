module.exports = (sequelize, DataTypes) => {
  const Applications = sequelize.define(
    "Applications",
    {
      message: DataTypes.STRING,
      status: DataTypes.INTEGER,
      date: DataTypes.DATE,
      job_id: DataTypes.INTEGER,
      author_id: DataTypes.INTEGER,
    },
    {
      tableName: "applications",
    }
  );

  Applications.associate = (models) => {
    // def relationships of the jobs
    Applications.belongsTo(models.Jobs, { foreignKey: "job_id", as: "job" });

    // def relationships of the users
    Applications.belongsTo(models.User, { foreignKey: "author_id", as: "user" });
  };

  return Applications;
};
