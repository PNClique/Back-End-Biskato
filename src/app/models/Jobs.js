const User = require("./User");

module.exports = (sequelize, DataTypes) => {
  const Jobs = sequelize.define(
    "Jobs",
    {
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.STRING,
      address: DataTypes.STRING,
      authorId: DataTypes.STRING,
      remuneration : DataTypes.STRING,
    }
  );

  Jobs.belongsTo (User, { foreignKey: "authorId", as: "author", });


  return Jobs;
};
