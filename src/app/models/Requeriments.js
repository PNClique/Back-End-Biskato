module.exports = (sequelize, DataTypes) => {
    const Requeriments = sequelize.define(
      "Requeriments",
      {
        name: DataTypes.STRING,
        job_id: DataTypes.INTEGER,
      },
      {
        tableName: 'requeriments'
      }
    );
  
    Requeriments.associate = (models) => {
      Requeriments.belongsTo(models.Jobs,
        { foreignKey: 'job_id', as: 'jobs' });
    };
  
  
  
    return Requeriments;
  };
  