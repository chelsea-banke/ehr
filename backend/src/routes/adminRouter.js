const { createNewStaff, updateStaffStatus } = require("../controllers/adminController")
const { adminAuth } = require("../middlewares/staffAuth")

const router = require("express").Router()

router.route("/create-staff").post(adminAuth, createNewStaff)
router.route("/update-staff-status").post(adminAuth, updateStaffStatus)

module.exports = router