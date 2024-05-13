const { updateTest } = require("../controllers/labtechController")
const { labtechAuth } = require("../middlewares/staffAuth")

const router = require("express").Router()

router.route("/update-test").post(labtechAuth, updateTest)

module.exports = router