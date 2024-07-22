const { getPatients, getReports, getReport, getPatientsStats, getVitals, getTests, getTest, getCenterStats, testConnection, getPatient } = require("../controllers/staffController")
const { doctorAuth, labtechAuth, nurseAuth, adminAuth } = require("../middlewares/staffAuth")

const router = require("express").Router()

router.route("/admin/get-patients").get(adminAuth, getPatients)
router.route("/doctor/get-patients").get(doctorAuth, getPatients)
router.route("/labtech/get-patients").get(labtechAuth, getPatients)
router.route("/nurse/get-patients").get(nurseAuth, getPatients)

router.route("/admin/get-reports").get(adminAuth, getReports)
router.route("/doctor/get-reports").get(doctorAuth, getReports)
router.route("/labtech/get-reports").get(labtechAuth, getReports)
router.route("/nurse/get-reports").get(nurseAuth, getReports)

router.route("/admin/get-report").get(adminAuth, getReport)
router.route("/doctor/get-report").get(doctorAuth, getReport)
router.route("/labtech/get-report").get(labtechAuth, getReport)
router.route("/nurse/get-report").get(nurseAuth, getReport)

router.route("/doctor/get-patient-stats").get(doctorAuth, getPatientsStats)
router.route("/labtech/get-patient-stats").get(labtechAuth, getPatientsStats)
router.route("/nurse/get-patient-stats").get(nurseAuth, getPatientsStats)

router.route("/admin/get-vitals").get(adminAuth, getVitals)
router.route("/doctor/get-vitals").get(doctorAuth, getVitals)
router.route("/labtech/get-vitals").get(labtechAuth, getVitals)
router.route("/nurse/get-vitals").get(nurseAuth, getVitals)

router.route("/admin/get-tests").get(adminAuth, getTests)
router.route("/doctor/get-tests").get(doctorAuth, getTests)
router.route("/labtech/get-tests").get(labtechAuth, getTests)
router.route("/nurse/get-tests").get(nurseAuth, getTests)

router.route("/admin/get-test").get(adminAuth, getTest)
router.route("/doctor/get-test").get(doctorAuth, getTest)
router.route("/labtech/get-test").get(labtechAuth, getTest)
router.route("/nurse/get-test").get(nurseAuth, getTest)

router.route("/admin/get-center-stats").get(adminAuth, getCenterStats)
router.route("/doctor/get-center-stats").get(doctorAuth, getCenterStats)
router.route("/labtech/get-center-stats").get(labtechAuth, getCenterStats)
router.route("/nurse/get-center-stats").get(nurseAuth, getCenterStats)

router.route("/admin/test-connection").get(adminAuth, testConnection)
router.route("/doctor/test-connection").get(doctorAuth, testConnection)
router.route("/labtech/test-connection").get(labtechAuth, testConnection)
router.route("/nurse/test-connection").get(nurseAuth, testConnection)

router.route("/admin/get-patient").get(adminAuth, getPatient)
router.route("/doctor/get-patient").get(doctorAuth, getPatient)
router.route("/labtech/get-patient").get(labtechAuth, getPatient)
router.route("/nurse/get-patient").get(nurseAuth, getPatient)
module.exports = router