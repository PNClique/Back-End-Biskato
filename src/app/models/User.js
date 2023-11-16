module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        profession: DataTypes.STRING,
        address: DataTypes.STRING,
        password: DataTypes.STRING,
    })

    return User;
}