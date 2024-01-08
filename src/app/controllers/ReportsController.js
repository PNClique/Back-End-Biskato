const { Reports } = require("../models");
class ReportsController {
    // create an report
    //checking the job exists


    async create(req, res) {
        try{
        const { title, description} = req.body;
        const { job_id } = req.params;
        const report = await Reports.create({job_id, title, description });
        return res.status(200).send({ report });
        }catch(error){
            console.log("Ërror in create an report :" , error);
            return res.status(400).send({ error: "Error in create an report" });
        }
    }
}

module.exports=new ReportsController()