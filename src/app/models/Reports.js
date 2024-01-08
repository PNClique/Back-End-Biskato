module.exports=(sequelize,DataTypes)=>{
    const Reports=sequelize.define(
        "Reports",
        {
            job_id:DataTypes.INTEGER,
            title:DataTypes.STRING,
            description:DataTypes.STRING,
        },
        {
            tableName:"reports"
        }
    );
    Reports.associate=(models)=>{
        Reports.belongsTo(models.Jobs,{foreignKey:"job_id",as:"jobs"});
    }
    return Reports;
}