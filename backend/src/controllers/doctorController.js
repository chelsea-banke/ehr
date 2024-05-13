const connection = require("../utils/connection")
const models = require("../models/init-models").initModels(connection)

const createNewReport = async (req, res)=>{
    const credentials = req.body
    await models.report.create(credentials).then(results=>{
        res.status(200).json({
            "success": true,
            "message": "report successfully created",
            "data": results["dataValues"]
        })
    }).catch(error=>{
        res.status(401).json({
            "success": false,
            "message": "error creating report",
            "error": error.message
        })
    })
}

const updateReport = async (req, res)=>{
    const credentials = req.body
    await models.report.update(credentials["data"], {where: {
        "reportId": credentials["reportId"],
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

const createNewTest = async (req, res)=>{
    const credentials = req.body
    await models.test.create(credentials).then(results=>{
        res.status(200).json({
            "success": true,
            "message": "test successfully created",
            "data": results["dataValues"]
        })
    }).catch(error=>{
        res.status(401).json({
            "success": false,
            "message": "error creating test",
            "error": error.message
        })
    })
}

module.exports = {createNewReport, updateReport, createNewTest}