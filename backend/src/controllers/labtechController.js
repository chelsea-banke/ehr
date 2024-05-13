const connection = require("../utils/connection")
const models = require("../models/init-models").initModels(connection)

const updateTest = async (req, res)=>{
    const credentials = req.body
    await models.test.update(credentials["data"], {where: {
        "testId": credentials["testId"],
        "reportReportId": credentials["reportReportId"],
        "patientUsername": credentials["patientUsername"]
    }}).then(results=>{
        res.status(200).json({
            "success": true,
            "message": "report successfully updated"
        })
    }).catch(error=>{
        res.status(401).json({
            "success": false,
            "message": "error updating report",
            "error": error.message
        })
    })
}

module.exports = {updateTest}