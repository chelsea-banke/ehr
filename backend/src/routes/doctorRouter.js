const { createNewReport, updateReport, createNewTests, updateVitals, deleteTests } = require("../controllers/doctorController")
const { getPatients } = require("../controllers/staffController")
const { doctorAuth } = require("../middlewares/staffAuth")

const router = require("express").Router()

router.route("/create-report").post(doctorAuth, createNewReport)
router.route("/update-report").post(doctorAuth, updateReport)
router.route("/create-tests").post(doctorAuth, createNewTests)
router.route("/update-vitals").post(doctorAuth, updateVitals)

router.route("/delete-tests").delete(doctorAuth, deleteTests)

module.exports = router