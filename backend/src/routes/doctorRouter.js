const { createNewReport, updateReport, createNewTest } = require("../controllers/doctorController")
const { doctorAuth } = require("../middlewares/staffAuth")

const router = require("express").Router()

router.route("/create-report").post(doctorAuth, createNewReport)
router.route("/update-report").post(doctorAuth, updateReport)
router.route("/create-test").post(doctorAuth, createNewTest)

module.exports = router