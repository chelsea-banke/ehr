const { query } = require("express")
const connection = require("../utils/connection")
const models = require("../models/init-models").initModels(connection)
const { Op } = require("sequelize")

const getPatients = async (req, res)=>{
    const query = req.query
    console.log(query);
    await models.centerHasPatient.findAll({where: {'centerCenterId': query['centerId']}}).then(async results =>{
        connectedPatientsUsernames = results.map(result=>result['patientUsername'])
        await models.patient.findAll({where: {
            'username': {
                [Op.in]: connectedPatientsUsernames
            }
        }}).then(async connectedPatients => {
            connectedPatients = connectedPatients.map(connectedPatient => connectedPatient['dataValues'])
            await models.patient.findAll({where: {
                'username': {
                    [Op.notIn]: connectedPatientsUsernames
                }
            }}).then(disconnectedPatients => {
                disconnectedPatients = disconnectedPatients.map(disconnectedPatient => disconnectedPatient['dataValues'])
                const patients = []
                patients.push(...connectedPatients.map(connectedPatient => {return {...connectedPatient, 'status': 'connected'}}))
                patients.push(...disconnectedPatients.map(disconnectedPatient => {return {...disconnectedPatient, 'status': 'disconnected'}}))
                patients.sort(() => Math.random() - 0.5)
                res.status(200).json({
                    "success": true,
                    "data": patients
                })
            }).catch(error=>{
                res.status(401).json({
                    "success": false,
                    "message": "error fetching disconnected patients",
                    "error": error.message
                })
            }).catch(error=>{
                res.status(401).json({
                    "success": false,
                    "message": "error fetching connected patients",
                    "error": error.message
                })
            })
        })
    })
}

const getReports = async (req, res)=>{
    const query = req.query
    await models.report.findAll({where: {
        [Op.or]: [
            {'patientUsername': query['patientUsername']},
            {'doctorUsername': query['doctorUsername']}
        ]
    }}).then(results=>{
        res.status(200).json({
            "success": true,
            "data": results
        })
    }).catch(error=>{
        res.status(401).json({
            "success": false,
            "message": "error fetching reports",
            "error": error.message
        })
    })
}

const getReport = async (req, res)=>{
    const query = req.query
    await models.report.findByPk(query['reportId']).then(results=>{
        res.status(200).json({
            "success": true,
            "data": results
        })
    }).catch(error=>{
        res.status(401).json({
            "success": false,
            "message": "error fetching report",
            "error": error.message
        })
    })
}

const getPatientsStats = async (req, res)=>{
    const query = req.query
    await models.report.findAndCountAll({where: {
        'patientUsername': query['username']
    }}).then(async results=>{
        const reportsCount = results['count']
        await models.test.findAndCountAll({where: {
            'patientUsername': query['username']
        }}).then(results=>{
            const testsCount = results['count']
            res.status(200).json({
                "success": true,
                "data": {reportsCount, testsCount}
            })
        }).catch(error=>{
            res.status(401).json({
                "success": false,
                "message": "error fetching tests count",
                "error": error.message
            })
        })
    }).catch(error=>{
        res.status(401).json({
            "success": false,
            "message": "error fetching reports count",
            "error": error.message
        })
    })
}

const getVitals = async (req, res)=>{
    const query = req.query
    console.log(query);
    await models.vitals.findByPk(query['patientUsername']).then(results=>{
        console.log('///////////////////////////////////////////////////////');
        console.log(results);
        res.status(200).json({
            "success": true,
            "data": results
        })
    }).catch(error=>{
        res.status(401).json({
            "success": false,
            "message": "error fetching vitals",
            "error": error.message
        })
    })
}

const getTests = async (req, res)=>{
    const query = req.query
    await models.test.findAll({where: {
        [Op.or]: [
            {'patientUsername': query['patientUsername']},
            {'doctorUsername': query['doctorUsername']}
        ]
    }}).then(results=>{
        res.status(200).json({
            "success": true,
            "data": results
        })
    }).catch(error=>{
        res.status(401).json({
            "success": false,
            "message": "error fetching reports",
            "error": error.message
        })
    })
}

const getTest = async (req, res)=>{
    const query = req.query
    await models.test.findByPk(query['testId']).then(results=>{
        res.status(200).json({
            "success": true,
            "data": results
        })
    }).catch(error=>{
        res.status(401).json({
            "success": false,
            "message": "error fetching reports",
            "error": error.message
        })
    })
}

const getCenterStats = async (req, res) => {
    const query = req.query

    const fetchStats = async(centerId)=>{
        const stats = {
            'patientsCount': null,
            'connectedPatientsCount': null,
            'disconnectedPatientsCount': null,
            'staffsCount': null,
            'doctorsCount': null,
            'nursesCount': null,
            'labTechsCount': null,
            'reportsCount': null,
            'testsCount': null
        }
        await models.patient.findAll().then(results=>{
            stats["patientsCount"] = results.length
        })
        await models.centerHasPatient.count({where: {
            centerCenterId: centerId
        }}).then(results => {
            stats['connectedPatientsCount'] = results
        })
        await models.doctor.findAll({where: {
            centerCenterId: centerId
        }}).then(results=>{
            stats["doctorsCount"] = results.length
        })
        await models.nurse.findAll({where: {
            centerCenterId: centerId
        }}).then(results=>{
            console.log(results)
            stats["nursesCount"] = results.length
        })
        await models.labtech.findAll({where: {
            centerCenterId: centerId
        }}).then(results=>{
            stats["labTechsCount"] = results.length
        })
        await models.report.findAll({where: {
            doctorCenterCenterId: centerId
        }}).then(results=>{
            stats["reportsCount"] = results.length
        })
        await models.test.findAll({where: {
            doctorCenterCenterId: centerId
        }}).then(results=>{
            stats["testsCount"] = results.length
        })

        stats["disconnectedPatientsCount"] = stats["patientsCount"] - stats["connectedPatientsCount"]
        stats["staffsCount"] = stats["doctorsCount"] + stats["nursesCount"] + stats["labTechsCount"]

        return stats
    }

    fetchStats(query['centerCenterId']).then(stats => {
        res.status(200).json({
            "success": true,
            "message": "logIn successful",
            "data": stats
        })
    }).then(error => {
        res.status(401).json({
            "success": false,
            "message": "error fetching stats",
            "error": error.message
        })
    })
}

const testConnection = async (req, res) => {
    const query = req.query
    await models.centerHasPatient.count({where: {
        'patientUsername': query['patientUsername'],
        'centerCenterId': query['centerCenterId']
    }}).then(results => {
        console.log(results);
        if(results == 0){
            res.status(200).json({
                "success": true,
                "message": "patient disconnected",
                "connected": false
            })
        }
        else{
            res.status(200).json({
                "success": true,
                "message": "patient connected ",
                "connected": true
            })    
        }
    }).catch(error => {
        res.status(401).json({
            "success": false,
            "message": "error testing connection",
            "error": error.message
        })
    })
}

const getPatient = async (req, res) => {
    const query = req.query
    await models.patient.findByPk(query['patientUsername']).then(async results => {
        if(results){
            await models.centerHasPatient.count({where: {
                'patientUsername': query['patientUsername'],
                'centerCenterId': query['centerCenterId']
            }}).then(count => {
                // const data = results
                if(count == 0){
                    results['dataValues']['status'] = 'disconnected'
                }
                else{
                    results['dataValues']['status'] = 'connected'  
                }
                res.status(200).json({
                    "success": true,
                    "message": "patient connected ",
                    "data": results
                })  
            }).catch(error => {
                res.status(401).json({
                    "success": false,
                    "message": "error testing connection",
                    "error": error.message
                })
            })
        }
        else{
            res.status(401).json({
                "success": false,
                "message": "patient not found",
                "error": error.message
            })
        }
    }).catch(error => {
        res.status(401).json({
            "success": false,
            "message": "error testing connection",
            "error": error.message
        })
    })
}

module.exports = { getPatients, getReports, getReport, getPatientsStats, getVitals, getTests, getTest, getCenterStats, testConnection, getPatient }