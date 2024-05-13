const { login } = require("../controllers/login")
const { createNewCenter, createNewAdmin } = require("../controllers/rootController")

// const CreateNewCenter = require("../controllers/root")
const router = require("express").Router()

router.route('/create-center').post(createNewCenter)
router.route('/create-admin').post(createNewAdmin)
router.route('/login').post(login)

module.exports = router