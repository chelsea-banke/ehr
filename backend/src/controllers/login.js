const connection = require("../utils/connection")
const models = require("../models/init-models").initModels(connection)
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const login = async (req, res)=>{
    const credentials = req.body
    const jwtSecret = process.env.JWT_SECRET

    let staff = null

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

    switch (credentials["role"]) {
        case "admin":
            await models.admin.scope('withPassword').findAll({where: {
                "username": credentials["username"],
                "centerCenterId": credentials["centerId"]
            }}).then(results=>{
                staff = results[0]
            })
            break;
        case "doctor":
            await models.doctor.scope('withPassword').findAll({where: {
                "username": credentials["username"],
                "centerCenterId": credentials["centerId"]
            }}).then(results=>{
                staff = results[0]
            })
            break;
        case "nurse":
            await models.nurse.scope('withPassword').findAll({where: {
                "username": credentials["username"],
                "centerCenterId": credentials["centerId"]
            }}).then(results=>{
                staff = results[0]
            })
            break;
        case "labtech":
            await models.labtech.scope('withPassword').findAll({where: {
                "username": credentials["username"],
                "centerCenterId": credentials["centerId"]
            }}).then(results=>{
                staff = results[0]
            })
            break;
        default:
            break;
    }
    if(staff != null){
        bcrypt.compare(credentials["password"], staff["password"]).then(async match=>{
            if(match){
                const token = jwt.sign(
                    {
                        "username": staff["username"],
                        "center": staff["centerCenterId"],
                        "role": staff["role"]
                    },
                    jwtSecret,
                    {"expiresIn": 3600}
                )
                res.cookie("jwt", token, {
                    // "httpOnly": true,
                    "maxAge": 3600000
                })

                delete staff["dataValues"]["password"]
                console.log(staff)

                const stats = await fetchStats(staff["dataValues"]["centerCenterId"])

                res.status(200).json({
                    "success": true,
                    "message": "logIn successful",
                    "data": {
                        "staff":staff["dataValues"],
                        "stats": stats
                    }
                })
            }
            else{
                res.status(409).json({
                    "success": false,
                    "message": "incorrect password"
                })
            }
        })
    }
    else{
        res.status(409).json({
            "success": false,
            "message": `error login in! please check if field enteries`
        })
    }
}

module.exports = {login}