require("dotenv").config()
const cookieParser = require("cookie-parser")
const express = require('express')
const cors = require("cors")

const connection = require("./src/utils/connection")
const rootRouter = require("./src/routes/rootRouter")
const adminRouter = require("./src/routes/adminRouter")
const doctorRouter = require("./src/routes/doctorRouter")
const nurseRouter = require("./src/routes/nurseRouter")
const labtechRouter = require("./src/routes/labtechRouter")
const staffRouter = require('./src/routes/staffRouter')
const patientRouter = require('./src/routes/patientRouter')

const generator = require("./src/utils/generator")
const { sendEmail } = require("./src/utils/mail")
const models = require('./src/models/init-models').initModels(connection)

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    exposedHeaders: ["set-cookie"]
}

const server = express()
server.use(cookieParser())
server.use(express.json())
server.use(cors(corsOptions))
server.use('/ehr/root', rootRouter)
server.use('/ehr/admin', adminRouter)
server.use('/ehr/staff', staffRouter)
server.use('/ehr/doctor', doctorRouter)
server.use('/ehr/nurse', nurseRouter)
server.use('/ehr/labteh', labtechRouter)
server.use('/ehr/patient', patientRouter)

server.listen(process.env.SERVER_PORT, async()=>{
    console.log(`server is listening on port ${process.env.SERVER_PORT}...`)
    await connection.sync()
    // sendEmail()
    // generator.generateStaffs(15, 'labtech').map(staff=>{
    //     models.labtech.create(staff)
    // })
})