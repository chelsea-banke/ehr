const { connectCenter, disconnectCenter } = require("../controllers/patientController")

const router = require("express").Router()

router.route("/connect").post(connectCenter)
router.route("/disconnect").delete(disconnectCenter)

module.exports = router