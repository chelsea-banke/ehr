const bcrypt = require("bcryptjs")
const connection = require("../utils/connection")
const models = require("../models/init-models").initModels(connection)

const createNewStaff = async (req, res)=>{
    const credentials = req.body
    bcrypt.genSalt(10).then(salt=>{
        bcrypt.hash(credentials["password"], salt).then(async hashedPassword=>{
            credentials["password"] = hashedPassword
            switch (credentials["role"]) {
                
                case "doctor":
                    await models.doctor.findAll({where:{
                        "username": credentials["username"],
                        "centerCenterId": credentials["centerCenterId"]
                    }}).then(async results=>{
                        console.log(results)
                        if(results.length == 0){
                            await models.doctor.create(credentials).then(results=>{
                                res.status(200).json({
                                    "success": true,
                                    "message": "staff successfully created",
                                    "data": results["dataValues"]
                                })
                            }).catch(error=>{
                                res.status(401).json({
                                    "success": false,
                                    "message": "error creating staff",
                                    "error": error.message
                                })
                            })
                        }
                        else{
                            res.status(400).json({
                                "success": false,
                                "message": "staff already exist"
                            }) 
                        }
                    }).catch(error=>{
                        res.status(401).json({
                            "success": false,
                            "message": "error fetching staffs",
                            "error": error.message
                        })    
                    })
                    break;

                case "nurse":
                    await models.nurse.findAll({where:{
                        "username": credentials["username"],
                        "centerCenterId": credentials["centerCenterId"]
                    }}).then(async results=>{
                        if(results.length == 0){
                            await models.nurse.create(credentials).then(results=>{
                                delete results["dataValues"]["password"]
                                res.status(200).json({
                                    "success": true,
                                    "message": "staff successfully created",
                                    "data": results["dataValues"]
                                })
                            }).catch(error=>{
                                res.status(401).json({
                                    "success": false,
                                    "message": "error creating staff",
                                    "error": error.message
                                })
                            })
                        }
                        else{
                            res.status(400).json({
                                "success": false,
                                "message": "staff does not exist"
                            }) 
                        }
                    }).catch(error=>{
                        res.status(401).json({
                            "success": false,
                            "message": "error fetching staffs",
                            "error": error.message
                        })    
                    })
                    break;

                case "labtech":
                    await models.labtech.findAll({where:{
                        "username": credentials["username"],
                        "centerCenterId": credentials["centerCenterId"]
                    }}).then(async results=>{
                        if(results.length == 0){
                            await models.labtech.create(credentials).then(results=>{
                                delete results["dataValues"]["password"]
                                res.status(200).json({
                                    "success": true,
                                    "message": "staff successfully created",
                                    "data": results["dataValues"]
                                })
                            }).catch(error=>{
                                res.status(401).json({
                                    "success": false,
                                    "message": "error creating staff",
                                    "error": error.message
                                })
                            })
                        }
                        else{
                            res.status(400).json({
                                "success": false,
                                "message": "staff does not exist"
                            }) 
                        }
                    }).catch(error=>{
                        res.status(401).json({
                            "success": false,
                            "message": "error fetching staffs",
                            "error": error.message
                        })    
                    })
                    break;

                default:
                    break;
            }
        })
    })
}

const updateStaffStatus = async (req, res)=>{
    const credentials =  req.body
    switch (credentials["role"]) {
        case "doctor":
            await models.doctor.findAll({where: {
                "username": credentials["username"],
                "centerCenterId": credentials["centerCenterId"]
            }}).then(async results=>{
                if(results.length != 0){
                    await models.doctor.update({"status": credentials["status"]}, {where: {
                        "username": credentials["username"],
                        "centerCenterId": credentials["centerCenterId"]
                    }}).then(results=>{
                        res.status(200).json({
                            "success": true,
                            "message": "staff successfully updated"
                        })
                    }).catch(error=>{
                        res.status(401).json({
                            "success": false,
                            "message": "error updating staff",
                            "error": error.message
                        })   
                    })
                }
                else{
                    res.status(400).json({
                        "success": false,
                        "message": "staff does not exist"
                    }) 
                }
            })
            break;

            case "nurse":
            await models.nurse.findAll({where: {
                "username": credentials["username"],
                "centerCenterId": credentials["centerCenterId"]
            }}).then(async results=>{
                if(results.length != 0){
                    await models.nurse.update({"status": credentials["status"]}, {where: {
                        "username": credentials["username"],
                        "centerCenterId": credentials["centerCenterId"]
                    }}).then(results=>{
                        res.status(200).json({
                            "success": true,
                            "message": "staff successfully updated"
                        })
                    }).catch(error=>{
                        res.status(401).json({
                            "success": false,
                            "message": "error updating staff",
                            "error": error.message
                        })   
                    })
                }
                else{
                    res.status(400).json({
                        "success": false,
                        "message": "staff does not exist"
                    }) 
                }
            })
            break;

            case "labtech":
                await models.labtech.findAll({where: {
                    "username": credentials["username"],
                    "centerCenterId": credentials["centerCenterId"]
                }}).then(async results=>{
                    if(results.length != 0){
                        await models.labtech.update({"status": credentials["status"]}, {where: {
                            "username": credentials["username"],
                            "centerCenterId": credentials["centerCenterId"]
                        }}).then(results=>{
                            res.status(200).json({
                                "success": true,
                                "message": "staff successfully updated"
                            })
                        }).catch(error=>{
                            res.status(401).json({
                                "success": false,
                                "message": "error updating staff",
                                "error": error.message
                            })   
                        })
                    }
                    else{
                        res.status(400).json({
                            "success": false,
                            "message": "staff does not exist"
                        }) 
                    }
                })
                break;
        default:
            break;
    }
}

const getStaffs = async (req, res) => {
    const query = req.query
    const staffs = []
    await models.doctor.findAll({where: {'centerCenterId': query['centerId']}}).then(async doctors => {
        staffs.push(...doctors)
        await models.nurse.findAll({where: {'centerCenterId': query['centerId']}}).then(async nurses => {
            staffs.push(...nurses)
            await models.labtech.findAll({where: {'centerCenterId': query['centerId']}}).then(labtechs => {
                staffs.push(...labtechs)
                staffs.sort(() => Math.random() - 0.5)
                res.status(200).json({
                    "success": true,
                    "message": "staff successfully fetched",
                    "data": staffs
                })
            }).catch(error=>{
                res.status(401).json({
                    "success": false,
                    "message": "error fetching labtechs",
                    "error": error.message
                })   
            })
        }).catch(error=>{
            res.status(401).json({
                "success": false,
                "message": "error fetching nurses",
                "error": error.message
            })   
        })
    }).catch(error=>{
        res.status(401).json({
            "success": false,
            "message": "error fetching doctors",
            "error": error.message
        })   
    })
}

// const getPatients = async () => {
  
// }

module.exports = {createNewStaff, updateStaffStatus, getStaffs}