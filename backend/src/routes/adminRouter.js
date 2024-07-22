const { createNewStaff, updateStaffStatus, getStaffs } = require("../controllers/adminController")
const { adminAuth } = require("../middlewares/staffAuth")

const router = require("express").Router()

router.route("/create-staff").post(adminAuth, createNewStaff)
router.route("/update-staff-status").post(adminAuth, updateStaffStatus)
router.route("/get-staffs").get(adminAuth, getStaffs)
module.exports = router