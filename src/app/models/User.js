const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const Jobs = require('./Jobs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      email: DataTypes.STRING,
      profession: DataTypes.STRING,
      address: DataTypes.STRING,
      password: DataTypes.STRING,
      phone : DataTypes.STRING,
      is_admin: DataTypes.BOOLEAN,
      verification_by_email_token: DataTypes.STRING,
      verification_by_email_expires: DataTypes.DATE
    },
    {
      hooks: {
        beforeSave: async (user) => {
            if (user.password) {
                user.password = await bcrypt.hash(user.password, 8)
            }
        },
      },
    }
  );

  User.prototype.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
  }

  User.prototype.generateToken = function() {
    return jwt.sign({id: this.id}, process.env.APP_SECRET)
  }

  User.hasMany(Jobs, { as: "jobs" });


  return User;
};
