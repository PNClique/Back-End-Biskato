const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      pin_code : DataTypes.STRING,
      birth_date : DataTypes.DATE,
      genre : DataTypes.STRING,
      user_status : DataTypes.STRING,
      province : DataTypes.STRING,
      country : DataTypes.STRING,
      nif : DataTypes.STRING,
      is_admin: DataTypes.BOOLEAN,
      level: DataTypes.BOOLEAN,
      verification_by_email_token: DataTypes.STRING,
      verification_by_email_expires: DataTypes.DATE,
    },
    {
      tableName: "users",
      hooks: {
        beforeSave: async (user) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 8);
          }
        },
      },
    }
  );

  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
  };

  User.prototype.generateToken = function () {
    return jwt.sign({ id: this.id }, process.env.APP_SECRET);
  };

  User.associate = (models) => {
    User.hasMany(models.Jobs, { foreignKey: "author_id", as: "jobs" });
  };

  // User.associate = (models) => {
  //   User.hasMany(models.Candidacy, { foreignKey: "author_id", as: "jobs" });
  // };

  // User.hasMany(Jobs, { as: "jobs" });

  return User;
};
