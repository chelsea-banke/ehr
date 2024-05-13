const connection = require("../utils/connection")
const models = require("../models/init-models").initModels(connection)
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const login = async (req, res)=>{
    const credentials = req.body
    const jwtSecret = process.env.JWT_SECRET

    let staff = null
    switch (credentials["role"]) {
        case "admin":
            await models.admin.findAll({where: {
                "username": credentials["username"],
                "centerCenterId": credentials["centerCenterId"]
            }}).then(results=>{
                staff = results[0]
            })
            break;
        case "doctor":
            await models.doctor.findAll({where: {
                "username": credentials["username"],
                "centerCenterId": credentials["centerCenterId"]
            }}).then(results=>{
                staff = results[0]
            })
            break;
        case "nurse":
            await models.nurse.findAll({where: {
                "username": credentials["username"],
                "centerCenterId": credentials["centerCenterId"]
            }}).then(results=>{
                staff = results[0]
            })
            break;
        case "labtech":
            await models.labtech.findAll({where: {
                "username": credentials["username"],
                "centerCenterId": credentials["centerCenterId"]
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
                    "httpOnly": true,
                    "maxAge": 3600000
                })

                delete staff["dataValues"]["password"]
                console.log(staff)
                res.status(200).json({
                    "success": true,
                    "message": "logIn successful",
                    "data": staff["dataValues"]
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
            "message": `${credentials["role"]} with username ${credentials["username"]} does not exist in center ${credentials["centerCenterId"]}`
        })
    }
}

module.exports = {login}