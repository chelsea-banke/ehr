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
        models.report.findAll({where: {
            "reportId": credentials["reportId"],
            "patientUsername": credentials["patientUsername"]
        }}).then(report=>{
            res.status(200).json({
                "success": true,
                "message": "report successfully updated",
                "data": report[0]
            })
        }).catch(error=>{
            res.status(401).json({
                "success": false,
                "message": "error fetching report",
                "error": error.message
            })
        })
    }).catch(error=>{
        res.status(401).json({
            "success": false,
            "message": "error updating report",
            "error": error.message
        })
    })
}

const updateVitals = async (req, res)=>{
    const credentials = req.body
    await models.vitals.update(credentials["data"], {where: {
        "patientUsername": credentials["patientUsername"]
    }}).then(results=>{
        models.vitals.findByPk(credentials["patientUsername"]).then(vitals=>{
            res.status(200).json({
                "success": true,
                "message": "report successfully updated",
                "data": vitals
            })
        }).catch(error=>{
            res.status(401).json({
                "success": false,
                "message": "error fetching report",
                "error": error.message
            })
        })
    }).catch(error=>{
        res.status(401).json({
            "success": false,
            "message": "error updating report",
            "error": error.message
        })
    })
}

const createNewTests = async (req, res)=>{
    const credentials = req.body
    await models.test.bulkCreate(credentials).then(results=>{
        res.status(200).json({
            "success": true,
            "message": "test successfully created",
            "data": results["dataValues"]
        })
    }).catch(error=>{
        res.status(401).json({
            "success": false,
            "message": "error creating tests",
            "error": error.message
        })
    })
}

const deleteTests = async(req, res)=>{
    const credentials = req.body
    await models.test.destroy({where: {
        'testId': credentials
    }}).then(results=>{
        res.status(200).json({
            "success": true,
            "message": "tests successfully deleted"
        })
    }).catch(error=>{
        res.status(401).json({
            "success": false,
            "message": "error deleting test",
            "error": error.message
        })
    })
}

module.exports = {createNewReport, updateReport, createNewTests, updateVitals, deleteTests}