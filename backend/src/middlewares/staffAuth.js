const jwt = require("jsonwebtoken")

const adminAuth = async (req, res, next)=>{
    const jwtSecret = process.env.JWT_SECRET
    const token = req.cookies.jwt
    if (token){
        jwt.verify(token, jwtSecret, async (error, decodedToken)=>{
            if(error){
                return (res.status(401).json({
                    "success": false,
                    "message": "error validating request",
                    "error": error.message
                }))
            }
            else{
                if(decodedToken["role"] == "admin"){
                    next()
                }
                else{
                    return (res.status(401).json({
                        "success": false,
                        "message": `users with role ${decodedToken["role"]} can't perform this action`,
                    }))
                }
            }
        })
    }
    else {
        return (res.status(401).json({
            "success": false,
            "message": "Not Authorized, token not found",
        }))
    }    
}

const doctorAuth = async (req, res, next)=>{
    const jwtSecret = process.env.JWT_SECRET
    const token = req.cookies.jwt
    if (token){
        jwt.verify(token, jwtSecret, async (error, decodedToken)=>{
            if(error){
                return (res.status(401).json({
                    "success": false,
                    "message": "error validating request",
                    "error": error.message
                }))
            }
            else{
                if(decodedToken["role"] == "doctor"){
                    next()
                }
                else{
                    return (res.status(401).json({
                        "success": false,
                        "message": `users with role ${decodedToken["role"]} can't perform this action`,
                    }))
                }
            }
        })
    }
    else {
        return (res.status(401).json({
            "success": false,
            "message": "Not Authorized, token not found",
        }))
    }    
}

const nurseAuth = async (req, res, next)=>{
    const jwtSecret = process.env.JWT_SECRET
    const token = req.cookies.jwt
    if (token){
        jwt.verify(token, jwtSecret, async (error, decodedToken)=>{
            if(error){
                return (res.status(401).json({
                    "success": false,
                    "message": "error validating request",
                    "error": error.message
                }))
            }
            else{
                if(decodedToken["role"] == "nurse"){
                    next()
                }
                else{
                    return (res.status(401).json({
                        "success": false,
                        "message": `users with role ${decodedToken["role"]} can't perform this action`,
                    }))
                }
            }
        })
    }
    else {
        return (res.status(401).json({
            "success": false,
            "message": "Not Authorized, token not found",
        }))
    }    
}

const labtechAuth = async (req, res, next)=>{
    const jwtSecret = process.env.JWT_SECRET
    const token = req.cookies.jwt
    if (token){
        jwt.verify(token, jwtSecret, async (error, decodedToken)=>{
            if(error){
                return (res.status(401).json({
                    "success": false,
                    "message": "error validating request",
                    "error": error.message
                }))
            }
            else{
                if(decodedToken["role"] == "labtech"){
                    next()
                }
                else{
                    return (res.status(401).json({
                        "success": false,
                        "message": `users with role ${decodedToken["role"]} can't perform this action`,
                    }))
                }
            }
        })
    }
    else {
        return (res.status(401).json({
            "success": false,
            "message": "Not Authorized, token not found",
        }))
    }    
}

module.exports = {adminAuth, doctorAuth, nurseAuth, labtechAuth}