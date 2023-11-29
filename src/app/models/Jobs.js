// const User = require("./User");

module.exports = (sequelize, DataTypes) => {
  const Jobs = sequelize.define(
    "Jobs",
    {
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.STRING,
      address: DataTypes.STRING,
      author_id: DataTypes.STRING,
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

  // Jobs.belongsTo (User, { foreignKey: "authorId", as: "author", });


  return Jobs;
};
