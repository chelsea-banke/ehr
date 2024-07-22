const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const connection = require("../utils/connection")
const { sendEmail } = require("../utils/mail")
const models = require("../models/init-models").initModels(connection)

const createNewCenter = async (req, res)=>{
    const data = req.body
    await models.center.findAll({attributes: ['centerId']}).then(async results => {
        const centerIds = results.map(result => result['centerId'])
        let tempId = Math.floor(1000 + Math.random() * 9000)
        while(centerIds.includes(tempId)){
            tempId = Math.floor(1000 + Math.random() * 9000) 
        }
        data['centerId'] = tempId
        await models.center.create(data).then(results=>{
            sendEmail(data['email'], data['centerId'])
            res.status(200).json({
                "success": true,
                "message": "center successfully created",
                "data": results
            })
        }).catch(error=>{
            res.status(401).json({
                "success": false,
                "message": "error creating center",
                "error": error.message
            })   
        })
    })
}

const createNewAdmin = async (req, res)=>{
    const credentials = req.body
    const jwtSecret = process.env.JWT_SECRET

    await models.admin.findAll({where: {
        "username": credentials["username"],
        "centerCenterId": credentials["centerCenterId"]
    }}).then(async results=>{
        if(results.length == 0){
            bcrypt.genSalt(10).then(salt=>{
                bcrypt.hash(credentials["password"], salt).then(async hashedPassword=>{

                    credentials["password"] = hashedPassword
                    console.log(hashedPassword.length)
                    credentials["role"]="admin"
                    await models.admin.create(credentials).then(results=>{

                        const token = jwt.sign(
                            {"username": credentials["username"]},
                            jwtSecret,
                            {"expiresIn": 3600}
                        )
                        res.cookie("jwt", token, {
                            "httpOnly": true,
                            "maxAge": 3600000
                        })

                        delete  results["dataValues"]["password"]
                        res.status(200).json({
                            "success": true,
                            "message": "admin successfully created",
                            "data": results["dataValues"]
                        })
                    }).catch(error=>{
                        res.status(500).json({
                            "success": false,
                            "message": "user not created",
                            "error": error.message
                        })
                    })
                })
            })
        }
        else{
            res.status(400).json({
                "success": false,
                "message": "user already exist"
            })
        }
    }).catch(error=>{
        res.status(401).json({
            "success": false,
            "message": "error creating admin",
            "error": error.message
        })   
    })
}

module.exports = {createNewCenter, createNewAdmin}