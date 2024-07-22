const connection = require("../utils/connection")
const models = require("../models/init-models").initModels(connection)

const connectCenter = async (req, res) =>{
    const data = req.body
    await models.centerHasPatient.create({
        'centerCenterId': data['centerId'],
        'patientUsername': data['patientUsername']
    }).then(results => {
        res.status(200).json({
            "success": true,
            "message": "center successfully linked",
            "data": results
        })
    }).catch(error=>{
        res.status(401).json({
            "success": false,
            "message": "error linking center",
            "error": error.message
        })
    })
}

const disconnectCenter = async (req, res) => {
    const data = req.body
    await models.centerHasPatient.destroy({where: {
        'centerCenterId': data['centerId'],
        'patientUsername': data['patientUsername']
    }}).then(() => {
        res.status(200).json({
            "success": true,
            "message": "center successfully unlinked"
        })
    }).catch(error => {
        res.status(401).json({
            "success": false,
            "message": "error unlinking center",
            "error": error.message
        })
    })
}

module.exports = {connectCenter, disconnectCenter}